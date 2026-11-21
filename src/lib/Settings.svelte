<script>
	import { applyTheme, settings } from '#lib/feedback.svelte.js';
	import { sound } from '#lib/audio.js';
	import { buzz } from '#lib/vibrate.js';

	const themes = [
		{ value: 'system', label: 'System' },
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' }
	];

	$effect(() => {
		applyTheme();
	});
</script>

<button
	type="button"
	class="trigger"
	popovertarget="site-settings"
	aria-label="Site settings"
	use:sound={'tick'}
	use:buzz={'tick'}>
	<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8">
		<circle cx="12" cy="12" r="3.2" />
		<path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.65 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.1 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.2.6.77 1.02 1.42 1.03H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1.03Z" />
	</svg>
</button>

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
	.trigger {
		display: grid;
		place-content: center;
		inline-size: 2.75rem;
		block-size: 2.75rem;
		border: var(--border-size-1) solid var(--border-1);
		border-radius: 50%;
		background: var(--surface-2);
		color: var(--text-1);
		cursor: pointer;
	}

	.trigger:hover {
		border-color: var(--brand);
	}

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
