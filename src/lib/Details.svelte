<script>
	/** @type {{ project: import('#lib/projects.js').Project }} */
	let { project } = $props();

	const host = $derived(new URL(project.url).host);
</script>

<aside class="details" aria-labelledby="project-title">
	<div class="intro">
		<div class="head">
			{#if project.logo}
				<img src={project.logo} alt="" class="client-logo" width="56" height="56" decoding="async" />
			{/if}
			<h1 id="project-title">{project.title}</h1>
		</div>

		<p class="summary">{project.summary}</p>
	</div>

	{#if project.details}
		<dl>
			{#if project.details.client}
				<div><dt>Client</dt><dd>{project.details.client}</dd></div>
			{/if}
			{#if project.details.year}
				<div><dt>Year</dt><dd>{project.details.year}</dd></div>
			{/if}
			{#if project.details.technologies?.length}
				<div><dt>Tech</dt><dd>{project.details.technologies.join(', ')}</dd></div>
			{/if}
			<div>
				<dt>URL</dt>
				<dd>
					<a href={project.url} target="_blank" rel="noopener noreferrer">{host}</a>
				</dd>
			</div>
		</dl>
	{/if}
</aside>

<style>
	.details {
		display: grid;
		gap: var(--size-5);
		margin-inline: var(--size-4);
		padding: var(--size-5);
		border-radius: var(--radius-3);
		background: var(--brand);
		color: var(--surface-1);
	}

	.intro {
		display: grid;
		gap: var(--size-3);
		align-content: start;
	}

	.head {
		display: flex;
		align-items: center;
		gap: var(--size-3);
	}

	.client-logo {
		flex: none;
		inline-size: 56px;
		block-size: 56px;
		object-fit: contain;
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-4);
		text-wrap: balance;
	}

	dl {
		display: grid;
		gap: var(--size-2);
		align-content: start;
		margin: 0;
		padding: 0;
	}

	dl div {
		display: flex;
		flex-wrap: wrap;
		gap: var(--size-2);
	}

	dt {
		min-inline-size: 5ch;
		color: color-mix(in oklab, var(--surface-1) 74%, transparent);
		font-size: var(--font-size-0);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	dd {
		margin: 0;
	}

	a {
		color: inherit;
		text-underline-offset: 0.2em;
	}

	a:hover {
		text-decoration-thickness: 2px;
	}

	.summary {
		margin: 0;
		font-size: var(--font-size-1);
		text-wrap: pretty;
	}

	@media (min-width: 48rem) {
		.details {
			grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
			gap: var(--size-6);
			padding: var(--size-6);
		}
	}
</style>
