<script>
	import { onMount } from 'svelte';

	let logoSrc = '';

	onMount(() => {
		const randomNumber = Math.floor(Math.random() * 117) + 1; // Generates 1, 2, or 3
		logoSrc = `/logos/logo_${randomNumber}.webp`;
	});
</script>

<div class="logo-container">
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
	}

	.logo-image {
		width: 100%;
		height: 100%;
		object-fit: contain; /* Ensures the entire logo is visible */
		border-radius: inherit;
	}
</style>
