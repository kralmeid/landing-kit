import { Resend } from 'resend';
import { siteConfig } from '@/site.config';

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  locale: string;
};

export type SendResult = { ok: true } | { ok: false; error: string };

/**
 * Sends an inbound contact inquiry through Resend.
 *
 * Returns { ok: false, error: 'email-misconfigured' } when RESEND_API_KEY or
 * CONTACT_FORM_TO_EMAIL are not set. Upstream callers should treat this as a
 * signal to fall back to a mailto: link.
 */
export async function sendContactEmail(input: ContactPayload): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO_EMAIL ?? siteConfig.contact.email;
  const from =
    process.env.CONTACT_FORM_FROM_EMAIL ?? siteConfig.contact.resend.fromEmail;

  if (!apiKey || !to) {
    return { ok: false, error: 'email-misconfigured' };
  }

  const resend = new Resend(apiKey);
  const subject = `New inquiry — ${input.name} — ${input.projectType}`;
  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : 'Phone: (not provided)',
    `Project type: ${input.projectType}`,
    `Locale: ${input.locale}`,
    '',
    'Message:',
    input.message,
  ].join('\n');

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject,
      text: body,
    });
    if (result.error) {
      return { ok: false, error: result.error.message ?? 'resend-error' };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'unknown-error',
    };
  }
}
