import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { CopyEmail } from '@/components/CopyEmail';
import { MediaFrame } from '@/components/MediaFrame';
import { images, type ImageSlot } from '@/content/images';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from './contact.module.css';

export const metadata = pageMetadata({
  title: 'Contact',
  path: '/contact',
  description: 'Have a development opportunity? Start a conversation with Graham Furtado about the site, the opportunity and what comes next.',
});

export default function ContactPage() {
  const { email, phone } = site.contact;
  // Graham's portrait once supplied; until then a sharp project image.
  const portrait: ImageSlot = images.portrait;
  const panelImage = portrait.src ? portrait : images.contactPanel;

  const meta = [
    { term: 'Based', value: site.based },
    { term: 'Focus', value: site.regions.join(' · ') },
    { term: 'Company', value: site.company },
  ];

  return (
    <>
      <section className={styles.page} aria-labelledby="contact-title">
        <div className={`container ${styles.layout}`}>
          <div className={styles.head}>
            <p className={`eyebrow ${styles.eyebrowGap}`}>Contact</p>
            <h1 id="contact-title" className={styles.heroTitle}>
              Have a development opportunity?
            </h1>
            <p className={styles.heroText}>Let&rsquo;s discuss the site, the opportunity and what comes next.</p>
          </div>

          <div className={styles.formCol}>
            <ContactForm />
          </div>

          <aside className={styles.panel} aria-label="Graham Furtado">
            <div className={styles.panelInner}>
              <MediaFrame image={panelImage} aspect="4/5" tone="navy" pattern="none" priority sizes="(min-width: 960px) 34vw, 100vw" className={styles.panelImage} />
              <div className={styles.panelBody}>
                <p className={styles.panelName}>{site.name}</p>
                {/* Public role per the research: "Developer, Furtado Property". */}
                <p className={styles.panelRole}>Developer, {site.company}</p>

                {/* Direct channels are shown only once confirmed in content/site.ts — never placeholders. */}
                {(email || phone) && (
                  <div className={styles.channels}>
                    {email && <CopyEmail email={email} className={styles.channel} buttonClassName={styles.copy} />}
                    {phone && (
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className={styles.channel}>
                        {phone}
                      </a>
                    )}
                  </div>
                )}

                <dl className={styles.meta}>
                  {meta.map((item) => (
                    <div key={item.term}>
                      <dt>{item.term}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-limestone" aria-labelledby="alt-cta-title">
        <div className={`container ${styles.altCta}`}>
          <h2 data-reveal id="alt-cta-title" className={styles.altCtaTitle}>
            Interested in Graham&rsquo;s development work?
          </h2>
          <Link data-reveal href="/developments" className="btn btn--dark">
            Explore Developments
          </Link>
        </div>
      </section>    </>
  );
}
