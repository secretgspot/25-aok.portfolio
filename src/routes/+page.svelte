<script>
	import Project from '$lib/Project.svelte';
	import Card from '$lib/Card.svelte';
	import projects from '$lib/projects.json';
	/** @type {import('./$types').PageData} */
</script>

<div class="container">
	<h1 class="title">Projects</h1>

	<div class="grid-container">
		{#each projects as project}
			<!-- <Project
				logo={project.logo}
				url={project.url}
				title={project.title}
				summary={project.summary}
				screenshots={project.screenshots}
				details={project.details}
				slug={project.slug} /> -->
			<Card
				logo={project.logo}
				url={project.url}
				title={project.title}
				summary={project.summary}
				year={project.details.year}
				slug={project.slug} />
		{/each}
	</div>
</div>

<style>
	.container {
		padding-inline: var(--size-4);
		padding-block: var(--size-8);
	}

	@media (min-width: 768px) {
		.container {
			padding-inline: var(--size-12);
		}
	}

	@media (min-width: 1024px) {
		.container {
			padding-inline: var(--size-24);
		}
	}

	.title {
		font-size: var(--font-size-3);
		margin-block-end: var(--size-4);
	}

	@media (min-width: 768px) {
		.title {
			font-size: var(--font-size-5);
		}
	}

	.grid-container {
		display: grid;
		gap: var(--size-4);
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
</style>