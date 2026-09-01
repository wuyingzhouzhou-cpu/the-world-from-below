import { useEffect, useState } from 'react'
import { Marginalia } from '../components/editorial/EditorialMarginalia'
import { works } from '../data/demoContent'
import type { Medium } from '../data/demoContent'
import type { View } from '../App'

interface Props { navigate: (v: View) => void }

const mediums: (Medium | 'All')[] = ['All', 'Book', 'Film', 'Photography']

export default function LibraryPage({ navigate }: Props) {
  const [filter, setFilter] = useState<Medium | 'All'>('All')
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    document.body.setAttribute('data-mood', 'archive')
    return () => document.body.removeAttribute('data-mood')
  }, [])

  const filtered = filter === 'All' ? works : works.filter(w => w.medium === filter)

  return (
    <main>
      <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-6 md:px-12 pt-16 pb-24">

        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--pub-border)', paddingBottom: 40, marginBottom: 40 }}>
          <span style={{
            fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-accent)',
            display: 'block', marginBottom: 16,
          }}>The Library</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: 1.0,
              color: 'var(--pub-fg)', letterSpacing: '-0.03em',
            }}>
              Books, Films &<br />Photography
            </h1>
            <p style={{
              fontFamily: 'var(--font-reading)', fontStyle: 'italic', fontSize: '1.05rem',
              lineHeight: 1.7, color: 'var(--pub-fg-muted)', maxWidth: 420,
            }}>
              Works that let readers enter another world from the inside. Curated for the quality of their attention to ordinary life.
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 mb-12" style={{ borderBottom: '1px solid var(--pub-border)' }}>
          {mediums.map(m => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              style={{
                fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: filter === m ? 'var(--pub-fg)' : 'var(--pub-fg-faint)',
                background: 'none', border: 'none',
                borderBottom: filter === m ? '2px solid var(--pub-accent)' : '2px solid transparent',
                cursor: 'pointer', padding: '12px 16px', transition: 'color 0.2s',
              }}
            >
              {m}
              {m !== 'All' && (
                <span style={{ marginLeft: 5, opacity: 0.5 }}>
                  ({works.filter(w => w.medium === m).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Works list */}
        <div className="flex flex-col">
          {filtered.map((work, i) => (
            <button
              key={work.title}
              onClick={() => navigate('book')}
              onMouseOver={() => setHovered(work.title)}
              onMouseOut={() => setHovered(null)}
              className="w-full text-left"
              style={{
                background: hovered === work.title ? 'var(--pub-card)' : 'transparent',
                border: 'none',
                borderTop: '1px solid var(--pub-border)',
                borderBottom: i === filtered.length - 1 ? '1px solid var(--pub-border)' : 'none',
                cursor: 'pointer', transition: 'background 0.2s', padding: '24px 0',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start" style={{ padding: '0 16px' }}>

                {/* Mini cover */}
                <div className="md:col-span-1 hidden md:flex justify-center">
                  <div style={{
                    width: 42, height: 58, background: work.bgColor, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4,
                  }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 6, lineHeight: 1.3, color: work.fgColor, textAlign: 'center' }}>
                      {work.title}
                    </span>
                  </div>
                </div>

                {/* Medium */}
                <div className="md:col-span-1 flex md:block items-center gap-3 mb-1 md:mb-0">
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-accent)' }}>
                    {work.medium}
                  </span>
                  <span className="md:hidden" style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--pub-fg-faint)' }}>{work.year}</span>
                </div>

                {/* Title + author */}
                <div className="md:col-span-4">
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.25, color: 'var(--pub-fg)', marginBottom: 4 }}>
                    {work.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--pub-fg-faint)' }}>
                    {work.author}
                  </p>
                </div>

                {/* Note */}
                <div className="md:col-span-4">
                  <p style={{ fontFamily: 'var(--font-reading)', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--pub-fg-muted)' }}>
                    {work.note}
                  </p>
                </div>

                {/* Year + forces */}
                <div className="md:col-span-2 hidden md:flex flex-col items-end gap-2">
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--pub-fg-faint)' }}>{work.year}</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {work.forces.slice(0, 2).map(f => (
                      <span key={f} style={{ fontFamily: 'var(--font-ui)', fontSize: 8, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--pub-fg-faint)' }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 56 }}>
          <button onClick={() => navigate('home')} style={{
            fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--pub-fg-muted)', background: 'none', border: 'none',
            borderBottom: '1px solid var(--pub-border)', cursor: 'pointer', padding: '0 0 2px 0',
          }}>← Back to Homepage</button>
        </div>
      </div>
    </main>
  )
}
