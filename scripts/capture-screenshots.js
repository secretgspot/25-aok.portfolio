#!/usr/bin/env node
/**
 * Capture fresh screenshots for every project in src/lib/projects.json.
 *
 * Usage:
 *   npm run screenshots            # all projects
 *   npm run screenshots -- --only=cariari-agency  # specific project
 *
 * Requires Chromium once: npx playwright install chromium
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const projectsPath = path.join(root, 'src/lib/projects.json');
const manifestPath = path.join(root, 'src/lib/screenshots.generated.json');
const outputRoot = path.join(root, 'static/screenshots');

/** @type {Array<{title: string, slug: string, url: string}>} */
const projects = JSON.parse(await readFile(projectsPath, 'utf8'));

const only = process.argv.find((arg) => arg.startsWith('--only='))?.split('=')[1];

/** @type {Record<string, {width: number, height: number, fullPage: boolean}>} */
const shots = {
	desktop: { width: 1440, height: 900, fullPage: false },
	'desktop-full': { width: 1440, height: 900, fullPage: true },
	tablet: { width: 834, height: 1112, fullPage: false },
	mobile: { width: 390, height: 844, fullPage: false }
};

/** @type {{ generatedAt: string | null, projects: Record<string, Record<string, object>> }} */
let manifest = { generatedAt: null, projects: {} };
try {
	manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch {
	// First run: start from an empty manifest.
}

/**
 * @param {Buffer} buffer
 * @param {string} slug
 * @param {string} name
 * @param {string} title
 */
async function writeImage(buffer, slug, name, title) {
	const directory = path.join(outputRoot, slug);
	await mkdir(directory, { recursive: true });

	const maxWidth = name === 'desktop-full' ? 1200 : 1600;
	const base = sharp(buffer).resize({ width: maxWidth, withoutEnlargement: true });

	await base.clone().webp({ quality: 78 }).toFile(path.join(directory, `${name}.webp`));
	await base.clone().avif({ quality: 55 }).toFile(path.join(directory, `${name}.avif`));

	const { width, height } = await sharp(path.join(directory, `${name}.webp`)).metadata();

	return {
		webp: `/screenshots/${slug}/${name}.webp`,
		avif: `/screenshots/${slug}/${name}.avif`,
		width: width ?? 0,
		height: height ?? 0,
		alt: `${title} — ${name.replace('-', ' ')} view`
	};
}

const browser = await chromium.launch();

try {
	for (const project of projects) {
		if (only && project.slug !== only) continue;

		console.log(`\n→ ${project.title} (${project.url})`);
		const context = await browser.newContext({
			viewport: { width: shots.desktop.width, height: shots.desktop.height },
			deviceScaleFactor: 1,
			colorScheme: 'light',
			reducedMotion: 'reduce'
		});
		const page = await context.newPage();

		try {
			await page.goto(project.url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
			await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
			await page.evaluate(() => document.fonts?.ready);

			// Scroll through the page so lazy-loaded images and reveals are painted.
			await page.evaluate(async () => {
				await new Promise((resolve) => {
					let y = 0;
					const step = () => {
						y += window.innerHeight;
						window.scrollTo(0, y);
						if (y < document.body.scrollHeight) {
							requestAnimationFrame(step);
						} else {
							window.scrollTo(0, 0);
							resolve(undefined);
						}
					};
					step();
				});
			});
			await page.waitForTimeout(600);

			/** @type {Record<string, object>} */
			const captured = {};

			for (const [name, config] of Object.entries(shots)) {
				await page.setViewportSize({ width: config.width, height: config.height });
				await page.waitForTimeout(250);

				const buffer = await page.screenshot({
					fullPage: config.fullPage,
					type: 'png'
				});

				captured[name] = await writeImage(buffer, project.slug, name, project.title);
				console.log(`  ✓ ${name}`);
			}

			manifest.projects[project.slug] = captured;
		} catch (error) {
			console.warn(`  ✗ skipped: ${error instanceof Error ? error.message : error}`);
		} finally {
			await context.close();
		}
	}
} finally {
	await browser.close();
}

manifest.generatedAt = new Date().toISOString();
await writeFile(manifestPath, `${JSON.stringify(manifest, null, '\t')}\n`);
console.log(`\nManifest written to ${path.relative(root, manifestPath)}`);
