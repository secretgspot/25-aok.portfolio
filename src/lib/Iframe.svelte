<script>
	import { onMount } from 'svelte';

	let { url, title } = $props();
	let selectedDevice = $state('desktop');

	// Device configurations
	const devices = {
		mobile: { width: '375px', height: '667px', label: 'Mobile' },
		tablet: { width: '768px', height: '1024px', label: 'Tablet' },
		desktop: { width: '100%', height: '100%', label: 'Desktop' },
	};

	onMount(() => {
		// Load Open Props CSS
		if (!document.querySelector('link[href*="open-props"]')) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://unpkg.com/open-props@1.7.4/open-props.min.css';
			document.head.appendChild(link);
		}
	});
</script>

<div class="viewer-container">
	<!-- Device Toggle -->
	<div class="device-toggle">
		{#each Object.entries(devices) as [key, device]}
			<label class="toggle-option">
				<input type="radio" name="device-size" value={key} bind:group={selectedDevice} />
				<span class="toggle-label">{device.label}</span>
			</label>
		{/each}
	</div>

	<!-- Iframe Container -->
	<div class="iframe-wrapper" data-device={selectedDevice}>
		<div class="iframe-container">
			<iframe
				src={url}
				{title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen></iframe>
		</div>
	</div>
</div>

<style>
	.viewer-container {
		width: 100%;
	}

	/* Device Toggle Styles */
	.device-toggle {
		display: flex;
		gap: var(--size-2, 0.5rem);
		margin-bottom: var(--size-4, 1rem);
		padding: var(--size-2, 0.5rem);
		background: var(--surface-2, #f8fafc);
		border-radius: var(--radius-3, 12px);
		border: var(--border-size-1, 1px) solid var(--border-1, #e2e8f0);
		box-shadow: var(--shadow-2, 0 1px 3px rgba(0, 0, 0, 0.1));
	}

	.toggle-option {
		flex: 1;
		cursor: pointer;
		position: relative;
	}

	.toggle-option input[type='radio'] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.toggle-label {
		display: block;
		padding: var(--size-2, 0.5rem) var(--size-3, 0.75rem);
		text-align: center;
		border-radius: var(--radius-2, 8px);
		font-size: var(--font-size-1, 0.875rem);
		color: var(--text-2, #64748b);
		background: transparent;
		border: var(--border-size-1, 1px) solid transparent;
		transition: all var(--animation-speed-1, 150ms) var(--ease-out-2, ease-out);
	}

	.toggle-option:hover .toggle-label {
		background: var(--surface-3, #ffffff);
		color: var(--text-1, #334155);
	}

	.toggle-option input[type='radio']:checked + .toggle-label {
		background: var(--brand, #3b82f6);
		color: var(--surface-1, #ffffff);
		border-color: var(--brand, #3b82f6);
		box-shadow: var(--shadow-3, 0 4px 6px rgba(0, 0, 0, 0.1));
	}

	/* Iframe Wrapper */
	.iframe-wrapper {
		position: relative;
		width: 100%;
		display: flex;
		justify-content: center;
		min-height: 400px;
	}

	.iframe-container {
		position: relative;
		background: var(--surface-1);
		border-radius: var(--radius-3, 12px);
		padding: var(--size-2);
		box-shadow: var(--shadow-2);
		border: var(--border-size-1, 1px) solid var(--surface-4);
		overflow: hidden;
	}

	/* Device-specific sizing */
	.iframe-wrapper[data-device='mobile'] .iframe-container {
		width: 375px;
		height: 667px;
		max-width: 100%;
	}

	.iframe-wrapper[data-device='tablet'] .iframe-container {
		width: 768px;
		height: 1024px;
		max-width: 100%;
	}

	.iframe-wrapper[data-device='desktop'] .iframe-container {
		width: 100%;
		height: 600px;
		max-height: 80vh;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: 0;
		border-radius: var(--radius-2);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.device-toggle {
			flex-direction: column;
			gap: var(--size-1, 0.25rem);
		}

		.iframe-wrapper[data-device='mobile'] .iframe-container,
		.iframe-wrapper[data-device='tablet'] .iframe-container {
			width: 100%;
			height: 400px;
		}
	}

	/* Enhanced visual effects */
	.iframe-container {
		transition: all var(--animation-speed-2, 300ms) var(--ease-out-3, ease-out);
	}

	.iframe-wrapper[data-device='mobile'] .iframe-container {
		/* transform: scale(1); */
		box-shadow: var(--shadow-5, 0 20px 25px rgba(0, 0, 0, 0.15));
	}

	.iframe-wrapper[data-device='tablet'] .iframe-container {
		/* transform: scale(0.95); */
		box-shadow: var(--shadow-4, 0 10px 15px rgba(0, 0, 0, 0.1));
	}

	.iframe-wrapper[data-device='desktop'] .iframe-container {
		/* transform: scale(1); */
		box-shadow: var(--shadow-3, 0 4px 6px rgba(0, 0, 0, 0.1));
	}
</style>
