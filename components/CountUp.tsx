'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  /** Animation length in ms — short, so it reads as a settle rather than a show. */
  duration?: number;
  /** Fraction of the number that must be visible before counting starts. */
  threshold?: number;
  /** Value the count starts from (e.g. 25 for the 25 → 113 scale transition). */
  from?: number;
  /** Wait this long after triggering before counting (to sit inside a larger sequence). */
  delay?: number;
  className?: string;
}

/**
 * Counts a genuine statistic up from zero as it comes into view.
 *
 * - The final value is server-rendered, so without JavaScript (or before it
 *   loads) the real number is always shown.
 * - While waiting to count, the digits are held invisible rather than showing a
 *   premature "0"; counting and fade-in start together at ~40% visibility.
 * - Numbers already on screen at load, and reduced-motion users, simply show
 *   the final value. Assistive technology always reads the final value.
 */
export function CountUp({ value, duration = 1100, threshold = 0.4, from = 0, delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already in view at load

    let frame = 0;
    let timer = 0;
    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < threshold) return;
        observer.disconnect();
        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            setDisplay(Math.round(from + (value - from) * (1 - Math.pow(1 - t, 3))));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          setDisplay(from);
          setArmed(false);
          frame = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: [0, threshold, 1] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [value, duration, threshold, from, delay]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      <span
        aria-hidden="true"
        style={{ opacity: armed ? 0 : 1, transition: 'opacity var(--dur-med, 600ms) var(--ease-expo, ease-out)' }}
      >
        {display}
      </span>
      <span className="visually-hidden">{value}</span>
    </span>
  );
}
