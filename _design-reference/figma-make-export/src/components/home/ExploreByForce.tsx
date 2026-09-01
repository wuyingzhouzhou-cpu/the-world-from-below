import { Marginalia } from '../editorial/EditorialMarginalia'
import { homeForces } from '../../data/demoContent'
import type { View } from '../../App'

interface Props { navigate: (v: View) => void }

const Lbl = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--pub-fg-muted)',
  }}>{children}</span>
)

export default function ExploreByForce({ navigate }: Props) {
  return (
    <section style={{ borderBottom: '1px solid var(--pub-border)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="hidden md:block md:col-span-2 pt-1">
            <Marginalia lines={['Forces', '—', 'Shaping', 'Ordinary', 'Life']} />
          </div>
          <div className="md:col-span-7">
            <div className="flex items-center justify-between mb-7">
              <Lbl>Explore by Force</Lbl>
              <button onClick={() => navigate('forces')} style={{
                fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--pub-fg-faint)', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}>All Forces →</button>
            </div>
            <div>
              {homeForces.map((f, i) => (
                <button key={f.name} onClick={() => navigate('forces')}
                  className="flex items-baseline gap-4 w-full text-left group"
                  style={{
                    borderBottom: '1px solid var(--pub-border)',
                    padding: f.weight === 'primary' ? '13px 0' : '8px 0',
                    paddingLeft: i % 4 === 2 ? 20 : 0,
                    background: 'none', border: 'none',
                    borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'var(--pub-border)',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'var(--pub-fg-faint)', width: 20, flexShrink: 0 }}>{f.n}</span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: f.weight === 'primary' ? 700 : 400,
                    fontSize: f.weight === 'primary' ? 'clamp(1.5rem, 2.8vw, 2.6rem)' : 'clamp(0.95rem, 1.6vw, 1.35rem)',
                    color: 'var(--pub-fg)', letterSpacing: f.weight === 'primary' ? '-0.025em' : '-0.01em',
                    lineHeight: 1.1, flex: 1, transition: 'opacity 0.2s',
                  }}
                    className="group-hover:opacity-60"
                  >{f.name}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'var(--pub-fg-faint)', flexShrink: 0 }}>→</span>
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:block md:col-span-3 pt-10">
            <div style={{ borderLeft: '1px solid var(--pub-border)', paddingLeft: 20 }}>
              <Marginalia lines={['01 — Work', 'Featured Force']} className="mb-4" />
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.65, color: 'var(--pub-fg-muted)' }}>
                What does labour do to a life — not just economically, but psychologically, socially, temporally?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
