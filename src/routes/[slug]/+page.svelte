<script>
	import Details from '#lib/Details.svelte';
	import Iframe from '#lib/Iframe.svelte';
	import Screenshots from '#lib/Screenshots.svelte';
	import { primaryScreenshot, projects } from '#lib/projects.js';
	import { site } from '#lib/site.js';

	/** @type {{ data: { project: import('#lib/projects.js').Project } }} */
	let { data } = $props();

	const project = $derived(data.project);
	const preview = $derived(primaryScreenshot(project));
	const canonical = $derived(`${site.url}/${project.slug}`);
	const ogImage = $derived(preview?.webp ? `${site.url}${preview.webp}` : null);
	
	// Find previous and next projects in the list
	const currentIndex = $derived(projects.findIndex(p => p.slug === project.slug));
	const prevProject = $derived(currentIndex > 0 ? projects[currentIndex - 1] : null);
	const nextProject = $derived(currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null);
</script>

<svelte:head>
	<title>{project.title} — {site.name}</title>
	<meta name="description" content={project.summary} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{project.title} — {site.name}" />
	<meta property="og:description" content={project.summary} />
	<meta property="og:url" content={canonical} />
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:image" content={ogImage} />
	{/if}
</svelte:head>

<nav class="back" aria-label="Breadcrumb">
	<a href="/">← All projects</a>
</nav>

{#if prevProject || nextProject}
	<nav class="project-nav" aria-label="Project navigation">
		{#if prevProject}
		<a href="/{prevProject.slug}" class="prev" aria-label="Previous project: {prevProject.title}">
			← {prevProject.title}
		</a>
		{/if}
		{#if nextProject}
		<a href="/{nextProject.slug}" class="next" aria-label="Next project: {nextProject.title}">
			{nextProject.title} →
		</a>
		{/if}
	</nav>
{/if}

<Details {project} />

<Iframe url={project.url} title={project.title} />

<style>
	.back {
		padding-inline: var(--size-4);
		padding-block: var(--size-4);
	}

	.back a {
		font-size: var(--font-size-0);
		color: var(--text-2);
		text-underline-offset: 0.2em;
	}

	.back a:hover {
		color: var(--text-1);
	}

.project-nav {
	display: flex;
	justify-content: space-between;
	padding-inline: var(--size-4);
	padding-block: var(--size-4);
	font-size: var(--font-size-0);
	color: var(--text-2);
}

.project-nav a {
	color: inherit;
	text-decoration: none;
	text-underline-offset: 0.2em;
}

.project-nav a:hover {
	color: var(--text-1);
}

.project-nav .prev {
	margin-right: auto;
}

.project-nav .next {
	margin-left: auto;
}
</style>
