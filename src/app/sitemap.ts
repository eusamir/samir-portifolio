import type { MetadataRoute } from 'next'

import { siteConfig } from '@/presentation/shared/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.url, changeFrequency: 'monthly', priority: 1 }]
}
