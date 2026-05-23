import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/site.config';

export async function About() {
  const t = await getTranslations('about');

  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-[4/5] bg-white overflow-hidden border border-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.about.portrait}
              alt={t('portraitAlt')}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-black mb-4">
              {t('sectionEyebrow')}
            </p>
            <h2 className="font-sans text-4xl md:text-5xl font-semibold tracking-[-0.015em] text-black mb-6">
              {t('sectionHeadline')}
            </h2>
            <p className="font-sans text-lg text-black leading-relaxed mb-8">
              {t('story')}
            </p>
            <div className="space-y-3 border-l border-black pl-6">
              <p className="font-sans text-sm font-medium text-black">{t('oversightLine')}</p>
              <p className="font-sans text-sm font-medium text-black">{t('relationshipLine')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
