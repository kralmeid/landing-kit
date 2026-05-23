'use server';

import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import { sendContactEmail } from '@/lib/email';
import { routing, type Locale } from '@/i18n/routing';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  fieldErrors?: {
    name?: string;
    email?: string;
    projectType?: string;
    message?: string;
  };
  message?: string;
};

// Phase 1.5+ upgrade path for Cloudflare Turnstile (3 steps):
//   1. add `@marsidev/react-turnstile` and a NEXT_PUBLIC_TURNSTILE_SITE_KEY env var
//   2. accept `cf-turnstile-response` from formData
//   3. verify the token against https://challenges.cloudflare.com/turnstile/v0/siteverify before sendContactEmail
function isValidLocale(value: unknown): value is Locale {
  return (
    typeof value === 'string' &&
    (routing.locales as readonly string[]).includes(value)
  );
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  if ((formData.get('website') ?? '').toString().trim() !== '') {
    return { status: 'success' };
  }

  const localeRaw = formData.get('locale');
  const locale: Locale = isValidLocale(localeRaw) ? localeRaw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'contact' });

  const schema = z.object({
    name: z.string().trim().min(2, t('validation.nameRequired')).max(100),
    email: z.string().trim().email(t('validation.emailInvalid')).max(200),
    phone: z.string().trim().max(30).optional().default(''),
    projectType: z.string().trim().min(1, t('validation.projectTypeRequired')).max(50),
    message: z.string().trim().min(10, t('validation.messageRequired')).max(5000),
  });

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') ?? '',
    projectType: formData.get('projectType'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === 'name') fieldErrors.name = issue.message;
      else if (field === 'email') fieldErrors.email = issue.message;
      else if (field === 'projectType') fieldErrors.projectType = issue.message;
      else if (field === 'message') fieldErrors.message = issue.message;
    }
    return {
      status: 'error',
      fieldErrors,
      message: t('error'),
    };
  }

  const result = await sendContactEmail({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || undefined,
    projectType: parsed.data.projectType,
    message: parsed.data.message,
    locale,
  });

  if (!result.ok) {
    return { status: 'error', message: t('error') };
  }

  return { status: 'success', message: t('success') };
}
