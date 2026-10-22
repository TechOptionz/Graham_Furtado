'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { ImageSlot } from '@/content/images';
import type { Service } from '@/content/services';
import { MediaFrame } from './MediaFrame';
import styles from './ExpertiseIndex.module.css';

interface ExpertiseGroupProps {
  /** e.g. "01 — 04" */
  range: string;
  title: string;
  headingId: string;
  services: Service[];
  /** One real project image per service, in the same order. */
  images: ImageSlot[];
  /** Number of the first service in this group. */
  start: number;
}

/**
 * An editorial index of services: numeral, title, copy on a 12-column rhythm.
 * On wide screens a sticky 4:5 panel crossfades to the project image of the
 * row nearest the middle of the viewport (or the row being hovered/focused).
 * Below 1100px the panel is replaced by one 16:9 image heading the group.
 */
export function ExpertiseGroup({ range, title, headingId, services, images, start }: ExpertiseGroupProps) {
  const [active, setActive] = useState(0);
  // The previous image stays underneath while the new one wipes up over it.
  const [previous, setPrevious] = useState<number | null>(null);
  const activate = (i: number) =>
    setActive((current) => {
      if (current !== i) setPrevious(current);
      return i;
    });
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activate(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    rowRefs.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.group}>
      <header className={styles.chapter}>
        <p data-reveal className={styles.range}>
          {range}
        </p>
        <h2 data-reveal id={headingId} className={styles.chapterTitle}>
          {title}
        </h2>
      </header>

      <div data-reveal data-motion="image" className={styles.groupImage}>
        <MediaFrame image={images[0]} aspect="16/9" tone="sand" pattern="none" sizes="100vw" />
      </div>

      <div className={styles.layout}>
        <ol className={styles.list} start={start}>
          {services.map((service, i) => {
            const number = String(start + i).padStart(2, '0');
            const content = (
              <>
                <span className={styles.numeral} aria-hidden="true">
                  {number}
                </span>
                <h3 className={styles.title}>{service.title}</h3>
                <span className={styles.copy}>
                  <span className={styles.text}>{service.description}</span>
                  {service.note && <span className={styles.note}>{service.note}</span>}
                </span>
                {service.href && (
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                )}
              </>
            );
            return (
              <li
                key={service.title}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                data-index={i}
                data-reveal
                data-motion="custom"
                data-active={active === i ? '' : undefined}
                className={styles.row}
                onPointerEnter={() => activate(i)}
                onFocus={() => activate(i)}
              >
                {service.href ? (
                  <Link href={service.href} className={styles.rowInner}>
                    {content}
                  </Link>
                ) : (
                  <div className={styles.rowInner}>{content}</div>
                )}
              </li>
            );
          })}
        </ol>

        <div className={styles.panel} aria-hidden="true">
          <div className={styles.panelFrame}>
            {images.map((image, i) => (
              <div
                key={`${image.src}-${i}`}
                className={styles.panelImage}
                data-active={active === i ? '' : undefined}
                data-previous={previous === i && active !== i ? '' : undefined}
              >
                <MediaFrame image={{ ...image, alt: '' }} aspect="4/5" tone="sand" pattern="none" sizes="(min-width: 1100px) 45vw, 1px" />
              </div>
            ))}
          </div>
          <p key={active} className={styles.panelCaption}>
            {images[active]?.label}
          </p>
        </div>
      </div>
    </div>
  );
}
