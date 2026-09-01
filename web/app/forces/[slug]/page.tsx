import Link from 'next/link'
import {PaperSheet} from '@/components/layout/PaperSheet'
import {pageMetadata} from '@/lib/metadata'
import {asForce} from '@/sanity/home'
import {client} from '@/sanity/client'
import {forceBySlugQuery, libraryItemsByForceQuery, storiesByForceQuery} from '@/sanity/queries'
import {toStoryViewModel, type StoryViewModel} from '@/sanity/story'
import {notFound} from 'next/navigation'

type PageProps = {params: Promise<{slug: string}>}

export async function generateMetadata({params}: PageProps) {
  const {slug} = await params
  const raw = await client.fetch(forceBySlugQuery, {slug})
  if (!raw) return {title: 'Force'}
  return pageMetadata({title: `${raw.name} — The World From Below`, description: raw.question})
}

export default async function ForceDetailPage({params}: PageProps) {
  const {slug} = await params
  const raw = await client.fetch(forceBySlugQuery, {slug})
  const force = asForce(raw)
  if (!force) notFound()
  const stories: StoryViewModel[] = (await client.fetch(storiesByForceQuery, {forceId: force.id}) || []).map(
    (item: Record<string, unknown>) => toStoryViewModel(item),
  )
  const library = await client.fetch(libraryItemsByForceQuery, {forceId: force.id})

  return (
    <PaperSheet width="site">
      <main className="site-main">
        <header className="index-header">
          <p className="index-kicker">Force</p>
          <h1 className="detail-title">{force.name}</h1>
          {force.question ? <p className="force-question">{force.question}</p> : null}
          {force.description ? <p>{force.description}</p> : null}
        </header>
        <div className="band-inner">
          {force.places.length ? (
            <section>
              <p className="section-label">Related places</p>
              {force.places.map((place) => (
                <Link key={place.id} href={`/places/${place.slug}`} className="force-row">
                  <span className="force-name">{place.name}</span>
                </Link>
              ))}
            </section>
          ) : null}
          <section style={{marginTop: 48}}>
            <p className="section-label">Stories</p>
            {stories.length ? (
              stories.map((story) => (
                <Link key={story.id} href={`/stories/${story.slug}`} className="story-row" style={{paddingLeft: 0, paddingRight: 0}}>
                  <h2>{story.title}</h2>
                  {story.dek ? <p className="story-dek">{story.dek}</p> : null}
                </Link>
              ))
            ) : (
              <p className="empty-note">No related stories yet.</p>
            )}
          </section>
          {library?.length ? (
            <section style={{marginTop: 48}}>
              <p className="section-label">Library</p>
              {library.map((item: {_id: string; title: string; slug?: string; creator?: string}) => (
                <Link key={item._id} href={`/library/${item.slug}`} className="story-row" style={{paddingLeft: 0, paddingRight: 0}}>
                  <h2>{item.title}</h2>
                  {item.creator ? <p className="marginalia">{item.creator}</p> : null}
                </Link>
              ))}
            </section>
          ) : null}
        </div>
      </main>
    </PaperSheet>
  )
}
