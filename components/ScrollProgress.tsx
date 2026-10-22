'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { clamp01, prefersReducedMotion, subscribe } from '@/lib/motion';

/**
 * Scroll-linked motion runtime. Any element with `data-progress="<mode>"` gets a
 * `--p` custom property (0 → 1) updated once per frame; its CSS turns that into
 * transforms (parallax, draws, widening, focus). CSS always provides a sensible
 * fallback (`var(--p, …)`) so nothing depends on this running.
 *
 * Modes (relative to the element's box and the viewport):
 *   view    0 when its top meets the viewport bottom → 1 when its bottom leaves the top (full pass)
 *   enter   0 when its top meets the viewport bottom → 1 when its top reaches 35% down (arrival)
 *   exit    0 while its top is at the viewport top → 1 when its bottom leaves the top
 *   center  1 when its centre is at the viewport centre, falling to 0 ~40% of a viewport away (focus)
 *   through 0 when its top crosses a reading line at 60% → 1 when its bottom does
 *   page    whole-document scroll progress
 *   end     0 when it enters → 1 exactly when the page can scroll no further
 *
 * `data-progress-min` (default 768) disables the effect below that viewport width
 * (the CSS fallback applies). Reduced-motion users always get the fallback.
 */
export function ScrollProgress() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]'));
    if (!els.length) return;

    const reset = (el: HTMLElement) => el.style.removeProperty('--p');
    if (prefersReducedMotion()) {
      els.forEach(reset);
      return;
    }

    // Only compute elements near the viewport.
    const near = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? near.add(e.target as HTMLElement) : near.delete(e.target as HTMLElement))),
      { rootMargin: '50% 0px 50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    const last = new WeakMap<HTMLElement, string>();

    const tick = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const doc = document.documentElement;
      for (const el of els) {
        const min = Number(el.dataset.progressMin ?? 768);
        if (vw < min) {
          if (last.get(el) !== '') {
            reset(el);
            last.set(el, '');
          }
          continue;
        }
        const mode = el.dataset.progress || 'view';
        if (mode !== 'page' && !near.has(el)) continue;
        const r = el.getBoundingClientRect();
        let p: number;
        switch (mode) {
          case 'enter':
            p = (vh - r.top) / (vh * 0.65);
            break;
          case 'exit':
            p = -r.top / Math.max(1, r.height);
            break;
          case 'center':
            p = 1 - Math.abs(r.top + r.height / 2 - vh / 2) / (vh * 0.4);
            break;
          case 'through':
            p = (vh * 0.6 - r.top) / Math.max(1, r.height);
            break;
          case 'page':
            p = window.scrollY / Math.max(1, doc.scrollHeight - vh);
            break;
          case 'end': {
            const entered = vh - r.top;
            const remaining = Math.max(0, doc.scrollHeight - (window.scrollY + vh));
            p = entered <= 0 ? 0 : entered / (entered + remaining);
            break;
          }
          default:
            p = (vh - r.top) / (vh + r.height);
        }
        const value = clamp01(p).toFixed(4);
        if (last.get(el) !== value) {
          el.style.setProperty('--p', value);
          last.set(el, value);
        }
      }
    };

    const unsubscribe = subscribe(tick);
    return () => {
      unsubscribe();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
