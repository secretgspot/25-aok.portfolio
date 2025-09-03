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
	.card-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.card {
		background: var(--surface-4);
		border: var(--border-size-3) solid var(--surface-3);
		border-radius: var(--radius-3);
		padding: var(--size-3);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		box-shadow: var(--shadow-2);
		transition: border 0.3s ease;

		&:hover {
			border-color: var(--surface-4);
		}
	}

	header {
		display: flex;
		align-items: center;
		gap: var(--size-3);
	}

	.logo {
		width: 50px;
		height: 50px;
	}

	h1 {
		font-size: var(--font-size-3);
		margin: 0;
	}

	main {
		flex-grow: 1;
	}

	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: small;
		color: var(--text-2);
	}
</style>
