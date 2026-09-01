import {EditorialImage} from './EditorialImage'
import type {EditorialImageFields} from '@/sanity/image'

export function PortraitImage({value}: {value: EditorialImageFields}) {
  return <EditorialImage image={value} presentation="portrait" />
}
