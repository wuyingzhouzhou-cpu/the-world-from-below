import { useEffect } from 'react'
import { BRAND } from '../config'
import { Marginalia } from '../components/editorial/EditorialMarginalia'
import HomeSections from '../components/home/HomeSections'
import type { View } from '../App'

interface Props { navigate: (v: View) => void }

export default function HomeTypographic({ navigate }: Props) {
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

      {/* ── Typographic Cover ────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--pub-border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-5 md:px-12 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

            {/* Number */}
            <div className="hidden md:flex md:col-span-1 flex-col items-center pt-3 gap-2">
              <Marginalia lines={['001']} />
              <div style={{ width: 1, height: 60, background: 'var(--pub-border)' }} />
            </div>

            {/* Headline — dominant, Roman */}
            <div className="md:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-accent)' }}>Feature Story</span>
                <span style={{ color: 'var(--pub-border)' }}>·</span>
                <Marginalia lines={['Work · Northeast China']} />
              </div>

              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(2.4rem, 7.5vw, 7rem)', lineHeight: 0.96,
                color: 'var(--pub-fg)', letterSpacing: '-0.04em',
                marginBottom: 36,
              }}>
                When the<br />Factory<br />Closed
              </h2>

              <p style={{
                fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.7,
                color: 'var(--pub-fg-muted)', maxWidth: 480, marginBottom: 32,
              }}>
                In the industrial northeast of China, the collapse of the state-owned work unit meant more than unemployment. It meant the end of a world — a way of life built around factory gates, neighbourhood canteens, and a promise the state no longer kept.
              </p>

              <button onClick={() => navigate('feature')} style={{
                fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--pub-fg)', background: 'none', border: 'none',
                borderBottom: '1px solid var(--pub-fg)', cursor: 'pointer',
                padding: '0 0 2px 0',
              }}>
                Read the Story →
              </button>
            </div>

            {/* Right annotation */}
            <div className="hidden md:flex md:col-span-3 flex-col items-end gap-4 pt-3">
              <div style={{ width: '100%', height: 2, background: 'var(--pub-accent)' }} />
              <Marginalia lines={['Work', '—', 'Class', '—', 'Industrial', 'Decline', '—', 'Northeast', 'China']} />
              <div style={{ marginTop: 'auto', paddingTop: 40 }}>
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
