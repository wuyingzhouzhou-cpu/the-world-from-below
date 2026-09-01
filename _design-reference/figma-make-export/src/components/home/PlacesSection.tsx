import { photo, PHOTOS } from '../../config'
import { Marginalia } from '../editorial/EditorialMarginalia'
import type { View } from '../../App'

interface Props { navigate: (v: View) => void }

const Lbl = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--pub-fg-muted)',
  }}>{children}</span>
)

const secondaryPlaces = [
  { name: 'Brooklyn',     id: PHOTOS.brooklynBuilding, n: '002', region: 'New York · USA' },
  { name: 'Mumbai',       id: PHOTOS.mumbaiSkyline,    n: '003', region: 'India' },
  { name: 'Kuala Lumpur', id: PHOTOS.runnersWatcher,   n: '004', region: 'Malaysia' },
  { name: 'Oakland',      id: PHOTOS.bench,            n: '005', region: 'California · USA' },
]

export default function PlacesSection({ navigate }: Props) {
  return (
    <section style={{ borderBottom: '1px solid var(--pub-border)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-6 md:px-12 py-14">
        <div className="flex items-baseline justify-between mb-8">
          <Lbl>From Different Places</Lbl>
          <button onClick={() => navigate('places')} style={{
            fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--pub-fg-faint)', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>All Places →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Large Shenyang */}
          <div className="md:col-span-6 relative cursor-pointer group"
            style={{ height: 'clamp(260px, 32vw, 440px)', overflow: 'hidden', background: '#1a1510' }}
            onClick={() => navigate('places')}>
            <img src={photo(PHOTOS.trainStation, 1200, 900)} alt="PLACEHOLDER IMAGE — editorial demo"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)', transition: 'transform 0.6s ease' }}
              className="group-hover:scale-[1.03]" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,12,8,0.72) 0%, transparent 58%)' }} />
            <div style={{ position: 'absolute', top: 14, left: 16 }}><Marginalia lines={['Place 001', 'Northeast China']} /></div>
            <div style={{ position: 'absolute', bottom: 18, left: 18 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: '#E8E2D8', letterSpacing: '-0.02em', lineHeight: 1 }}>Shenyang</p>
            </div>
          </div>
          {/* 2×2 grid */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            {secondaryPlaces.map(p => (
              <div key={p.name} className="relative cursor-pointer group"
                style={{ height: 'clamp(140px, 16vw, 212px)', overflow: 'hidden', background: '#1a1510' }}
                onClick={() => navigate('places')}>
                <img src={photo(p.id, 700, 500)} alt={`PLACEHOLDER IMAGE — ${p.name} editorial demo`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)', transition: 'transform 0.6s ease' }}
                  className="group-hover:scale-[1.04]" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,12,8,0.7) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', top: 10, left: 12 }}><Marginalia lines={[`Place ${p.n}`]} /></div>
                <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#E8E2D8', letterSpacing: '-0.01em', lineHeight: 1 }}>{p.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
