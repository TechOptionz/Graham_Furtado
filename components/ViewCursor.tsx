'use client';

import { useEffect, useRef } from 'react';
import { canHover, prefersReducedMotion } from '@/lib/motion';

/**
 * A small ivory "View" label that follows the pointer over openable project
 * images (elements with data-cursor="view"). Desktop pointers only
 * ((hover: hover) and (pointer: fine)); the native cursor is kept, so this is
 * an annotation rather than a replacement cursor.
 */
export function ViewCursor() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const label = ref.current;
    if (!label || !canHover()) return;
    const reduced = prefersReducedMotion();
    let x = 0;
    let y = 0;
    let frame = 0;
    let visible = false;

    const place = () => {
      frame = 0;
      label.style.transform = `translate3d(${x + 16}px, ${y + 16}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      const over = (e.target as Element | null)?.closest?.('[data-cursor="view"]');
      if (Boolean(over) !== visible) {
        visible = Boolean(over);
        label.dataset.visible = visible ? 'true' : 'false';
      }
      if (visible && !frame) frame = requestAnimationFrame(place);
    };
    const onLeave = () => {
      visible = false;
      label.dataset.visible = 'false';
    };

    label.dataset.reduced = reduced ? 'true' : 'false';
    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} className="view-cursor" aria-hidden="true" data-visible="false">
      View
    </span>
  );
}
