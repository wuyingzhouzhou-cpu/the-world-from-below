export const COVER_IMAGE_WIDTHS = [390, 768, 1024, 1440, 1920] as const

export function coverImageSizes(layout: 'photo' | 'split' = 'photo'): string {
  if (layout === 'split') {
    return '(max-width: 767px) 100vw, min(42vw, 600px)'
  }
  return '(max-width: 1440px) 100vw, 1400px'
}

export function withRequestedWidth(url: string, width: number): string {
  try {
    const parsed = new URL(url)
    parsed.searchParams.set('w', String(width))
    if (!parsed.searchParams.has('auto')) parsed.searchParams.set('auto', 'format')
    return parsed.toString()
  } catch {
    return url
  }
}

export function srcsetFromUrl(url: string | undefined, widths: number[]): string | undefined {
  if (!url) return undefined
  const parts = widths.map((width) => `${withRequestedWidth(url, width)} ${width}w`)
  return parts.length ? parts.join(', ') : undefined
}
