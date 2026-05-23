import { getTranslations } from 'next-intl/server';
import { IconInstagram, IconLinkedin } from '@/components/icons';
import { siteConfig } from '@/site.config';

export async function Footer() {
  const tCommon = await getTranslations('common');
  const tFooter = await getTranslations('footer');

  const socialLinks = [
    { url: siteConfig.social.instagram, label: 'Instagram', Icon: IconInstagram },
    { url: siteConfig.social.linkedin, label: 'LinkedIn', Icon: IconLinkedin },
  ].filter((s) => s.url);

  return (
    <footer className="on-black bg-black text-white py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.brand.logo.light}
              alt={tCommon('siteName')}
              className="mb-4 h-auto w-44 md:w-52"
            />
            <p className="font-sans text-white text-sm leading-relaxed">
              {tFooter('tagline')}
            </p>
          </div>

          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-white mb-4">
              {tFooter('contactHeadline')}
            </p>
            <p className="mb-4">
              <span className="text-white text-xs uppercase tracking-wider block">
                {tFooter('emailLabel')}
              </span>
              <a
                href={`mailto:${tFooter('emailValue')}`}
                className="font-sans text-white hover:underline underline-offset-4"
              >
                {tFooter('emailValue')}
              </a>
            </p>
            <p>
              <span className="text-white text-xs uppercase tracking-wider block">
                {tFooter('phoneLabel')}
              </span>
              <a
                href={`tel:${tFooter('phoneValue')}`}
                className="font-sans text-white hover:underline underline-offset-4"
              >
                {tFooter('phoneValue')}
              </a>
            </p>
          </div>

          {socialLinks.length > 0 && (
            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-white mb-4">
                {tFooter('socialHeadline')}
              </p>
              <div className="flex gap-4">
                {socialLinks.map(({ url, label, Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white hover:underline underline-offset-4"
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white pt-8 text-center">
          <p className="font-sans text-xs text-white">{tFooter('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
