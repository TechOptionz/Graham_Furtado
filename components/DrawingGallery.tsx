'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { ImageSlot } from '@/content/images';
import { MediaFrame } from './MediaFrame';
import styles from './DrawingGallery.module.css';

interface Drawing {
  image: ImageSlot;
  caption: string;
}

/**
 * Planning drawings shown whole on ivory mats. Each opens in a native <dialog>
 * lightbox at full source resolution — drawings are meant to be inspected.
 * Escape, the close button or a click on the backdrop closes it.
 */
export function DrawingGallery({ drawings, viewLabel = 'View drawing' }: { drawings: Drawing[]; viewLabel?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Drawing | null>(null);

  const open = (drawing: Drawing) => {
    setActive(drawing);
    dialogRef.current?.showModal();
  };

  return (
    <>
      {/* Drawings stagger in one after another (the reveal observer's 70ms group stagger). */}
      <ul className={styles.grid}>
        {drawings.map((drawing) => (
          <li key={drawing.caption} data-reveal data-motion="image" data-from="below">
            <button type="button" className={styles.thumb} onClick={() => open(drawing)} aria-haspopup="dialog" data-cursor="view">
              <MediaFrame image={drawing.image} aspect="4/3" tone="sand" pattern="none" sizes="(min-width: 900px) 30vw, 100vw" />
              <span className={styles.caption}>
                {drawing.caption}
                <span className={styles.view} aria-hidden="true">
                  {viewLabel} →
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={active ? `${active.caption} (full size)` : 'Image'}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        {active?.image.src && (
          <figure className={styles.figure}>
            <div className={styles.full}>
              {/* Full source resolution for inspection. */}
              <Image src={active.image.src} alt={active.image.alt ?? ''} fill unoptimized sizes="100vw" style={{ objectFit: 'contain' }} />
            </div>
            <figcaption className={styles.fullCaption}>{active.caption}</figcaption>
          </figure>
        )}
        <form method="dialog">
          <button type="submit" className={styles.close} aria-label="Close drawing">
            <span aria-hidden="true">×</span>
          </button>
        </form>
      </dialog>
    </>
  );
}
