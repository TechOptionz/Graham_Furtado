import type { Step } from '@/content/approach';
import styles from './StepList.module.css';

interface StepListProps {
  steps: Step[];
  /**
   * `feature`: large numerals with supporting lines (Home philosophy).
   * `journey`: compact top-ruled sequence (Approach overview).
   */
  variant: 'feature' | 'journey';
  label: string;
}

/**
 * Ordered sequence of steps, e.g. Site → People.
 * Feature items arrive in order: the top rule draws, the numeral rises through
 * a mask, then the title and the description follow. (Not links, so no hover.)
 */
export function StepList({ steps, variant, label }: StepListProps) {
  const feature = variant === 'feature';
  return (
    <ol aria-label={label} className={`${styles.list} ${styles[variant]}`}>
      {steps.map((step) => (
        <li key={step.label} data-reveal data-motion={feature ? 'custom' : undefined} className={styles.item}>
          {feature ? (
            <span className={styles.markerMask} aria-hidden="true">
              <span className={`big-numeral ${styles.marker}`}>{step.marker}</span>
            </span>
          ) : (
            <span className={`numeral ${styles.marker}`} aria-hidden="true">
              {step.marker}
            </span>
          )}
          <span className={styles.text}>
            <span className={styles.label}>{step.label}</span>
            {step.description && <span className={styles.description}>{step.description}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
