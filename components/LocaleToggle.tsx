'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

export function LocaleToggle() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (target: Locale) => {
    if (target === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: target });
    });
  };

  const activeClass = 'text-black font-semibold underline underline-offset-4';
  const inactiveClass =
    'text-black hover:underline underline-offset-4 transition-colors';

  return (
    <div className="flex items-center gap-2 text-sm font-sans">
      <button
        type="button"
        onClick={() => switchTo('pt')}
        disabled={isPending}
        aria-current={locale === 'pt' ? 'page' : undefined}
        aria-label="PT — Mudar para português"
        className={locale === 'pt' ? activeClass : inactiveClass}
      >
        PT
      </button>
      <span className="text-black" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => switchTo('en')}
        disabled={isPending}
        aria-current={locale === 'en' ? 'page' : undefined}
        aria-label="EN — Switch to English"
        className={locale === 'en' ? activeClass : inactiveClass}
      >
        EN
      </button>
    </div>
  );
}
