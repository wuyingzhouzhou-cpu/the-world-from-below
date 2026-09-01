export function Epigraph({value}: {value: {text?: string; attribution?: string; source?: string}}) {
  if (!value?.text) return null
  const credit = [value.attribution, value.source].filter(Boolean).join(' · ')
  return (
    <blockquote className="epigraph">
      <p>{value.text}</p>
      {credit ? <footer>{credit}</footer> : null}
    </blockquote>
  )
}
