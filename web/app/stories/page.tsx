import Link from 'next/link'
import {PaperSheet} from '@/components/layout/PaperSheet'
import {pageMetadata} from '@/lib/metadata'
import {client} from '@/sanity/client'
import {allStoriesQuery, storiesByStoryTypeQuery} from '@/sanity/queries'
import {STORY_TYPES, STORY_TYPE_LABELS, toStoryViewModel, type StoryType, type StoryViewModel} from '@/sanity/story'

const FILTERS: {label: string; value?: StoryType}[] = [
  {label: 'All'},
  {label: 'Features', value: 'feature'},
  {label: 'Essays', value: 'essay'},
  {label: 'Field Notes', value: 'fieldNote'},
]

type PageProps = {searchParams: Promise<{type?: string}>}

export async function generateMetadata(): Promise<ReturnType<typeof pageMetadata>> {
  return pageMetadata({title: 'Stories — The World From Below', description: 'Features, essays, and field notes.'})
}

export default async function StoriesIndexPage({searchParams}: PageProps) {
  const {type} = await searchParams
  const storyType = STORY_TYPES.includes(type as StoryType) ? (type as StoryType) : undefined
  const raw = storyType
    ? await client.fetch(storiesByStoryTypeQuery, {storyType})
    : await client.fetch(allStoriesQuery)
  const stories: StoryViewModel[] = (raw || []).map((item: Record<string, unknown>) => toStoryViewModel(item))

  return (
    <PaperSheet width="site">
      <main className="site-main">
        <header className="index-header">
          <p className="index-kicker">Stories</p>
          <div className="index-header-grid">
            <h1>The Archive</h1>
            <p>Features, essays, and field notes. An editorial list, not a feed.</p>
          </div>
        </header>
        <nav className="filter-row" aria-label="Story type">
          {FILTERS.map((filter) => {
            const href = filter.value ? `/stories?type=${filter.value}` : '/stories'
            const active = filter.value === storyType || (!filter.value && !storyType)
            return (
              <Link key={filter.label} href={href} className={active ? 'is-active' : undefined}>
                {filter.label}
              </Link>
            )
          })}
        </nav>
        {stories.length ? (
          stories.map((story) => (
            <Link key={story.id} href={`/stories/${story.slug}`} className="story-row">
              <p className="story-kicker">{STORY_TYPE_LABELS[story.storyType]}</p>
              <h2>{story.title}</h2>
              {story.dek ? <p className="story-dek">{story.dek}</p> : null}
              <p className="marginalia">
                {[
                  ...story.places.map((place) => place.name),
                  ...story.forces.map((force) => force.name),
                  story.publishedAt
                    ? new Date(story.publishedAt).toLocaleDateString('en-GB', {month: 'short', year: 'numeric'})
                    : undefined,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </Link>
          ))
        ) : (
          <p className="empty-note" style={{padding: '2rem var(--sheet-gutter)'}}>
            No stories in this list yet.
          </p>
        )}
      </main>
    </PaperSheet>
  )
}
