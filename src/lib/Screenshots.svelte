<script>
	import { screenshotList } from '#lib/projects.js';
	import Screenshot from '#lib/Screenshot.svelte';
	import { sound } from '#lib/audio.js';
	import { buzz } from '#lib/vibrate.js';

	/** @type {{ project: import('#lib/projects.js').Project }} */
	let { project } = $props();

	const images = $derived(screenshotList(project));

	/** @type {number} */
	let index = $state(-1);
	/** @type {HTMLDialogElement | undefined} */
	let dialog = $state();

	/** @param {number} next */
	function open(next) {
		index = next;
		dialog?.showModal();
	}

	function close() {
		dialog?.close();
	}

	/** @param {number} delta */
	function step(delta) {
		if (!images.length) return;
		index = (index + delta + images.length) % images.length;
	}

	/** @param {KeyboardEvent} event */
	function onKeydown(event) {
		if (event.key === 'ArrowRight') step(1);
		if (event.key === 'ArrowLeft') step(-1);
	}

	/** @param {MouseEvent} event */
	function lightDismiss(event) {
		if (event.target === dialog) close();
	}
</script>

{#if images.length}
	<section class="screenshots" aria-labelledby="screenshots-title">
		<h2 id="screenshots-title">Screenshots</h2>

		<ul class="masonry">
			{#each images as image, i (image.name)}
				<li>
					<button
						type="button"
						class="shot"
						style={`aspect-ratio: ${image.width} / ${image.height}`}
						onclick={() => open(i)}
						use:sound={'screenshot'}
						use:buzz={'screenshot'}>
						<Screenshot
							{image}
							alt={image.alt}
							sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw" />
						<span class="caption">{image.name.replace('-', ' ')}</span>
					</button>
				</li>
			{/each}
		</ul>
	</section>
{/if}

<dialog
	bind:this={dialog}
	class="lightbox"
	aria-labelledby="lightbox-title"
	onkeydown={onKeydown}
	onclose={() => (index = -1)}
	onclick={lightDismiss}
	{...{ closedby: 'any' }}>
	{#if index >= 0 && images[index]}
		<h2 id="lightbox-title" class="visually-hidden">{images[index].alt}</h2>

		<picture>
			{#if images[index].avif}
				<source type="image/avif" srcset={images[index].avif} />
			{/if}
			{#if images[index].webp}
				<source type="image/webp" srcset={images[index].webp} />
			{/if}
			<img
				src={images[index].webp ?? images[index].avif}
				alt={images[index].alt}
				width={images[index].width}
				height={images[index].height} />
		</picture>

		<div class="controls">
			<button type="button" onclick={() => step(-1)} aria-label="Previous screenshot">←</button>
			<p aria-live="polite">{index + 1} / {images.length}</p>
			<button type="button" onclick={() => step(1)} aria-label="Next screenshot">→</button>
			<button type="button" class="close" onclick={close} aria-label="Close">✕</button>
		</div>
	{/if}
</dialog>

<style>
	.screenshots {
		margin-inline: var(--size-4);
		margin-block: var(--size-8);
	}

	h2 {
		font-size: var(--font-size-3);
	}

	/* Masonry via CSS columns: each shot keeps its own aspect ratio (set inline
	   from the manifest), so portrait tablet/mobile captures are never cropped. */
	.masonry {
		columns: 1;
		gap: var(--size-3);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 40rem) {
		.masonry {
			columns: 2;
		}
	}

	@media (min-width: 64rem) {
		.masonry {
			columns: 3;
		}
	}

	.masonry li {
		break-inside: avoid;
		margin-block-end: var(--size-3);
	}

	.shot {
		position: relative;
		display: block;
		inline-size: 100%;
		padding: 0;
		border: var(--border-size-2) solid var(--border-1);
		border-radius: var(--radius-3);
		background: var(--surface-3);
		overflow: hidden;
		cursor: pointer;
		transition:
			border-color 0.2s,
			translate 0.2s var(--ease-out-3);
	}

	.shot :global(picture) {
		display: contents;
	}

	.shot :global(img) {
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
		object-position: top center;
	}

	.caption {
		position: absolute;
		inset-block-end: 0;
		inset-inline: 0;
		padding: var(--size-4) var(--size-3) var(--size-2);
		background: linear-gradient(
			to top,
			color-mix(in oklab, var(--surface-1) 88%, transparent),
			transparent
		);
		color: var(--text-1);
		font-size: var(--font-size-0);
		text-align: start;
		text-transform: capitalize;
		text-shadow: 0 1px 2px var(--surface-1);
	}

	@media (hover: hover) and (pointer: fine) {
		.shot:hover {
			border-color: var(--brand);
			translate: 0 -2px;
		}
	}

	.lightbox {
		max-inline-size: min(96vw, 1400px);
		max-block-size: 92dvh;
		padding: 0;
		border: none;
		background: transparent;
		overflow: visible;
	}

	.lightbox:modal {
		overscroll-behavior: contain;
	}

	.lightbox::backdrop {
		background: color-mix(in oklab, var(--surface-1) 82%, transparent);
		backdrop-filter: blur(8px);
		overscroll-behavior: contain;
	}

	.lightbox picture {
		display: contents;
	}

	.lightbox img {
		max-inline-size: 100%;
		max-block-size: 80dvh;
		margin-inline: auto;
		border-radius: var(--radius-3);
		box-shadow: var(--shadow-6);
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--size-3);
		margin-block-start: var(--size-3);
		color: var(--text-1);
	}

	.controls button {
		inline-size: 2.75rem;
		block-size: 2.75rem;
		border: var(--border-size-1) solid var(--border-1);
		border-radius: 50%;
		background: var(--surface-2);
		color: var(--text-1);
		cursor: pointer;
	}

	.controls .close {
		margin-inline-start: var(--size-5);
	}

	.controls p {
		margin: 0;
		font-variant-numeric: tabular-nums;
	}

	@starting-style {
		.lightbox[open] {
			opacity: 0;
			translate: 0 1rem;
		}
	}

	.lightbox[open] {
		animation: enter 0.25s var(--ease-out-3);
	}

	@keyframes enter {
		from {
			opacity: 0;
			translate: 0 1rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.lightbox[open] {
			animation: none;
		}
	}
</style>
