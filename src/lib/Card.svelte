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
			background-position: bottom left;
			background-size: 100% 100%;
		}
		50% {
			background-position: center center;
			background-size: 300% 300%;
		}
		100% {
			background-position: top right;
			background-size: 200% 200%;
		}
	}

	.card-link {
		text-decoration: none;
		color: inherit;
		display: block;
		border-radius: var(--radius-3);
		overflow: hidden;
		position: relative;
	}

	.card {
		background: var(--surface-4);
		border: var(--border-size-3) solid var(--surface-4);
		border-radius: var(--radius-3);
		padding: var(--size-3);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		box-shadow: var(--shadow-2);
		position: relative;
		z-index: 1;
	}

	.card-link::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--gradient-6);
		background-position: center center;
		background-size: 200% 200%;
		border-radius: var(--radius-3);
		opacity: 0;
		transition: opacity 1s cubic-bezier(0.01, 0.29, 0.38, 2.37);
		z-index: 0;
	}

	.card-link:hover::before {
		opacity: 1;
		animation: gradient 3s ease infinite;
	}

	.card-link:hover .card {
		background: transparent;
		border: var(--border-size-3) solid transparent;

		p {
			color: var(--surface-1);
		}
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
