import { getTranslations } from 'next-intl/server';
import {
  IconConsultation,
  IconCustomHome,
  IconRemodel,
} from '@/components/icons';
import { ServiceCard } from './ServiceCard';

const items = [
  { key: 'custom', icon: IconCustomHome },
  { key: 'remodel', icon: IconRemodel },
  { key: 'consult', icon: IconConsultation },
] as const;

export async function Services() {
  const t = await getTranslations('services');

  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-black mb-4">
            {t('sectionEyebrow')}
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-semibold tracking-[-0.015em] text-black mb-16">
            {t('sectionHeadline')}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {items.map(({ key, icon }) => (
            <ServiceCard
              key={key}
              icon={icon}
              title={t(`${key}.title`)}
              body={t(`${key}.body`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
