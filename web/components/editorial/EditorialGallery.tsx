import {EditorialImage} from './EditorialImage'
import type {EditorialImageFields} from '@/sanity/image'

export function EditorialGallery({
  value,
}: {
  value: {heading?: string; images?: EditorialImageFields[]}
}) {
  return (
    <section className="editorial-gallery">
      {value.heading ? <h2 className="story-h2">{value.heading}</h2> : null}
      {(value.images || []).map((image, index) => (
        <EditorialImage
          key={image.alt || index}
          image={image}
          presentation="body"
        />
      ))}
    </section>
  )
}
