<script>
	import { onMount } from 'svelte';

	let logoSrc = '';

	onMount(() => {
		const randomNumber = Math.floor(Math.random() * 3) + 1; // Generates 1, 2, or 3
		logoSrc = `/logos/logo_${randomNumber}.webp`;
	});
</script>

<div class="logo-container">
	{#if logoSrc}
		<img src={logoSrc} alt="Random Logo" class="logo-image" />
	{/if}
</div>

<style>
	.logo-container {
		width: 93px;
		height: 93px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logo-image {
		width: 100%;
		height: 100%;
		object-fit: contain; /* Ensures the entire logo is visible */
		border-radius: inherit;
	}
</style>
