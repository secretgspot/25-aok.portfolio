import { SMTP_PASS, SMTP_USER } from '$app/env/private';
import nodemailer from 'nodemailer';

/** @type {ReturnType<typeof nodemailer.createTransport>} */
export const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS
	}
});

export { SMTP_USER };
