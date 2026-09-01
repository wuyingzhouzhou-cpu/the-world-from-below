import type {SourceView} from '@/sanity/story'
import {StoryMarginalia} from './StoryMarginalia'

export function StorySources({sources}: {sources: SourceView[]}) {
  if (!sources.length) return null
  return (
    <section className="story-end">
      <StoryMarginalia lines={['Sources & Reading']} />
      <div style={{marginTop: 32}}>
        {sources.map((source) => (
          <p key={source.citation} className="source-line">
            {source.url ? <a href={source.url}>{source.citation}</a> : source.citation}
            {source.note ? ` — ${source.note}` : ''}
          </p>
        ))}
      </div>
    </section>
  )
}
