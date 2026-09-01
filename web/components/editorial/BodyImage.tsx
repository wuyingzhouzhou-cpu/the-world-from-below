import {EditorialImage} from './EditorialImage'
import type {EditorialImageFields} from '@/sanity/image'

export function BodyImage({value}: {value: EditorialImageFields}) {
  return <EditorialImage image={value} presentation="body" />
}
