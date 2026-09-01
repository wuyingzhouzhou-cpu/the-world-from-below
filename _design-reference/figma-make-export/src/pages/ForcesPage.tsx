import { useEffect, useState } from 'react'
import { Marginalia } from '../components/editorial/EditorialMarginalia'
import { forces } from '../data/demoContent'
import type { View } from '../App'

interface Props { navigate: (v: View) => void }

export default function ForcesPage({ navigate }: Props) {
  const [activeForce, setActiveForce] = useState<string | null>(null)

  useEffect(() => {
    document.body.removeAttribute('data-mood')
  }, [])

  const active = forces.find(f => f.name === activeForce)

  return (
    <main>
      <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-6 md:px-12 pt-16 pb-24">

        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--pub-border)', paddingBottom: 40, marginBottom: 56 }}>
          <span style={{
            fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-accent)',
            display: 'block', marginBottom: 16,
          }}>Forces</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: 1.0,
              color: 'var(--pub-fg)', letterSpacing: '-0.03em',
            }}>
              The Larger Forces
            </h1>
            <p style={{
              fontFamily: 'var(--font-reading)', fontStyle: 'italic', fontSize: '1.05rem',
              lineHeight: 1.7, color: 'var(--pub-fg-muted)', maxWidth: 420,
            }}>
              These are not topics. They are lenses. Ways of understanding what shapes ordinary life from the outside.
            </p>
          </div>
        </div>

        {/* Desktop: two-panel */}
        <div className="hidden md:grid grid-cols-12 gap-16">
          <div className="col-span-5">
            {forces.map((force, i) => (
              <button
                key={force.name}
                onClick={() => setActiveForce(activeForce === force.name ? null : force.name)}
                className="w-full text-left flex items-baseline justify-between group"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'var(--pub-border)',
                  borderBottom: i === forces.length - 1 ? '1px solid var(--pub-border)' : 'none',
                  paddingTop: 20, paddingBottom: 20,
                }}
              >
                <div className="flex items-baseline gap-6">
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: activeForce === force.name ? 700 : 400,
                    fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                    color: activeForce === force.name ? 'var(--pub-fg)' : 'var(--pub-fg-muted)',
                    letterSpacing: '-0.02em', transition: 'color 0.2s', lineHeight: 1.1,
                  }}>
                    {force.name}
                  </span>
                  <Marginalia lines={[`${String(forces.indexOf(force) + 1).padStart(2, '0')} · ${force.storyCount} stories`]} />
                </div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: activeForce === force.name ? 'var(--pub-accent)' : 'var(--pub-fg-faint)', transition: 'color 0.2s' }}>
                  {activeForce === force.name ? '←' : '→'}
                </span>
              </button>
            ))}
          </div>

          <div className="col-span-7">
            {active ? (
              <div style={{ animation: 'fadeUp 0.3s ease forwards' }}>
                <Marginalia lines={[`Force · ${active.storyCount} stories`]} className="mb-5" />
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '3rem', lineHeight: 1.05, color: 'var(--pub-fg)',
                  letterSpacing: '-0.03em', marginBottom: 24,
                }}>
                  {active.name}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
                  fontSize: '1.2rem', lineHeight: 1.5, color: 'var(--pub-fg-muted)',
                  marginBottom: 28, borderLeft: '2px solid var(--pub-accent)', paddingLeft: 20,
                }}>
                  {active.question}
                </p>
                <p style={{
                  fontFamily: 'var(--font-reading)', fontSize: '1rem', lineHeight: 1.78,
                  color: 'var(--pub-fg)', marginBottom: 32,
                }}>
                  {active.description}
                </p>
                <div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pub-fg-faint)', marginBottom: 10 }}>
                    Covered in
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {active.places.map(p => (
                      <button key={p} onClick={() => navigate('places')}
                        style={{
                          fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 500,
                          letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--pub-fg)',
                          background: 'none', border: '1px solid var(--pub-border)',
                          padding: '5px 12px', cursor: 'pointer', transition: 'border-color 0.2s',
                        }}
                        onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--pub-fg)')}
                        onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--pub-border)')}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 32 }}>
                  <button onClick={() => navigate('feature')} style={{
                    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--pub-fg)', background: 'none', border: 'none',
                    borderBottom: '1px solid var(--pub-fg)', cursor: 'pointer', padding: '0 0 2px 0',
                  }}>
                    Read Stories on {active.name} →
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ paddingTop: 40 }}>
                <p style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
                  fontSize: '1.3rem', lineHeight: 1.5, color: 'var(--pub-fg-faint)', maxWidth: 360,
                }}>
                  Select a force to explore the question it opens.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden flex flex-col">
          {forces.map((force, i) => (
            <div key={force.name} style={{ borderTop: '1px solid var(--pub-border)', borderBottom: i === forces.length - 1 ? '1px solid var(--pub-border)' : 'none' }}>
              <button
                onClick={() => setActiveForce(activeForce === force.name ? null : force.name)}
                className="w-full flex items-center justify-between py-4 text-left"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.3rem', color: 'var(--pub-fg)', letterSpacing: '-0.015em' }}>
                  {force.name}
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--pub-fg-faint)' }}>
                  {activeForce === force.name ? '−' : '+'}
                </span>
              </button>
              {activeForce === force.name && (
                <div style={{ paddingBottom: 20 }}>
                  <p style={{ fontFamily: 'var(--font-reading)', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--pub-fg-muted)', marginBottom: 12 }}>
                    {force.question}
                  </p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, lineHeight: 1.65, color: 'var(--pub-fg-muted)' }}>
                    {force.description}
                  </p>
                </div>
              )}
            </div>
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
