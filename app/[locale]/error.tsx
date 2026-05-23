'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = useTranslations('common');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-sans font-semibold text-4xl text-black mb-4">{t('errorTitle')}</h1>
        <p className="font-sans text-black mb-8">{t('errorBody')}</p>
        <button
          onClick={reset}
          className="bg-black text-white border border-black font-sans font-semibold px-8 py-3 hover:bg-white hover:text-black transition-colors"
        >
          {t('errorRetry')}
        </button>
      </div>
    </div>
  );
}
