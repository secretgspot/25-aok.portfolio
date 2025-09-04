<script>
	import { onMount } from 'svelte';
	import { sound } from '$lib/audio.js';
	import { buzz } from '$lib/vibrate.js';

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

{#if logoSrc}
	<a
		href="/"
		onclick={newLogo}
		use:sound={'logo'}
		use:buzz={'logo'}
		class="logo {position}">
		<div class="logo-container">
			<img src={logoSrc} alt="Random Logo" class="logo-image" />
		</div>
	</a>
{/if}

<style>
	.logo {
		&.start {
			place-self: start;
		}
		&.end {
			place-self: end;
		}
	}
	.logo-container {
		width: 93px;
		height: 93px;
		display: flex;
		justify-content: center;
		align-items: center;
		place-self: center;
		cursor: pointer;
	}

	.logo-image {
		width: 100%;
		height: 100%;
		object-fit: contain; /* Ensures the entire logo is visible */
		border-radius: inherit;
	}
</style>
