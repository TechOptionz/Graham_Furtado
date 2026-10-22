'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Stagger between related elements revealing together (--stagger), capped so a group never lags. */
const STAGGER_MS = 70;
const MAX_DELAY_MS = 400;

/**
 * Editorial scroll reveals for `[data-reveal]` elements. The visual treatment
 * (heading rise, body fade, image clip) lives in globals.css; this component
 * only decides *when*.
 *
 * Content must never look missing: a reveal starts as soon as any part of an
 * element crosses a line 8% above the bottom of the viewport, anything already
 * in view on mount is left visible, and elements entering together reveal as
 * one short staggered group. Visitors without JavaScript and reduced-motion
 * users see everything immediately.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const fold = window.innerHeight * 0.92;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
      (el) => el.dataset.reveal !== 'shown' && el.getBoundingClientRect().top > fold,
    );
    targets.forEach((el) => (el.dataset.reveal = 'pending'));

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          );
        entering.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          // data-delay adds a fixed offset within a group (e.g. a card following its image by 150ms).
          const delay = Math.min(i * STAGGER_MS, MAX_DELAY_MS) + Number(el.dataset.delay || 0);
          el.style.setProperty('--reveal-delay', `${delay}ms`);
          el.dataset.reveal = 'shown';
          observer.unobserve(el);
          // Drop the stagger once revealed so later hover transitions respond instantly.
          window.setTimeout(() => el.style.removeProperty('--reveal-delay'), delay + 1200);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
