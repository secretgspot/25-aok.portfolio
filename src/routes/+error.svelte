<script>
	import { page } from '$app/state';
	import { site } from '#lib/site.js';

	const notFound = $derived(page.status === 404);
	const title = $derived(notFound ? `Page not found — ${site.name}` : `Something went wrong — ${site.name}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<article class="error-page">
	<p class="status">{page.status}</p>
	<h1>{notFound ? 'Page not found' : 'Something went wrong'}</h1>
	<p class="message">
		{notFound
			? 'That page does not exist. It may have been renamed or removed.'
			: (page.error?.message ?? 'Please try again in a moment.')}
	</p>
	<a class="home" href="/">← Back to projects</a>
</article>

<style>
	.error-page {
		display: grid;
		justify-items: start;
		gap: var(--size-3);
		max-inline-size: 46rem;
		margin-inline: auto;
		padding: var(--size-9) var(--size-4);
	}

	.status {
		margin: 0;
		color: var(--text-2);
		font-size: var(--font-size-0);
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.08em;
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-fluid-2, clamp(2rem, 4vw + 1rem, 3.5rem));
		text-wrap: balance;
	}

	.message {
		margin: 0;
		color: var(--text-2);
		text-wrap: pretty;
	}

	.home {
		margin-block-start: var(--size-3);
		text-underline-offset: 0.2em;
	}
</style>
