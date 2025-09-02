<script>
	let { url, title, summary, screenshots, details, slug } = $props();
</script>

<fieldset class="project-card">
	<legend class="project-title">{title}</legend>

	<header class="project-header">
		<div class="summary-url">
			{#if summary}
				<p class="project-summary">{summary}</p>
			{/if}

			<a href="/{slug}" class="project-link">View Details</a>
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

	

	{#if details}
		<footer class="project-details">
			{#if details.client}
				<p>
					<strong>Client:</strong>
					<a href={url} target="_blank" rel="noopener noreferrer" class="project-link"
						>{details.client}</a>
				</p>
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
		border: var(--border-size-3) double var(--surface-3);
		border-radius: var(--radius-4);
		margin: 0;
		padding: 0;

		.project-header {
			display: grid;
			position: relative;
			margin-block-start: calc(var(--size-5) * -1);
			* {
				grid-area: 1/1;
			}

			.summary-url {
				display: grid;
				grid-template-columns: 1fr min-content;
				z-index: 2;

				.project-summary {
					color: var(--text-1);
					place-self: center;
					font-size: var(--size-fluid-1);
					margin-inline: var(--size-3);
				}

				.project-link {
					display: inline-block;
					color: var(--text-2);
					text-decoration: none;
					font-weight: bold;
					justify-self: end;
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
		filter: blur(3px) opacity(0.3);
		z-index: 1;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%; /* Cover the entire element */
			background: linear-gradient(to top, var(--surface-1), transparent 50%);
			pointer-events: none; /* Allow clicks to pass through */
		}
	}

	.project-screenshot {
		width: 100%;
		height: 100%;
		object-fit: cover; /* Ensures the image covers the area without distortion */
		aspect-ratio: 3 / 1;
	}

	/* .project-header:hover .project-screenshot {
		transform: scale(1.05);
	} */

	

	.project-details {
		background: var(--surface-3);
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: var(--size-6);
		border-bottom-left-radius: calc(var(--radius-4) / 1.2);
		border-bottom-right-radius: calc(var(--radius-4) / 1.2);
		position: relative; /* Needed for pseudo-element positioning */
	}

	.project-details::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%; /* Cover the entire element */
		background: linear-gradient(to bottom, var(--surface-1), transparent 30%);
		pointer-events: none; /* Allow clicks to pass through */
	}
</style>
