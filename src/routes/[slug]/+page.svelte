<script>
	import { page } from '$app/state';
	import projects from '$lib/projects.json';
	import Iframe from '$lib/Iframe.svelte';
	import Screenshots from '$lib/Screenshots.svelte';

	// Use $derived rune to reactively compute the project based on the slug
	const project = $derived.by(() => {
		const slug = page.params.slug;
		return projects.find((p) => p.slug === slug) || null;
	});
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
		<Screenshots screenshots={project.screenshots} />
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