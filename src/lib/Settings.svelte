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
	<h2 id="settings-title">Settings</h2>

	<fieldset>
		<legend>Theme</legend>
		{#each themes as theme (theme.value)}
			<label>
				<input type="radio" name="theme" value={theme.value} bind:group={settings.theme} />
				<span>{theme.label}</span>
			</label>
		{/each}
	</fieldset>

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
		inset-block-start: 5.5rem;
		inset-inline-end: var(--size-4);
		margin: 0;
		padding: var(--size-4);
		border: var(--border-size-1) solid var(--border-1);
		border-radius: var(--radius-3);
		background: var(--surface-2);
		color: var(--text-1);
		box-shadow: var(--shadow-5);
	}

	.panel:popover-open {
		display: grid;
		gap: var(--size-3);
	}

	.panel h2 {
		margin: 0;
		font-size: var(--font-size-1);
	}

	fieldset {
		display: flex;
		gap: var(--size-1);
		margin: 0;
		padding: 0;
		border: none;
	}

	legend {
		padding: 0;
		margin-block-end: var(--size-1);
		color: var(--text-2);
		font-size: var(--font-size-0);
	}

	fieldset label,
	.switch {
		display: flex;
		align-items: center;
		gap: var(--size-2);
		cursor: pointer;
		font-size: var(--font-size-0);
	}

	fieldset label {
		padding: var(--size-1) var(--size-3);
		border: var(--border-size-1) solid var(--border-1);
		border-radius: var(--radius-2);
	}

	fieldset input {
		position: absolute;
		opacity: 0;
	}

	fieldset input:checked + span {
		font-weight: 700;
	}

	fieldset label:has(input:checked) {
		border-color: var(--brand);
		background: color-mix(in oklab, var(--brand) 12%, transparent);
	}

	fieldset input:focus-visible + span {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
</style>
