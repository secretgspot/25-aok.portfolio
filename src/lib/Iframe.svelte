<script>
	import { sound } from '#lib/audio.js';
	import { buzz } from '#lib/vibrate.js';

	/** @type {{ url: string, title: string }} */
	let { url, title } = $props();

	let open = $state(false);
	let everOpened = $state(false);
	/** @type {'desktop' | 'tablet' | 'mobile'} */
	let device = $state('desktop');

	$effect(() => {
		if (open) everOpened = true;
	});

	const devices = [
		{ id: 'desktop', label: 'Desktop' },
		{ id: 'tablet', label: 'Tablet' },
		{ id: 'mobile', label: 'Mobile' }
	];
</script>

<details class="live" bind:open use:sound={'live_instance'} use:buzz={'live_instance'}>
	<summary>
		<h2>Live instance</h2>
		<span class="hint">{open ? 'Hide preview' : 'Preview the live site'}</span>
	</summary>

	{#if everOpened}
		<div class="toolbar">
			<fieldset class="devices">
				<legend class="visually-hidden">Preview size</legend>
				{#each devices as option (option.id)}
					<label>
						<input type="radio" name="preview-size" value={option.id} bind:group={device} />
						<span>{option.label}</span>
					</label>
				{/each}
			</fieldset>

			<a class="external" href={url} target="_blank" rel="noopener noreferrer">
				Open live site ↗
			</a>
		</div>

		<div class="stage" data-device={device}>
			<iframe
				src={url}
				title="{title} — live site preview"
				loading="lazy"
				referrerpolicy="strict-origin-when-cross-origin"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
		</div>
	{/if}
</details>

<style>
	.live {
		margin-inline: var(--size-4);
		margin-block: var(--size-8);
		padding: var(--size-3);
		border: var(--border-size-1) solid var(--border-1);
		border-radius: var(--radius-3);
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--size-3);
		cursor: pointer;
	}

	summary::marker {
		content: '';
	}

	summary::before {
		content: '▶';
		font-size: var(--font-size-0);
		transition: rotate 0.2s var(--ease-out-3);
	}

	.live[open] summary::before {
		rotate: 90deg;
	}

	summary h2 {
		flex: 1;
		margin: 0;
		font-size: var(--font-size-3);
	}

	.hint {
		color: var(--text-2);
		font-size: var(--font-size-0);
	}

	.toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--size-3);
		margin-block: var(--size-3);
	}

	.devices {
		display: flex;
		gap: var(--size-1);
		margin: 0;
		padding: var(--size-1);
		border: var(--border-size-1) solid var(--border-1);
		border-radius: var(--radius-2);
		background: var(--surface-2);
	}

	.devices label {
		position: relative;
		cursor: pointer;
	}

	.devices input {
		position: absolute;
		opacity: 0;
	}

	.devices span {
		display: block;
		padding: var(--size-1) var(--size-3);
		border-radius: var(--radius-2);
		color: var(--text-2);
		font-size: var(--font-size-0);
	}

	.devices input:checked + span {
		background: var(--brand);
		color: var(--surface-1);
	}

	.devices input:focus-visible + span {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.external {
		color: var(--text-1);
		font-size: var(--font-size-0);
	}

	.stage {
		display: flex;
		justify-content: center;
		block-size: min(75dvh, 720px);
		border-radius: var(--radius-2);
		background: var(--surface-2);
		overflow: hidden;
	}

	.stage iframe {
		inline-size: 100%;
		block-size: 100%;
		border: 0;
		background: white;
	}

	.stage[data-device='tablet'] iframe {
		inline-size: min(768px, 100%);
	}

	.stage[data-device='mobile'] iframe {
		inline-size: min(390px, 100%);
	}
</style>
