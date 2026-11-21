<script>
	/**
	 * @type {{
	 *   image: import('./projects.js').Screenshot,
	 *   alt?: string,
	 *   class?: string,
	 *   sizes?: string,
	 *   loading?: 'eager' | 'lazy',
	 *   fetchpriority?: 'high' | 'low' | 'auto'
	 * }}
	 */
	let {
		image,
		alt = '',
		class: className = '',
		sizes = '100vw',
		loading = 'lazy',
		fetchpriority = 'auto'
	} = $props();
</script>

{#if image}
	<picture class={className}>
		{#if image.avif}
			<source type="image/avif" srcset={image.avif} {sizes} />
		{/if}
		{#if image.webp}
			<source type="image/webp" srcset={image.webp} {sizes} />
		{/if}
		<img
			src={image.webp ?? image.avif}
			{alt}
			width={image.width}
			height={image.height}
			{loading}
			{fetchpriority}
			decoding="async" />
	</picture>
{/if}
