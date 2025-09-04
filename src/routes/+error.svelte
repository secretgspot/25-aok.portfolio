<script>
	import { page } from '$app/state';
	import Logo from '$lib/Logo.svelte';
</script>

<h1>{page.status}: {page.error?.message}</h1>

<figure>
	<img src="random_logo" alt="" />
	<figcaption>
		{page.status}
		{page.url}
	</figcaption>
</figure>

<Logo position="start" />
