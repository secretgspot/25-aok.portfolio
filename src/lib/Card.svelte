<script>
	let { slug, logo, title, summary, url, year } = $props();
</script>

<a href="/{slug}" class="card-link">
	<div class="card">
		<header>
			{#if logo}
				<img src={logo} alt="{title} logo" class="logo" />
			{/if}
			<h1>{title}</h1>
		</header>
		<main>
			<p>{summary}</p>
		</main>
		<footer>
			<p class="year">{year}</p>
		</footer>
	</div>
</a>

<style>
	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.card-link {
		text-decoration: none;
		color: inherit;
		display: block;
		border-radius: var(--radius-3);
		overflow: hidden;
		/* Remove background and animation from here */
	}

	.card {
		background: var(--surface-4);
		border: var(--border-size-3) solid var(--surface-4); /* Initial border color matches card background */
		border-radius: var(--radius-3);
		padding: var(--size-3);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		box-shadow: var(--shadow-2);
		transition: border-color 0.3s ease; /* Transition only border-color */
	}

	.card-link:hover .card {
		border-image: var(--gradient-6);
		border-image-slice: 1;
		animation: gradient 1s ease infinite;
	}

	header {
		display: flex;
		align-items: center;
		gap: var(--size-3);

		.logo {
			width: 63px;
			height: 63px;
			aspect-ratio: 1;
			object-fit: contain;
		}

		h1 {
			font-size: var(--font-size-3);
			margin: 0;
		}
	}

	main {
		flex-grow: 1;
	}

	footer {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: small;
		color: var(--text-2);

		p {
			margin: 0;
		}
	}
</style>
