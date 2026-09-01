import { Marginalia } from '../editorial/EditorialMarginalia'
import type { View } from '../../App'

interface Props { navigate: (v: View) => void }

const Lbl = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--pub-fg-muted)',
  }}>{children}</span>
)

const supporting = [
  { title: 'Still Life',     author: 'Jia Zhangke',    medium: 'Film', year: 2006, note: 'Two strangers searching for lost family along the Yangtze as it is flooded by the Three Gorges Dam.', bg: '#1A2030', fg: '#8AABB8', n: '002' },
  { title: 'Factory Girls',  author: 'Leslie T. Chang', medium: 'Book', year: 2008, note: 'Young women leave rural China for factory towns. What they seek, what it costs, what they build.',    bg: '#1F1820', fg: '#B8A0B0', n: '003' },
]

export default function LibrarySection({ navigate }: Props) {
  return (
    <section style={{ borderBottom: '1px solid var(--pub-border)', background: 'var(--pub-card)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-6 md:px-12 py-14">
        <div className="flex items-baseline justify-between mb-10">
          <Lbl>The Library</Lbl>
          <button onClick={() => navigate('library')} style={{
            fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--pub-fg-faint)', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>All Library →</button>
        </div>

        {/* Asymmetric: featured 7/12 + two stacked 5/12 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px" style={{ background: 'var(--pub-border)' }}>

          {/* Featured */}
          <button onClick={() => navigate('book')}
            className="md:col-span-7 p-8 md:p-10 text-left flex flex-col justify-between group"
            style={{ background: 'var(--pub-card)', border: 'none', cursor: 'pointer', minHeight: 320, transition: 'background 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.background = 'var(--pub-bg)')}
            onMouseOut={e => (e.currentTarget.style.background = 'var(--pub-card)')}
          >
            <div>
              <Marginalia lines={['Library 001 · Book · Featured']} className="mb-6" />
              <div className="flex items-start gap-8">
                <div style={{ width: 96, height: 136, flexShrink: 0, background: '#2A1F14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                  <div style={{ width: '100%', height: '100%', border: '1px solid rgba(200,184,154,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                    <div style={{ width: '100%', height: 1, background: '#C8B89A', opacity: 0.35 }} />
                    <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 9, lineHeight: 1.4, color: '#C8B89A', textAlign: 'center' }}>A Tree Grows in Brooklyn</span>
                    <div style={{ width: '100%', height: 1, background: '#C8B89A', opacity: 0.35 }} />
                  </div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1.1, color: 'var(--pub-fg)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                    A Tree Grows in Brooklyn
                  </h3>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--pub-fg-faint)', marginBottom: 16 }}>Betty Smith · Book · 1943</p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.68, color: 'var(--pub-fg-muted)' }}>
                    A working-class girl grows up in Williamsburg. Poverty held with stubbornness and love. Extraordinary in its attention to the texture of ordinary life.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24, borderTop: '1px solid var(--pub-border)', paddingTop: 14 }}>
              <Marginalia lines={['Class · Family · Education · Brooklyn']} />
            </div>
          </button>

          {/* Supporting two */}
          <div className="md:col-span-5 flex flex-col gap-px" style={{ background: 'var(--pub-border)' }}>
            {supporting.map(work => (
              <button key={work.title} onClick={() => navigate('library')}
                className="flex-1 p-7 text-left group"
                style={{ background: 'var(--pub-card)', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.background = 'var(--pub-bg)')}
                onMouseOut={e => (e.currentTarget.style.background = 'var(--pub-card)')}
              >
                <div className="flex items-start gap-4">
                  <div style={{ width: 48, height: 68, flexShrink: 0, background: work.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 6.5, lineHeight: 1.4, color: work.fg, textAlign: 'center' }}>{work.title}</span>
                  </div>
                  <div>
                    <Marginalia lines={[`Library ${work.n} · ${work.medium}`]} className="mb-2" />
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--pub-fg)', lineHeight: 1.2, marginBottom: 3 }}>{work.title}</p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--pub-fg-faint)', marginBottom: 10 }}>{work.author} · {work.year}</p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, lineHeight: 1.62, color: 'var(--pub-fg-muted)' }}>{work.note}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
