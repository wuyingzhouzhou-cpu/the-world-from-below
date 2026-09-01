export function SourceQuote({
  value,
}: {
  value: {text?: string; attribution?: string; source?: string; year?: string}
}) {
  if (!value?.text) return null
  const credit = [value.attribution, value.source, value.year].filter(Boolean).join(' · ')
  return (
    <blockquote className="source-quote" cite={value.source}>
      <p>{value.text}</p>
      {credit ? <footer>{credit}</footer> : null}
    </blockquote>
  )
}
