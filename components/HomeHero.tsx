import Link from 'next/link';
import type { ImageSlot } from '@/content/images';
import { site } from '@/content/site';
import { HeroIntro } from './HeroIntro';
import { MediaFrame } from './MediaFrame';
import { Parallax } from './Parallax';
import styles from './HomeHero.module.css';

interface HomeHeroProps {
  /** Background photograph (landscape). */
  image: ImageSlot;
  /**
   * Graham's approved portrait. When supplied (with a `src`), the hero switches
   * to the portrait-led layout: identity on navy at left, full-height 4:5
   * portrait at right, and the landscape image reduced to a faint backdrop.
   */
  portrait?: ImageSlot;
}

// Working positioning (awaiting Graham's confirmation) — edit in content/site.ts.
const roleParts = site.positioning.headline.split(' & ');
const nameParts = site.name.split(' ');

/**
 * Home hero. The final layout is always rendered; the "Horizon / Aperture"
 * opening (see HeroIntro and HomeHero.module.css) only masks and reveals it,
 * so nothing ever moves between layouts.
 *
 *   0ms       deep navy; a hairline horizon draws along the name's baseline
 *   250ms     "Graham" rises from the horizon; "Furtado" 150ms later
 *   1100ms    the navy parts from the horizon like an aperture; the photo settles 108% → 100%;
 *             the horizon travels down to become the location bar's rule
 *   1200ms+   bronze rule, role, introduction, actions
 *   1700ms+   header wordmark, navigation, CTA, scroll cue — finished ≈2.1s (≈1.6s on phones)
 *
 * Scrolling away (desktop): the photo scales to 104%, the shade deepens and the
 * name drifts at ~0.9× scroll speed.
 */
export function HomeHero({ image, portrait }: HomeHeroProps) {
  const withPortrait = Boolean(portrait?.src);

  return (
    <section
      className={`${styles.hero} ${withPortrait ? styles.withPortrait : ''}`}
      aria-labelledby="home-title"
      data-hero=""
      data-progress="exit"
      data-progress-min="900"
      suppressHydrationWarning /* the pre-paint script sets --horizon-y / --foot-dy before hydration */
    >
      <div className={styles.media} aria-hidden={withPortrait ? true : undefined}>
        <Parallax max={60} minWidth={900}>
          <MediaFrame
            image={withPortrait ? { ...image, alt: '' } : image}
            tone="navy"
            pattern="columns"
            priority
            sizes="100vw"
            captionPosition="top-right"
            className={styles.frame}
          />
        </Parallax>
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.exitShade} aria-hidden="true" />

      {/* Opening: two navy shutters that part from the horizon line. */}
      <div className={styles.cover} aria-hidden="true">
        <span className={styles.coverTop} />
        <span className={styles.coverBottom} />
      </div>
      <div className={styles.horizonWrap} aria-hidden="true">
        <div className="container">
          <span className={styles.horizon} />
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.identity}>
          <span className={styles.rule} aria-hidden="true" />
          <h1 id="home-title" className={styles.name} data-no-page-rise="">
            {nameParts.map((part, i) => (
              <span key={part}>
                {i > 0 && ' '}
                <span className={styles.nameLine} style={{ ['--i' as string]: i }}>
                  <span>{part}</span>
                  {i === nameParts.length - 1 && <span className={styles.baseline} data-baseline="" aria-hidden="true" />}
                </span>
              </span>
            ))}
          </h1>
          <p className={styles.role}>
            <span className={styles.roleInner}>
              {roleParts.map((part, i) => (
                <span key={part}>
                  {i > 0 && <em> &amp; </em>}
                  {part}
                </span>
              ))}
            </span>
          </p>
          <p className={styles.lead}>
            Building considered residential projects across Queensland, shaped by experience, market knowledge and a
            long-term approach to development.
          </p>
          <div className={`btn-row ${styles.actions}`}>
            <Link href="/developments" className="btn btn--primary">
              Explore Developments
            </Link>
            <Link href="/about" className="btn btn--outline-ivory">
              About Graham
            </Link>
          </div>
        </div>

        {withPortrait && portrait && (
          <figure className={styles.portrait}>
            <MediaFrame image={portrait} tone="navy" pattern="none" priority sizes="(min-width: 900px) 40vw, 100vw" className={styles.portraitFrame} />
          </figure>
        )}
      </div>

      <div className={`container ${styles.foot}`} data-hero-foot="">
        <span className={styles.footText}>{site.regions.join(' · ')}</span>
        <span className={`${styles.footEnd} ${styles.footText}`}>
          <span>{site.company}</span>
          <span className={styles.scrollCue} aria-hidden="true">
            Scroll
            <span className={styles.cueTrack}>
              <span />
            </span>
          </span>
        </span>
      </div>

      <HeroIntro />
    </section>
  );
}
