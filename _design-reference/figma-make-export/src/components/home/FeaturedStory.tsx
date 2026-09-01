import { photo, PHOTOS } from '../../config'
import { Marginalia } from '../editorial/EditorialMarginalia'
import type { View } from '../../App'

interface Props { navigate: (v: View) => void }

export default function FeaturedStory({ navigate }: Props) {
  return (
    <section style={{ borderBottom: '1px solid var(--pub-border)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px" style={{ background: 'var(--pub-border)' }}>

          {/* Field Note — dark panel */}
          <div className="md:col-span-3 p-7 flex flex-col justify-between" style={{ background: 'var(--pub-fg)', minHeight: 340 }}>
            <div>
              <Marginalia lines={['Field Note · 001', '02 Sep 2026']} className="mb-5" />
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: '1.35rem', lineHeight: 1.32, color: '#E8E2D8',
              }}>
                "Why is humiliation such an effective form of control?"
              </h3>
            </div>
            <button onClick={() => navigate('field-note')} style={{
              fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(232,226,216,0.5)', background: 'none', border: 'none',
              borderBottom: '1px solid rgba(232,226,216,0.2)', cursor: 'pointer',
              padding: '0 0 2px 0', alignSelf: 'flex-start', transition: 'color 0.2s',
            }}
              onMouseOver={e => (e.currentTarget.style.color = '#E8E2D8')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(232,226,216,0.5)')}
            >Read →</button>
          </div>

          {/* Book */}
          <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between" style={{ background: 'var(--pub-card)', minHeight: 340 }}>
            <div>
              <div className="flex items-start gap-5 mb-5">
                <div style={{ width: 64, height: 88, flexShrink: 0, background: '#2A1F14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 7 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 7.5, lineHeight: 1.4, color: '#C8B89A', textAlign: 'center' }}>A Tree Grows in Brooklyn</span>
                </div>
                <div>
                  <Marginalia lines={['Book']} className="mb-3" />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.3rem', lineHeight: 1.2, color: 'var(--pub-fg)', marginBottom: 3 }}>
                    A Tree Grows in Brooklyn
                  </h3>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--pub-fg-faint)' }}>Betty Smith · 1943</p>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.65, color: 'var(--pub-fg-muted)' }}>
                A girl growing up poor in Williamsburg. What dignity looks like when you have almost nothing.
              </p>
            </div>
            <button onClick={() => navigate('book')} style={{
              fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--pub-fg-muted)', background: 'none', border: 'none',
              borderBottom: '1px solid var(--pub-border)', cursor: 'pointer',
              padding: '0 0 2px 0', alignSelf: 'flex-start', transition: 'color 0.2s',
            }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--pub-fg)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--pub-fg-muted)')}
            >Library Entry →</button>
          </div>

          {/* Place */}
          <div className="md:col-span-4 relative" style={{ minHeight: 340, overflow: 'hidden', background: '#1a1510' }}>
            <img src={photo(PHOTOS.streetMarket, 800, 700)} alt="PLACEHOLDER IMAGE — street scene, editorial demo"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.82, filter: 'grayscale(20%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,12,8,0.78) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', top: 16, left: 16 }}>
              <Marginalia lines={['Place 001']} />
            </div>
            <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(232,226,216,0.5)', marginBottom: 6 }}>Place</p>
              <button onClick={() => navigate('places')} style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.9rem',
                color: '#E8E2D8', background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, letterSpacing: '-0.02em', lineHeight: 1, transition: 'opacity 0.2s',
              }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.72')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
              >Shenyang</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
