import { getTranslations } from 'next-intl/server';

const columns = ['oversight', 'relationship', 'references'] as const;

export async function Trust() {
  const t = await getTranslations('trust');

  return (
    <section className="on-black bg-black py-16 text-white md:py-20">
      <div className="container">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-white mb-4">{t('sectionEyebrow')}</p>
          <h2 className="font-sans text-4xl md:text-5xl font-semibold tracking-[-0.015em] text-white">{t('sectionHeadline')}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          {columns.map((key) => (
            <div key={key}>
              <p className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-white mb-3">
                {t(`${key}Label`)}
              </p>
              <p className="font-sans text-2xl font-semibold text-white">{t(`${key}Value`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
