<script>
	import { primaryScreenshot } from '#lib/projects.js';
	import Screenshot from '#lib/Screenshot.svelte';
	import { sound } from '#lib/audio.js';
	import { buzz } from '#lib/vibrate.js';

	/** @type {{ project: import('#lib/projects.js').Project, priority?: boolean }} */
	let { project, priority = false } = $props();

	const preview = $derived(primaryScreenshot(project));

	// Pointer-tracking tilt + glare. Gated to fine pointers and skipped when the
	// user prefers reduced motion; everything else (lift, border, shadow) is CSS.
	/** @type {{ fine: boolean, reduced: boolean } | null} */
	let capabilities = null;

	function caps() {
		if (!capabilities) {
			capabilities = {
				fine: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
				reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches
			};
		}

		return capabilities;
	}

	/** @param {PointerEvent} event */
	function onPointerMove(event) {
		if (!caps().fine || caps().reduced) return;

		const el = /** @type {HTMLElement} */ (event.currentTarget);
		const rect = el.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width;
		const y = (event.clientY - rect.top) / rect.height;

		// "Pressed at the cursor": the point under the pointer recedes, so the
		// tilt is positive above/left of center and negative below/right.
		el.style.setProperty('--tilt-x', `${((0.5 - y) * 8).toFixed(2)}deg`);
		el.style.setProperty('--tilt-y', `${((x - 0.5) * 10).toFixed(2)}deg`);
		el.style.setProperty('--px', `${(x * 100).toFixed(1)}%`);
		el.style.setProperty('--py', `${(y * 100).toFixed(1)}%`);
	}

	/** @param {PointerEvent} event */
	function onPointerLeave(event) {
		const el = /** @type {HTMLElement} */ (event.currentTarget);
		for (const name of ['--tilt-x', '--tilt-y', '--px', '--py']) {
			el.style.removeProperty(name);
		}
	}
</script>

<a
	href="/{project.slug}"
	class="card-link"
	style="--vt-name: project-{project.slug}"
	onpointermove={onPointerMove}
	onpointerleave={onPointerLeave}
	use:sound={'card'}
	use:buzz={'basic'}>
	<article class="card">
		{#if preview}
			<div class="media" style={`aspect-ratio: ${preview.width} / ${preview.height}`}>
				<Screenshot
					image={preview}
					alt=""
					loading={priority ? 'eager' : 'lazy'}
					fetchpriority={priority ? 'high' : 'auto'}
					sizes="(min-width: 64rem) 45vw, 100vw" />
			</div>
		{:else}
			<div class="media fallback" aria-hidden="true">
				<img src={project.logo} alt="" width="120" height="120" loading="lazy" decoding="async" />
			</div>
		{/if}

		<div class="body">
			<header>
				{#if project.logo}
					<img
						src={project.logo}
						alt=""
						class="logo"
						width="48"
						height="48"
						loading="lazy"
						decoding="async" />
				{/if}
				<h2>{project.title}</h2>
			</header>

			<p class="summary">{project.summary}</p>

			{#if project.details?.year}
				<footer>
					<time datetime={String(project.details.year)}>{project.details.year}</time>
				</footer>
			{/if}
		</div>
	</article>
</a>

<style>
	.card-link {
		display: block;
		inline-size: 100%;
		block-size: 100%;
		color: inherit;
		text-decoration: none;
		border-radius: var(--radius-3);
		container-type: inline-size;
		view-transition-name: var(--vt-name);
		perspective: 1100px;
	}

	.card {
		position: relative;
		display: grid;
		block-size: 100%;
		border: var(--border-size-1) solid var(--surface-4);
		border-radius: inherit;
		background: var(--surface-2);
		overflow: hidden;
		box-shadow: var(--shadow-2);
		--tilt-x: var(--tilt-x, 0deg); /* Use fallback */
		--tilt-y: var(--tilt-y, 0deg); /* Use fallback */
		transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
		transition:
			translate 0.3s var(--ease-out-3),
			scale 0.15s var(--ease-out-3),
			box-shadow 0.3s var(--ease-out-3),
			border-color 0.3s,
			transform 0.25s var(--ease-out-3);
	}

	/* Glare follows the pointer via --px/--py (set on the link, inherited here). */
	.card::after {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at var(--px, 50%) var(--py, 50%),
			rgb(255 255 255 / 0.3),
			transparent 60%
		);
		opacity: 0;
		transition: opacity 0.3s var(--ease-out-3);
		pointer-events: none;
	}

	.media {
		aspect-ratio: 16 / 10;
		overflow: hidden;
		border-block-end: var(--border-size-1) solid var(--surface-4);
		background: var(--surface-3);
	}

	.media :global(picture) {
		display: contents;
	}

	.media :global(img) {
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
		object-position: top center;
		transition: scale 0.4s var(--ease-out-3);
	}

	.fallback {
		display: grid;
		place-items: center;
		background:
			radial-gradient(
				circle at 30% 20%,
				color-mix(in oklab, var(--brand) 28%, transparent),
				transparent 65%
			),
			var(--surface-3);
	}

	.fallback img {
		inline-size: 40%;
		block-size: auto;
		max-inline-size: 8rem;
		opacity: 0.5;
		object-fit: contain;
	}

	.body {
		display: grid;
		gap: var(--size-3);
		align-content: start;
		padding: var(--size-4);
	}

	header {
		display: flex;
		align-items: center;
		gap: var(--size-3);
	}

	.logo {
		flex: none;
		inline-size: 48px;
		block-size: 48px;
		object-fit: contain;
	}

	h2 {
		margin: 0;
		font-size: var(--font-size-2);
		text-wrap: balance;
	}

	.summary {
		margin: 0;
		color: var(--text-2);
		text-wrap: pretty;
	}

	footer {
		display: flex;
		justify-content: flex-end;
		font-size: var(--font-size-0);
		color: var(--text-2);
		font-variant-numeric: tabular-nums;
	}

	@media (hover: hover) and (pointer: fine) {
		.card-link:hover .card {
			translate: 0 -4px;
			border-color: var(--brand);
			box-shadow: var(--shadow-5);
		}

		.card-link:hover .card::after {
			opacity: 1;
		}

		.card-link:hover .media :global(img) {
			scale: 1.03;
		}

		/* Pressed: the lift collapses and the card sinks slightly under the finger. */
		.card-link:active .card {
			translate: 0 -1px;
			scale: 0.985;
			box-shadow: var(--shadow-3);
		}
	}

	.card-link:focus-visible {
		outline: 3px solid var(--accent);
		outline-offset: 3px;
	}

	@container (max-width: 19rem) {
		header {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card,
		.card::after,
		.media :global(img) {
			transition: none;
		}
	}
</style>
