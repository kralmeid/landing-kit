# Landing Kit

A bilingual Next.js 16 landing-page starter — production-grade headers, accessible by default, and configured from a single file.

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](./LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkralmeid%2Flanding-kit)

## Live demo

Coming soon.

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open <http://localhost:3000>. The root redirects to `/pt` by default; edit `i18n/routing.ts` to change.

Then:

1. Open `site.config.ts` and update `brand`, `contact`, `social`, and `nav`.
2. Open `messages/pt.json` and `messages/en.json` and replace the placeholder copy.
3. Drop replacement images into `public/placeholders/` keeping the same filenames, or repoint paths in `site.config.ts`.

## Customization

### Brand and structural settings — `site.config.ts`

A single typed config controls everything the layout reads at build time:

- `brand.name`, `brand.domain`, `brand.logo.{dark,light,mark}`
- `contact.email` and `contact.resend.fromEmail`
- `nav` items and their anchor targets
- `sections.portfolio.enabled` and the image list
- `sections.trust.enabled`
- `social.{instagram,linkedin,github}` — empty strings hide the icon
- `seo.ogImage`, `hero.image`, `about.portrait`

### Copy and translations — `messages/{pt,en}.json`

Every visible string on the page is keyed in both locales. To change the headline, edit `hero.headline` in both files. To add another locale, see the i18n section below.

### Images — `public/placeholders/`

The starter ships with 12 SVG placeholders so every image slot is visible on first render. Replace them with your own files (PNG, JPG, WEBP, or SVG) using the same filenames, or update the paths in `site.config.ts`.

| Slot | Placeholder |
|---|---|
| Header / Footer logo (light bg) | `logo-wordmark-dark.svg` |
| Hero logo / Footer logo (dark bg) | `logo-wordmark-light.svg` |
| Favicon / monogram | `logo-mark.svg`, `favicon.svg` |
| Hero photo | `hero.svg` |
| Open Graph card | `og-image.svg` |
| Portfolio grid (×6) | `portfolio-0[1..6].svg` |

When you switch to raster files, you can also swap the plain `<img>` tags inside `components/Hero.tsx`, `components/About.tsx`, `components/Header.tsx`, `components/Footer.tsx`, and `components/PortfolioLightbox.tsx` for `next/image` to get automatic optimization.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styles | Tailwind CSS 3 |
| i18n | next-intl 4 (PT default, EN secondary) |
| Email | Resend, with mailto fallback when keys are absent |
| Motion | Framer Motion (respects `prefers-reduced-motion`) |

## Security headers

Production-grade security headers are defined in `vercel.json` and applied on every response:

- `Content-Security-Policy` — locked to self for scripts, styles, fonts, images; allows `api.resend.com` for contact form submissions
- `Strict-Transport-Security` — two-year max-age with preload
- `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — camera, microphone, geolocation disabled

Adjust the CSP allowlist when you add fonts, analytics, or CDN-hosted images.

## Accessibility

- Skip-to-content link as the first focusable element
- Visible `:focus-visible` ring on every interactive element
- `aria-live` regions for form success and error states
- Lightbox traps focus, closes on Escape, navigates with arrow keys
- Framer Motion calls respect `prefers-reduced-motion`
- All images carry meaningful `alt` text sourced from the locale files

## i18n

`i18n/routing.ts` declares the supported locales and the default. To add a third locale, e.g. Spanish:

```ts
// i18n/routing.ts
export const routing = defineRouting({
  locales: ['pt', 'en', 'es'],
  defaultLocale: 'pt',
  localePrefix: 'always',
});
```

Then add `messages/es.json` (start from a copy of `en.json` and translate every value), and update `siteConfig.i18n.locales` in `site.config.ts`.

## Contact form

The form posts to `app/actions/contact.ts`, a Next.js Server Action that:

1. Drops submissions where the honeypot `website` field is non-empty (silent success)
2. Validates with Zod using locale-aware error messages
3. Forwards via Resend if `RESEND_API_KEY` and `CONTACT_FORM_TO_EMAIL` are set
4. Returns a structured error the form surfaces inline

If Resend env vars are not set, swap the section for a plain `mailto:` link by deleting `<ContactForm />` from `app/[locale]/page.tsx` and rendering an `<a href={`mailto:${siteConfig.contact.email}`}>` instead.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Local dev server (port 3000) |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint via the Next config |
| `pnpm typecheck` | TypeScript (no emit) |

## Environment variables

| Key | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact form delivery |
| `CONTACT_FORM_TO_EMAIL` | Recipient address for inbound inquiries |
| `CONTACT_FORM_FROM_EMAIL` | Sender address; must match a verified Resend domain |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (used for metadata + sitemap) |

## License

MIT — see [`LICENSE`](./LICENSE).

## Credits

Architecture patterns extracted from real production sites and rebuilt as a reusable starter.
