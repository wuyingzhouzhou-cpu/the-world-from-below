import {PaperSheet} from '@/components/layout/PaperSheet'
import {pageMetadata} from '@/lib/metadata'
import {client} from '@/sanity/client'
import {aboutPageQuery, siteSettingsQuery} from '@/sanity/queries'
import {toSiteSettings} from '@/sanity/home'

export async function generateMetadata() {
  const settings = toSiteSettings(await client.fetch(siteSettingsQuery))
  return pageMetadata({
    title: `About — ${settings.title}`,
    description: settings.question || settings.tagline,
  })
}

export default async function AboutPage() {
  const [settingsRaw, aboutRaw] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(aboutPageQuery),
  ])
  const settings = toSiteSettings(settingsRaw)
  const sections = Array.isArray(aboutRaw?.sections) ? aboutRaw.sections : []

  return (
    <PaperSheet width="site" mood="quiet">
      <main className="site-main">
        <header className="index-header">
          <p className="index-kicker">The Publication</p>
          <h1>{settings.title}</h1>
          {aboutRaw?.lede || settings.question ? <p>{aboutRaw?.lede || settings.question}</p> : null}
        </header>
        <div className="band-inner">
          {sections.length ? (
            sections.map((section: {heading?: string; body?: string}, index: number) => (
              <section key={`${section.heading}-${index}`} className="about-section">
                <p className="marginalia">{String(index + 1).padStart(3, '0')}</p>
                <div>
                  {section.heading ? <h2>{section.heading}</h2> : null}
                  {section.body
                    ? section.body.split('\n\n').map((paragraph: string) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)
                    : null}
                </div>
              </section>
            ))
          ) : (
            <p className="empty-note">
              {settings.question
                ? `About copy has not been entered in the CMS yet. The publication question remains: ${settings.question}`
                : 'About copy has not been entered in the CMS yet.'}
            </p>
          )}
        </div>
      </main>
    </PaperSheet>
  )
}
