<script>
	import { onMount } from 'svelte';

	let logoSrc = '';

	function newLogo() {
		// This might result in a 404 error if a logo for the generated number doesn't exist.
		const randomNumber = Math.floor(Math.random() * 136) + 1;
		logoSrc = `/logos/logo_${randomNumber}.webp`;
	}

	onMount(() => {
		newLogo();
	});
</script>

<div class="logo-container" onclick={newLogo}>
	{#if logoSrc}
		<a href="/">
			<img src={logoSrc} alt="Random Logo" class="logo-image" />
		</a>
	{/if}
</div>

<style>
	.logo-container {
		width: 93px;
		height: 93px;
		display: flex;
		justify-content: center;
		align-items: center;
		place-self: end;
		cursor: pointer;
	}

	.logo-image {
		width: 100%;
		height: 100%;
		object-fit: contain; /* Ensures the entire logo is visible */
		border-radius: inherit;
	}
</style>
