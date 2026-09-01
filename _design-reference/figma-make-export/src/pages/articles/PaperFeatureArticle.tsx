import { useEffect, useState } from 'react'
import { photo, PHOTOS } from '../../config'
import { useReadingProgress } from '../../hooks/useReadingProgress'
import { Marginalia } from '../../components/editorial/EditorialMarginalia'
import type { View } from '../../App'

interface Props { navigate: (v: View) => void }

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote style={{
    borderLeft: '2px solid var(--pub-accent)',
    paddingLeft: 24,
    margin: '44px 0',
  }}>
    <p style={{
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 'clamp(1.25rem, 2vw, 1.65rem)',
      lineHeight: 1.42,
      color: 'var(--pub-fg)',
      letterSpacing: '-0.01em',
    }}>{children}</p>
  </blockquote>
)

const Body = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontFamily: 'var(--font-reading)',
    fontSize: '1.1rem',
    lineHeight: 1.82,
    color: 'var(--pub-fg)',
    marginBottom: 24,
  }}>{children}</p>
)

export default function PaperFeatureArticle({ navigate }: Props) {
  const progress = useReadingProgress()
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    document.body.removeAttribute('data-mood')
    return () => document.body.removeAttribute('data-mood')
  }, [])

  return (
    <main>
      {/* Reading progress */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: 2,
        width: `${progress * 100}%`,
        background: 'var(--pub-accent)', zIndex: 200, transition: 'width 0.1s linear',
      }} aria-hidden />

      {/* ── Paper header ─────────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--pub-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }} className="px-6 md:px-12 pt-14 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="hidden md:block md:col-span-2 pt-2">
                <Marginalia lines={['Feature', 'Story', '—', 'Issue', '001']} />
              </div>
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-6">
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-accent)' }}>Feature Story</span>
                  <span style={{ color: 'var(--pub-border)' }}>·</span>
                  <Marginalia lines={['Work · Northeast China · 1990s']} />
                </div>
                <h1 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(2.1rem, 5.5vw, 5rem)', lineHeight: 1.04,
                  color: 'var(--pub-fg)', letterSpacing: '-0.035em', marginBottom: 20,
                }}>
                  When the Factory Closed
                </h1>
                <p style={{
                  fontFamily: 'var(--font-reading)', fontStyle: 'italic',
                  fontSize: '1.15rem', lineHeight: 1.65, color: 'var(--pub-fg-muted)', maxWidth: 560,
                }}>
                  In the industrial northeast of China, the collapse of the state-owned work unit meant more than unemployment. It meant the end of a world — a way of life built around factory gates, neighbourhood canteens, and a promise the state no longer kept.
                </p>
              </div>
              <div className="hidden md:block md:col-span-2">
                <div style={{ borderLeft: '1px solid var(--pub-border)', paddingLeft: 20, paddingTop: 4 }}>
                  <Marginalia lines={['Work', '—', 'Class', '—', 'Industrial', 'Decline']} />
                </div>
              </div>
            </div>
          </div>

          {/* Paper hero image — restrained, not theatrical */}
          <div style={{ position: 'relative', height: 'clamp(260px, 42vw, 560px)', overflow: 'hidden', background: '#1a1510' }}>
            <img
              src={photo(PHOTOS.factoryHero, 1800, 900)}
              alt="PLACEHOLDER IMAGE — industrial scene, editorial demo"
              onLoad={() => setHeroLoaded(true)}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
                opacity: heroLoaded ? 1 : 0, filter: 'grayscale(25%)',
                animation: heroLoaded ? 'imgReveal 0.7s ease forwards' : 'none',
              }}
            />
            <div style={{ position: 'absolute', bottom: 14, left: 20 }}>
              <Marginalia lines={['PLACEHOLDER IMAGE · Example caption — editorial demo only']} />
            </div>
          </div>
      </div>

      {/* ── Article body ─────────────────────────────────────────── */}
      <div style={{ maxWidth: 720, margin: '0 auto' }} className="px-6 py-14">

        {/* Byline */}
        <div
          className="flex flex-wrap items-center gap-4 mb-12"
          style={{ borderBottom: '1px solid var(--pub-border)', paddingBottom: 18 }}
        >
          <Marginalia lines={['By [Author Name]']} />
          <span style={{ color: 'var(--pub-border)' }}>·</span>
          <Marginalia lines={['Editorial Demo · Sep 2026']} />
          <span style={{ color: 'var(--pub-border)' }}>·</span>
          <Marginalia lines={['22 min read']} />
        </div>

        <Body>
          The factory gates at a state-owned machinery complex opened for the last time on a February morning in the late 1990s. Nobody photographed the moment. No one wrote it down. The workers who had gathered, as they always gathered, at the iron gates at six in the morning, waited for a manager who did not come. Eventually, around nine, a foreman appeared and told them, without ceremony, to go home.
        </Body>

        <Body>
          This is not a story about economics. It is a story about what happens to ordinary life when the structures that organize it — the factory, the work unit, the neighbourhood, the canteen — are removed. What fills the space. What does not.
        </Body>

        <PullQuote>
          "The danwei was not just a place of work. It was a city inside a city — it assigned apartments, ran schools, organized marriages, dispensed medicine."
        </PullQuote>

        <Body>
          In the industrial northeast of China, the work unit — danwei — was the organizing principle of social existence. Workers lived in company housing, ate in company canteens, sent their children to company schools. The factory did not simply employ you. It located you in the world.
        </Body>

        {/* Inline image */}
        <figure style={{ margin: '44px 0' }}>
          <div style={{ position: 'relative', overflow: 'hidden', background: '#1a1510', height: 380 }}>
            <img
              src={photo(PHOTOS.doorWorkers, 1200, 700)}
              alt="PLACEHOLDER IMAGE — editorial demo"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(25%)' }}
            />
          </div>
          <figcaption style={{ paddingLeft: 20, borderLeft: '1px solid var(--pub-border)', marginTop: 10 }}>
            <Marginalia lines={['PLACEHOLDER IMAGE · EXAMPLE CAPTION · Editorial demo only. Not a verified historical photograph.']} />
          </figcaption>
        </figure>

        <Body>
          The layoffs of the 1990s — what economists called "structural adjustment" and what workers called xiagang, a term roughly meaning "off the post" — displaced tens of millions of workers across China. In northeastern industrial cities, half or more of the industrial workforce lost their positions over a decade. The cities that had been engines of socialist production became, by the end of the century, places that young people left.
        </Body>

        <Body>
          But numbers do not describe what the collapse felt like. They do not describe the apartment buildings where elevators stopped working because building management had been dissolved along with the enterprise that funded it. They do not describe the men who could not find new work and spent their days at mahjong tables set up on factory floors that no longer ran machines.
        </Body>

        <PullQuote>
          "The hardest thing was explaining to your children why, after 30 years, you were no longer needed. There was no good explanation."
        </PullQuote>

        <Body>
          Jia Zhangke's film <em>Unknown Pleasures</em>, set in a similar rust-belt city in 2001, captures something of the texture of this moment — young men with no particular future, drifting through a landscape of construction sites and empty dance halls, their ambitions quietly leaking away. The film's feeling is the feeling of a world between two arrangements, with no clear rules about how to live in it.
        </Body>

        <Body>
          What the 1990s destroyed was not just employment. It destroyed a particular theory of security — the idea that work, once acquired, was permanent; that the state, whatever its other failures, would maintain the basic structure of a life. What replaced it was something more contingent, more exposed, and for the generation that lived through the transition, more frightening than anything they had been told to expect.
        </Body>

        {/* Sources */}
        <div style={{ borderTop: '1px solid var(--pub-border)', marginTop: 52, paddingTop: 24 }}>
          <Marginalia lines={['Sources & Reading']} className="mb-8" />
          {[
            "Ching Kwan Lee, Against the Law: Labor Protests in China's Rustbelt and Sunbelt (2007)",
            'Leslie T. Chang, Factory Girls (2008)',
            'Jia Zhangke, Platform (2000); Unknown Pleasures (2002); Still Life (2006)',
          ].map(s => (
            <p key={s} style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--pub-fg-faint)', lineHeight: 1.7, marginBottom: 4 }}>{s}</p>
          ))}
        </div>

        {/* Related */}
        <div style={{ borderTop: '1px solid var(--pub-border)', marginTop: 44, paddingTop: 24 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Marginalia lines={['Related Forces']} className="mb-6" />
              {['Work', 'Class', 'Industrial Decline'].map(f => (
                <button key={f} onClick={() => navigate('forces')}
                  style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--pub-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0' }}>{f}</button>
              ))}
            </div>
            <div>
              <Marginalia lines={['Related Places']} className="mb-6" />
              <button onClick={() => navigate('places')}
                style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--pub-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0' }}>Shenyang</button>
            </div>
            <div>
              <Marginalia lines={['Library']} className="mb-6" />
              {['Factory Girls', 'Still Life'].map(l => (
                <button key={l} onClick={() => navigate('library')}
                  style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--pub-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0' }}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 44 }}>
          <button
            onClick={() => navigate('home')}
            style={{
              fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--pub-fg-muted)', background: 'none', border: 'none',
              borderBottom: '1px solid var(--pub-border)', cursor: 'pointer', padding: '0 0 2px 0',
            }}
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
    </main>
  )
}
