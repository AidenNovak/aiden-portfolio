import { MetadataRoute } from 'next';
import sitemapData from '@/lib/sitemap';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapData();
}
