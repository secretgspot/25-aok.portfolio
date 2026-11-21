const LOGO_COUNT = 136;

/** @param {number} index */
function srcFor(index) {
	return `/logos/logo_${index + 1}.webp`;
}

/**
 * Pick one of the available logo variants deterministically, so the server and
 * the browser always agree (no hydration mismatch, no layout shift).
 *
 * @param {string} pathname
 */
export function logoSrcFor(pathname) {
	let hash = 0;

	for (let index = 0; index < pathname.length; index += 1) {
		hash = (hash * 31 + pathname.charCodeAt(index)) >>> 0;
	}

	return srcFor(hash % LOGO_COUNT);
}

/**
 * Pick a random logo variant, optionally excluding the current one so that two
 * clicks in a row always show a different face.
 *
 * @param {string} [exclude]
 */
export function randomLogoSrc(exclude) {
	let src;
	do {
		src = srcFor(Math.floor(Math.random() * LOGO_COUNT));
	} while (src === exclude);

	return src;
}
