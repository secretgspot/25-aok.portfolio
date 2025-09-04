<script>
	import { page } from '$app/state';
	import Logo from '$lib/Logo.svelte';
	import { onMount } from 'svelte';

	let { position } = $props();

	let logoSrc = $state('');

	function newLogo() {
		// This might result in a 404 error if a logo for the generated number doesn't exist.
		const randomNumber = Math.floor(Math.random() * 136) + 1;
		logoSrc = `/logos/logo_${randomNumber}.webp`;
	}

	onMount(() => {
		newLogo();
	});
</script>

<article class="error-page">
	<h1 class="title">{page.status}: {page.error?.message}</h1>

	{#if logoSrc}
		<img src={logoSrc} alt="Random Logo" class="logo-image" />
	{/if}
	<div class="url">{page.url}</div>
</article>

<Logo position="start" />

<style>
	.error-page {
		display: grid;
		place-content: center;
		justify-items: center;
		align-items: center;
		flex: 1;
		& > * {
			grid-area: 1/1;
		}

		.title {
			z-index: 1;
		}

		.logo-image {
			max-width: 600px;
			width: 100%;
			aspect-ratio: 1;
		}
		.url {
			align-self: self-end;
		}
	}
</style>
