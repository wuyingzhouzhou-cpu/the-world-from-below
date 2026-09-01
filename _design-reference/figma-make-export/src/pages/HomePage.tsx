import { useEffect, useState } from 'react'
import { BRAND, photo, PHOTOS } from '../config'
import { Marginalia } from '../components/editorial/EditorialMarginalia'
import HomeSections from '../components/home/HomeSections'
import type { View } from '../App'

interface Props { navigate: (v: View) => void }

export default function HomePage({ navigate }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    document.body.removeAttribute('data-mood')
  }, [])

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
              {/* Roman — not italic. Documentary, not literary fashion. */}
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(1.7rem, 3.8vw, 3.2rem)',
                lineHeight: 1.2,
                color: 'var(--pub-fg)',
                letterSpacing: '-0.02em',
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

      {/* ── Photo Cover — Lead Feature ───────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--pub-border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Hero image */}
          <div style={{ position: 'relative', height: 'clamp(300px, 50vw, 640px)', overflow: 'hidden', background: '#1a1510' }}>
            <img
              src={photo(PHOTOS.factoryHero, 1800, 900)}
              alt="PLACEHOLDER IMAGE — industrial scene, editorial demo"
              onLoad={() => setImgLoaded(true)}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
                opacity: imgLoaded ? 1 : 0,
                animation: imgLoaded ? 'imgReveal 0.8s ease forwards' : 'none',
                filter: 'grayscale(30%) contrast(1.04)',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,12,8,0.42) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', top: 16, left: 20 }}>
              <Marginalia lines={['Feature Story · Issue 001', 'EDITORIAL DEMO']} />
            </div>
          </div>

          {/* Story info below image */}
          <div className="px-5 md:px-12 py-8 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
                <Marginalia lines={['Work / Northeast China / Industrial Decline']} />
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(2rem, 4.5vw, 4.2rem)', lineHeight: 1.0,
                color: 'var(--pub-fg)', letterSpacing: '-0.03em', marginBottom: 16,
              }}>
                When the Factory Closed
              </h2>
              <p style={{
                fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.72,
                color: 'var(--pub-fg-muted)', maxWidth: 520, marginBottom: 24,
              }}>
                In the industrial northeast of China, the collapse of the state-owned work unit meant more than unemployment. It meant the end of a world — a way of life built around factory gates, neighbourhood canteens, and a promise the state no longer kept.
              </p>
              <button onClick={() => navigate('feature')} style={{
                fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--pub-fg)', background: 'none', border: 'none',
                borderBottom: '1px solid var(--pub-fg)', cursor: 'pointer',
                padding: '0 0 2px 0', transition: 'opacity 0.2s',
              }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.5')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
              >Read the Story →</button>
            </div>
            <div className="hidden md:flex flex-col justify-end gap-2">
              <Marginalia lines={['PLACEHOLDER IMAGE', 'Example caption — editorial demo only.', '22 min read']} />
            </div>
          </div>
        </div>
      </section>

      <HomeSections navigate={navigate} />
    </main>
  )
}
