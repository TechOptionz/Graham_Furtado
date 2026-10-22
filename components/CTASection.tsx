import Link from 'next/link';
import type { ReactNode } from 'react';
import type { ImageSlot } from '@/content/images';
import { Lines } from './Lines';
import { MediaFrame } from './MediaFrame';
import { Parallax } from './Parallax';

interface CTALink {
  href: string;
  label: string;
}

interface CTASectionProps {
  heading: ReactNode;
  body?: string;
  primary: CTALink;
  secondary?: CTALink;
  /** Background photograph under a navy overlay; separates the CTA from the footer. */
  image: ImageSlot;
  label?: string;
}

/** Image-led closing call to action used at the foot of most pages. */
export function CTASection({
  heading,
  body = "Let's discuss the site, the opportunity and what comes next.",
  primary,
  secondary,
  image,
  label = 'Call to action',
}: CTASectionProps) {
  return (
    <section aria-label={label} className="on-dark cta-band">
      <div className="cta-band__media" aria-hidden="true">
        <Parallax max={36}>
          <MediaFrame image={{ ...image, alt: '' }} tone="navy" pattern="none" sizes="100vw" style={{ height: '100%' }} />
        </Parallax>
      </div>
      <div className="cta-band__shade" aria-hidden="true" />
      <div className="container cta-band__inner">
        <h2 data-reveal data-motion="lines" className="h2-cta cta-band__heading">
          <Lines lines={[heading]} />
        </h2>
        <div data-reveal className="cta-band__aside">
          {body && <p className="lead">{body}</p>}
          <div className="btn-row">
            <Link href={primary.href} className="btn btn--primary">
              {primary.label}
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn btn--outline-ivory">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
