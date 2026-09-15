import {Analytics} from '@vercel/analytics/next'

/** Single analytics mount for the publication. Do not add tags on individual pages. */
export function AnalyticsSlot() {
  return <Analytics />
}
