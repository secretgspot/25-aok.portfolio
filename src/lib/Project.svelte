<script>
	let { url, title, summary, screenshots, details } = $props();
</script>

<fieldset class="project-card">
	<legend class="project-title">{title}</legend>

	<header class="project-header">
		<div class="summary-url">
			{#if summary}
				<p class="project-summary">{summary}</p>
			{/if}

			<a href={url} target="_blank" rel="noopener noreferrer" class="project-link"
				>Visit Website</a>
		</div>

		{#if screenshots && screenshots.length > 0}
			<div class="project-screenshot-container">
				<img
					src={screenshots[0].url}
					alt="{title} screenshot"
					class="project-screenshot" />
			</div>
		{/if}
	</header>

	<div class="iframe-border-wrapper">
		<div class="project-frame-container">
			<iframe
				src={url}
				{title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen></iframe>
		</div>
		<svg class="hand-drawn-border" viewBox="0 0 100 100" preserveAspectRatio="none">
			<defs>
				<linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#FFD700" />
					<stop offset="100%" stop-color="#DAA520" />
				</linearGradient>
			</defs>
			<path
				d="M2 2 L98 2 L98 98 L2 98 L2 2 Z"
				fill="none"
				stroke="url(#goldGradient)"
				stroke-width="2"
				vector-effect="non-scaling-stroke" />
		</svg>
	</div>

	{#if details}
		<footer class="project-details">
			{#if details.client}
				<p><strong>Client:</strong> {details.client}</p>
			{/if}
			{#if details.year}
				<p><strong>Year:</strong> {details.year}</p>
			{/if}
			{#if details.technologies && details.technologies.length > 0}
				<p><strong>Technologies:</strong> {details.technologies.join(', ')}</p>
			{/if}
		</footer>
	{/if}
</fieldset>

<style>
	.project-card {
		/* Existing styles for project-card */
		display: flex;
		flex-direction: column;
		gap: 1rem; /* Add some space between elements */
		border: var(--border-size-3) dashed var(--surface-3);
		border-radius: var(--radius-4);
		margin: 0;
		padding: 0;

		.project-header {
			display: grid;
			> * {
				grid-area: 1/1;
			}

			.summary-url {
				display: grid;
				grid-template-columns: 1fr min-content;
				z-index: 2;

				.project-summary {
					color: var(--text-1);
					place-self: center;
					font-size: var(--size-fluid-3);
					margin-inline: var(--size-9);
				}

				.project-link {
					display: inline-block;
					color: var(--text-2);
					text-decoration: none;
					font-weight: bold;
					place-self: start;
					margin: var(--size-3);
					white-space: nowrap;
					&:hover {
						text-decoration: underline;
						color: var(--text-1);
					}
				}
			}
		}
	}

	.project-title {
		font-size: var(--size-fluid-2);
		margin-inline-start: var(--size-9);
		padding-inline: var(--size-3);
	}

	.project-screenshot-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: var(--radius-4);
		margin-block-start: calc(var(--size-5) * -1);
		filter: blur(3px) opacity(0.3);
		z-index: 1;
	}

	.project-screenshot {
		width: 100%;
		height: 100%;
		object-fit: cover; /* Ensures the image covers the area without distortion */
		transition: transform 0.3s ease-in-out; /* Smooth transition for zoom effect */
		aspect-ratio: 2 / 1;
	}

	.project-header:hover .project-screenshot {
		transform: scale(1.05); /* Slightly zoom in on hover */
	}

	.iframe-border-wrapper {
		position: relative;
		width: 100%;
		padding-top: 177.77%; /* Same aspect ratio as iframe container */
	}

	.project-frame-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.hand-drawn-border {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none; /* Allow clicks to pass through to the iframe */
		transform: rotate(-1deg); /* Slight rotation for hand-drawn effect */
	}

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	/* Tablet and larger */
	@media (min-width: 768px) {
		.iframe-border-wrapper {
			padding-top: 56.25%; /* 16:9 Aspect Ratio */
		}
	}

	.project-details {
		background: var(--surface-3);
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: var(--size-6);
		border-bottom-left-radius: var(--radius-4);
		border-bottom-right-radius: var(--radius-4);
	}
</style>
