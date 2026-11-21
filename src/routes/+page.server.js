import { fail } from '@sveltejs/kit';
import { SMTP_USER } from '$app/env/private';
import { transporter } from '#lib/server/mailer.js';

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @type {Map<string, number[]>} */
const attempts = new Map();

/** @param {string} key */
function isRateLimited(key) {
	const now = Date.now();
	const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
	recent.push(now);
	attempts.set(key, recent);

	// Keep the map from growing without bound on a long-lived instance.
	if (attempts.size > 500) {
		for (const [existingKey, times] of attempts) {
			if (!times.some((time) => now - time < WINDOW_MS)) attempts.delete(existingKey);
		}
	}

	return recent.length > MAX_PER_WINDOW;
}

/** @param {string} value */
function escapeHtml(value) {
	return value.replace(
		/[&<>"']/g,
		(character) =>
			/** @type {Record<string, string>} */ ({
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;'
			})[character]
	);
}

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const formData = await request.formData();

		const name = String(formData.get('name') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const message = String(formData.get('message') ?? '').trim();
		const company = String(formData.get('company') ?? '').trim();

		/** @type {Record<string, string>} */
		const values = { name, email, message };

		// Honeypot: real people never fill this in.
		if (company) {
			return fail(400, { error: 'Unable to send this message.', values });
		}

		if (name.length < 2 || name.length > 80) {
			return fail(400, { error: 'Please enter your name (2–80 characters).', values });
		}

		if (email.length > 200 || !EMAIL_PATTERN.test(email)) {
			return fail(400, { error: 'Please enter a valid email address.', values });
		}

		if (message.length < 10 || message.length > 5000) {
			return fail(400, { error: 'Please write a message between 10 and 5,000 characters.', values });
		}

		if (isRateLimited(getClientAddress())) {
			return fail(429, {
				error: 'Too many messages from this address. Please try again in a minute.',
				values
			});
		}

		const html = `
			<div style="font-family: system-ui, sans-serif; font-size: 16px; line-height: 1.6; color: #222;">
				<h2 style="margin: 0 0 16px;">New message from the portfolio contact form</h2>
				<p style="margin: 0 0 8px;"><strong>From:</strong> ${escapeHtml(name)}</p>
				<p style="margin: 0 0 20px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
				<div style="padding: 16px; border-radius: 8px; background: #f5f5f5; white-space: pre-wrap;">${escapeHtml(message)}</div>
			</div>
		`;

		try {
			await transporter.sendMail({
				from: SMTP_USER,
				to: SMTP_USER,
				replyTo: email,
				subject: `Portfolio message from ${name}`,
				text: `From: ${name} <${email}>\n\n${message}`,
				html
			});

			return { success: true };
		} catch (error) {
			console.error('Contact form failed:', error);
			return fail(502, {
				error: 'The message could not be sent. Please try again or email me directly.',
				values
			});
		}
	}
};
