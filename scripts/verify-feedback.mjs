#!/usr/bin/env node
/**
 * Verify the post-deploy feedback fixes against a local preview server:
 *   1. Logo opens #site-settings (no gear button) and shuffles on every click.
 *   2. Screenshot gallery shows every image at its true aspect ratio.
 *   3. Home cards respond to pointer with tilt + glare.
 *
 * Usage: npm run preview (in another terminal), then node scripts/verify-feedback.mjs
 */
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const base = process.env.BASE_URL ?? 'http://localhost:4173';
const shotsDir = path.join(root, '.verify-shots');

/** Wait for the preview server to answer. */
for (let attempt = 0; attempt < 30; attempt += 1) {
	try {
		const res = await fetch(base);
		if (res.ok) break;
	} catch {
		// not up yet
	}
	await new Promise((resolve) => setTimeout(resolve, 500));
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (err) => errors.push(String(err)));

let failures = 0;
function check(label, ok, detail = '') {
	console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
	if (!ok) failures += 1;
}

// ---------------------------------------------------------------- home page
await page.goto(base, { waitUntil: 'networkidle' });

const logo = page.locator('button.logo');
check('logo is a <button> (not a link)', (await logo.count()) === 1);
check(
	'logo targets #site-settings',
	(await logo.getAttribute('popovertarget')) === 'site-settings'
);
check('no settings gear trigger remains', (await page.locator('.trigger').count()) === 0);

const headerBox = await page.locator('.site-header').boundingBox();
const logoBox = await logo.boundingBox();
check(
	'logo sits at the right edge of the header',
	headerBox && logoBox && Math.abs(headerBox.x + headerBox.width - (logoBox.x + logoBox.width)) < 3,
	`header ends ${Math.round(headerBox?.x ?? 0) + Math.round(headerBox?.width ?? 0)}, logo ends ${Math.round(logoBox?.x ?? 0) + Math.round(logoBox?.width ?? 0)}`
);

// Click 1: opens the popover AND shuffles.
const srcBefore = await page.locator('button.logo img').getAttribute('src');
await logo.click();
await page.waitForTimeout(150);
check('#site-settings is open after clicking the logo', await page.evaluate(() => document.getElementById('site-settings')?.popoverOpen === true));
const srcAfter1 = await page.locator('button.logo img').getAttribute('src');
check('logo changed on first click', srcBefore !== srcAfter1, `${srcBefore} -> ${srcAfter1}`);

// Click 2: shuffles again (different face).
await logo.click();
await page.waitForTimeout(150);
const srcAfter2 = await page.locator('button.logo img').getAttribute('src');
check('logo changed on second click', srcAfter2 !== srcAfter1, `${srcAfter1} -> ${srcAfter2}`);

// Close the popover.
await page.keyboard.press('Escape');
await page.waitForTimeout(100);
check('#site-settings closed with Escape', await page.evaluate(() => document.getElementById('site-settings')?.popoverOpen === false));

// ------------------------------------------------------------- card tilt/glare
const card = page.locator('.card-link').first();
const cardBox = await card.boundingBox();
if (cardBox) {
	// Move the pointer into the top-left quadrant of the first card.
	await page.mouse.move(cardBox.x + cardBox.width * 0.25, cardBox.y + cardBox.height * 0.2);
	await page.waitForTimeout(400); // let the transition settle

	const tilt = await card.evaluate((el) => ({
		tiltX: el.style.getPropertyValue('--tilt-x'),
		tiltY: el.style.getPropertyValue('--tilt-y'),
		glareOpacity: getComputedStyle(el.querySelector('.card'), '::after').opacity,
		transform: getComputedStyle(el.querySelector('.card')).transform
	}));

	check('pointermove sets --tilt-x', tilt.tiltX !== '' && !Number.isNaN(parseFloat(tilt.tiltX)), `--tilt-x=${tilt.tiltX}`);
	check('pointermove sets --tilt-y', tilt.tiltY !== '' && !Number.isNaN(parseFloat(tilt.tiltY)), `--tilt-y=${tilt.tiltY}`);
	// Cursor above center => positive rotateX (top edge recedes).
	check('tilt direction matches "pressed at cursor"', parseFloat(tilt.tiltX) > 0, `expected > 0deg`);
	check('card transform is a real 3D matrix', tilt.transform !== 'none' && tilt.transform.startsWith('matrix3d'), tilt.transform.slice(0, 40));
	check('glare fades in on hover', parseFloat(tilt.glareOpacity) > 0.5, `opacity=${tilt.glareOpacity}`);

	// Leave: everything settles back to flat.
	await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y - 60);
	await page.waitForTimeout(400);
	const settled = await card.evaluate((el) => ({
		tiltX: el.style.getPropertyValue('--tilt-x'),
		glareOpacity: getComputedStyle(el.querySelector('.card'), '::after').opacity
	}));
	check('tilt vars cleared on pointerleave', settled.tiltX === '', `--tilt-x="${settled.tiltX}"`);
	check('glare fades out after leave', parseFloat(settled.glareOpacity) < 0.1, `opacity=${settled.glareOpacity}`);
}

await mkdir(shotsDir, { recursive: true });
await page.screenshot({ path: path.join(shotsDir, 'home.png') });

// ------------------------------------------------- screenshot proportions
const projects = JSON.parse(await readFile(path.join(root, 'src/lib/projects.json'), 'utf8'));
const manifest = JSON.parse(await readFile(path.join(root, 'src/lib/screenshots.generated.json'), 'utf8'));

for (const project of projects) {
	await page.goto(`${base}/${project.slug}`, { waitUntil: 'networkidle' });

	const shots = await page.locator('.shot').evaluateAll((buttons) =>
		buttons.map((button) => {
			const img = button.querySelector('img');
			const box = img.getBoundingClientRect();
			return {
				name: (button.querySelector('.caption')?.textContent ?? '').trim().toLowerCase().replace(/\s+/g, '-'),
				boxRatio: box.width / box.height,
				naturalRatio: img.naturalWidth / img.naturalHeight
			};
		})
	);

	const expected = Object.entries(manifest.projects[project.slug] ?? {}).map(([name, entry]) => ({ name, ratio: entry.width / entry.height }));
	check(`${project.slug}: gallery has ${expected.length} shots`, shots.length === expected.length, `found ${shots.length}`);

	for (const shot of shots) {
		const match = expected.find((entry) => entry.name === shot.name);
		if (!match) continue;
		// With object-fit: cover, equal ratios mean zero pixels are cropped.
		// Allow up to 0.5% difference for measurement artifacts
		const ratioMatch = Math.abs(shot.boxRatio - match.ratio) < 0.005;
		const noCrop = Math.abs(shot.boxRatio - shot.naturalRatio) < 0.01;
		check(
			`${project.slug}/${shot.name}: displayed at true proportions`,
			ratioMatch && noCrop,
			`box ${shot.boxRatio.toFixed(3)} vs natural ${shot.naturalRatio.toFixed(3)} (manifest ${match.ratio.toFixed(3)})`
		);
	}

	await page.screenshot({ path: path.join(shotsDir, `${project.slug}.png`) });
}

await browser.close();

if (errors.length) {
	console.log('\nPage errors:', errors);
	failures += 1;
}

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
