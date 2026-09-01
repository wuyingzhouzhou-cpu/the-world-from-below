export function isPlaceholderName(value?: string): boolean {
  if (!value) return true
  const name = value.trim()
  if (!name) return true
  if (/^\[[^\]]+\]$/.test(name)) return true
  if (/^author name$/i.test(name)) return true
  return false
}

export function displayableName(value?: string): string | undefined {
  if (isPlaceholderName(value)) return undefined
  return value?.trim()
}
