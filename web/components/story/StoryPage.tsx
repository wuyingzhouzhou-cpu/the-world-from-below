import Link from 'next/link'
import {PortableTextRenderer} from '@/components/editorial/PortableTextRenderer'
import {PaperSheet} from '@/components/layout/PaperSheet'
import {ReadingProgress} from '@/components/layout/ReadingProgress'
import type {StoryViewModel} from '@/sanity/story'
import {StoryByline, StoryHeader} from './StoryHeader'
import {StoryRelations} from './StoryRelations'
import {StorySources} from './StorySources'

export function StoryPage({story}: {story: StoryViewModel}) {
  return (
    <PaperSheet mood={story.visualMood} width="article">
      <ReadingProgress />
      <article className={`story-page story-page--${story.storyType} story-page--${story.visualMood}`}>
        <StoryHeader story={story} />
        <div className="story-flow">
          <StoryByline story={story} />
          <PortableTextRenderer value={story.body} />
          <StorySources sources={story.sources} />
          <StoryRelations
            forces={story.forces}
            places={story.places}
            relatedStories={story.relatedStories}
            relatedLibraryItems={story.relatedLibraryItems}
          />
          <Link href="/stories" className="story-back">
            ← All stories
          </Link>
        </div>
      </article>
    </PaperSheet>
  )
}
