'use client';

import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

type PortfolioProject = {
  id: number;
  src: string;
  fullSrc: string;
  label: string;
  alt: string;
};

type PortfolioLightboxProps = {
  projects: PortfolioProject[];
  labels: {
    close: string;
    next: string;
    previous: string;
    open: string;
  };
};

export function PortfolioLightbox({ projects, labels }: PortfolioLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const activeProject = activeIndex === null ? null : projects[activeIndex];
  const displayIndex = activeIndex ?? 0;
  const isOpen = activeIndex !== null;

  const close = () => {
    setActiveIndex(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + projects.length) % projects.length
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % projects.length
    );
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
      return;
    }

    if (event.key !== 'Tab' || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute('disabled'));

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            onClick={(event) => {
              openerRef.current = event.currentTarget;
              setActiveIndex(index);
            }}
            className="group relative aspect-[4/3] overflow-hidden border border-black bg-white text-left"
            aria-label={`${labels.open} ${project.label}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.src}
              alt={project.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 border-t border-black bg-white px-3 py-2">
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-black">
                {project.label}
              </span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center bg-black px-4 text-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white">
                {labels.open} {project.label}
              </span>
            </span>
          </button>
        ))}
      </div>

      {activeProject && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.label}
          onKeyDown={handleDialogKeyDown}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black text-white"
        >
          <p
            aria-live="polite"
            className="absolute left-4 top-4 font-sans text-xs font-semibold tracking-[0.18em] text-white md:left-8 md:top-8"
          >
            {(displayIndex + 1).toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="absolute right-4 top-4 border border-white px-3 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black md:right-8 md:top-8"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <line x1="3" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="1.25" />
              <line x1="15" y1="3" x2="3" y2="15" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
          <button
            type="button"
            onClick={showPrevious}
            aria-label={labels.previous}
            className="absolute left-4 top-1/2 z-10 border border-white px-3 py-2 font-sans text-lg font-semibold text-white transition-colors hover:bg-white hover:text-black md:left-8"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <polyline points="11 4 6 9 11 14" fill="none" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
          <div className="relative h-[82vh] w-[82vw]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeProject.fullSrc}
              alt={activeProject.alt}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
          <button
            type="button"
            onClick={showNext}
            aria-label={labels.next}
            className="absolute right-4 top-1/2 z-10 border border-white px-3 py-2 font-sans text-lg font-semibold text-white transition-colors hover:bg-white hover:text-black md:right-8"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <polyline points="7 4 12 9 7 14" fill="none" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
