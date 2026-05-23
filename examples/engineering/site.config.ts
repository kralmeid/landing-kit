/**
 * Example preset — engineering consultancy.
 *
 * Copy this file to the repo root as `site.config.ts` (overwrite the default),
 * and copy `examples/engineering/messages/{en,pt}.json` over `messages/{en,pt}.json`.
 * Then drop your own logo + photography into `public/placeholders/` keeping
 * the same filenames, or repoint paths below.
 *
 * Tailored for: engineering consultancies, technical services firms, B2B
 * automation shops. Adapt the copy keys to fit your own service mix.
 */
export const siteConfig = {
  brand: {
    name: 'Engineering Co.',
    domain: 'example.com',
    logo: {
      dark: '/placeholders/logo-wordmark-dark.svg',
      light: '/placeholders/logo-wordmark-light.svg',
      mark: '/placeholders/logo-mark.svg',
    },
  },
  i18n: { locales: ['pt', 'en'] as const, default: 'en' as const },
  contact: {
    email: 'hello@example.com',
    resend: {
      fromEmail: 'noreply@example.com',
      enabled: Boolean(process.env.RESEND_API_KEY),
    },
  },
  nav: [
    { key: 'services', href: '#services' },
    { key: 'about', href: '#about' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'contact', href: '#contact' },
  ] as const,
  sections: {
    portfolio: {
      enabled: true,
      layout: 'grid-3' as const,
      images: Array.from({ length: 6 }, (_, i) => ({
        src: `/placeholders/portfolio-0${i + 1}.svg`,
        alt: `Case study ${i + 1}`,
      })),
    },
    trust: { enabled: true },
  },
  social: { instagram: '', linkedin: '', github: '' },
  seo: { ogImage: '/placeholders/og-image.svg' },
  hero: {
    image: '/placeholders/hero.svg',
  },
  about: {
    portrait: '/placeholders/portfolio-01.svg',
  },
} as const;

export type SiteConfig = typeof siteConfig;
