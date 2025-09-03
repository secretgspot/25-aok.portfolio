<script>
	let { project } = $props();
</script>

<aside class="details">
	<div class="details-wrap">
		<img src={project.logo} alt="logo" class="client-logo" />
		{#if project.details}
			<div>
				<p class="client"><small>Client:</small> {project.details.client}</p>
				<p class="year"><small>Year:</small> {project.details.year}</p>
				<p class="tech"><small>Tech:</small> {project.details.technologies.join(', ')}</p>
				<p class="url">
					<small>URL:</small>
					<a href={project.url} target="_blank" rel="noopener noreferrer"
						>{project.url}</a>
				</p>
			</div>
		{/if}
	</div>

	<p class="summary">{project.summary}</p>
</aside>

<style>
	.details {
		/* border: var(--border-size-3) double var(--surface-1); */
		border: none;
		border-radius: var(--radius-4);
		padding: var(--size-3);
		display: grid;
		width: min-content;
		align-self: start;
		gap: var(--size-1);
		background: var(--brand);
		color: var(--surface-1);

		.details-wrap {
			display: grid;
			grid-template-columns: 60px 1fr;
			gap: var(--size-3);
			.client-logo {
				width: 100%;
				height: 100%;
			}

			p {
				margin-block: 0;
				small {
					color: var(--text-2);
				}
				a {
					color: var(--surface-1);
					&:hover {
						color: var(--blue-6);
					}
				}
			}
		}

		p {
			margin-inline: var(--size-3);
		}

		.url {
			white-space: nowrap;
		}
	}
</style>
