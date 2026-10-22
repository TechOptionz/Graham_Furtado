import Link from 'next/link';
import { CTASection } from '@/components/CTASection';
import { DecadesStatement } from '@/components/DecadesStatement';
import { HomeHero } from '@/components/HomeHero';
import { Lines } from '@/components/Lines';
import { MediaFrame } from '@/components/MediaFrame';
import { MiraFeature, WestEndFeature } from '@/components/ProjectFeature';
import { StepList } from '@/components/StepList';
import { philosophySteps } from '@/content/approach';
import { images } from '@/content/images';
import { site } from '@/content/site';
import styles from './home.module.css';

export default function HomePage() {
  return (
    <>
      {/* Beginning — hero (switches to the portrait-led layout once images.portrait has a src) */}
      <HomeHero image={images.homeHero} portrait={images.portrait} />

      {/* Introduction — heading and copy set against a tall project image */}
      <section className={`section ${styles.intro}`} aria-labelledby="intro-title">
        <div className={`container ${styles.introGrid}`}>
          <p data-reveal className={`eyebrow ${styles.introEyebrow}`}>
            Introduction
          </p>
          <h2 id="intro-title" data-reveal data-motion="lines" className={`h2 ${styles.introTitle}`}>
            <Lines
              lines={[
                'Experience in property.',
                <>
                  <em className="serif-italic late">Perspective</em> in development.
                </>,
              ]}
            />
          </h2>
          <div className={styles.introCopy}>
            <span data-reveal data-motion="rule" className={styles.divider} aria-hidden="true" />
            <p data-reveal className={`lead ${styles.introLead}`}>
              Graham Furtado is a Queensland property developer and experienced real-estate professional with{' '}
              {site.experience.summary} of industry experience.
            </p>
            <p data-reveal className={`body muted ${styles.introBody}`}>
              Through Furtado Property, he guides residential projects from site opportunity and early development
              strategy through design, consultant coordination, construction and market delivery.
            </p>
            <p data-reveal>
              <Link href="/about" className="text-link">
                About Graham
              </Link>
            </p>
          </div>
          {/* Portrait-style reveal from below, then a gentle ±6% drift inside the frame while scrolling. */}
          <figure data-reveal data-motion="image" data-from="below" className={styles.introFigure}>
            <div data-parallax-inner="" data-progress="view" className={styles.introFrameWrap}>
              <MediaFrame image={images.homeIntro} tone="sand" pattern="none" sizes="(min-width: 860px) 40vw, 110vw" className={styles.introFrame} />
            </div>
            <figcaption className={styles.caption}>MIRA Living, Bargara · residence interior</figcaption>
          </figure>
        </div>
      </section>

      {/* Signature typographic moment */}
      <DecadesStatement id="home-decades" variant="compact" />

      {/* Middle — projects */}
      <section className={`section bg-limestone ${styles.featuredSection}`} aria-labelledby="featured-title">
        <div className="container">
          <div data-reveal className={styles.featuredHead}>
            <div>
              <p className="eyebrow">Featured developments</p>
              <h2 id="featured-title" className={`h2 ${styles.featuredTitle}`}>
                Residential projects shaped by location, strategy, design and delivery.
              </h2>
            </div>
            <Link href="/developments" className="text-link">
              All developments
            </Link>
          </div>
          <MiraFeature />
          <WestEndFeature />
        </div>
      </section>

      {/* Philosophy — six principles with real presence */}
      <section className="section" aria-labelledby="philosophy-title">
        <div className="container">
          <p data-reveal className={`eyebrow ${styles.eyebrowGap}`}>
            Development philosophy
          </p>
          <div className={`split ${styles.philosophySplit}`}>
            <h2 data-reveal id="philosophy-title" className="h2">
              From the right site to the right outcome.
            </h2>
            <div data-reveal>
              <p className={`body muted ${styles.philosophyBody}`}>
                The work begins with finding the right site, then quality design with experienced architects and
                designers, lasting workmanship, and responsibility for the complete development journey through to the
                people who ultimately live in the homes.
              </p>
              <Link href="/approach" className="text-link">
                Discover the Approach
              </Link>
            </div>
          </div>
          <StepList steps={philosophySteps} variant="feature" label="Development philosophy, from site to people" />
        </div>
      </section>

      {/* Ending — image-led call to action, then the footer */}
      <CTASection
        heading="Have a development opportunity?"
        primary={{ href: '/contact', label: 'Start a Conversation' }}
        image={images.ctaHome}
      />
    </>
  );
}
