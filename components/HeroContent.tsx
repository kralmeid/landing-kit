'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { IconArrowRight } from '@/components/icons';

type HeroContentProps = {
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: string;
};

const baseTransition = { duration: 0.6, ease: 'easeOut' as const };

export function HeroContent({
  eyebrow,
  headline,
  subhead,
  cta,
}: HeroContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="my-14 flex max-w-xl flex-col gap-6 md:my-20">
      <motion.p
        {...motionProps}
        transition={{ ...baseTransition, delay: 0 }}
        className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-white"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        {...motionProps}
        transition={{ ...baseTransition, delay: 0.15 }}
        className="font-sans text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-5xl lg:text-[3.25rem]"
      >
        {headline}
      </motion.h1>
      <motion.p
        {...motionProps}
        transition={{ ...baseTransition, delay: 0.3 }}
        className="font-sans text-base leading-relaxed text-white md:text-lg"
      >
        {subhead}
      </motion.p>
      <motion.div
        {...motionProps}
        transition={{ ...baseTransition, delay: 0.4 }}
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-3 border border-white bg-white px-7 py-4 font-sans text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
        >
          {cta} <IconArrowRight size={16} />
        </a>
      </motion.div>
    </div>
  );
}
