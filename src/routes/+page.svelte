<script>
	import Project from '$lib/Project.svelte';
	import projects from '$lib/projects.json';
	import Logo from '$lib/Logo.svelte';
	/** @type {import('./$types').PageData} */
</script>

<div class="container">
	<Logo />

	<h1 class="title">Projects</h1>

	<div class="grid-container">
		{#each projects as project}
			<Project
				url={project.url}
				title={project.title}
				summary={project.summary}
				screenshots={project.screenshots}
				details={project.details}
				slug={project.slug} />
		{/each}
	</div>
</div>

<style>
	:root {
		--size-fluid-1: clamp(1rem, 2vw, 2rem);
		--size-fluid-2: clamp(1.25rem, 3vw, 2.5rem);
		--size-4: 1rem;
		--size-8: 2rem;
		--size-12: 3rem;
		--size-24: 6rem;
		--font-size-3: 1.5rem;
		--font-size-5: 2.25rem;
		--font-weight-6: 700;
		--gray-6: #6b7280;
		--gray-5: #6b7280;
		--shadow-4: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		--radius-3: 0.5rem;
		--transition-transform-ease-in-out: transform 0.3s ease-in-out;
	}

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
		gap: var(--size-9);
	}

	@media (min-width: 768px) {
		.grid-container {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
	}

	@media (min-width: 1024px) {
		.grid-container {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
	}

	@media (min-width: 1280px) {
		.grid-container {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
	}
</style>
