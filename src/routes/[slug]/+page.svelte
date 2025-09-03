<script>
	import { page } from '$app/state';
	import projects from '$lib/projects.json';
	import Iframe from '$lib/Iframe.svelte';
	import Screenshots from '$lib/Screenshots.svelte';
	import Details from '$lib/Details.svelte';
	import Logo from '$lib/Logo.svelte';

	// Use $derived rune to reactively compute the project based on the slug
	const project = $derived.by(() => {
		const slug = page.params.slug;
		return projects.find((p) => p.slug === slug) || null;
	});
</script>

{#if project}
	<Details {project} />

	<Iframe url={project.url} title={project.title} />

	{#if project.screenshots && project.screenshots.length > 0}
		<h2>Screenshots</h2>
		<Screenshots screenshots={project.screenshots} popover={true} />
	{/if}
{:else}
	<p>Project not found.</p>
{/if}

<Logo position="start" />
