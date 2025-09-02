<script>
	import { page } from '$app/state';
	import projects from '$lib/projects.json';
	import Iframe from '$lib/Iframe.svelte';

	let project = null;

	$: {
		const slug = page.params.slug;
		project = projects.find((p) => p.slug === slug);
	}
</script>

{#if project}
	<h1>{project.title}</h1>
	<p>{project.summary}</p>
	<p>
		URL: <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>
	</p>

	<h2>Live instance</h2>
	<Iframe url={project.url} title={project.title} />

	{#if project.screenshots && project.screenshots.length > 0}
		<h2>Screenshots</h2>
		{#each project.screenshots as screenshot}
			<div class="screenshot-wrap">
				<span class="screenshot-title">{screenshot.title}</span>
				<img
					src={screenshot.url}
					alt="{project.title} screenshot"
					style="max-width: 100%; height: auto; margin-bottom: 1rem;" />
			</div>
		{/each}
	{/if}

	{#if project.details}
		<h2>Details</h2>
		<p>Client: {project.details.client}</p>
		<p>Year: {project.details.year}</p>
		<p>Technologies: {project.details.technologies.join(', ')}</p>
	{/if}
{:else}
	<p>Project not found.</p>
{/if}

<style>
	.screenshot-wrap {
		position: relative;

		.screenshot-title {
			color: var(--text-1);
			position: absolute;
			font-size: small;
			background: var(--surface-1);
			padding: var(--size-1) var(--size-2);
			margin: var(--size-1);
			border-radius: var(--radius-drawn-1);
		}
	}
</style>
