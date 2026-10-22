import { CTASection } from '@/components/CTASection';
import { ExpertiseGroup } from '@/components/ExpertiseIndex';
import { MediaFrame } from '@/components/MediaFrame';
import { expertiseRowImages, images } from '@/content/images';
import { coreServices, servicesSubjectToConfirmation, specialistDisciplines } from '@/content/services';
import { pageMetadata } from '@/lib/metadata';
import styles from './expertise.module.css';

export const metadata = pageMetadata({
  title: 'Expertise',
  path: '/expertise',
  description:
    'Residential property development, development strategy, site identification, early-stage advisory, development management and consultant coordination, informed by long-term real-estate experience.',
});

export default function ExpertisePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="expertise-title">
        <div className="container">
          <p className={`eyebrow ${styles.eyebrowGap}`}>Expertise</p>
          <div className={styles.heroRow}>
            <h1 id="expertise-title" className={styles.heroTitle}>
              Development, from opportunity to delivery.
            </h1>
            <p className={styles.heroText}>
              The following areas reflect the work publicly associated with Graham and Furtado Property. They represent a
              positioning framework rather than confirmation that every area is offered as a standalone engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 1 — ivory */}
      <section className={`section section--flush-top ${styles.groupSection}`} aria-labelledby="group-1">
        <div className="container">
          <ExpertiseGroup
            range="01 — 04"
            title="Development & strategy"
            headingId="group-1"
            services={coreServices.slice(0, 4)}
            images={expertiseRowImages.slice(0, 4)}
            start={1}
          />
        </div>
      </section>

      {/* Editorial break — teal */}
      <section className="section bg-olive on-dark" aria-labelledby="specialists-title">
        <div className={`container ${styles.specialistsGrid}`}>
          <div className={styles.specialistsCopy}>
            <h2 data-reveal id="specialists-title" className={`eyebrow ${styles.specialistsEyebrow}`}>
              Working with specialists
            </h2>
            <p data-reveal className={styles.specialistsText}>
              {specialistDisciplines}
            </p>
          </div>
          <div className={styles.specialistsVisual} data-progress="view" data-progress-min="900">
            {/* The plan drawing sits crisp on an ivory mat (no tint); the render overlaps it. */}
            <div data-reveal data-motion="image" className={styles.specialistsWide}>
              <MediaFrame image={images.expertiseBreakWide} aspect="4/3" tone="sand" pattern="none" sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
            <div data-reveal data-motion="image" className={styles.specialistsInset}>
              <MediaFrame image={images.expertiseBreakDetail} aspect="4/5" tone="sand" pattern="none" sizes="360px" />
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2 — sand */}
      <section className={`section bg-limestone ${styles.groupSection}`} aria-labelledby="group-2">
        <div className="container">
          <ExpertiseGroup
            range="05 — 08"
            title="Delivery & advisory"
            headingId="group-2"
            services={coreServices.slice(4)}
            images={expertiseRowImages.slice(4)}
            start={5}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="potential-title">
        <div className={`container ${styles.potential}`}>
          <div data-reveal className={styles.potentialIntro}>
            <p className={`eyebrow ${styles.potentialEyebrow}`}>Subject to confirmation</p>
            <h2 id="potential-title" className={styles.potentialTitle}>
              Areas that may follow, once confirmed.
            </h2>
            <p className={styles.potentialText}>
              These areas are related to the development work but are not presented as confirmed or currently offered
              services.
            </p>
          </div>
          <ul data-reveal className={styles.potentialList}>
            {servicesSubjectToConfirmation.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        heading="Discuss a development."
        primary={{ href: '/contact', label: 'Start a Conversation' }}
        secondary={{ href: '/approach', label: 'The Approach' }}
        image={images.ctaExpertise}
      />
    </>
  );
}
