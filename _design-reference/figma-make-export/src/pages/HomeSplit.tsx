import { useEffect, useState } from 'react'
import { BRAND, photo, PHOTOS } from '../config'
import { Marginalia } from '../components/editorial/EditorialMarginalia'
import HomeSections from '../components/home/HomeSections'
import type { View } from '../App'

interface Props { navigate: (v: View) => void }

export default function HomeSplit({ navigate }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => { document.body.removeAttribute('data-mood') }, [])

  return (
    <main>
      {/* ── Editorial statement ─────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--pub-border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-5 md:px-12 py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-6 md:gap-8">
            <div className="hidden md:block md:col-span-1">
              <Marginalia lines={['Vol. 1', 'No. 1', '—', 'Autumn', '2024']} />
            </div>
            <div className="md:col-span-7">
              <h1 style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(1.7rem, 3.8vw, 3.2rem)', lineHeight: 1.2,
                color: 'var(--pub-fg)', letterSpacing: '-0.02em',
              }}>
                {BRAND.question}
              </h1>
            </div>
            <div className="md:col-span-4">
              <div className="hidden md:block" style={{ borderLeft: '1px solid var(--pub-border)', paddingLeft: 'clamp(16px, 2vw, 32px)' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--pub-fg-muted)', lineHeight: 1.65, marginBottom: 14 }}>
                  {BRAND.tagline}
                </p>
                <Marginalia lines={['Editorial Demo · Issue 001']} />
              </div>
              <div className="md:hidden">
                <Marginalia lines={['Issue 001 · Autumn 2024']} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Split Cover — image narrow left, headline wide right ─────── */}
      <section style={{ borderBottom: '1px solid var(--pub-border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-12">

            {/* Image — 5/12 */}
            <div className="md:col-span-5 relative" style={{ height: 'clamp(280px, 44vw, 600px)', overflow: 'hidden', background: '#1a1510' }}>
              <img
                src={photo(PHOTOS.factoryHero, 900, 900)}
                alt="PLACEHOLDER IMAGE — editorial demo"
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%',
                  opacity: imgLoaded ? 1 : 0,
                  filter: 'grayscale(35%) contrast(1.05)',
                  animation: imgLoaded ? 'imgReveal 0.8s ease forwards' : 'none',
                }}
              />
              <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                <Marginalia lines={['PLACEHOLDER IMAGE', 'Editorial Demo']} />
              </div>
            </div>

            {/* Text — 7/12, deliberately unequal */}
            <div className="md:col-span-7 flex flex-col justify-center px-6 md:px-12 py-10 md:py-16"
              style={{ borderLeft: '1px solid var(--pub-border)' }}>

              <div className="flex items-center gap-4 mb-8">
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-accent)' }}>Feature Story</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(2.3rem, 5vw, 5rem)', lineHeight: 0.97,
                color: 'var(--pub-fg)', letterSpacing: '-0.035em', marginBottom: 20,
              }}>
                When the<br />Factory<br />Closed
              </h2>

              {/* Thin accent rule as visual pause */}
              <div style={{ width: 36, height: 2, background: 'var(--pub-accent)', margin: '4px 0 20px' }} />

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Marginalia lines={['Work / Northeast China / Industrial Decline']} />
              </div>

              <p style={{
                fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.7,
                color: 'var(--pub-fg-muted)', maxWidth: 380, marginBottom: 28,
              }}>
                In the industrial northeast of China, the collapse of the state-owned work unit meant more than unemployment.
              </p>

              <div className="flex items-center gap-6">
                <button onClick={() => navigate('feature')} style={{
                  fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--pub-fg)', background: 'none', border: 'none',
                  borderBottom: '1px solid var(--pub-fg)', cursor: 'pointer', padding: '0 0 2px 0',
                }}>Read the Story →</button>
                <Marginalia lines={['22 min read']} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeSections navigate={navigate} />
    </main>
  )
}
