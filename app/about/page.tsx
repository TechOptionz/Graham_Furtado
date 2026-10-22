import Link from 'next/link';
import { DecadesStatement } from '@/components/DecadesStatement';
import { MediaFrame } from '@/components/MediaFrame';
import { QueenslandMap } from '@/components/QueenslandMap';
import { images } from '@/content/images';
import { mira, westEnd, westEndStoreys } from '@/content/projects';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from './about.module.css';

export const metadata = pageMetadata({
  title: 'About',
  path: '/about',
  description:
    'Graham Furtado is a Queensland property developer and experienced real-estate professional with around three decades of industry experience, working through Furtado Property.',
});

const currentProjects = [
  { number: '01', project: mira, status: 'Nearing completion · Sept 2026', detail: `${mira.location} · 25 residences · Boutique oceanfront residential` },
  {
    number: '02',
    project: westEnd,
    status: 'Proposal · Lodged Sept 2026',
    detail: `${westEnd.location} · ${westEndStoreys} storeys · 113 apartments proposed`,
  },
];

/** `place` links a row to its marker on the map (hover either to highlight both). */
const regions = [
  { name: 'Queensland', note: 'State focus', place: 'qld' },
  { name: 'Brisbane', note: 'Real estate · West End proposal', place: 'brisbane' },
  { name: 'South-East Queensland', note: 'Furtado Property base', place: 'seq' },
  { name: 'Bargara', note: 'MIRA Living · near Bundaberg', place: 'bargara' },
];

const brandTiers = [
  { marker: 'i', title: site.name, body: 'Experience, thinking, strategy, relationships and leadership.' },
  { marker: 'ii', title: site.company, body: 'The residential development company, based in South-East Queensland.' },
  { marker: 'iii', title: 'The projects', body: 'MIRA Living, the West End proposal and the developments that follow.' },
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={`eyebrow ${styles.eyebrowGap}`}>About Graham</p>
            <h1 id="about-title" className={styles.heroTitle}>
              A property perspective built over decades.
            </h1>
            <div className={styles.heroText}>
              <p className="lead">
                Graham Furtado is a Queensland property developer and experienced real-estate professional with{' '}
                {site.experience.summary} of industry experience.
              </p>
              <p className="body muted">
                Through Furtado Property, he combines deep market knowledge with residential development experience,
                guiding projects from site opportunity and early development strategy through design, consultant
                coordination, construction and market delivery.
              </p>
            </div>
          </div>
          <MediaFrame
            image={images.portrait}
            aspect="4/5"
            tone="sand"
            pattern="columns"
            priority
            sizes="(min-width: 900px) 400px, 100vw"
            className={styles.portrait}
            marks
          />
        </div>
      </section>

      <section className="section bg-limestone" aria-labelledby="identity-title">
        <div className="container">
          <h2 data-reveal id="identity-title" className={`eyebrow ${styles.eyebrowGapLg}`}>
            Professional identity
          </h2>
          {/* Working positioning from the research — final title to be confirmed with Graham (content/site.ts). */}
          <div className="split">
            {/* Lines stagger in; on desktop the line nearest the viewport centre is at full ink, others ~45%. */}
            <ul className={styles.titles}>
              {site.positioning.titles.map((title) => (
                <li key={title} data-reveal data-progress="center" data-progress-min="900">
                  {title}
                </li>
              ))}
            </ul>
            <div data-reveal>
              <p className={`body ${styles.paraGap}`}>
                Graham&rsquo;s professional identity connects long-standing real-estate experience in Brisbane with an
                active role in residential development.
              </p>
              <p className="body muted">
                Furtado Property is the development company through which that work is delivered: a South-East Queensland
                residential developer whose projects publicly identify Graham as the developer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DecadesStatement id="experience-title" />

      <section className="section section--flush-top" aria-labelledby="story-title">
        <div className="container">
          <p data-reveal className={`eyebrow ${styles.eyebrowGap} ${styles.ruledEyebrow}`}>
            Current development story
          </p>
          <div className={`split ${styles.storySplit}`}>
            <h2 data-reveal id="story-title" className="h2">
              Two projects, one active development role.
            </h2>
            <p data-reveal className="body muted">
              His current development story includes MIRA Living, a boutique 25-residence oceanfront project in Bargara,
              and Furtado Property&rsquo;s recently lodged 113-apartment residential proposal in West End, Brisbane.
              Together they show Graham operating beyond property sales, with a public role tied to site opportunity,
              product positioning, consultant coordination and delivery.
            </p>
          </div>
          <div className={styles.storyGrid}>
            {currentProjects.map(({ number, project, status, detail }, i) => (
              <Link key={project.slug} href={`/developments#${project.slug}`} className={styles.storyItem}>
                {/* Cards clip-reveal ~120ms apart. */}
                <div data-reveal data-motion="image" data-from="below" data-delay={i ? 50 : 0} className={styles.storyMedia}>
                  <MediaFrame image={project.image} aspect="3/2" tone="sand" pattern="none" sizes="(min-width: 900px) 45vw, 100vw" />
                </div>
                <div className={styles.storyMeta}>
                  <span className={`numeral ${styles.bronzeNumeral}`}>{number}</span>
                  <span className={styles.storyStatus}>{status}</span>
                </div>
                <h3 className={styles.storyName}>{project.name}</h3>
                <p className={styles.storyDetail}>{detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`section rule-top`} aria-labelledby="geo-title">
        {/* Rows and map markers highlight each other on hover (desktop pointers; see about.module.css). */}
        <div className={`container ${styles.geo}`}>
          <div className={styles.geoCopy}>
            <p data-reveal className={`eyebrow ${styles.eyebrowGap}`}>
              Geographic focus
            </p>
            <h2 data-reveal id="geo-title" className={`h2 ${styles.geoTitle}`}>
              Queensland, with a focus on opportunity.
            </h2>
            <p data-reveal className={`body muted ${styles.geoText}`}>
              Brisbane and South-East Queensland, with development experience extending to Bargara near Bundaberg.
            </p>
            <ul data-reveal className={styles.regions}>
              {regions.map((region) => (
                <li key={region.name} data-place={region.place}>
                  <span className={styles.regionName}>{region.name}</span>
                  <span className={styles.regionNote}>{region.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.geoMap}>
            <QueenslandMap />
          </div>
        </div>
      </section>

      <section className={`section bg-limestone ${styles.brand}`} aria-labelledby="brand-title">
        <div className="container">
          <p data-reveal className={`eyebrow ${styles.eyebrowGap}`}>
            Personal brand direction
          </p>
          <div className={`split ${styles.storySplit}`}>
            <h2 data-reveal id="brand-title" className="h2">
              The person above the projects.
            </h2>
            <p data-reveal className="body muted">
              Graham&rsquo;s personal profile sits above the individual development brands. Furtado Property remains the
              development company; MIRA Living and future projects provide proof of delivery; the personal brand explains
              the experience, thinking, approach and relationships behind those projects.
            </p>
          </div>
          <ol data-reveal className={styles.tiers} aria-label="Brand structure, from person to projects">
            {brandTiers.map((tier) => (
              <li key={tier.marker}>
                <span className={`numeral ${styles.bronzeNumeral} ${styles.tierMarker}`} aria-hidden="true">
                  {tier.marker}
                </span>
                <h3 className={styles.tierTitle}>{tier.title}</h3>
                <p className={styles.tierBody}>{tier.body}</p>
              </li>
            ))}
          </ol>
          <div data-reveal className={`btn-row ${styles.brandCtas}`}>
            <Link href="/contact" className="btn btn--primary">
              Start a Conversation
            </Link>
            <Link href="/developments" className="text-link">
              View Developments
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
