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

<section class="container" aria-labelledby="contact-title">
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
	.container {
		padding-block: var(--size-6) var(--size-8);
		padding-inline: var(--size-4);
		border-block-start: var(--border-size-1) solid var(--surface-4);
	}

	.title,
	.success h2 {
		font-size: var(--font-size-4);
		margin-block: 0 var(--size-4);
		text-wrap: balance;
	}

	.contact-form {
		display: grid;
		gap: var(--size-4);
		max-inline-size: 38rem;
		padding: var(--size-4);
		border: var(--border-size-1) solid var(--border-1);
		border-radius: var(--radius-3);
		background: var(--surface-3);
	}

	.field {
		display: grid;
		gap: var(--size-1);
	}

	label {
		font-size: var(--font-size-0);
		font-weight: 600;
	}

	input,
	textarea {
		inline-size: 100%;
		padding: var(--size-3);
		border: var(--border-size-1) solid var(--border-1);
		border-radius: var(--radius-2);
		background: var(--surface-1);
		color: var(--text-1);
		font: inherit;
		field-sizing: content;
		min-block-size: 3rem;
	}

	textarea {
		min-block-size: 9rem;
		resize: vertical;
	}

	input:user-invalid,
	textarea:user-invalid {
		border-color: var(--color-red);
	}

	input:focus-visible,
	textarea:focus-visible {
		outline: 3px solid var(--accent);
		outline-offset: 2px;
	}

	.hint {
		margin: 0;
		color: var(--text-2);
		font-size: var(--font-size-0);
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
		padding: var(--size-2) var(--size-3);
		border-inline-start: var(--border-size-3) solid var(--color-red);
		background: color-mix(in oklab, var(--color-red) 12%, transparent);
	}

	.actions {
		display: flex;
		justify-content: flex-end;
	}

	button {
		min-inline-size: 12ch;
		min-block-size: 2.75rem;
		padding-inline: var(--size-4);
		border: none;
		border-radius: var(--radius-2);
		background: var(--brand);
		color: var(--surface-1);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		box-shadow: 0 2px 0 0 color-mix(in oklab, var(--brand) 70%, black);
		transition:
			translate 0.15s var(--ease-out-3),
			box-shadow 0.15s;
	}

	button:hover:not(:disabled) {
		translate: 0 -1px;
		box-shadow: 0 3px 0 0 color-mix(in oklab, var(--brand) 70%, black);
	}

	button:active:not(:disabled) {
		translate: 0 1px;
		box-shadow: none;
	}

	button:disabled {
		cursor: progress;
		opacity: 0.7;
	}

	.success {
		max-inline-size: 38rem;
		padding: var(--size-5);
		border: var(--border-size-1) solid var(--border-1);
		border-radius: var(--radius-3);
		background: var(--surface-3);
	}

	.eyebrow {
		margin: 0 0 var(--size-1);
		color: var(--text-2);
		font-size: var(--font-size-0);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.again {
		margin-block-start: var(--size-4);
	}
</style>
