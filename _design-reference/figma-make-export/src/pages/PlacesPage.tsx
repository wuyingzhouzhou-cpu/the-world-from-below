import { useEffect } from 'react'
import { photo } from '../config'
import { Marginalia } from '../components/editorial/EditorialMarginalia'
import { places } from '../data/demoContent'
import type { View } from '../App'

interface Props { navigate: (v: View) => void }

export default function PlacesPage({ navigate }: Props) {
  useEffect(() => {
    document.body.removeAttribute('data-mood')
  }, [])

  return (
    <main>
      <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-6 md:px-12 pt-16 pb-24">

        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--pub-border)', paddingBottom: 40, marginBottom: 56 }}>
          <span style={{
            fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-accent)',
            display: 'block', marginBottom: 16,
          }}>Places</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: 1.0,
              color: 'var(--pub-fg)', letterSpacing: '-0.03em',
            }}>
              Geographic Entry Points
            </h1>
            <p style={{
              fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.72,
              color: 'var(--pub-fg-muted)', maxWidth: 420,
            }}>
              Each place is a way of entering larger questions about work, migration, family, and power. Not a destination — a perspective.
            </p>
          </div>
        </div>

        {/* Places — asymmetric mosaic */}
        <div className="flex flex-col gap-px" style={{ background: 'var(--pub-border)' }}>

          {/* First place — large hero row */}
          {places.slice(0, 1).map(place => (
            <button
              key={place.name}
              onClick={() => navigate('feature')}
              className="group w-full text-left grid grid-cols-1 md:grid-cols-2"
              style={{ background: 'var(--pub-bg)', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ position: 'relative', height: 'clamp(260px, 35vw, 500px)', overflow: 'hidden', background: '#1a1510' }}>
                <img
                  src={photo(place.imgId, 1200, 800)}
                  alt={`PLACEHOLDER IMAGE — ${place.name} editorial demo`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)', transition: 'transform 0.6s ease' }}
                  className="group-hover:scale-[1.03]"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,12,8,0.15)' }} />
              </div>
              <div className="p-6 md:p-12 flex flex-col justify-center">
                <Marginalia lines={[`Place ${String(places.indexOf(place) + 1).padStart(3, '0')} · ${place.country} · ${place.storyCount} stories`]} className="mb-4" />
                <p style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.0,
                  color: 'var(--pub-fg)', letterSpacing: '-0.03em', marginBottom: 14,
                }}>
                  {place.name}
                </p>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.7,
                  color: 'var(--pub-fg-muted)', maxWidth: 380, marginBottom: 20,
                }}>
                  {place.summary}
                </p>
                <div className="flex flex-wrap gap-3">
                  {place.forces.map(f => (
                    <span key={f} style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pub-accent)' }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}

          {/* Remaining — 2 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'var(--pub-border)' }}>
            {places.slice(1).map(place => (
              <button
                key={place.name}
                onClick={() => navigate('feature')}
                className="group text-left"
                style={{ background: 'var(--pub-bg)', border: 'none', cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', height: 'clamp(220px, 25vw, 360px)', overflow: 'hidden', background: '#1a1510' }}>
                  <img
                    src={photo(place.imgId, 800, 600)}
                    alt={`PLACEHOLDER IMAGE — ${place.name} editorial demo`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)', transition: 'transform 0.6s ease' }}
                    className="group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <Marginalia lines={[`Place ${String(places.indexOf(place) + 1).padStart(3, '0')} · ${place.country}`]} className="mb-2" />
                  <p style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.1,
                    color: 'var(--pub-fg)', letterSpacing: '-0.025em', marginBottom: 10,
                  }}>
                    {place.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.65, color: 'var(--pub-fg-muted)', marginBottom: 14 }}>
                    {place.summary}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {place.forces.map(f => (
                      <span key={f} style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pub-accent)' }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
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
