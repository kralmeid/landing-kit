"use client";

import { useActionState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { submitContact, type ContactFormState } from '@/app/actions/contact';

const initialState: ContactFormState = { status: 'idle' };
const labelClass =
  'block font-sans text-xs font-semibold tracking-[0.18em] uppercase text-black mb-2';
const fieldClass =
  'w-full bg-white border border-black px-4 py-3 font-sans text-black placeholder:text-black shadow-none transition-shadow focus:shadow-[inset_0_0_0_1px_#000] disabled:cursor-not-allowed';

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(
    submitContact,
    initialState
  );

  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="container max-w-2xl">
        <p className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-black mb-4 text-center">
          {t('sectionEyebrow')}
        </p>
        <h2 className="font-sans text-4xl md:text-5xl font-semibold tracking-[-0.015em] text-black mb-4 text-center">
          {t('sectionHeadline')}
        </h2>
        <p className="font-sans text-black text-center mb-12">
          {t('intro')}
        </p>

        <form action={formAction} noValidate className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className={labelClass}
            >
              {t('labels.name')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder={t('placeholders.name')}
              disabled={pending}
              aria-invalid={Boolean(state.fieldErrors?.name)}
              aria-describedby={state.fieldErrors?.name ? 'name-error' : undefined}
              className={fieldClass}
            />
            {state.fieldErrors?.name && (
              <p id="name-error" role="alert" className="mt-2 font-sans text-sm font-medium text-black">
                {state.fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className={labelClass}
            >
              {t('labels.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t('placeholders.email')}
              disabled={pending}
              aria-invalid={Boolean(state.fieldErrors?.email)}
              aria-describedby={state.fieldErrors?.email ? 'email-error' : undefined}
              className={fieldClass}
            />
            {state.fieldErrors?.email && (
              <p id="email-error" role="alert" className="mt-2 font-sans text-sm font-medium text-black">
                {state.fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className={labelClass}
            >
              {t('labels.phone')}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder={t('placeholders.phone')}
              disabled={pending}
              className={fieldClass}
            />
          </div>

          <div>
            <label
              htmlFor="projectType"
              className={labelClass}
            >
              {t('labels.projectType')}
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              disabled={pending}
              aria-invalid={Boolean(state.fieldErrors?.projectType)}
              aria-describedby={state.fieldErrors?.projectType ? 'projectType-error' : undefined}
              className={fieldClass}
            >
              <option value="">{t('projectTypeOptions.placeholder')}</option>
              <option value="customBuild">{t('projectTypeOptions.customBuild')}</option>
              <option value="remodel">{t('projectTypeOptions.remodel')}</option>
              <option value="consultation">{t('projectTypeOptions.consultation')}</option>
              <option value="other">{t('projectTypeOptions.other')}</option>
            </select>
            {state.fieldErrors?.projectType && (
              <p id="projectType-error" role="alert" className="mt-2 font-sans text-sm font-medium text-black">
                {state.fieldErrors.projectType}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className={labelClass}
            >
              {t('labels.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder={t('placeholders.message')}
              disabled={pending}
              aria-invalid={Boolean(state.fieldErrors?.message)}
              aria-describedby={state.fieldErrors?.message ? 'message-error' : undefined}
              className={fieldClass}
            />
            {state.fieldErrors?.message && (
              <p id="message-error" role="alert" className="mt-2 font-sans text-sm font-medium text-black">
                {state.fieldErrors.message}
              </p>
            )}
          </div>

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
          />
          <input type="hidden" name="locale" value={locale} />

          <button
            type="submit"
            disabled={pending}
            className="mx-auto block w-full border border-black bg-black px-8 py-4 font-sans font-semibold text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed sm:w-auto sm:min-w-64"
          >
            {pending ? t('submitting') : t('submit')}
          </button>

          {state.status === 'success' && (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 border border-black p-4 font-sans text-black text-center"
            >
              {t('success')}
            </div>
          )}

          {state.status === 'error' && !state.fieldErrors && (
            <div
              role="alert"
              aria-live="polite"
              className="mt-6 border border-black p-4 font-sans text-black text-center"
            >
              {state.message || t('error')}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
