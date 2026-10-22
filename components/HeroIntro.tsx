'use client';

import { useLayoutEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

type Mode = 'full' | 'short' | 'none';

declare global {
  interface Window {
    __gfHeroMounted?: boolean;
  }
}

/** Total run time (ms) before the opening hands over to the settled page. */
const DURATION = { full: 2200, fullMobile: 1700, short: 800 };
/** Never wait longer than this for the display font before starting. */
const FONT_WAIT_MS = 500;

/*
 * Development StrictMode unmounts and immediately remounts effects. A remount
 * within the same tick is the same visit, so the pending "settle" from the
 * cleanup is cancelled and the chosen mode is reused rather than re-decided.
 */
let pendingSettle = 0;
let currentMode: Mode | null = null;

/**
 * Controller for the Home "Horizon / Aperture" opening. It never renders
 * anything and never blocks the page:
 *
 * - The mode comes from the pre-paint script in app/layout.tsx on first load
 *   (full the first time Home is seen this session, short afterwards, none for
 *   reduced motion). On client-side navigation back to Home it is decided here.
 * - Before paint it measures where the name's baseline and the location rule
 *   sit, so the horizon line starts under the name and lands on that rule.
 * - It starts once Instrument Serif is ready (at most ~500ms), then hands over
 *   to the settled page when the sequence ends.
 * - Any scroll, wheel, touch, click or key press skips straight to the final state.
 */
export function HeroIntro() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    if (!hero) return;

    const remount = pendingSettle !== 0;
    if (remount) {
      window.clearTimeout(pendingSettle);
      pendingSettle = 0;
    }
    // Already running? (Started by the pre-paint script, or by a previous mount.) Never restart a
    // running sequence — resetting the attribute would re-hide the name and replay it (a visible flash).
    const startedAt = html.dataset.intro?.endsWith('-go') ? Number(html.dataset.introStart || 0) : 0;
    let mode = (html.dataset.intro?.replace('-go', '') as Mode | undefined) ?? 'none';
    if (remount && currentMode) {
      mode = currentMode;
    } else if (window.__gfHeroMounted || html.dataset.introLoad !== '/') {
      // Client-side navigation to Home (the pre-paint script only decides for the page first loaded).
      mode = 'none';
      if (!prefersReducedMotion()) {
        try {
          mode = sessionStorage.getItem('gf-intro') ? 'short' : 'full';
          sessionStorage.setItem('gf-intro', '1');
        } catch {
          mode = 'none';
        }
      }
      html.dataset.intro = mode;
    }
    window.__gfHeroMounted = true;
    currentMode = mode;
    if (mode !== 'full' && mode !== 'short') return;

    // Where the horizon sits (the name's baseline) and where it lands (the location rule).
    const baseline = hero.querySelector<HTMLElement>('[data-baseline]');
    const foot = hero.querySelector<HTMLElement>('[data-hero-foot]');
    if (baseline && foot && !startedAt) {
      const heroTop = hero.getBoundingClientRect().top;
      const horizonY = baseline.getBoundingClientRect().top - heroTop + 8;
      const footY = foot.getBoundingClientRect().top - heroTop;
      hero.style.setProperty('--horizon-y', `${Math.round(horizonY)}px`);
      hero.style.setProperty('--foot-dy', `${Math.round(footY - horizonY)}px`);
    }

    let endTimer = 0;
    let cancelled = false;

    const finish = (state: 'done' | 'skipped') => {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(endTimer);
      html.dataset.intro = state;
      detach();
    };
    const skip = () => finish('skipped');
    // Programmatic scroll-to-top on navigation is ignored; a real scroll moves the page.
    const onScroll = () => {
      if (window.scrollY > 8) skip();
    };
    const events: (keyof WindowEventMap)[] = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    const detach = () => {
      events.forEach((e) => window.removeEventListener(e, skip));
      window.removeEventListener('scroll', onScroll);
    };
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    window.addEventListener('scroll', onScroll, { passive: true });

    const total = mode === 'short' ? DURATION.short : window.innerWidth < 768 ? DURATION.fullMobile : DURATION.full;
    const run = (elapsed: number) => {
      if (cancelled) return;
      if (html.dataset.intro !== `${mode}-go`) {
        html.dataset.intro = `${mode}-go`;
        html.dataset.introStart = String(performance.now());
      }
      endTimer = window.setTimeout(() => finish('done'), Math.max(0, total - elapsed));
    };
    if (startedAt) {
      // Resume the running sequence where it is.
      run(performance.now() - startedAt);
    } else {
      Promise.race([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        new Promise((resolve) => window.setTimeout(resolve, FONT_WAIT_MS)),
      ]).then(() => run(0));
    }

    return () => {
      // Leaving Home mid-sequence: settle (deferred one tick so a StrictMode remount can resume instead).
      detach();
      window.clearTimeout(endTimer);
      if (cancelled) return;
      cancelled = true;
      pendingSettle = window.setTimeout(() => {
        pendingSettle = 0;
        currentMode = null;
        html.dataset.intro = 'done';
      }, 0);
    };
  }, []);

  return null;
}
