<script>
	import Iframe from '$lib/Iframe.svelte';
	import Screenshots from '$lib/Screenshots.svelte';
	import Details from '$lib/Details.svelte';
	import Logo from '$lib/Logo.svelte';

	let { data } = $props();
	const { project } = data;
</script>

<Details {project} />

<Iframe url={project.url} title={project.title} />

{#if project.screenshots && project.screenshots.length > 0}
	<Screenshots screenshots={project.screenshots} popover={true} />
{/if}

<Logo position="start" />
