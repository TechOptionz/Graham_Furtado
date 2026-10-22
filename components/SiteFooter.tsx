import Link from 'next/link';
import { navItems } from '@/content/navigation';
import { site } from '@/content/site';
import styles from './SiteFooter.module.css';

/**
 * Footer, top to bottom:
 *   A — role, navigation, contact
 *   B — full-width "Graham Furtado" wordmark on a fine rule
 *   C — location and copyright
 */
export function SiteFooter() {
  const { email, phone } = site.contact;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.rowA}>
          <p className={styles.descriptor}>{site.positioning.titles.join(' · ')}</p>
          <nav aria-label="Footer" className={styles.links}>
            {navItems
              .filter((item) => item.href !== '/')
              .map((item) => (
                <Link key={item.href} href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ))}
          </nav>
          <div className={styles.contact}>
            {/* Direct details appear only once confirmed (content/site.ts). */}
            {email && (
              <a href={`mailto:${email}`} className={styles.contactLink}>
                {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className={styles.contactLink}>
                {phone}
              </a>
            )}
            <Link href="/contact" className={`text-link ${styles.contactCta}`}>
              Start a conversation
            </Link>
          </div>
        </div>

        {/* Closing bookend to the Home opening: the rule draws, then each word rises out of it,
            tied to scroll so it lands exactly as the page ends (static under reduced motion). */}
        <div className={styles.wordmarkWrap} data-progress="end" data-progress-min="0">
          <span className={styles.wordmarkRule} aria-hidden="true" />
          <p className={styles.wordmark} aria-hidden="true">
            {site.name.split(' ').map((word, i) => (
              <span key={word} className={styles.wordmarkWord} style={{ ['--i' as string]: i }}>
                <span>{word}</span>
              </span>
            ))}
          </p>
        </div>

        <div className={styles.rowC}>
          <span>{site.based}</span>
          <span>
            © {site.copyrightYear} {site.name} · {site.company}
          </span>
        </div>
      </div>
    </footer>
  );
}
