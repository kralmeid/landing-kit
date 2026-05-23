import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { Trust } from '@/components/Trust';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Trust />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
