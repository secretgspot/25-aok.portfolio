<script>
	import favicon from '$lib/assets/favicon.svg';
	import 'open-props/style';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
