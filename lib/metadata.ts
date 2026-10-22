import type { Metadata } from 'next';
import { site } from '@/content/site';

/** Per-page metadata with matching canonical and Open Graph fields. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      siteName: site.name,
      title: `${title} — ${site.name}`,
      description,
      url: path,
    },
    twitter: { card: 'summary', title: `${title} — ${site.name}`, description },
  };
}
