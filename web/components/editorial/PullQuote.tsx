export function PullQuote({value}: {value: {text?: string}}) {
  if (!value?.text) return null
  return (
    <blockquote className="pull-quote">
      <p>{value.text}</p>
    </blockquote>
  )
}
