<script>
	import { enhance } from '$app/forms';
	import { playButtonSound, sound } from '#lib/audio.js';
	import { buzz } from '#lib/vibrate.js';

	/** @type {{ form?: { success?: boolean, error?: string, values?: Record<string, string> } }} */
	let { form } = $props();

	let sending = $state(false);
	let success = $state(false);
	/** @type {string} */
	let error = $state('');
	/** @type {HTMLElement | undefined} */
	let successPanel = $state();

	$effect(() => {
		if (success) successPanel?.focus();
	});
</script>

<section class="card" aria-labelledby="contact-title" style="max-width: 24rem; width: 100%; margin-block-start: var(--size-4);">
	{#if success}
		<div class="success" role="status" tabindex="-1" bind:this={successPanel}>
			<p class="eyebrow">Message sent</p>
			<h2 id="contact-title">Thanks for reaching out.</h2>
			<p>I will get back to you as soon as I can.</p>
			<button
				type="button"
				class="again"
				onclick={() => {
					success = false;
					error = '';
				}}
				use:sound={'tick'}
				use:buzz={'tick'}>
				Send another message
			</button>
		</div>
	{:else}
		<h2 id="contact-title" class="title">Contact</h2>

		<form
			method="POST"
			class="contact-form"
			use:enhance={() => {
				sending = true;
				error = '';

				return async ({ result, update }) => {
					sending = false;

					if (result.type === 'failure') {
						error = String(result.data?.error ?? 'Something went wrong. Please try again.');
						await update({ reset: false });
						return;
					}

					if (result.type === 'success') {
						success = true;
						playButtonSound('sent');
						return;
					}

					error = 'Something went wrong. Please try again.';
				};
			}}>
			<div class="field">
				<label for="name">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					autocomplete="name"
					required
					minlength="2"
					maxlength="80"
					value={form?.values?.name ?? ''} />
			</div>

			<div class="field">
				<label for="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					inputmode="email"
					autocomplete="email"
					required
					maxlength="200"
					value={form?.values?.email ?? ''} />
			</div>

			<div class="field">
				<label for="message">Message</label>
				<textarea
					id="message"
					name="message"
					rows="6"
					required
					minlength="10"
					maxlength="5000"
					aria-describedby="message-hint">{form?.values?.message ?? ''}</textarea>
				<p id="message-hint" class="hint">10–5,000 characters.</p>
			</div>

			<div class="honeypot" aria-hidden="true">
				<label for="company">Company</label>
				<input id="company" name="company" type="text" tabindex="-1" autocomplete="off" />
			</div>

			{#if error}
				<p class="error" role="alert">{error}</p>
			{/if}

			<div class="actions">
				<button type="submit" disabled={sending} use:sound={'send'} use:buzz={'basic'}>
					{#if sending}Sending…{:else}Send message{/if}
				</button>
			</div>
		</form>
	{/if}
</section>

<style>
	.card {
		--radius: var(--radius-2);
	}

	.title,
	.success h2 {
		font-size: clamp(1.2rem, 3vw + 0.8rem, 1.5rem);
		margin-block: 0 var(--size-2);
		text-wrap: balance;
		color: var(--text-2);
	}

	.contact-form {
		padding: var(--size-2);
		gap: var(--size-2);
		max-inline-size: none;
	}

	.field {
		display: grid;
		gap: calc(var(--size-1) * 0.5);
		margin-block: calc(var(--size-2) * 0.5);
	}

	label {
		font-size: calc(var(--font-size-0) * 0.8);
		color: var(--muted);
		font-weight: 400;
	}

	input,
	textarea {
		inline-size: 100%;
		padding: calc(var(--size-3) * 0.5);
		border: 1px solid var(--border-1);
		border-radius: var(--radius-2);
		background: var(--surface-1);
		color: var(--text-2);
		font: calc(var(--font-size-0) * 0.8) inherit;
		font-size: inherit;
		field-sizing: content;
		min-block-size: 2rem;
	}

	textarea {
		min-block-size: 6rem;
		resize: vertical;
	}

	input:user-invalid,
	textarea:user-invalid {
		border-color: color-mix(in oklab, var(--color-red) 20%, transparent);
	}

	input:focus-visible,
	textarea:focus-visible {
		outline: 1px solid var(--accent);
		outline-offset: 0.5px;
	}

	.hint {
		margin: 0;
		color: var(--muted);
		font-size: calc(var(--font-size-0) * 0.7);
	}

	.honeypot {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.error {
		margin: 0;
		padding: calc(var(--size-2) * 0.5) calc(var(--size-3) * 0.5);
		border-inline-start: var(--border-size-1) solid color-mix(in oklab, var(--color-red) 15%, transparent);
		background: color-mix(in oklab, var(--color-red) 10%, transparent);
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: calc(var(--size-3) * 0.5);
	}

	button {
		min-inline-size: initial;
		min-block-size: initial;
		padding-inline: calc(var(--size-4) * 0.5);
		border: none;
		border-radius: var(--radius-2);
		background: none;
		color: var(--text);
		font: calc(var(--font-size-0) * 0.8) inherit;
		font-weight: 600;
		box-shadow: none;
		transition: translate 0.15s var(--ease-out-3);
		cursor: pointer;
		text-shadow: 0 1px 2px color-mix(in oklab, black 20%, transparent);
	}

	button:hover:not(:disabled) {
		translate: 0 - calc(var(--size-1) * 0.3);
	}

	button:active:not(:disabled) {
		translate: 0 calc(var(--size-1) * 0.3);
		box-shadow: none;
	}

	button:disabled {
		cursor: progress;
		opacity: 0.3;
	}

	.success {
		padding: calc(var(--size-2) * 0.5);
		border: none;
		border-radius: var(--radius-2);
		background: color-mix(in oklab, var(--surface-1) 98%, transparent);
	}

	.eyebrow {
		margin: 0 0 calc(var(--size-1) * 0.5);
		color: var(--muted);
		font-size: calc(var(--font-size-0) * 0.7);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.again {
		margin-block-start: calc(var(--size-2) * 0.5);
	}
</style>