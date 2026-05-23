import { getTranslations } from 'next-intl/server';
import { HeroContent } from '@/components/HeroContent';
import { siteConfig } from '@/site.config';

export async function Hero() {
  const t = await getTranslations('hero');
  const tCommon = await getTranslations('common');

  return (
    <section
      id="top"
      className="on-black bg-black text-white border-b border-black"
    >
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1320px] lg:grid-cols-[1.08fr_minmax(0,1fr)]">
        <div className="flex min-h-[560px] flex-col justify-between border-white px-6 py-12 md:px-10 md:py-16 lg:border-r lg:px-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.brand.logo.light}
            alt={tCommon('siteName')}
            className="h-auto w-64 md:w-80"
          />
          <HeroContent
            eyebrow={t('eyebrow')}
            headline={t('headline')}
            subhead={t('subhead')}
            cta={t('cta')}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.55em] text-white">
            {t('supportLabel')}
          </p>
        </div>
        <div className="relative min-h-[320px] overflow-hidden bg-black lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.hero.image}
            alt={t('imageAlt')}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
