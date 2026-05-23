import { getTranslations } from 'next-intl/server';
import { LocaleToggle } from '@/components/LocaleToggle';
import { siteConfig } from '@/site.config';

export async function Header() {
  const t = await getTranslations();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-black focus:text-white focus:px-4 focus:py-2"
      >
        {t('nav.skipToContent')}
      </a>
      <header className="sticky top-0 z-50 bg-white border-b border-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#top"
            className="inline-flex items-center"
            aria-label={t('common.siteName')}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.brand.logo.dark}
              alt={t('common.siteName')}
              className="h-auto w-40 md:w-48 lg:w-52"
            />
          </a>
          <nav
            aria-label={t('common.siteName')}
            className="hidden md:flex gap-8"
          >
            {siteConfig.nav.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm font-sans font-medium text-black hover:underline underline-offset-4 transition-colors"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>
          <LocaleToggle />
        </div>
      </header>
    </>
  );
}
