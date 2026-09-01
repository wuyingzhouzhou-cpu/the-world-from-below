import { homeFieldNotes } from '../../data/demoContent'
import type { View } from '../../App'

interface Props { navigate: (v: View) => void }

const Lbl = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--pub-fg-muted)',
  }}>{children}</span>
)

export default function FieldNotesSection({ navigate }: Props) {
  return (
    <section style={{ borderBottom: '1px solid var(--pub-border)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-6 md:px-12 py-14">
        <div className="flex items-baseline justify-between mb-7">
          <Lbl>Field Notes</Lbl>
          <button onClick={() => navigate('field-note')} style={{
            fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--pub-fg-faint)', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>All Notes →</button>
        </div>
        <div>
          {homeFieldNotes.map((note, i) => (
            <button key={note.code} onClick={() => navigate('field-note')}
              className="w-full flex items-baseline gap-5 py-4 text-left group"
              style={{
                borderTop: '1px solid var(--pub-border)',
                borderBottom: i === homeFieldNotes.length - 1 ? '1px solid var(--pub-border)' : 'none',
                background: 'none', cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseOver={e => (e.currentTarget.style.background = 'var(--pub-card)')}
              onMouseOut={e => (e.currentTarget.style.background = 'none')}
            >
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'var(--pub-fg-faint)', letterSpacing: '0.08em', flexShrink: 0, width: 44 }}>{note.code}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)', color: 'var(--pub-fg)', lineHeight: 1.35, flex: 1 }}>
                {note.title}
              </span>
              <span className="hidden md:block" style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'var(--pub-fg-faint)', letterSpacing: '0.08em', flexShrink: 0 }}>{note.date}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
