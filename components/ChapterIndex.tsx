'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './ChapterIndex.module.css';

export interface Chapter {
  /** id of the element the chapter links to (its section, or a heading inside it). */
  id: string;
  number: string;
  label: string;
}

interface ChapterIndexProps {
  chapters: Chapter[];
  label: string;
  /** Show a thin bronze line tracking progress through the whole page. */
  progress?: boolean;
}

/**
 * Sticky chapter index for long pages (desktop). The active chapter is the one
 * crossing the middle of the viewport; a bronze indicator travels between items
 * as it changes, and an optional hairline shows progress through the page.
 * Hidden on smaller screens, where the page's own static index is used.
 */
export function ChapterIndex({ chapters, label, progress = false }: ChapterIndexProps) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Track which chapter is crossing the middle of the viewport.
  useEffect(() => {
    const targets: { id: string; el: Element }[] = [];
    for (const c of chapters) {
      const el = document.getElementById(c.id);
      if (el) targets.push({ id: c.id, el: el.closest('section') ?? el });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = targets.find((t) => t.el === entry.target);
            if (match) setActive(match.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    targets.forEach((t) => observer.observe(t.el));
    return () => observer.disconnect();
  }, [chapters]);

  // Move the indicator under the active item.
  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;
    const link = active ? list.querySelector<HTMLElement>(`[data-chapter="${active}"]`) : null;
    if (!link) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '1';
    indicator.style.transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth})`;
  }, [active]);

  return (
    <nav className={styles.index} aria-label={label} data-progress={progress ? 'page' : undefined} data-progress-min="1024">
      <div className={`container ${styles.inner}`}>
        <ol ref={listRef} className={styles.list}>
          {chapters.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                data-chapter={c.id}
                className={styles.link}
                aria-current={active === c.id ? 'location' : undefined}
              >
                <span className={styles.number}>{c.number}</span>
                {c.label}
              </a>
            </li>
          ))}
          <span ref={indicatorRef} className={styles.indicator} aria-hidden="true" />
        </ol>
      </div>
      {progress && <span className={styles.progress} aria-hidden="true" />}
    </nav>
  );
}
