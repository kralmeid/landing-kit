import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    // Add remote image hosts here when serving optimized images from a CDN.
    // Example: { protocol: 'https', hostname: 'cdn.yourbrand.com' }
    remotePatterns: [],
  },
};

// DSN-guarded Sentry: error tracking stays silent until SENTRY_DSN /
// NEXT_PUBLIC_SENTRY_DSN is set (see sentry.*.config.ts). org/project/authToken
// are read from env so source-map upload only runs when explicitly configured.
export default withSentryConfig(withNextIntl(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
});
