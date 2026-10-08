import { Resend } from 'resend';

// Resend initialization. The RESEND_API_KEY is validated at startup.
export const resend = new Resend(process.env.RESEND_API_KEY);
