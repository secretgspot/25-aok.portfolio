<script>
	let { screenshots, max = Infinity } = $props();
</script>

{#if screenshots && screenshots.length > 0}
	<div class="screenshots-grid">
		{#each screenshots.slice(0, max) as screenshot}
			<div class="screenshot-item" data-title={screenshot.title}>
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
			position: relative;
			overflow: hidden;
			border-radius: var(--radius-2);
			box-shadow: var(--shadow-2);
			aspect-ratio: 1;
			&::before {
				content: attr(data-title);
				color: var(--text-1);
				position: absolute;
				font-size: small;
				background: var(--surface-1);
				padding: var(--size-1) var(--size-2);
				margin: var(--size-1);
				border-radius: var(--radius-drawn-1);
			}

			.screenshot-image {
				width: 100%;
				height: 100%;
				display: block;
				object-fit: contain;
			}
		}
	}
</style>
