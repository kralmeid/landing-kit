import { getTranslations } from 'next-intl/server';
import { PortfolioLightbox } from '@/components/PortfolioLightbox';
import { siteConfig } from '@/site.config';

export async function Portfolio() {
  if (!siteConfig.sections.portfolio.enabled) {
    return null;
  }

  const t = await getTranslations('portfolio');
  const projects = siteConfig.sections.portfolio.images.map((image, index) => {
    const id = index + 1;
    return {
      id,
      src: image.src,
      fullSrc: image.src,
      label: t(`projects.${id}.label`),
      alt: image.alt || t(`projects.${id}.alt`),
    };
  });

  const labels = {
    close: t('lightbox.close'),
    next: t('lightbox.next'),
    previous: t('lightbox.previous'),
    open: t('lightbox.open'),
  };

  return (
    <section id="portfolio" className="bg-white py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-black mb-4">
            {t('sectionEyebrow')}
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-semibold tracking-[-0.015em] text-black mb-6">
            {t('sectionHeadline')}
          </h2>
          <p className="font-sans text-lg text-black leading-relaxed">
            {t('intro')}
          </p>
        </div>
        <PortfolioLightbox projects={projects} labels={labels} />
      </div>
    </section>
  );
}
