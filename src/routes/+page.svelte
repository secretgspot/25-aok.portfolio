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
	<header class="intro">
		<h1>Selected work</h1>
		<p>Websites and apps I have designed and built. Every card opens a live deployment.</p>
	</header>

	<ul class="grid">
		{#each projects as project, index (project.slug)}
			<li><Card {project} priority={index === 0} /></li>
		{/each}
	</ul>
</section>

<Contacts form={data.form} />

<style>
	.container {
		padding-inline: var(--size-4);
		padding-block: var(--size-6) var(--size-8);
	}

	.intro {
		margin-block-end: var(--size-5);
	}

	.intro h1 {
		margin: 0;
		font-size: var(--font-size-fluid-2, clamp(2rem, 4vw + 1rem, 3.5rem));
		text-wrap: balance;
	}

	.intro p {
		max-inline-size: 52ch;
		margin-block: var(--size-2) 0;
		color: var(--text-2);
		text-wrap: pretty;
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
</style>
