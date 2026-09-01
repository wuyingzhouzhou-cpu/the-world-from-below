export const COVER_MODES = ['photo', 'typographic', 'split'] as const
export type CoverMode = (typeof COVER_MODES)[number]

export function isCoverMode(value: unknown): value is CoverMode {
  return COVER_MODES.includes(value as CoverMode)
}

export function resolveCoverMode(stored: unknown, hasLeadImage: boolean): CoverMode {
  if (isCoverMode(stored)) return stored
  return hasLeadImage ? 'photo' : 'typographic'
}
