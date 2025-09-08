<script>
	import { sound } from '$lib/audio.js';
	import { buzz } from '$lib/vibrate.js';
	let { screenshots, max = Infinity, popover = false } = $props();
</script>

<section class="screenshots">
	<h2>Screenshots</h2>

	{#if screenshots && screenshots.length > 0}
		<div class="screenshots-grid">
			{#each screenshots.slice(0, max) as screenshot, i}
				<div class="screenshot-item" data-title={screenshot.title}>
					{#if popover}
						<button
							popovertarget="popover-{i}"
							use:sound={'screenshot'}
							use:buzz={'screenshot'}
							class="popover-button">
							<img src={screenshot.url} alt="Screenshot" class="screenshot-image" />
						</button>
						<div popover id="popover-{i}" class="popover-content">
							<button
								popovertarget="popover-{i}"
								popovertargetaction="hide"
								use:sound={'swipe'}
								use:buzz={'close'}
								class="close-button">
								❌
							</button>
							<img src={screenshot.url} alt="Screenshot" class="popover-image" />
						</div>
					{:else}
						<img src={screenshot.url} alt="Screenshot" class="screenshot-image" />
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p>No screenshots available.</p>
	{/if}
</section>

<style>
	.screenshots {
		margin-inline: var(--size-3);
	}
	.screenshots-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--size-3);

		/* Tablet and larger */
		@media (min-width: 768px) {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}

		/* Desktop and larger */
		@media (min-width: 1024px) {
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		}

		.screenshot-item {
			position: relative;
			overflow: hidden;
			border: var(--border-size-2) solid var(--brand);
			border-radius: var(--radius-drawn-3);
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
			&:hover {
				animation: pop 0.3s cubic-bezier(0.01, 0.29, 0.38, 2.37);
			}

			.screenshot-image {
				width: 100%;
				height: 100%;
				display: block;
				object-fit: contain;
			}
		}
	}

	@keyframes pop {
		50% {
			transform: scale(1.01);
		}
	}

	.popover-button {
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
		width: 100%;
		height: 100%;
	}

	.popover-content {
		border: var(--border-size-5) solid var(--brand);
		border-radius: var(--radius-drawn-4);
		padding: 0;
		background: none;
		max-width: 90vw;
		max-height: 90vh;
		transition:
			transform 0.3s cubic-bezier(0.01, 0.29, 0.38, 2.37),
			opacity 0.2s linear;

		&::backdrop {
			/* background: var(--surface-1); */
			background: var(--surface-1) radial-gradient(var(--surface-4) 10%, transparent 1%);
			background-size: 9px 9px;
		}
	}

	@starting-style {
		.popover-content {
			opacity: 0;
			transform: scale(0.95);
		}
	}

	.popover-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.close-button {
		position: fixed;
		top: 1rem;
		right: 1rem;
		background: var(--surface-1);
		border: var(--border-size-2) solid var(--surface-4);
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		display: grid;
		place-content: center;
		cursor: pointer;
		z-index: 1;
	}
</style>
