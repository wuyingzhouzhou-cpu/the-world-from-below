import {EditorialImage} from './EditorialImage'
import type {EditorialImageFields} from '@/sanity/image'

export function FullImage({value}: {value: EditorialImageFields}) {
  return <EditorialImage image={value} presentation="full" />
}
