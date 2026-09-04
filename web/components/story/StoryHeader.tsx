import type {StoryViewModel} from '@/sanity/story'
import {STORY_TYPE_LABELS} from '@/sanity/story'
import {COVER_IMAGE_WIDTHS, coverImageSizes} from '@/lib/coverImage'
import {editorialImageSrc, imagePublicationState, srcsetFor, type EditorialImageFields} from '@/sanity/image'
import {StoryMarginalia} from './StoryMarginalia'

function formatPublishedAt(value?: string) {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toLocaleDateString('en-GB', {month: 'short', year: 'numeric'})
}

export function StoryHeader({story}: {story: StoryViewModel}) {
  const placeLine = story.places
    .map((place) => [place.name, place.region || place.country].filter(Boolean).join(', '))
    .join(' · ')
  const forceLine = story.forces.map((force) => force.name).join(' · ')
  const meta = [forceLine, placeLine].filter(Boolean).join(' · ')
  const isFieldNote = story.storyType === 'fieldNote'
  const isEssay = story.storyType === 'essay'
  const kicker = isFieldNote
    ? ['Field Note', story.noteNumber].filter(Boolean).join(' ')
    : `${STORY_TYPE_LABELS[story.storyType]}${isEssay ? '' : ' Story'}`

  return (
    <>
      <header className={`story-header story-header--${story.storyType}`}>
        {isFieldNote || isEssay ? null : (
          <div className="story-header-folio">
            <StoryMarginalia lines={[STORY_TYPE_LABELS[story.storyType], 'Story']} />
          </div>
        )}
        <div className="story-header-main">
          <div className="story-header-kicker">
            <span className="story-kicker">{kicker}</span>
            {meta ? (
              <>
                <span aria-hidden="true" className="story-kicker-dot">
                  ·
                </span>
                <StoryMarginalia lines={[meta]} />
              </>
            ) : null}
          </div>
          <h1 className="story-title story-header-title">{story.title}</h1>
          {story.dek ? <p className="story-dek">{story.dek}</p> : null}
        </div>
      </header>
      {story.hero && !isEssay ? <Hero image={story.hero as EditorialImageFields} /> : null}
    </>
  )
}

function Hero({image}: {image: EditorialImageFields}) {
  const state = imagePublicationState(image)
  const src = editorialImageSrc(image, 1440)
  const srcset = srcsetFor(image, [...COVER_IMAGE_WIDTHS])
  const caption = image.caption || image.alt || ''

  if (state.withheld) return null

  return (
    <div className="story-hero-block">
      <div className="story-hero">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} srcSet={srcset} sizes={coverImageSizes('photo')} alt={image.alt || ''} />
        ) : (
          <div className="image-withheld">No image yet</div>
        )}
      </div>
      {caption ? (
        <div className="story-hero-caption">
          <StoryMarginalia lines={[caption]} />
        </div>
      ) : null}
    </div>
  )
}

export function StoryByline({story}: {story: StoryViewModel}) {
  const author = story.authors.map((item) => item.name).join(', ')
  const published = formatPublishedAt(story.publishedAt)
  if (!author && !published) return null
  return (
    <div className="story-byline">
      {author ? <StoryMarginalia lines={[`By ${author}`]} /> : null}
      {author && published ? (
        <span aria-hidden="true" className="story-kicker-dot">
          ·
        </span>
      ) : null}
      {published ? <StoryMarginalia lines={[published]} /> : null}
    </div>
  )
}
