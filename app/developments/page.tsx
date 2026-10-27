import { Badge, BadgeGroup } from '@/components/Badge';
import { CTASection } from '@/components/CTASection';
import { FactList } from '@/components/FactList';
import { ChapterIndex } from '@/components/ChapterIndex';
import { CountUp } from '@/components/CountUp';
import { DrawingGallery } from '@/components/DrawingGallery';
import { MediaFrame } from '@/components/MediaFrame';
import { Lines } from '@/components/Lines';
import { Parallax } from '@/components/Parallax';
import { ViewCursor } from '@/components/ViewCursor';
import { Viewable } from '@/components/Viewable';
import { images } from '@/content/images';
import { mira, mtGravatt, mtGravattNotice, mtGravattTeam, westEnd, westEndNotice, westEndStoreys, westEndTeam } from '@/content/projects';
import { pageMetadata } from '@/lib/metadata';
import styles from './developments.module.css';

export const metadata = pageMetadata({
  title: 'Developments',
  path: '/developments',
  description:
    'MIRA Living, a boutique 25-residence oceanfront development in Bargara, a proposed 13-storey, 113-apartment residential scheme in West End, Brisbane, lodged by Furtado Property in September 2026, and a residential project in Mount Gravatt, Brisbane.',
});

export default function DevelopmentsPage() {
  return (
    <>
      <section className={`bg-limestone ${styles.hero}`} aria-labelledby="developments-title">
        <div className="container">
          <p className={`eyebrow ${styles.eyebrowGap}`}>Developments</p>
          <div className={styles.heroRow}>
            <h1 id="developments-title" className={styles.heroTitle}>
              Selected
              <br />
              Developments
            </h1>
            <p className={styles.heroLead}>Residential projects shaped by location, strategy, design and delivery.</p>
          </div>
          <nav aria-label="Projects on this page" className={styles.heroIndex}>
            <a href={`#${mira.slug}`}>
              {mira.number} · {mira.name}, Bargara
            </a>
            <a href={`#${westEnd.slug}`}>
              {westEnd.number} · {westEnd.name}, Brisbane
            </a>
            <a href={`#${mtGravatt.slug}`}>
              {mtGravatt.number} · {mtGravatt.name}, Brisbane
            </a>
          </nav>
        </div>
      </section>

      {/* Sticky on desktop: where you are in this long page, with a progress hairline. */}
      <ChapterIndex
        label="Projects on this page"
        progress
        chapters={[
          { id: mira.slug, number: mira.number, label: mira.name },
          { id: westEnd.slug, number: westEnd.number, label: 'West End' },
          { id: mtGravatt.slug, number: mtGravatt.number, label: 'Mount Gravatt' },
        ]}
      />

      {/* Project 01 — MIRA Living */}
      <section id={mira.slug} className={`section section--flush-top ${styles.anchor}`} aria-labelledby="mira-title">
        {/* The one widening moment on the site: container width → full bleed as it arrives (desktop). */}
        <div className={styles.miraBanner} data-progress="enter" data-progress-min="900">
          <Parallax max={36}>
            <MediaFrame image={mira.image} tone="teal" pattern="rows" priority sizes="100vw" captionPosition="center" style={{ height: '100%' }} />
          </Parallax>
          <BadgeGroup>
            <Badge variant="dark">Project {mira.number}</Badge>
            <Badge>{mira.statusLine}</Badge>
          </BadgeGroup>
        </div>
        <div className={`container ${styles.miraBody}`}>
          <article className={styles.miraArticle}>
            <div data-reveal className={styles.miraIntro}>
              <p className={styles.location}>{mira.location}</p>
              <h2 id="mira-title" className={styles.miraTitle}>
                {mira.name}
              </h2>
              <p className={styles.miraSub}>Boutique Oceanfront Residential</p>
              <div className={styles.bigStat}>
                <span className={`big-numeral ${styles.bigStatValue}`} data-reveal data-motion="lines">
                  <Lines lines={[String(mira.scale?.value)]} />
                </span>
                <span className="label">{mira.scale?.unit}</span>
              </div>
            </div>
            <div data-reveal className={styles.miraDetail}>
              <p className={`lead ${styles.summary}`}>{mira.summary}</p>
              <FactList facts={mira.facts} />
            </div>
          </article>
          <div data-reveal data-motion="image" className={styles.detailGrid}>
            <Viewable image={images.miraDetail1} caption="MIRA Living — residence living room" className={styles.galleryMain}>
              <MediaFrame image={images.miraDetail1} tone="sand" pattern="none" sizes="(min-width: 900px) 60vw, 100vw" style={{ height: '100%' }} />
            </Viewable>
            <Viewable image={images.miraDetail2} caption="MIRA Living — residence kitchen">
              <MediaFrame image={images.miraDetail2} aspect="3/2" tone="sand-alt" pattern="none" sizes="(min-width: 900px) 30vw, 100vw" />
            </Viewable>
            <Viewable image={images.miraDetail3} caption="MIRA Living — residence bedroom">
              <MediaFrame image={images.miraDetail3} aspect="3/2" tone="sand" pattern="none" sizes="(min-width: 900px) 30vw, 100vw" />
            </Viewable>
          </div>
        </div>
      </section>

      {/* Scale transition */}
      <section className="section bg-olive on-dark" aria-labelledby="evolution-title">
        <div className="container">
          <p data-reveal className={`eyebrow ${styles.eyebrowGap}`}>
            Development evolution
          </p>
          <h2 data-reveal id="evolution-title" className={`h2 ${styles.evolutionTitle}`}>
            From coastal boutique to inner-city scale.
          </h2>
          {/* 25 rises → the line draws toward 113 → "to" appears midway → 113 counts up from 25. */}
          <div data-reveal data-motion="custom" className={styles.scale}>
            <div className={styles.scaleItem}>
              <span className={styles.valueMask}>
                <span className={styles.scaleValue}>{mira.scale?.value}</span>
              </span>
              <span className={styles.scaleLabel}>
                MIRA
                <br />
                residences
              </span>
            </div>
            <div className={styles.scaleArrow} aria-hidden="true">
              <span className={styles.scaleLine} />
              <span className={styles.scaleTo}>to</span>
              <span className={styles.scaleLine} />
            </div>
            <div className={styles.scaleItem}>
              <CountUp value={westEnd.scale?.value ?? 0} from={mira.scale?.value ?? 0} delay={950} duration={1200} threshold={0.3} className={styles.scaleValue} />
              <span className={styles.scaleLabel}>
                West End
                <br />
                apartments proposed
              </span>
            </div>
          </div>
          <p data-reveal className={`body muted ${styles.scaleNote}`}>
            The West End proposal represents a substantially larger and more complex inner-city development environment
            than MIRA Living, with a {westEndStoreys}-storey scheme and a full consultant team. It has been lodged with
            Brisbane City Council and is not yet approved.
          </p>
        </div>
      </section>

      {/* Project 02 — West End */}
      <section id={westEnd.slug} className={`section ${styles.anchor}`} aria-labelledby="westend-title">
        <div className="container">
          <article className={styles.project}>
            {/* Sticky on desktop while the specification and team scroll alongside. */}
            <div className={styles.projectMedia}>
              <Viewable image={westEnd.image} caption="West End Residential Proposal — architectural render (proposal)">
                <MediaFrame
                  image={westEnd.image}
                  aspect="4/5"
                  tone="navy"
                  pattern="grid"
                  /* Landscape render cover-cropped into a 4:5 frame is drawn ~1.8× the frame width. */
                  sizes="(min-width: 900px) 80vw, 180vw"
                >
                  <BadgeGroup>
                    <Badge variant="dark">Project {westEnd.number}</Badge>
                    <Badge>{westEnd.statusBadge}</Badge>
                  </BadgeGroup>
                </MediaFrame>
              </Viewable>
            </div>
            {/* Not animated as a block: the specification and the proposal notice are readable immediately. */}
            <div className={styles.projectDetail}>
              <p className={styles.location}>{westEnd.location}</p>
              <h2 id="westend-title" data-reveal className={styles.projectTitle}>
                {westEnd.name}
              </h2>
              <div className={styles.statRow}>
                <div className={styles.stat}>
                  <span className={`big-numeral ${styles.statValue}`} data-reveal data-motion="lines">
                    <Lines lines={[String(westEndStoreys)]} />
                  </span>
                  <span className="label">Storeys</span>
                </div>
                <div className={styles.stat}>
                  <span className={`big-numeral ${styles.statValue}`} data-reveal data-motion="lines">
                    <Lines lines={[String(westEnd.scale?.value)]} />
                  </span>
                  <span className="label">
                    Apartments
                    <br />
                    proposed
                  </span>
                </div>
              </div>
              <p className={`body ${styles.summary}`}>{westEnd.summary}</p>
              <p className={styles.notice} role="note">
                {westEndNotice}
              </p>
              <FactList facts={westEnd.facts} />
              <h3 className={styles.teamHeading}>Project team</h3>
              <FactList facts={westEndTeam} minColumn={180} />
            </div>
          </article>
          <div className={styles.drawings}>
            <p data-reveal className={styles.drawingsHead}>
              <span className="eyebrow">Planning drawings</span>
              <span className={styles.drawingsNote}>Proposal lodged with Brisbane City Council · received 9 September 2026</span>
            </p>
            <DrawingGallery
              drawings={[
                { image: images.westEndSite, caption: 'Site · 5 Wolfe Street and 6–8 Greet Street' },
                { image: images.westEndLandscapePlan, caption: 'Landscape plan' },
                { image: images.westEndSection, caption: 'Building section' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Project 03 — Mount Gravatt (details and imagery to be supplied; placeholders render until then) */}
      <section id={mtGravatt.slug} className={`section rule-top ${styles.anchor}`} aria-labelledby="mtgravatt-title">
        <div className="container">
          <article className={styles.project}>
            <div className={styles.projectMedia}>
              <Viewable image={mtGravatt.image} caption="Mount Gravatt Residential Project — image to be supplied">
                <MediaFrame image={mtGravatt.image} aspect="4/5" tone="teal" pattern="grid" sizes="(min-width: 900px) 80vw, 180vw">
                  <BadgeGroup>
                    <Badge variant="dark">Project {mtGravatt.number}</Badge>
                    <Badge>{mtGravatt.statusBadge}</Badge>
                  </BadgeGroup>
                </MediaFrame>
              </Viewable>
            </div>
            <div className={styles.projectDetail}>
              <p className={styles.location}>{mtGravatt.location}</p>
              <h2 id="mtgravatt-title" data-reveal className={styles.projectTitle}>
                {mtGravatt.name}
              </h2>
              {mtGravatt.scale && (
                <div className={styles.statRow}>
                  <div className={styles.stat}>
                    <span className={`big-numeral ${styles.statValue}`} data-reveal data-motion="lines">
                      <Lines lines={[String(mtGravatt.scale.value)]} />
                    </span>
                    <span className="label">{mtGravatt.scale.unit}</span>
                  </div>
                </div>
              )}
              <p className={`body ${styles.summary}`}>{mtGravatt.summary}</p>
              <p className={styles.notice} role="note">
                {mtGravattNotice}
              </p>
              <FactList facts={mtGravatt.facts} />
              {mtGravattTeam.length > 0 && (
                <>
                  <h3 className={styles.teamHeading}>Project team</h3>
                  <FactList facts={mtGravattTeam} minColumn={180} />
                </>
              )}
            </div>
          </article>
          <div className={styles.drawings}>
            <p data-reveal className={styles.drawingsHead}>
              <span className="eyebrow">Drawings</span>
              <span className={styles.drawingsNote}>Drawings to be supplied</span>
            </p>
            <DrawingGallery
              drawings={[
                { image: images.mtGravattDrawing1, caption: 'Site plan' },
                { image: images.mtGravattDrawing2, caption: 'Landscape plan' },
                { image: images.mtGravattDrawing3, caption: 'Building section' },
              ]}
            />
          </div>
        </div>
      </section>

      <ViewCursor />

      <CTASection
        heading="Have a development opportunity?"
        primary={{ href: '/contact', label: 'Start a Conversation' }}
        image={images.ctaDevelopments}
      />
    </>
  );
}
