import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Cormorant, Gilda_Display, Questrial } from 'next/font/google';
import { ChatWidget } from '@/components/ChatWidget';
import { RevealObserver } from '@/components/RevealObserver';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { site, siteUrl } from '@/content/site';
import './globals.css';

/*
 * Typefaces follow the Furtado Property identity (see the token comment in globals.css):
 * Gilda Display stands in for The Seasons used in the logo, Cormorant Italic provides
 * the italic accents Gilda lacks, and Questrial is the body face of furtadoproperty.com.au.
 */
const gildaDisplay = Gilda_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gilda-display',
});

const cormorantItalic = Cormorant({
  weight: '500',
  style: 'italic',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant-italic',
});

const questrial = Questrial({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-questrial',
});

const defaultTitle = `${site.name} — ${site.positioning.headline}`;
const defaultDescription =
  'Graham Furtado is a Queensland property developer and experienced real-estate professional. Through Furtado Property, he guides residential projects from site opportunity through design, consultant coordination and delivery.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: `%s — ${site.name}` },
  description: defaultDescription,
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: site.name,
    title: defaultTitle,
    description: defaultDescription,
    url: '/',
  },
  twitter: { card: 'summary', title: defaultTitle, description: defaultDescription },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#f6f1e7',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Runs before first paint: decides whether the Home opening plays in full (first
 * visit to Home this session), in its short form (returning to Home), or not at
 * all (other pages, reduced motion, storage unavailable). On first load it also
 * measures the hero and starts the sequence as soon as the display font is ready
 * (≤500ms), without waiting for React to hydrate, so the name is readable almost
 * immediately. The hero reads html[data-intro]; without JavaScript the attribute
 * is never set and the final state renders.
 */
const introScript = `(function(){var d=document.documentElement;d.dataset.introLoad=location.pathname;try{if(location.pathname!=='/'||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='none';return}var mode=sessionStorage.getItem('gf-intro')?'short':'full';d.dataset.intro=mode;sessionStorage.setItem('gf-intro','1');document.addEventListener('DOMContentLoaded',function(){var h=document.querySelector('[data-hero]');if(!h)return;var b=h.querySelector('[data-baseline]'),f=h.querySelector('[data-hero-foot]');if(b&&f){var t=h.getBoundingClientRect().top,y=b.getBoundingClientRect().top-t+8,z=f.getBoundingClientRect().top-t;h.style.setProperty('--horizon-y',Math.round(y)+'px');h.style.setProperty('--foot-dy',Math.round(z-y)+'px')}var go=function(){if(d.dataset.intro===mode){d.dataset.intro=mode+'-go';d.dataset.introStart=String(performance.now())}};Promise.race([document.fonts?document.fonts.ready:Promise.resolve(),new Promise(function(r){setTimeout(r,500)})]).then(go)})}catch(e){d.dataset.intro='none'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${gildaDisplay.variable} ${cormorantItalic.variable} ${questrial.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <ChatWidget />
        <RevealObserver />
        <ScrollProgress />
        <Analytics />
      </body>
    </html>
  );
}
