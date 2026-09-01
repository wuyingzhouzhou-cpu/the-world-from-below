export function EditorialAside({value}: {value: {heading?: string; body?: string}}) {
  if (!value?.body) return null
  return (
    <aside className="editorial-aside">
      <p className="aside-label">{value.heading || 'Context'}</p>
      <p>{value.body}</p>
    </aside>
  )
}
