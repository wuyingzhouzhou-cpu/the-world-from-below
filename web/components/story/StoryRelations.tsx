import Link from 'next/link'
import type {ForceView, PlaceView, RelatedLibraryItemView, RelatedStoryView} from '@/sanity/story'
import {STORY_TYPE_LABELS} from '@/sanity/story'
import {StoryMarginalia} from './StoryMarginalia'

export function StoryRelations({
  forces,
  places,
  relatedStories,
  relatedLibraryItems,
}: {
  forces: ForceView[]
  places: PlaceView[]
  relatedStories: RelatedStoryView[]
  relatedLibraryItems: RelatedLibraryItemView[]
}) {
  const hasAny = forces.length || places.length || relatedStories.length || relatedLibraryItems.length
  if (!hasAny) return null

  return (
    <section className="story-end">
      <div className="relation-grid">
        {forces.length ? (
          <div>
            <StoryMarginalia lines={['Related Forces']} />
            <div style={{marginTop: 24}}>
              {forces.map((force) =>
                force.slug ? (
                  <Link key={force.id} href={`/forces/${force.slug}`}>
                    {force.name}
                  </Link>
                ) : (
                  <p key={force.id}>{force.name}</p>
                ),
              )}
            </div>
          </div>
        ) : null}
        {places.length ? (
          <div>
            <StoryMarginalia lines={['Related Places']} />
            <div style={{marginTop: 24}}>
              {places.map((place) =>
                place.slug ? (
                  <Link key={place.id} href={`/places/${place.slug}`}>
                    {place.name}
                  </Link>
                ) : (
                  <p key={place.id}>{place.name}</p>
                ),
              )}
            </div>
          </div>
        ) : null}
        {relatedLibraryItems.length ? (
          <div>
            <StoryMarginalia lines={['Library']} />
            <div style={{marginTop: 24}}>
              {relatedLibraryItems.map((item) =>
                item.slug ? (
                  <Link key={item.id} href={`/library/${item.slug}`}>
                    {item.title}
                    {item.creator ? ` · ${item.creator}` : ''}
                  </Link>
                ) : (
                  <p key={item.id}>
                    {item.title}
                    {item.creator ? ` · ${item.creator}` : ''}
                  </p>
                ),
              )}
            </div>
          </div>
        ) : null}
        {relatedStories.length ? (
          <div>
            <StoryMarginalia lines={['Related stories']} />
            <div style={{marginTop: 24}}>
              {relatedStories.map((story) =>
                story.slug ? (
                  <Link key={story.id} href={`/stories/${story.slug}`}>
                    {story.title}
                    {story.storyType ? ` · ${STORY_TYPE_LABELS[story.storyType]}` : ''}
                  </Link>
                ) : (
                  <p key={story.id}>{story.title}</p>
                ),
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
