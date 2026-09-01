export function sanitizeSearchQuery(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  return raw.replace(/[*\\[\]{}():^~]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80)
}

export function searchMatchPattern(query: string): string {
  return `${query}*`
}
