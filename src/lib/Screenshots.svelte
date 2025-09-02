<script>
	let { screenshots } = $props();
</script>

{#if screenshots && screenshots.length > 0}
	<div class="screenshots-grid">
		{#each screenshots as screenshot}
			<div class="screenshot-item">
				<img src={screenshot.url} alt="Screenshot" class="screenshot-image" />
			</div>
		{/each}
	</div>
{:else}
	<p>No screenshots available.</p>
{/if}

<style>
	.screenshots-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--size-3);
		padding: var(--size-3);

		/* Tablet and larger */
		@media (min-width: 768px) {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}

		/* Desktop and larger */
		@media (min-width: 1024px) {
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		}

		.screenshot-item {
			overflow: hidden;
			border-radius: var(--radius-2);
			box-shadow: var(--shadow-2);

			.screenshot-image {
				width: 100%;
				height: auto;
				display: block;
				object-fit: cover;
			}
		}
	}
</style>
