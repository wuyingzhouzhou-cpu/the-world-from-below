import { useEffect } from 'react'
import { useReadingProgress } from '../../hooks/useReadingProgress'
import { Marginalia } from '../../components/editorial/EditorialMarginalia'
import type { View } from '../../App'

interface Props { navigate: (v: View) => void }

const SectionHead = ({ label, n }: { label: string; n: string }) => (
  <div className="flex items-center gap-5 mb-6" style={{ borderTop: '1px solid var(--pub-border)', paddingTop: 20 }}>
    <Marginalia lines={[n]} />
    <p style={{
      fontFamily: 'var(--font-ui)',
      fontSize: 9,
      fontWeight: 500,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--pub-fg-muted)',
    }}>
      {label}
    </p>
  </div>
)

const Body = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontFamily: 'var(--font-reading)',
    fontSize: '1.05rem',
    lineHeight: 1.82,
    color: 'var(--pub-fg)',
    marginBottom: 22,
  }}>{children}</p>
)

export default function LibraryItemDetail({ navigate }: Props) {
  const progress = useReadingProgress()

  useEffect(() => {
    document.body.setAttribute('data-mood', 'archive')
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

      <div style={{ maxWidth: 1200, margin: '0 auto' }} className="px-6 md:px-12 pt-14 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <div className="md:col-span-3">
            <div style={{ position: 'sticky', top: 80 }}>

              {/* Book representation */}
              <div style={{
                width: '100%', maxWidth: 180, aspectRatio: '2/3',
                background: '#2A1F14', display: 'flex', flexDirection: 'column',
                padding: 16, marginBottom: 24, justifyContent: 'space-between',
              }}>
                <div style={{ width: '100%', height: 1, background: '#C8B89A', opacity: 0.4 }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.95rem', lineHeight: 1.35, color: '#C8B89A', marginBottom: 8 }}>
                    A Tree Grows in Brooklyn
                  </p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(200,184,154,0.5)' }}>
                    Betty Smith
                  </p>
                </div>
                <div style={{ width: '100%', height: 1, background: '#C8B89A', opacity: 0.4 }} />
              </div>

              {/* Meta table */}
              <div className="flex flex-col gap-0">
                {[
                  { label: 'Author', value: 'Betty Smith' },
                  { label: 'Published', value: '1943' },
                  { label: 'Type', value: 'Novel' },
                  { label: 'Setting', value: 'Brooklyn, New York' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ borderBottom: '1px solid var(--pub-border)', padding: '10px 0' }}>
                    <Marginalia lines={[label]} className="mb-1" />
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--pub-fg)' }}>{value}</p>
                  </div>
                ))}
                <div style={{ padding: '14px 0' }}>
                  <Marginalia lines={['Forces']} className="mb-2" />
                  {['Class', 'Family', 'Education', 'Identity'].map(f => (
                    <button key={f} onClick={() => navigate('forces')}
                      style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--pub-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: '1px 0' }}>
                      {f}
                    </button>
                  ))}
                </div>
                <div style={{ padding: '14px 0', borderTop: '1px solid var(--pub-border)' }}>
                  <Marginalia lines={['Related Place']} className="mb-2" />
                  <button onClick={() => navigate('places')}
                    style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--pub-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    Brooklyn
                  </button>
                </div>
              </div>

              {/* Borrow/find — very secondary */}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--pub-border)' }}>
                <Marginalia lines={['Find This Book']} className="mb-3" />
                <div className="flex flex-col gap-2">
                  {['WorldCat (libraries)', 'Open Library (free)', 'Bookshop.org'].map(link => (
                    <a key={link} href="#" onClick={e => e.preventDefault()}
                      style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--pub-fg-faint)', textDecoration: 'none', display: 'block', transition: 'color 0.2s' }}
                      onMouseOver={e => (e.currentTarget.style.color = 'var(--pub-fg)')}
                      onMouseOut={e => (e.currentTarget.style.color = 'var(--pub-fg-faint)')}
                    >
                      {link} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Main content ─────────────────────────────────────────── */}
          <div className="md:col-span-9">

            {/* Header */}
            <div style={{ borderBottom: '1px solid var(--pub-border)', marginBottom: 36, paddingBottom: 24 }}>
              <Marginalia lines={['Library · Book · 001']} className="mb-4" />
              <h1 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3.4rem)', lineHeight: 1.08,
                color: 'var(--pub-fg)', letterSpacing: '-0.03em', marginBottom: 10,
              }}>
                A Tree Grows in Brooklyn
              </h1>
              <p style={{
                fontFamily: 'var(--font-reading)', fontStyle: 'italic',
                fontSize: '1.05rem', lineHeight: 1.62, color: 'var(--pub-fg-muted)',
              }}>
                A girl grows up in poverty in Williamsburg, Brooklyn. What it teaches about dignity, aspiration, and the weight of what a family carries.
              </p>
            </div>

            {/* I. WHY I CAME TO THIS BOOK */}
            <section style={{ marginBottom: 40 }}>
              <SectionHead label="Why I Came to This Book" n="I" />
              <Body>
                We came to this book because it does something rare in fiction about poverty: it refuses to use poverty as metaphor. The Nolan family's material conditions are not symbolic of spiritual deprivation, or noble suffering, or the tragedy of the underclass. They are simply conditions — difficult, sometimes humiliating, sometimes funny, usually managed — inside which people live complicated and recognizable lives.
              </Body>
              <Body>
                Francie Nolan, the novel's protagonist, is eleven when the book begins. She is observant, stubborn, and a reader. The library is the most important building in her world. She has read every book in alphabetical order — or is trying to. She is not a symbol of hope. She is a child trying to understand the world she has been born into.
              </Body>
            </section>

            {/* II. WHOSE WORLD DOES IT OPEN? */}
            <section style={{ marginBottom: 40 }}>
              <SectionHead label="Whose World Does It Open?" n="II" />
              <Body>
                The world of early 20th century Williamsburg, Brooklyn — Irish and German and Jewish immigrants crowded into tenements, working irregular jobs, running up credit at the grocery, sending their children to school in shoes that have been resoled twice. A world of resourcefulness and dignity inside extreme economic constraint.
              </Body>
              <Body>
                But the novel opens something beyond its specific time and place. It opens the question of what aspiration looks like from the inside when you are reaching toward a world that wasn't built for you. Francie is always conscious of distance — between her family and the families who don't have to think about money, between her and the teachers who don't quite see her.
              </Body>

              {/* Pull quote — archive style */}
              <div style={{ borderTop: '2px solid var(--pub-accent)', borderBottom: '1px solid var(--pub-border)', margin: '32px 0', padding: '22px 0' }}>
                <p style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
                  fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', lineHeight: 1.42,
                  color: 'var(--pub-fg)', letterSpacing: '-0.01em',
                }}>
                  "She was of the people and for the people. Her people. She had the same roots as they. She understood them."
                </p>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'var(--pub-fg-faint)', marginTop: 8, letterSpacing: '0.08em' }}>
                  — Betty Smith, A Tree Grows in Brooklyn
                </p>
              </div>
            </section>

            {/* III. THE LARGER FORCES */}
            <section style={{ marginBottom: 40 }}>
              <SectionHead label="The Larger Forces" n="III" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { force: 'Class', text: "Class is present in every scene without ever being named. It is in the shoes, the food, the teachers' assumptions, the neighbors' judgments." },
                  { force: 'Education', text: "Education is both the route out and the thing that separates you. Francie learns things that move her away from her family in ways she can't quite articulate." },
                  { force: 'Family', text: "The Nolans are not a perfect family. The father drinks. The mother has favourites. They love each other in a complicated, imperfect, entirely believable way." },
                  { force: 'Identity', text: "Who is Francie Nolan? The question runs through the whole novel. She is making herself in conditions that press toward one kind of person and she insists on being another." },
                ].map(item => (
                  <div key={item.force} style={{ borderLeft: '1px solid var(--pub-border)', paddingLeft: 16 }}>
                    <button
                      onClick={() => navigate('forces')}
                      style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pub-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 6px 0', display: 'block' }}
                    >
                      {item.force}
                    </button>
                    <p style={{ fontFamily: 'var(--font-reading)', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--pub-fg-muted)' }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* IV. WHAT CHOICES REMAIN? */}
            <section style={{ marginBottom: 40 }}>
              <SectionHead label="What Choices Remain?" n="IV" />
              <Body>
                This is the question the novel is really about. The Nolans don't have many choices. Their freedom of movement — in economic, social, and geographical terms — is narrow. What Smith shows with great precision is how much can still be chosen inside that narrowness: what to notice, what to value, how to treat other people, what to insist on about yourself.
              </Body>
              <Body>
                The tree of the title is a Tree of Heaven — a weed tree that grows in vacant lots and through cracks in pavement, requiring almost nothing. It is not a beautiful metaphor. It is accurate.
              </Body>
            </section>

            {/* V. ONE QUESTION */}
            <section style={{ marginBottom: 40 }}>
              <SectionHead label="One Question I Kept Thinking About" n="V" />
              <div style={{ background: 'var(--pub-card)', padding: 24, borderLeft: '2px solid var(--pub-accent)' }}>
                <p style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', lineHeight: 1.45,
                  color: 'var(--pub-fg)',
                }}>
                  When education is both the path out and the thing that separates you from the people you love — what exactly are you choosing, and what are you giving up?
                </p>
              </div>
            </section>

            {/* VI. READ / WATCH NEXT */}
            <section style={{ marginBottom: 40 }}>
              <SectionHead label="Read / Watch Next" n="VI" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Factory Girls', author: 'Leslie T. Chang', medium: 'Book', note: 'Aspiration inside economic constraint — in a very different setting.' },
                  { title: 'Still Life', author: 'Jia Zhangke', medium: 'Film', note: 'Ordinary people navigating loss in post-industrial China.' },
                  { title: 'The Uses of Literacy', author: 'Richard Hoggart', medium: 'Book', note: 'On working-class culture — what it is, and what happens to it.' },
                ].map(item => (
                  <button
                    key={item.title}
                    onClick={() => navigate('library')}
                    className="text-left"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Marginalia lines={[item.medium]} className="mb-2" />
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--pub-fg)', marginBottom: 3 }}>{item.title}</p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--pub-fg-faint)', marginBottom: 8 }}>{item.author}</p>
                    <p style={{ fontFamily: 'var(--font-reading)', fontStyle: 'italic', fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--pub-fg-muted)' }}>{item.note}</p>
                  </button>
                ))}
              </div>
            </section>

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
        </div>
      </div>
    </main>
  )
}
