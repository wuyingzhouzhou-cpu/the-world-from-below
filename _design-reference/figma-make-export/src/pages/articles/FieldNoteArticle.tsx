import { useEffect } from 'react'
import { useReadingProgress } from '../../hooks/useReadingProgress'
import { Marginalia } from '../../components/editorial/EditorialMarginalia'
import { allNotes } from '../../data/demoContent'
import type { View } from '../../App'

interface Props { navigate: (v: View) => void }

export default function FieldNoteArticle({ navigate }: Props) {
  const progress = useReadingProgress()

  useEffect(() => {
    document.body.setAttribute('data-mood', 'minimal')
    return () => document.body.removeAttribute('data-mood')
  }, [])

  return (
    <main>
      {/* Reading progress */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: `${progress * 100}%`,
        background: 'var(--pub-accent)',
        zIndex: 200,
        transition: 'width 0.1s linear',
      }} aria-hidden />

      <div style={{ maxWidth: 1200, margin: '0 auto' }} className="px-6 md:px-12 pt-16 pb-24">

        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-accent)', display: 'block', marginBottom: 20 }}>
            Field Notes
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            lineHeight: 1.1,
            color: 'var(--pub-fg)',
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            Short observations.<br />Unresolved questions.
          </h1>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 14,
            color: 'var(--pub-fg-muted)',
            lineHeight: 1.65,
          }}>
            Field notes are quick, essayistic observations — shorter and more speculative than features. A question worth sitting with. A pattern noticed. Something that doesn't have a full answer yet.
          </p>
        </div>

        {/* Notes list */}
        <div className="flex flex-col">
          {allNotes.map((note, i) => (
            <article
              key={note.n}
              style={{
                borderTop: '1px solid var(--pub-border)',
                borderBottom: i === allNotes.length - 1 ? '1px solid var(--pub-border)' : 'none',
                padding: '48px 0',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

                {/* Content — first in DOM so it leads on mobile */}
                <div className="md:col-span-9 md:order-2">
                  {/* Mobile inline meta — number + date in one line */}
                  <div className="flex items-baseline gap-4 mb-5 md:hidden">
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 300,
                      color: 'var(--pub-fg-faint)',
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}>
                      {note.n}
                    </span>
                    <Marginalia lines={[note.date]} />
                    <div className="flex gap-3 ml-auto">
                      {note.forces.map(f => (
                        <button
                          key={f}
                          onClick={() => navigate('forces')}
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 9,
                            fontWeight: 500,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--pub-accent)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                    lineHeight: 1.28,
                    color: 'var(--pub-fg)',
                    letterSpacing: '-0.015em',
                    marginBottom: 24,
                  }}>
                    {note.title}
                  </h2>
                  <div>
                    {note.body.split('\n\n').map((para, pi) => (
                      <p
                        key={pi}
                        style={{
                          fontFamily: 'var(--font-reading)',
                          fontSize: '1.05rem',
                          lineHeight: 1.82,
                          color: 'var(--pub-fg)',
                          marginBottom: pi < note.body.split('\n\n').length - 1 ? 20 : 0,
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Desktop meta sidebar — hidden on mobile */}
                <div className="hidden md:block md:col-span-3 md:order-1">
                  <div style={{ position: 'sticky', top: 80 }}>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 40,
                      fontWeight: 300,
                      color: 'var(--pub-fg-faint)',
                      lineHeight: 1,
                      marginBottom: 16,
                      letterSpacing: '-0.04em',
                    }}>
                      {note.n}
                    </p>
                    <Marginalia lines={[`Field Note ${note.n}`, note.date]} className="mb-3" />
                    <div className="flex flex-col gap-1">
                      {note.forces.map(f => (
                        <button
                          key={f}
                          onClick={() => navigate('forces')}
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 9,
                            fontWeight: 500,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--pub-accent)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            padding: 0,
                          }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 56 }}>
          <button
            onClick={() => navigate('home')}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--pub-fg-muted)',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid var(--pub-border)',
              cursor: 'pointer',
              padding: '0 0 2px 0',
            }}
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
    </main>
  )
}
