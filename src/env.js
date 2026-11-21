import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	SMTP_USER: {
		description: 'Gmail address used to send contact form messages',
		// Fall back to the pre-Kit-3 variable names so existing deployments keep working.
		schema: (value) => value || process.env.VITE_GOOGLE_EMAIL
	},
	SMTP_PASS: {
		description: 'Gmail app password for the SMTP account',
		schema: (value) => value || process.env.VITE_GOOGLE_EMAIL_PASSWORD
	}
});
