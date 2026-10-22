import type { MetadataRoute } from 'next';
import { navItems } from '@/content/navigation';
import { siteUrl } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return navItems.map((item) => ({
    url: `${siteUrl}${item.href === '/' ? '' : item.href}`,
    changeFrequency: 'monthly',
    priority: item.href === '/' ? 1 : 0.8,
  }));
}
