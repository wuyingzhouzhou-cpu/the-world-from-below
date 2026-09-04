export type SiteEnv = {
  NEXT_PUBLIC_SITE_URL?: string
  NODE_ENV?: string
  VERCEL_PROJECT_PRODUCTION_URL?: string
  VERCEL_URL?: string
}

function trimSlash(value: string): string {
  return value.replace(/\/+$/, '')
}

function asHttpsOrigin(host: string): string {
  const trimmed = trimSlash(host)
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

/**
 * Single origin for canonical URLs, sitemap, RSS, and structured data.
 * Never invents blog.asherlog.me / below.asherlog.me.
 */
export function siteOrigin(env: SiteEnv = process.env): string | undefined {
  const configured = env.NEXT_PUBLIC_SITE_URL?.trim()
  if (configured) return trimSlash(configured)

  if (env.NODE_ENV !== 'production') return 'http://localhost:3000'

  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || env.VERCEL_URL?.trim()
  if (vercel) return asHttpsOrigin(vercel)

  return undefined
}

export function absoluteUrl(path: string, env: SiteEnv = process.env): string | undefined {
  const origin = siteOrigin(env)
  if (!origin) return undefined
  const suffix = path.startsWith('/') ? path : `/${path}`
  if (suffix === '/') return `${origin}/`
  return `${origin}${suffix}`
}

export function canonicalUrl(
  path: string | undefined,
  stored?: string,
  env: SiteEnv = process.env,
): string | undefined {
  const fromCms = stored?.trim()
  if (fromCms) return fromCms
  if (!path) return undefined
  return absoluteUrl(path, env)
}
