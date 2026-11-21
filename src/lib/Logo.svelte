<script>
	import { page } from '$app/state';
	import { sound } from '#lib/audio.js';
	import { logoSrcFor, randomLogoSrc } from '#lib/logo.js';
	import { buzz } from '#lib/vibrate.js';

	/** @type {{ position?: 'start' | 'end' }} */
	let { position = 'start' } = $props();

	// First paint is deterministic (a hash of the pathname) so server and client agree.
	const baseSrc = $derived(logoSrcFor(page.url.pathname));

	/** @type {{ path: string, src: string } | null} */
	let shuffled = $state(null);

	// Every click swaps in a new random face; navigating to another page resets it.
	const src = $derived.by(() => {
		const current = shuffled;
		return current && current.path === page.url.pathname ? current.src : baseSrc;
	});

	function shuffle() {
		shuffled = { path: page.url.pathname, src: randomLogoSrc(src) };
	}
</script>

<button
	type="button"
	class="logo {position}"
	aria-label="Open site settings"
	title="Site settings — every click is a new logo"
	popovertarget="site-settings"
	aria-haspopup="dialog"
	use:sound={'logo'}
	use:buzz={'logo'}
	onclick={shuffle}>
	<img {src} alt="" width="93" height="93" decoding="async" fetchpriority="low" />
</button>

<style>
	.logo {
		display: block;
		inline-size: 93px;
		block-size: 93px;
		padding: 0;
		border: none;
		background: transparent;
		cursor: pointer;
	}

	img {
		display: block;
		inline-size: 100%;
		block-size: 100%;
		object-fit: contain;
	}

	.logo:focus-visible {
		outline: 3px solid var(--accent);
		outline-offset: 3px;
		border-radius: var(--radius-2);
	}
</style>
