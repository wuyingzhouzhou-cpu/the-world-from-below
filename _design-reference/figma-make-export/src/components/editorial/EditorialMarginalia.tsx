interface Props {
  lines: string[]
  className?: string
  rotate?: boolean
}

export function Marginalia({ lines, className = '', rotate = false }: Props) {
  return (
    <div
      className={className}
      style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 9,
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--pub-fg-faint)',
        lineHeight: 1.7,
        ...(rotate ? { writingMode: 'vertical-rl', transform: 'rotate(180deg)' } : {}),
      }}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block' }}>{line}</span>
      ))}
    </div>
  )
}

export default Marginalia
