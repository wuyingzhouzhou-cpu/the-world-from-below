import {EditorialImage} from './EditorialImage'
import type {EditorialImageFields} from '@/sanity/image'

export function ImagePair({
  value,
}: {
  value: {left?: EditorialImageFields; right?: EditorialImageFields; pairCaption?: string}
}) {
  return (
    <section className="image-pair">
      {value.left ? <EditorialImage image={value.left} presentation="body" /> : null}
      {value.right ? <EditorialImage image={value.right} presentation="body" /> : null}
      {value.pairCaption ? <p className="source-line">{value.pairCaption}</p> : null}
    </section>
  )
}
