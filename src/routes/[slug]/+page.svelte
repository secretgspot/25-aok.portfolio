<script>
	import Details from '#lib/Details.svelte';
	import Iframe from '#lib/Iframe.svelte';
	import Screenshots from '#lib/Screenshots.svelte';
	import { primaryScreenshot } from '#lib/projects.js';
	import { site } from '#lib/site.js';

	/** @type {{ data: { project: import('#lib/projects.js').Project } }} */
	let { data } = $props();

	const project = $derived(data.project);
	const preview = $derived(primaryScreenshot(project));
	const canonical = $derived(`${site.url}/${project.slug}`);
	const ogImage = $derived(preview?.webp ? `${site.url}${preview.webp}` : null);
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

<Details {project} />

<Iframe url={project.url} title={project.title} />

{#if Object.keys(project.screenshots).length}
	<Screenshots {project} />
{/if}

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
</style>
