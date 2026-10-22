import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import type { ImageSlot } from '@/content/images';
import styles from './MediaFrame.module.css';

export type FrameTone = 'sand' | 'sand-alt' | 'teal' | 'navy';
export type FramePattern = 'rows' | 'columns' | 'grid' | 'fine-grid' | 'none';

interface MediaFrameProps {
  image: ImageSlot;
  /** CSS aspect-ratio, e.g. "16/10". Omit when the parent sizes the frame. */
  aspect?: string;
  /** Tonal wash shown until the approved image is supplied. */
  tone?: FrameTone;
  /** Architectural line pattern over the placeholder. */
  pattern?: FramePattern;
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  /** Load eagerly (above-the-fold images only). */
  priority?: boolean;
  /** Where the placeholder caption sits, so it avoids overlaid text or badges. */
  captionPosition?: 'bottom-left' | 'center' | 'top-right';
  className?: string;
  style?: CSSProperties;
  /** Show viewfinder corner marks over a real image; they slide inward as the image reveals (About portrait). */
  marks?: boolean;
  children?: ReactNode;
}

/**
 * The single image component for the site. Renders the approved image via
 * next/image when `image.src` is set (cropped with object-fit: cover at
 * `image.position`); otherwise a placeholder at the same fixed proportions, so
 * swapping in real photography never changes the layout.
 */
export function MediaFrame({
  image,
  aspect,
  tone = 'sand',
  pattern = 'rows',
  sizes = '(min-width: 1360px) 680px, (min-width: 768px) 50vw, 100vw',
  priority = false,
  captionPosition = 'bottom-left',
  className = '',
  style,
  marks = false,
  children,
}: MediaFrameProps) {
  const withMarks = marks && Boolean(image.src);
  const frameStyle: CSSProperties = { ...(aspect ? { aspectRatio: aspect } : null), ...style };

  return (
    <div className={`${styles.frame} ${styles[tone]} ${withMarks ? styles.withMarks : ''} ${className}`} style={frameStyle}>
      {image.src && image.fit === 'contain' ? (
        // Drawings: shown whole on an ivory mat, never cropped.
        <div className={styles.mat}>
          <div className={styles.matInner}>
            <Image
              src={image.src}
              alt={image.alt ?? ''}
              fill
              sizes={sizes}
              priority={priority}
              quality={image.quality}
              className={styles.image}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      ) : image.src ? (
        <Image
          src={image.src}
          alt={image.alt ?? ''}
          fill
          sizes={sizes}
          priority={priority}
          quality={image.quality}
          className={styles.image}
          style={{ objectPosition: image.position }}
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={`Image placeholder: ${image.label}`} data-placeholder="">
          <div className={styles.light} aria-hidden="true" />
          {pattern !== 'none' && <div className={`${styles.pattern} ${styles[pattern]}`} aria-hidden="true" />}
          <div className={styles.cropMarks} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className={`${styles.caption} ${styles[captionPosition]}`} aria-hidden="true">
            <span className={styles.captionTag}>Image placeholder</span>
            <span>[{image.label}]</span>
          </span>
        </div>
      )}
      {withMarks && (
        <div className={`${styles.cropMarks} ${styles.marksIn}`} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      {children}
    </div>
  );
}
