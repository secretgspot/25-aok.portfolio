const LOGO_COUNT = 136;

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

	return `/logos/logo_${(hash % LOGO_COUNT) + 1}.webp`;
}
