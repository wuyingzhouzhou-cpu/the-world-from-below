import {
  editorialImageSrc,
  imagePublicationState,
  srcsetFor,
  type EditorialImageFields,
  type ImagePresentation,
} from '@/sanity/image'
import {StoryMarginalia} from '@/components/story/StoryMarginalia'

const WIDTHS: Record<ImagePresentation, number[]> = {
  body: [720, 960, 1200],
  wide: [800, 1034, 1600],
  full: [900, 1200, 1800],
  portrait: [420, 640, 900],
  hero: [900, 1400, 1800],
}

const SIZES: Record<ImagePresentation, string> = {
  body: '(max-width: 768px) calc(100vw - 3rem), 720px',
  wide: '(max-width: 768px) calc(100vw - 3rem), 1034px',
  full: '(max-width: 768px) 100vw, 1200px',
  portrait: '(max-width: 768px) calc(100vw - 3rem), 420px',
  hero: '100vw',
}

type Props = {
  image: EditorialImageFields | Record<string, unknown>
  presentation: ImagePresentation
  preview?: boolean
  caption?: boolean
}

export function EditorialImage({image, presentation, preview = true, caption = true}: Props) {
  const value = image as EditorialImageFields
  const state = imagePublicationState(value)
  const src = editorialImageSrc(value, WIDTHS[presentation][1])
  const srcset = srcsetFor(value, WIDTHS[presentation])
  const alt = value.alt || ''

  if (state.withheld && !preview) {
    return null
  }

  if (state.withheld && preview) {
    return (
      <div className={`editorial-figure editorial-figure--${presentation}`}>
        <div className="image-withheld">Image withheld — rights unknown (development only)</div>
      </div>
    )
  }

  return (
    <figure className={`editorial-figure editorial-figure--${presentation}`}>
      {src ? (
        // External demo URLs are used until the Sanity project is claimed.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} srcSet={srcset} sizes={SIZES[presentation]} alt={alt} />
      ) : (
        <div className="image-withheld">No image yet</div>
      )}
      {caption && presentation !== 'hero' ? (
        <figcaption>
          <StoryMarginalia
            lines={[value.caption || (state.placeholder ? alt : ''), value.credit].filter(Boolean) as string[]}
          />
        </figcaption>
      ) : null}
    </figure>
  )
}
