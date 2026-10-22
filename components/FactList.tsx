import type { ProjectFact } from '@/content/projects';
import styles from './FactList.module.css';

interface FactListProps {
  facts: ProjectFact[];
  /** Minimum column width before the grid wraps. */
  minColumn?: number;
  className?: string;
}

/** Definition-list grid of project facts. */
export function FactList({ facts, minColumn = 200, className = '' }: FactListProps) {
  return (
    <dl className={`${styles.list} ${className}`} style={{ ['--fact-min' as string]: `${minColumn}px` }}>
      {facts.map((fact) => (
        <div key={fact.label} className={styles.item}>
          <dt className={styles.term}>{fact.label}</dt>
          <dd className={styles.value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
