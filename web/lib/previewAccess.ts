export function isPreviewAllowed(input: {
  isProduction: boolean
  secret?: string
  provided?: string | null
}): boolean {
  if (!input.isProduction) return true
  const expected = input.secret?.trim()
  if (!expected) return false
  return input.provided === expected
}
