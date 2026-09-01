import {PortableTextRenderer} from '@/components/editorial/PortableTextRenderer'

export function StoryBody({value}: {value: unknown[]}) {
  return (
    <div className="story-flow">
      <PortableTextRenderer value={value} />
    </div>
  )
}
