import { useEffect } from 'react'
import { useReadingProgress } from '../../hooks/useReadingProgress'
import { Marginalia } from '../../components/editorial/EditorialMarginalia'
import type { View } from '../../App'

interface Props { navigate: (v: View) => void }

const Body = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontFamily: 'var(--font-reading)',
    fontSize: '1.1rem',
    lineHeight: 1.85,
    color: 'var(--pub-fg)',
    marginBottom: 28,
  }}>{children}</p>
)

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote style={{ margin: '52px 0', padding: '0 0 0 0' }}>
    <p style={{
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
      lineHeight: 1.38,
      color: 'var(--pub-fg)',
      letterSpacing: '-0.015em',
      borderTop: '1px solid var(--pub-accent)',
      paddingTop: 20,
    }}>{children}</p>
  </blockquote>
)

export default function EssayArticle({ navigate }: Props) {
  const progress = useReadingProgress()

  useEffect(() => {
    document.body.setAttribute('data-mood', 'quiet')
    return () => document.body.removeAttribute('data-mood')
  }, [])

  return (
    <main>
      {/* Reading progress */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: `${progress * 100}%`,
        background: 'var(--pub-accent)',
        zIndex: 200,
        transition: 'width 0.1s linear',
      }} aria-hidden />

      {/* Essay header */}
      <div style={{ maxWidth: 720, margin: '0 auto' }} className="px-6 pt-16 pb-12">
        <div className="flex items-center gap-3 mb-8">
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-accent)' }}>Essay</span>
          <span style={{ color: 'var(--pub-border)', fontSize: 14 }}>·</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-fg-muted)' }}>Class · Identity</span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
          lineHeight: 1.08,
          color: 'var(--pub-fg)',
          letterSpacing: '-0.03em',
          marginBottom: 24,
        }}>
          The Persistence of Class
        </h1>
        <p style={{
          fontFamily: 'var(--font-reading)',
          fontStyle: 'italic',
          fontSize: '1.15rem',
          lineHeight: 1.65,
          color: 'var(--pub-fg-muted)',
          marginBottom: 32,
        }}>
          On what it means to cross a social boundary you were never supposed to cross — and what you carry back with you.
        </p>
        <div
          className="flex items-center gap-4"
          style={{ borderTop: '1px solid var(--pub-border)', borderBottom: '1px solid var(--pub-border)', padding: '14px 0' }}
        >
          <Marginalia lines={['By [Author Name]']} />
          <span style={{ color: 'var(--pub-border)' }}>·</span>
          <Marginalia lines={['Editorial Demo · Oct 2026']} />
          <span style={{ color: 'var(--pub-border)' }}>·</span>
          <Marginalia lines={['14 min read']} />
        </div>
      </div>

      {/* Essay body */}
      <div style={{ maxWidth: 720, margin: '0 auto' }} className="px-6 pb-20">

        <Body>
          There is a particular embarrassment that comes from being asked, at a dinner party, what your father does for a living. Not shame, exactly — something quieter and more specific than shame. A calculation. A sentence revised before it leaves your mouth.
        </Body>

        <Body>
          My father drove a delivery lorry for thirty-one years. He was good at it. He knew every road in a fifty-mile radius, could back into spaces other drivers wouldn't attempt, got home on time. He liked his work. I was the first in my family to attend university, and by the time I was twenty-four, I was living in a world where almost no one would have known what to say to him.
        </Body>

        <PullQuote>
          "Class mobility is often described as a triumph. What it less often describes is what you leave behind — or rather, that you leave behind."
        </PullQuote>

        <Body>
          I have been thinking about class mobility lately — about what the phrase actually describes when you get close to it. It is usually presented as an achievement: a son or daughter escaping the limits of their origin, rising through education or work into a better life. The metaphor is always upward. But the metaphor hides something important about what crossing a class boundary actually involves.
        </Body>

        <Body>
          It involves, among other things, learning to talk differently. Not just vocabulary — though that too — but the pacing of sentences, the register of complaint, the subjects one is expected to have opinions about. It involves learning which silences are comfortable and which are not, and why certain topics are raised in some rooms and not others. It involves, gradually, becoming a different kind of person from the kind of person your parents are.
        </Body>

        <Body>
          The British sociologist Mike Savage, writing about class and culture, calls this a process of "disconnection." You acquire new competencies, new habits, new affiliations. The old ones don't disappear — they become, instead, a kind of interior second language, one you speak less frequently, that grows rusty at the edges.
        </Body>

        <PullQuote>
          "The working-class child who makes it is celebrated for escaping. Nobody asks what they escape from, or whether escape is really the right word."
        </PullQuote>

        <Body>
          Betty Smith understood this. In <em>A Tree Grows in Brooklyn</em>, Francie Nolan's ambitions are inseparable from her discomfort — her awareness, even as a child, that the world she is reaching toward has rules she has not been taught. The novel is brilliant about the texture of aspiration when aspiration is a form of departure.
        </Body>

        <Body>
          What I want to argue is something that sounds simple but is harder to sit with: class is not just an economic category. It is a cultural inheritance, a way of seeing, a set of dispositions toward the world — and those dispositions do not vanish when your income changes. You carry them. They surface at unexpected moments: in the way you talk to repair people, in the type of food you associate with comfort, in the obscure embarrassment at dinner parties.
        </Body>

        <Body>
          This is not a complaint. I am grateful for the education I received, the opportunities it opened, the world it gave me access to. But I have become suspicious of the way "access" functions as a complete sentence. Access to what? On whose terms? With what parts of yourself left at the door?
        </Body>

        <Body>
          My father retired four years ago. He still knows every road within fifty miles of where he grew up. He is still good at things I have never learned to be good at. When I am around him, I sometimes feel the two versions of myself — the one he raised and the one I became — sitting quietly together, not quite reconciled, watching each other with something like recognition.
        </Body>

        {/* Sources */}
        <div style={{ borderTop: '1px solid var(--pub-border)', marginTop: 56, paddingTop: 28 }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pub-fg-faint)', marginBottom: 12 }}>Further Reading</p>
          {[
            'Betty Smith, A Tree Grows in Brooklyn (1943)',
            'Mike Savage, Social Class in the 21st Century (2015)',
            'Richard Hoggart, The Uses of Literacy (1957)',
          ].map(s => (
            <p key={s} style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--pub-fg-faint)', lineHeight: 1.7, marginBottom: 4 }}>{s}</p>
          ))}
        </div>

        {/* Related */}
        <div style={{ borderTop: '1px solid var(--pub-border)', marginTop: 48, paddingTop: 28 }}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pub-fg-faint)', marginBottom: 10 }}>Related Forces</p>
              {['Class', 'Education', 'Identity'].map(f => (
                <button key={f} onClick={() => navigate('forces')}
                  style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--pub-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0' }}>{f}</button>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pub-fg-faint)', marginBottom: 10 }}>Library</p>
              {['A Tree Grows in Brooklyn', 'The Uses of Literacy'].map(l => (
                <button key={l} onClick={() => navigate('library')}
                  style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--pub-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0' }}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <button
            onClick={() => navigate('home')}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--pub-fg-muted)',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid var(--pub-border)',
              cursor: 'pointer',
              padding: '0 0 2px 0',
            }}
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
    </main>
  )
}
