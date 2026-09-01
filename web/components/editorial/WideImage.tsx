import {EditorialImage} from './EditorialImage'
import type {EditorialImageFields} from '@/sanity/image'

export function WideImage({value}: {value: EditorialImageFields}) {
  return <EditorialImage image={value} presentation="wide" />
}
