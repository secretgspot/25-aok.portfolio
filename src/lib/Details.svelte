<script>
	let { project } = $props();
</script>

<fieldset>
	<legend>Details</legend>
	{#if project.details}
		<p>Client: {project.details.client}</p>
		<p>Year: {project.details.year}</p>
		<p>Technologies: {project.details.technologies.join(', ')}</p>
	{/if}
	<p class="url">
		URL: <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>
	</p>

	<p>{project.summary}</p>
</fieldset>

<style>
	fieldset {
		border: var(--border-size-3) double var(--surface-4);
		border-radius: var(--radius-4);
		padding: var(--size-3);
		display: grid;
		width: min-content;
		align-self: start;
		gap: var(--size-1);

		legend {
			margin-inline: var(--size-3);
			padding-inline: var(--size-3);
		}

		p {
			margin-inline: var(--size-3);
			margin-block: 0;
		}

		.url {
			white-space: nowrap;
		}
	}
</style>
