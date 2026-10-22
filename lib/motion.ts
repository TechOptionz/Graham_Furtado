/**
 * Shared motion helpers. Every scroll-linked effect on the site runs through a
 * single passive scroll/resize listener and one requestAnimationFrame per frame
 * (see `subscribe`), rather than each component attaching its own listener.
 */

type Tick = () => void;

const subscribers = new Set<Tick>();
let frame = 0;
let bound = false;

function run() {
  frame = 0;
  subscribers.forEach((tick) => tick());
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(run);
}

/** Run `tick` once per animation frame whenever the page scrolls or resizes. Returns an unsubscribe function. */
export function subscribe(tick: Tick): () => void {
  subscribers.add(tick);
  if (!bound) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    bound = true;
  }
  schedule();
  return () => {
    subscribers.delete(tick);
    if (!subscribers.size && bound) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      bound = false;
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** True for devices with a precise pointer that can hover (desktop mouse/trackpad). */
export function canHover(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
