<script>
	import { page } from '$app/state';
	import { sound } from '#lib/audio.js';
	import { logoSrcFor } from '#lib/logo.js';
	import { buzz } from '#lib/vibrate.js';

	/** @type {{ position?: 'start' | 'end' }} */
	let { position = 'start' } = $props();

	const src = $derived(logoSrcFor(page.url.pathname));
</script>

<a
	href="/"
	class="logo {position}"
	aria-label="AOK Portfolio — home"
	title="Home"
	use:sound={'logo'}
	use:buzz={'logo'}>
	<img {src} alt="" width="93" height="93" decoding="async" fetchpriority="low" />
</a>

<style>
	.logo {
		display: block;
		inline-size: 93px;
		block-size: 93px;
		place-self: start;
	}

	.logo.end {
		place-self: end;
	}

	img {
		inline-size: 100%;
		block-size: 100%;
		object-fit: contain;
	}
</style>
