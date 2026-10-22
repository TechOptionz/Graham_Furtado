'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion, subscribe } from '@/lib/motion';

interface ParallaxProps {
  /** Maximum drift in px either side of rest. Keep it subtle (≤ 40; the hero uses 60). */
  max?: number;
  /** Viewport width below which the effect is disabled. */
  minWidth?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Absolutely-positioned media layer that drifts up to `max` px as its section
 * crosses the viewport, so the image moves slightly slower than the page
 * (≈0.85× scroll speed for photo bands). Over-sized by `max` top and bottom so
 * edges never show. Only for hero, full-width image moments and CTA imagery.
 * Runs on the shared scroll scheduler; disabled on small screens and for
 * reduced motion.
 */
export function Parallax({ max = 36, minWidth = 768, className = '', children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host || prefersReducedMotion()) return;

    const tick = () => {
      if (window.innerWidth < minWidth) {
        el.style.transform = '';
        return;
      }
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // -1 when the section enters at the bottom, +1 as it leaves at the top.
      const progress = Math.max(-1, Math.min(1, (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2)));
      el.style.transform = `translate3d(0, ${(progress * max).toFixed(1)}px, 0)`;
    };
    return subscribe(tick);
  }, [max, minWidth]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'absolute', left: 0, right: 0, top: -max, bottom: -max, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
