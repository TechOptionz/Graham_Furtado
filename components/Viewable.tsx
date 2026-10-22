'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import type { ImageSlot } from '@/content/images';
import styles from './DrawingGallery.module.css';

interface ViewableProps {
  image: ImageSlot;
  caption: string;
  className?: string;
  children: ReactNode;
}

/**
 * Makes a project image openable at full size in a native <dialog> lightbox.
 * Carries data-cursor="view" so the desktop "View" cursor label appears over it
 * (components/ViewCursor.tsx) — the label only ever promises a real action.
 */
export function Viewable({ image, caption, className = '', children }: ViewableProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  if (!image.src) return <div className={className}>{children}</div>;

  return (
    <>
      <button
        type="button"
        className={`${styles.viewable} ${className}`}
        data-cursor="view"
        aria-haspopup="dialog"
        aria-label={`View image: ${caption}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        {children}
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={`${caption} (full size)`}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <figure className={styles.figure}>
          <div className={styles.full}>
            <Image src={image.src} alt={image.alt ?? ''} fill sizes="94vw" quality={image.quality} style={{ objectFit: 'contain' }} />
          </div>
          <figcaption className={styles.fullCaption}>{caption}</figcaption>
        </figure>
        <form method="dialog">
          <button type="submit" className={styles.close} aria-label="Close image">
            <span aria-hidden="true">×</span>
          </button>
        </form>
      </dialog>
    </>
  );
}
