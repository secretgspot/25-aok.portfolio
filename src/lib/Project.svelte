<script>
	let { url, title, summary, screenshots, details } = $props();
</script>

<div class="project-card">
	<h3 class="project-title">{title}</h3>
	{#if summary}
		<p class="project-summary">{summary}</p>
	{/if}

	<a href={url} target="_blank" rel="noopener noreferrer" class="project-link"
		>Visit Website</a>

	{#if screenshots && screenshots.length > 0}
		<div class="project-screenshot-container">
			<img src={screenshots[0].url} alt="{title} screenshot" class="project-screenshot" />
		</div>
	{/if}

	<div class="project-frame-container">
		<iframe
			src={url}
			{title}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen></iframe>
	</div>

	{#if details}
		<div class="project-details">
			{#if details.client}
				<p><strong>Client:</strong> {details.client}</p>
			{/if}
			{#if details.year}
				<p><strong>Year:</strong> {details.year}</p>
			{/if}
			{#if details.technologies && details.technologies.length > 0}
				<p><strong>Technologies:</strong> {details.technologies.join(', ')}</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.project-card {
		/* Existing styles for project-card */
		display: flex;
		flex-direction: column;
		gap: 1rem; /* Add some space between elements */
	}

	.project-title {
		font-size: 1.25rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.project-summary {
		font-size: 0.9rem;
		color: #555;
		margin-bottom: 1rem;
	}

	.project-link {
		display: inline-block;
		margin-bottom: 1rem;
		color: #007bff; /* Example link color */
		text-decoration: none;
		font-weight: bold;
	}

	.project-link:hover {
		text-decoration: underline;
	}

	.project-screenshot-container {
		width: 100%;
		height: min-content;
		overflow: hidden;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.project-screenshot {
		width: 100%;
		height: 100%;
		object-fit: cover; /* Ensures the image covers the area without distortion */
		transition: transform 0.3s ease-in-out; /* Smooth transition for zoom effect */
		aspect-ratio: 2 / 1;
	}

	.project-screenshot:hover {
		transform: scale(1.05); /* Slightly zoom in on hover */
	}

	.project-frame-container {
		position: relative;
		width: 100%;
		padding-top: 177.77%; /* 16:9 Aspect Ratio for mobile portrait */
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

		/* Hand-drawn gold border styles */
		border: 2px solid #ffd700; /* Gold color */
		box-shadow:
			0 0 0 3px #ffd700,
			/* Thicker gold outline */ 2px 2px 0 5px rgba(0, 0, 0, 0.2),
			/* Slight shadow for depth */ -2px -2px 0 5px rgba(0, 0, 0, 0.2);
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
		.project-frame-container {
			padding-top: 56.25%; /* 16:9 Aspect Ratio */
		}
	}

	.project-details {
		font-size: 0.85rem;
		color: #666;
		margin-top: 1rem;
	}

	.project-details p {
		margin-bottom: 0.25rem;
	}
</style>
