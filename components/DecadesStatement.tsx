import Link from 'next/link';
import { milestones } from '@/content/milestones';
import { Lines } from './Lines';
import styles from './DecadesStatement.module.css';

interface DecadesStatementProps {
  id: string;
  /** `compact` (Home): numeral, statement and a link. `full` (About): adds the milestone timeline. */
  variant?: 'compact' | 'full';
}

/** Vertical architectural grid lines that draw downward, staggered, as the band arrives. */
const GRID_LINES = 12;

/**
 * The "three decades" statement, quantified. The research describes Graham as
 * having "around 30 years" of experience, so the numeral carries "circa" and
 * the statement keeps "around". Do not present it as an exact figure.
 *
 * Motion: grid lines draw down, the bronze tab draws in, "30" rises through a
 * mask (no 0 → 30 count), the statement lines follow. On About, the timeline
 * is tied to scroll: the line progresses and each milestone lights as it's reached.
 */
export function DecadesStatement({ id, variant = 'full' }: DecadesStatementProps) {
  return (
    <section className={`bg-olive on-dark ${styles.section}`} aria-labelledby={id}>
      <div data-reveal data-motion="custom" className={styles.grid} aria-hidden="true">
        {Array.from({ length: GRID_LINES }, (_, i) => (
          <span key={i} style={{ ['--i' as string]: i, left: `${((i + 0.5) / GRID_LINES) * 100}%` }} />
        ))}
      </div>

      <div className={`container ${styles.inner}`}>
        <span data-reveal data-motion="rule" className={styles.tab} aria-hidden="true" />
        <div className={styles.layout}>
          <div className={styles.figure}>
            <span data-reveal className={styles.circa}>
              circa
            </span>
            <span data-reveal data-motion="lines" className={styles.numeral}>
              <Lines lines={['30']} />
            </span>
            <span data-reveal className={styles.figureLabel}>
              Years in Queensland property
            </span>
          </div>
          <div className={styles.statementCol}>
            <h2 id={id} data-reveal data-motion="lines" className={styles.statement}>
              <Lines
                lines={[
                  <>
                    Around <em className={styles.accent}>three decades</em> in property —
                  </>,
                  'from Brisbane residential real estate',
                  'to Queensland development.',
                ]}
              />
            </h2>
            {variant === 'compact' && (
              <p data-reveal className={styles.link}>
                <Link href="/about" className="text-link">
                  About Graham
                </Link>
              </p>
            )}
          </div>
        </div>

        {variant === 'full' && (
          <ol
            className={styles.timeline}
            aria-label="Milestones"
            data-progress="through"
            data-progress-min="0"
            style={{ ['--n' as string]: milestones.length }}
          >
            {milestones.map((m, i) => (
              <li key={m.label} style={{ ['--i' as string]: i }}>
                <span className={styles.timelineLabel}>{m.label}</span>
                <span className={styles.timelineText}>{m.text}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
