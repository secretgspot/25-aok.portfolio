<script>
	import favicon from '$lib/assets/favicon.png';
	import 'open-props/style';
	import Logo from '$lib/Logo.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Logo />

{@render children?.()}
