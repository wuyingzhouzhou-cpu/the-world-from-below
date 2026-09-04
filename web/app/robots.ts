import type {MetadataRoute} from 'next'
import {ROBOTS_DISALLOW} from '@/lib/seoRoutes'
import {absoluteUrl} from '@/lib/siteUrl'

export default function robots(): MetadataRoute.Robots {
  const sitemap = absoluteUrl('/sitemap.xml')
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...ROBOTS_DISALLOW],
      },
    ],
    sitemap: sitemap ? [sitemap] : undefined,
  }
}
