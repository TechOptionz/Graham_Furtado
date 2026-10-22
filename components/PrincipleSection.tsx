import type { ReactNode } from 'react';
import type { Principle } from '@/content/approach';
import { MediaFrame, type FramePattern, type FrameTone } from './MediaFrame';
import { Parallax } from './Parallax';
import styles from './PrincipleSection.module.css';

/**
 * Six approach principles share one kicker/heading/body vocabulary but vary in
 * composition so the page reads as a sequence, not a repeated row:
 * split → split (reversed) → wide → process → immersive → finale.
 */

function Kicker({ principle, onDark = false }: { principle: Principle; onDark?: boolean }) {
  return (
    <p className={`${styles.kicker} ${onDark ? styles.kickerDark : ''}`}>
      <span className={`big-numeral ${styles.number}`} aria-hidden="true">
        {principle.number}
      </span>
      <span className={styles.label}>{principle.label}</span>
    </p>
  );
}

const headingId = (p: Principle) => `principle-${p.number}`;

/** 01 / 02 — image beside text, alternating sides. */
export function PrincipleSplit({
  principle,
  reversed = false,
  tone,
  pattern = 'none',
}: {
  principle: Principle;
  reversed?: boolean;
  tone: FrameTone;
  pattern?: FramePattern;
}) {
  return (
    <section aria-labelledby={headingId(principle)} className={styles.section}>
      <div className={`container ${styles.row} ${reversed ? styles.reversed : ''}`}>
        {/* Images wipe in from the side they sit on, reinforcing the zig-zag. */}
        <div data-reveal data-motion="image" data-from={reversed ? 'right' : 'left'} className={reversed ? styles.mediaNarrow : styles.mediaWide}>
          <MediaFrame
            image={principle.image}
            aspect={principle.aspect}
            tone={tone}
            pattern={pattern}
            /* Landscape sources in a 4:5 frame are drawn ~1.8× wider than the frame. */
            sizes={principle.aspect === '4/5' ? '(min-width: 900px) 60vw, 180vw' : '(min-width: 900px) 45vw, 100vw'}
          />
        </div>
        <div data-reveal className={styles.copy}>
          <Kicker principle={principle} />
          <h2 id={headingId(principle)} className={styles.heading}>
            {principle.heading}
          </h2>
          <p className="body muted">{principle.body}</p>
        </div>
      </div>
    </section>
  );
}

/** 03 — image-led: statement above a full-bleed panoramic image. */
export function PrincipleWide({ principle }: { principle: Principle }) {
  return (
    <section aria-labelledby={headingId(principle)} className={styles.section}>
      <div className={`container ${styles.wideHead}`}>
        <div data-reveal>
          <Kicker principle={principle} />
          <h2 id={headingId(principle)} className={styles.headingLarge}>
            {principle.heading}
          </h2>
        </div>
        <p data-reveal className={`body muted ${styles.wideBody}`}>
          {principle.body}
        </p>
      </div>
      {/* Cinematic moment: the render settles from 110% as it arrives, with a very slight inner parallax. */}
      <div data-reveal data-motion="image" data-settle="" className={styles.wideMedia}>
        <Parallax max={32}>
          <MediaFrame image={principle.image} tone="sand" pattern="none" sizes="100vw" style={{ height: '100%' }} />
        </Parallax>
      </div>
    </section>
  );
}

/** 04 — process: the coordinated disciplines listed beside a working image. */
export function PrincipleProcess({ principle, roles }: { principle: Principle; roles: string[] }) {
  return (
    <section aria-labelledby={headingId(principle)} className={`${styles.section} ${styles.process} bg-limestone`}>
      <div className={`container ${styles.processGrid}`}>
        <div data-reveal className={styles.processCopy}>
          <Kicker principle={principle} />
          <h2 id={headingId(principle)} className={styles.heading}>
            {principle.heading}
          </h2>
          <p className="body muted">{principle.body}</p>
          <ol className={styles.roles} aria-label="Specialists coordinated as one team">
            {roles.map((role, i) => (
              <li key={role}>
                <span className="numeral" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {role}
              </li>
            ))}
          </ol>
        </div>
        <div data-reveal data-motion="image" className={styles.processMedia}>
          <MediaFrame image={principle.image} aspect="4/5" tone="navy" pattern="none" sizes="(min-width: 900px) 42vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

/** 05 — immersive: full-bleed image with the principle set over it. */
export function PrincipleImmersive({ principle }: { principle: Principle }) {
  return (
    <section aria-labelledby={headingId(principle)} className={`on-dark ${styles.immersive}`}>
      <div className={styles.immersiveMedia} aria-hidden="true">
        <Parallax max={40}>
          <MediaFrame image={{ ...principle.image, alt: '' }} tone="navy" pattern="none" sizes="100vw" style={{ height: '100%' }} />
        </Parallax>
      </div>
      <div className={styles.immersiveShade} aria-hidden="true" />
      <div className={`container ${styles.immersiveContent}`}>
        <div data-reveal className={styles.immersiveCopy}>
          <Kicker principle={principle} onDark />
          <h2 id={headingId(principle)} className={styles.headingLarge}>
            {principle.heading}
          </h2>
          <p className={`body ${styles.immersiveBody}`}>{principle.body}</p>
        </div>
      </div>
    </section>
  );
}

/** 06 — typographic conclusion, closing on the image and philosophy statement. */
export function PrincipleFinale({ principle, closing }: { principle: Principle; closing: ReactNode }) {
  return (
    <section aria-labelledby={headingId(principle)} className={`${styles.section} ${styles.finale}`}>
      <div className="container">
        <div data-reveal className={styles.finaleHead}>
          <Kicker principle={principle} />
        </div>
        <h2 data-reveal id={headingId(principle)} className={styles.finaleHeading}>
          {principle.heading}
        </h2>
        <p data-reveal className={`lead muted ${styles.finaleBody}`}>
          {principle.body}
        </p>
        {/* Inner parallax only (the container-to-full-bleed widening is reserved for Developments). */}
        <div data-reveal data-motion="image" data-parallax-inner="" data-progress="view" className={styles.finaleMedia}>
          <MediaFrame image={principle.image} tone="sand" pattern="none" sizes="(min-width: 1360px) 1216px, 100vw" className={styles.finaleFrame} />
        </div>
        {closing}
      </div>
    </section>
  );
}
