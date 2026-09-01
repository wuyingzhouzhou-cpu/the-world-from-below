import Link from 'next/link'
import {StoryMarginalia} from '@/components/story/StoryMarginalia'
import type {HomepageView} from '@/sanity/home'
import {editorialImageSrc, type EditorialImageFields} from '@/sanity/image'
import {STORY_TYPE_LABELS} from '@/sanity/story'

function LeadImage({image, className}: {image?: Record<string, unknown>; className: string}) {
  if (!image) return <div className={className} />
  const src = editorialImageSrc(image as EditorialImageFields, 1600)
  const alt = String((image as EditorialImageFields).alt || '')
  return (
    <div className={className}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} />
      ) : null}
    </div>
  )
}

function storyHref(slug?: string) {
  return slug ? `/stories/${slug}` : '/stories'
}

export function EditorialQuestion({home}: {home: HomepageView}) {
  return (
    <section className="band">
      <div className="band-inner">
        <div className="question-grid">
          <h1 className="question-title">{home.settings.question || home.settings.title}</h1>
          <div className="question-aside">
            {home.settings.tagline ? <p>{home.settings.tagline}</p> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export function PhotoCover({home}: {home: HomepageView}) {
  const lead = home.lead
  if (!lead) return null
  const meta = [...lead.forces.map((item) => item.name), ...lead.places.map((item) => item.name)].join(' / ')
  return (
    <section className="band">
      <LeadImage image={lead.hero} className="cover-photo" />
      <div className="cover-info">
        <div>
          {meta ? <StoryMarginalia lines={[meta]} /> : null}
          <h2 className="cover-headline">{lead.title}</h2>
          {lead.dek ? <p className="cover-dek">{lead.dek}</p> : null}
          <Link href={storyHref(lead.slug)} className="read-link">
            Read the Story →
          </Link>
        </div>
        {lead.hero && (lead.hero as EditorialImageFields).caption ? (
          <StoryMarginalia lines={[String((lead.hero as EditorialImageFields).caption)]} />
        ) : null}
      </div>
    </section>
  )
}

export function TypographicCover({home}: {home: HomepageView}) {
  const lead = home.lead
  if (!lead) return null
  const meta = [...lead.forces.map((item) => item.name), ...lead.places.map((item) => item.name)].join(' · ')
  return (
    <section className="band">
      <div className="cover-type">
        <div className="story-header-kicker">
          <span className="story-kicker">{STORY_TYPE_LABELS[lead.storyType]} Story</span>
          {meta ? (
            <>
              <span className="story-kicker-dot" aria-hidden="true">
                ·
              </span>
              <StoryMarginalia lines={[meta]} />
            </>
          ) : null}
        </div>
        <h2 className="cover-headline">{lead.title}</h2>
        {lead.dek ? <p className="cover-dek">{lead.dek}</p> : null}
        <Link href={storyHref(lead.slug)} className="read-link">
          Read the Story →
        </Link>
      </div>
    </section>
  )
}

export function SplitCover({home}: {home: HomepageView}) {
  const lead = home.lead
  if (!lead) return <TypographicCover home={home} />
  const meta = [...lead.forces.map((item) => item.name), ...lead.places.map((item) => item.name)].join(' / ')
  return (
    <section className="band">
      <div className="cover-split">
        <LeadImage image={lead.hero} className="cover-split-image" />
        <div className="cover-split-text">
          <span className="story-kicker">{STORY_TYPE_LABELS[lead.storyType]} Story</span>
          <h2 className="cover-headline">{lead.title}</h2>
          <div className="cover-rule" />
          {meta ? <StoryMarginalia lines={[meta]} /> : null}
          {lead.dek ? <p className="cover-dek">{lead.dek}</p> : null}
          <Link href={storyHref(lead.slug)} className="read-link">
            Read the Story →
          </Link>
        </div>
      </div>
    </section>
  )
}

export function HomeCover({home}: {home: HomepageView}) {
  if (home.coverMode === 'typographic') return <TypographicCover home={home} />
  if (home.coverMode === 'split') return <SplitCover home={home} />
  return <PhotoCover home={home} />
}
