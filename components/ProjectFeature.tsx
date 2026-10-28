import Link from 'next/link';
import { images } from '@/content/images';
import { mira, mtGravatt, westEnd, westEndStoreys } from '@/content/projects';
import { Badge, BadgeGroup } from './Badge';
import { Lines } from './Lines';
import { MediaFrame } from './MediaFrame';
import styles from './ProjectFeature.module.css';

function ViewLabel() {
  return (
    <span className={styles.view} aria-hidden="true">
      View project <span className={styles.arrow}>→</span>
    </span>
  );
}

/** Dominant MIRA Living showcase: wide image with an overlapping information panel. */
export function MiraFeature() {
  return (
    <article className={styles.lead} aria-labelledby="feature-mira" data-progress="view" data-progress-min="900">
      <Link href={`/developments#${mira.slug}`} className={styles.leadLink}>
        <div data-reveal data-motion="image" className={styles.leadMedia}>
          <MediaFrame image={mira.image} aspect="16/9" tone="teal" sizes="(min-width: 1360px) 1216px, 100vw" />
          <BadgeGroup>
            <Badge>{mira.statusBadge}</Badge>
          </BadgeGroup>
        </div>
        <div data-reveal data-delay="150" className={styles.leadPanel}>
          <span className="numeral">{mira.number}</span>
          <h3 id="feature-mira" className={styles.name}>
            {mira.name}
          </h3>
          <p className={styles.location}>{mira.location}</p>
          <dl className={styles.facts}>
            <div>
              <dt>Scale</dt>
              <dd>{mira.scale?.value} residences</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{mira.statusLine}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>Boutique oceanfront residential</dd>
            </div>
          </dl>
          <ViewLabel />
        </div>
      </Link>
    </article>
  );
}

/** West End proposal: text-led split with a large render and an inset detail. */
export function WestEndFeature() {
  return (
    <article className={styles.split} aria-labelledby="feature-westend">
      <Link href={`/developments#${westEnd.slug}`} className={styles.splitLink}>
        <div data-reveal className={styles.splitText}>
          <span className="numeral">{westEnd.number}</span>
          <h3 id="feature-westend" className={styles.name}>
            {westEnd.name}
          </h3>
          <p className={styles.location}>{westEnd.location}</p>
          <div className={styles.stats}>
            <p>
              <span className="big-numeral" data-reveal data-motion="lines">
                <Lines lines={[String(westEndStoreys)]} />
              </span>
              <span className="label">Storeys proposed</span>
            </p>
            <p>
              <span className="big-numeral" data-reveal data-motion="lines">
                <Lines lines={[String(westEnd.scale?.value)]} />
              </span>
              <span className="label">Apartments proposed</span>
            </p>
          </div>
          <p className={styles.status}>{westEnd.statusLine} · Not yet approved</p>
          <ViewLabel />
        </div>
        <div className={styles.splitVisual} data-progress="view" data-progress-min="900">
          <div data-reveal data-motion="image" className={styles.splitMedia}>
            {/* Landscape render in a square frame is drawn ~1.4× the frame width, so sizes reflects the drawn width. */}
            <MediaFrame image={westEnd.image} aspect="1/1" tone="navy" sizes="(min-width: 900px) 70vw, 145vw" />
            <BadgeGroup>
              <Badge>{westEnd.statusBadge}</Badge>
            </BadgeGroup>
          </div>
          <div data-reveal data-motion="image" className={styles.splitInset}>
            <MediaFrame image={images.westEndDetail} aspect="4/5" tone="sand" pattern="none" sizes="380px" />
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Mount Gravatt project (32–34 Lauder Street): same split as West End; renders from the August 2026 DA report. */
export function MtGravattFeature() {
  return (
    <article className={styles.split} aria-labelledby="feature-mtgravatt">
      <Link href={`/developments#${mtGravatt.slug}`} className={styles.splitLink}>
        <div data-reveal className={styles.splitText}>
          <span className="numeral">{mtGravatt.number}</span>
          <h3 id="feature-mtgravatt" className={styles.name}>
            {mtGravatt.name}
          </h3>
          <p className={styles.location}>{mtGravatt.location}</p>
          {mtGravatt.scale && (
            <div className={styles.stats}>
              <p>
                <span className="big-numeral" data-reveal data-motion="lines">
                  <Lines lines={[String(mtGravatt.scale.value)]} />
                </span>
                <span className="label">{mtGravatt.scale.unit}</span>
              </p>
            </div>
          )}
          <p className={styles.status}>{mtGravatt.statusLine}</p>
          <ViewLabel />
        </div>
        <div className={styles.splitVisual} data-progress="view" data-progress-min="900">
          <div data-reveal data-motion="image" className={styles.splitMedia}>
            <MediaFrame image={mtGravatt.image} aspect="1/1" tone="teal" sizes="(min-width: 900px) 70vw, 145vw" />
            <BadgeGroup>
              <Badge>{mtGravatt.statusBadge}</Badge>
            </BadgeGroup>
          </div>
          <div data-reveal data-motion="image" className={styles.splitInset}>
            <MediaFrame image={images.mtGravattDetail} aspect="4/5" tone="sand" pattern="none" sizes="380px" />
          </div>
        </div>
      </Link>
    </article>
  );
}
