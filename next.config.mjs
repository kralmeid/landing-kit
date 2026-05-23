import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add remote image hosts here when serving optimized images from a CDN.
    // Example: { protocol: 'https', hostname: 'cdn.yourbrand.com' }
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
