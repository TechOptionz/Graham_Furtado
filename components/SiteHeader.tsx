'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { headerCta, headerToneFor, navItems } from '@/content/navigation';
import { site } from '@/content/site';
import styles from './SiteHeader.module.css';

const COMPACT_AFTER = 80;
const DESKTOP_MIN = 1060;
/** Hide on scroll down only after this depth, and ignore jitter below this delta. */
const HIDE_AFTER = 240;
const SCROLL_DELTA = 6;

export function SiteHeader() {
  const pathname = usePathname();
  const tone = headerToneFor(pathname);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Solid after 80px; hides while scrolling down, returns on any scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > COMPACT_AFTER);
      if (Math.abs(y - lastY) < SCROLL_DELTA) return;
      setHidden(y > lastY && y > HIDE_AFTER);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Publish header state so sticky page indexes can sit below it (html[data-header], --header-h).
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.header = hidden && !menuOpen ? 'hidden' : 'shown';
    const measure = window.setTimeout(() => {
      if (headerRef.current) root.style.setProperty('--header-h', `${headerRef.current.offsetHeight}px`);
    }, 460);
    return () => window.clearTimeout(measure);
  }, [hidden, compact, menuOpen]);

  // Keyboard users tabbing into the header should always see it.
  const reveal = useCallback(() => setHidden(false), []);

  // Navigating always closes the menu.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    openButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab' || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN) setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen, closeMenu]);

  const ink = compact || tone === 'dark';
  const headerClass = [
    styles.header,
    compact ? styles.compact : '',
    ink ? styles.ink : styles.ivory,
    hidden && !menuOpen ? styles.hidden : '',
  ].join(' ');
  // The contact page is the destination of the CTA, so it isn't repeated there.
  const showCta = pathname !== headerCta.href;

  return (
    <>
      <header ref={headerRef} className={headerClass} onFocus={reveal}>
        <nav aria-label="Primary" className={`container ${styles.nav}`}>
          {/* data-intro-part: the Home opening brings these in last — wordmark, links, then CTA. */}
          <Link
            href="/"
            className={styles.brand}
            aria-current={pathname === '/' ? 'page' : undefined}
            data-intro-part=""
            style={{ ['--i' as string]: 0 }}
          >
            {site.name}
          </Link>

          <div className={styles.desktopLinks}>
            {navItems
              .filter((item) => item.href !== '/')
              .map((item, i) => {
                const current = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.link}
                    aria-current={current ? 'page' : undefined}
                    data-intro-part=""
                    style={{ ['--i' as string]: i + 1 }}
                  >
                    {item.label}
                    {/* The active underline is a real element so it can travel between pages (view transitions). */}
                    {current && <span className={styles.activeLine} aria-hidden="true" />}
                  </Link>
                );
              })}
            {showCta && (
              <Link href={headerCta.href} className={styles.cta} data-intro-part="" style={{ ['--i' as string]: 7 }}>
                {headerCta.label}
              </Link>
            )}
          </div>

          <button
            ref={openButtonRef}
            type="button"
            data-intro-part=""
            style={{ ['--i' as string]: 2 }}
            className={styles.menuButton}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}
        inert={!menuOpen}
      >
        <div className={styles.menuTop}>
          <span className={styles.brand}>{site.name}</span>
          <button ref={closeButtonRef} type="button" className={styles.closeButton} aria-label="Close menu" onClick={closeMenu}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ul className={styles.menuLinks}>
          {navItems.map((item, i) => (
            <li key={item.href} style={{ ['--i' as string]: i }}>
              <Link
                href={item.href}
                className={styles.menuLink}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {/* Each line rises inside its own mask; the bronze numeral leads it. */}
                <span className={styles.menuMask}>
                  <span className={styles.menuRise}>
                    <span className={styles.menuNum} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={headerCta.href} className={`btn btn--primary ${styles.menuCta}`} onClick={() => setMenuOpen(false)}>
          {headerCta.label}
        </Link>
      </div>
    </>
  );
}
