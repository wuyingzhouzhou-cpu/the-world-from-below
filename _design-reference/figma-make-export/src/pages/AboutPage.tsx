import { useEffect } from 'react'
import { BRAND } from '../config'
import { Marginalia } from '../components/editorial/EditorialMarginalia'
import type { View } from '../App'

interface Props { navigate: (v: View) => void }

const Section = ({ folio, title, children }: { folio: string; title: string; children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-14"
    style={{ borderBottom: '1px solid var(--pub-border)' }}>
    <div className="hidden md:block md:col-span-2">
      <Marginalia lines={[folio]} />
    </div>
    <div className="md:col-span-7">
      <h2 style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--pub-accent)',
        marginBottom: 20,
      }}>
        {title}
      </h2>
      {children}
    </div>
    <div className="hidden md:block md:col-span-3" />
  </div>
)

const Body = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontFamily: 'var(--font-reading)',
    fontSize: '1.05rem',
    lineHeight: 1.85,
    color: 'var(--pub-fg)',
    marginBottom: 20,
  }}>{children}</p>
)

export default function AboutPage({ navigate }: Props) {
  useEffect(() => {
    document.body.setAttribute('data-mood', 'quiet')
    return () => document.body.removeAttribute('data-mood')
  }, [])

  return (
    <main>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--pub-border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }} className="px-6 md:px-12 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="hidden md:block md:col-span-2">
              <Marginalia lines={['About', '—', 'The Publication']} />
            </div>
            <div className="md:col-span-7">
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--pub-accent)',
                marginBottom: 20,
              }}>
                The Publication
              </p>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                lineHeight: 1.0,
                color: 'var(--pub-fg)',
                letterSpacing: '-0.03em',
                marginBottom: 20,
              }}>
                {BRAND.name}
              </h1>
              <p style={{
                fontFamily: 'var(--font-reading)',
                fontSize: '1.1rem',
                lineHeight: 1.72,
                color: 'var(--pub-fg-muted)',
                maxWidth: 520,
              }}>
                An independent documentary editorial magazine. We report on how ordinary people live in a world they didn't design.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: 1200, margin: '0 auto' }} className="px-6 md:px-12">

        <Section folio="ABOUT 001" title="Why This Publication Exists">
          <Body>
            Most journalism is written from the top down — from governments, markets, institutions. It treats powerful actors as subjects and ordinary people as context. We start from the other direction.
          </Body>
          <Body>
            The World From Below exists to document what it feels like to live inside structures that most reporting treats as backdrop: the factory, the neighbourhood, the city, the family. We are interested in the texture of ordinary life — what people actually do, think, want, lose, and make.
          </Body>
          <Body>
            This is not a magazine about poverty, though poverty appears in it. It is not a magazine about injustice, though injustice is often present. It is a magazine about what it means to be a person navigating a world not built to your scale.
          </Body>
        </Section>

        <Section folio="ABOUT 002" title="What It Looks At">
          <Body>
            We publish stories organised around two coordinates: forces and places. Forces are the large structural pressures shaping ordinary life — work, migration, urbanization, family, class, power, identity. Places are where those forces become visible in specific, particular, human terms.
          </Body>
          <Body>
            Our stories cross borders, disciplines, and forms. We publish reported features, personal essays, field notes, and long-form photography. We review books and films that share our attention to ordinary experience.
          </Body>
          <Body>
            We do not have a politics in the conventional sense. We have a disposition: toward the complicated, the specific, the overlooked. We are skeptical of large abstractions and partial to small, accurate details.
          </Body>
        </Section>

        <Section folio="ABOUT 003" title="How Stories Are Chosen">
          <Body>
            We ask: does this story pay attention to someone — to their actual experience, in specific terms? Does it resist generalisation without sacrificing meaning? Does it give the reader something to hold onto?
          </Body>
          <Body>
            We do not publish stories that use ordinary people as illustrations of ideas. We do not publish stories that exoticize, condescend, or substitute proximity for understanding. We do not invent detail to make a story feel more complete.
          </Body>
          <Body>
            When we do not know something, we say we do not know. When a photograph is unverified, we say so. When a quote cannot be attributed, we do not attribute it. Accuracy is not a constraint on good storytelling. It is the condition for it.
          </Body>
        </Section>

        <Section folio="ABOUT 004" title="Who Is Behind It">
          <Body>
            This is an editorial prototype — a demonstration of what this kind of publication could look like. It is not yet a functioning publication with a named editorial team.
          </Body>
          <Body>
            The design, editorial logic, and curatorial sensibility are documented here as a working model. If you are interested in what this could become, or in contributing to it, the contact section below is the right place to start.
          </Body>
        </Section>

        <Section folio="ABOUT 005" title="Editorial Principles">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px' }}>
            {[
              ['Specificity over abstraction', 'A named place, a particular person, a concrete detail carries more truth than a generalization.'],
              ['Ordinary life as subject', 'Not background. Not context. The actual subject.'],
              ['Accuracy as craft', 'Getting things right is not a burden. It is the work.'],
              ['Restraint in attribution', 'We do not invent authors, photographers, dates, or quotes. Unverified material is labeled as such.'],
              ['Form follows attention', 'The length and shape of a story should match what the story requires — not a format.'],
              ['Honest about limits', 'A prototype is a prototype. We say what we know and what we don\'t.'],
            ].map(([principle, description]) => (
              <div key={principle} style={{ paddingTop: 16, borderTop: '1px solid var(--pub-border)' }}>
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--pub-fg)',
                  marginBottom: 8,
                }}>
                  {principle}
                </p>
                <p style={{
                  fontFamily: 'var(--font-reading)',
                  fontSize: '0.9rem',
                  lineHeight: 1.75,
                  color: 'var(--pub-fg-muted)',
                }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <div className="py-12">
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
            ← Return to Homepage
          </button>
        </div>
      </div>
    </main>
  )
}
