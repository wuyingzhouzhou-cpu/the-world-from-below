export function SourceNote({value}: {value: {text?: string; source?: string}}) {
  if (!value?.text) return null
  return (
    <aside className="source-note">
      <p>{value.text}</p>
      {value.source ? <p>{value.source}</p> : null}
    </aside>
  )
}
