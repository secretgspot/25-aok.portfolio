<script>
	import { applyTheme, settings } from '#lib/feedback.svelte.js';

	const themes = [
		{ value: 'system', label: 'System' },
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' }
	];

	$effect(() => {
		applyTheme();
	});
</script>

<!-- Opened by the header logo, which carries popovertarget="site-settings". -->
<div id="site-settings" popover class="panel" aria-labelledby="settings-title">

	<fieldset>
		<legend>Theme</legend>
		{#each themes as theme (theme.value)}
			<label>
				<input type="radio" name="theme" value={theme.value} bind:group={settings.theme} />
				<span>{theme.label}</span>
			</label>
		{/each}
	</fieldset>

	<div style="margin-block-start: calc(var(--size-3) * 1.5);"></div>

	<label class="switch">
		<input type="checkbox" bind:checked={settings.sound} />
		<span>Sound effects</span>
	</label>

	<label class="switch">
		<input type="checkbox" bind:checked={settings.haptics} />
		<span>Haptics</span>
	</label>
</div>

<style>
	.panel {
		inset: auto;
		inset-block-start: var(--size-4);
		inset-inline-end: var(--size-4);
		margin: 0;
		padding: var(--size-3);
		border: var(--border-size-1) solid var(--border-1);
		border-radius: var(--radius-2);
		background: var(--surface-1);
		color: var(--text-2);
		box-shadow: none;
	}

	.panel:popover-open {
		display: grid;
		gap: calc(var(--size-1) * 0.5);
	}

	fieldset {
		display: flex;
		gap: var(--size-1);
		margin: 0;
		padding: 0;
		border: none;
		cursor: pointer;
	}

	legend {
		padding: 0;
		margin-block-end: calc(var(--size-1) * 0.5);
		color: var(--muted);
		font-size: calc(var(--font-size-0) * 0.8);
	}

	fieldset label,
	.switch {
		display: flex;
		align-items: center;
		gap: calc(var(--size-1) * 0.5);
		cursor: pointer;
		font-size: calc(var(--font-size-0) * 0.8);
	}

	fieldset label {
		padding: calc(var(--size-1) * 0.5) calc(var(--size-2) * 0.5);
		border: var(--border-size-0) solid;
		border-radius: var(--radius);
		background: none;
		color: var(--muted);
		cursor: pointer;
	}

	fieldset label span {
		cursor: pointer;
		display: inline;
	}

	fieldset input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
	}

	fieldset input:checked + span {
		font-weight: 600;
		color: var(--text);
	}

	fieldset label:has(input:checked) {
		border-color: color-mix(in oklab, var(--brand) 80%, transparent);
		background: color-mix(in oklab, var(--brand) 10%, transparent);
		color: var(--text);
	}

	fieldset input:focus-visible + span {
		outline: 1px solid var(--accent);
		outline-offset: 0.5px;
	}
</style>