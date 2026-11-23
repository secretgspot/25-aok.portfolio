<script>
	import { page } from '$app/state';
	import Card from '#lib/Card.svelte';
	import Contacts from '#lib/Contacts.svelte';
	import { primaryScreenshot, projects } from '#lib/projects.js';
	import { site } from '#lib/site.js';

	/** @type {{ data: { form?: { success?: boolean, error?: string, values?: Record<string, string> } } }} */
	let { data } = $props();

	const canonical = $derived(new URL(page.url.pathname, site.url).href);
	const featured = $derived(primaryScreenshot(projects[0]));
	const ogImage = $derived(featured?.webp ? `${site.url}${featured.webp}` : null);
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={site.title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={canonical} />
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:image" content={ogImage} />
	{/if}
</svelte:head>

<section class="container">
	<ul class="grid">
		{#each projects as project, index (project.slug)}
			<li><Card {project} priority={index === 0} /></li>
		{/each}
	</ul>

	<p class="tagline">Bridging technical execution with strategic vision. I don't just build features; I engineer solutions that drive measurable business impact.</p>

	<Contacts form={data.form} />
</section>

<style>
	.container {
		padding-inline: var(--size-4);
		padding-block: var(--size-8);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 24rem), 1fr));
		gap: var(--size-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.grid > li {
		display: grid;
	}

	.tagline {
		font-size: clamp(1.2rem, 3vw + 1rem, 1.5rem);
		margin-block: var(--size-6) 0;
		color: var(--muted);
		text-align: center;
		max-inline-size: 38rem;
		margin-inline: auto;
	}
</style>
