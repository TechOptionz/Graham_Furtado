import {
  PrincipleFinale,
  PrincipleImmersive,
  PrincipleProcess,
  PrincipleSplit,
  PrincipleWide,
} from '@/components/PrincipleSection';
import { ChapterIndex } from '@/components/ChapterIndex';
import { CTASection } from '@/components/CTASection';
import { StepList } from '@/components/StepList';
import { coordinationRoles, journeySteps, principles } from '@/content/approach';
import { images } from '@/content/images';
import { pageMetadata } from '@/lib/metadata';
import styles from './approach.module.css';

export const metadata = pageMetadata({
  title: 'Approach',
  path: '/approach',
  description:
    'A development philosophy built on finding the right site, quality design with experienced architects and designers, lasting workmanship, and responsibility from site identification to handing over the keys.',
});

export default function ApproachPage() {
  const [site, strategy, design, coordination, delivery, people] = principles;

  return (
    <>
      <section className={`bg-olive on-dark ${styles.hero}`} aria-labelledby="approach-title">
        <div className="container">
          <p className={`eyebrow ${styles.eyebrowGap}`}>Approach</p>
          <h1 id="approach-title" className={styles.heroTitle}>
            From the right site to the right outcome.
          </h1>
          <div className={styles.heroFoot}>
            <p className={styles.heroText}>
              A development philosophy built on finding the right site, quality design, experienced architects and
              designers, lasting workmanship, and responsibility for the complete development journey.
            </p>
            <span className={styles.heroTag}>Six principles · One journey</span>
          </div>
        </div>
      </section>

      {/* Overview first: the whole journey, then each principle in detail */}
      <section className="section bg-limestone" aria-labelledby="journey-title">
        <div className={`container ${styles.journey}`}>
          <div className={styles.journeyHead}>
            <p data-reveal className="eyebrow">
              Development journey
            </p>
            <h2 data-reveal id="journey-title" className={`h2 ${styles.journeyTitle}`}>
              From site identification to handing over the keys.
            </h2>
          </div>
          <StepList steps={journeySteps} variant="journey" label="Development journey, from opportunity to market" />
        </div>
      </section>

      {/*
        Sticky chapter rail (desktop) for the six principles. Note: the seven-stage journey above
        (Opportunity → Market) and these six chapters (Site → People) are separate lists in the
        source design with no defined mapping, so the rail indexes the chapters themselves.
      */}
      <ChapterIndex
        label="Approach chapters"
        chapters={principles.map((pr) => ({ id: `principle-${pr.number}`, number: pr.number, label: pr.label }))}
      />

      <PrincipleSplit principle={site} tone="sand" />
      <PrincipleSplit principle={strategy} tone="sand-alt" reversed />
      <PrincipleWide principle={design} />
      <PrincipleProcess principle={coordination} roles={coordinationRoles} />
      <PrincipleImmersive principle={delivery} />
      <PrincipleFinale
        principle={people}
        closing={
          <div className={styles.statement}>
            <h2 data-reveal className="eyebrow">
              Development philosophy
            </h2>
            <p data-reveal className={styles.statementText}>
              Quality, considered design and the experience of the people who{' '}
              <em className="serif-italic">ultimately live</em> in each project.
            </p>
          </div>
        }
      />

      <CTASection
        heading="Explore the developments shaped by this approach."
        body=""
        primary={{ href: '/developments', label: 'View Developments' }}
        image={images.ctaApproach}
      />
    </>
  );
}
