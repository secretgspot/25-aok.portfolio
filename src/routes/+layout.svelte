<script>
	import { onNavigate } from '$app/navigation';
	import favicon from '#lib/assets/favicon.png';
	import 'open-props/style';
	import Logo from '#lib/Logo.svelte';
	import Settings from '#lib/Settings.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (
			typeof document.startViewTransition !== 'function' ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve(undefined);
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#f8f9fa" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#030507" media="(prefers-color-scheme: dark)" />
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
	<Settings />
	<Logo position="end" />
</header>

<main id="main">
	{@render children?.()}
</main>

<style>
	.site-header {
		display: flex;
		align-items: start;
		justify-content: space-between;
		padding: var(--size-3) var(--size-4) 0;
	}

	.skip-link {
		position: absolute;
		inset-block-start: -100%;
		inset-inline-start: var(--size-3);
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-2);
		background: var(--brand);
		color: var(--surface-1);
		z-index: 100;
	}

	.skip-link:focus {
		inset-block-start: var(--size-2);
	}
</style>
