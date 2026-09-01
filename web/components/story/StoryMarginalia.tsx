export function StoryMarginalia({lines}: {lines: string[]}) {
  const visible = lines.filter(Boolean)
  if (!visible.length) return null
  return (
    <p className="marginalia">
      {visible.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </p>
  )
}
