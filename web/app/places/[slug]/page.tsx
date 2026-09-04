import Link from 'next/link'
import {PaperSheet} from '@/components/layout/PaperSheet'
import {pageMetadata} from '@/lib/metadata'
import {asPlace} from '@/sanity/home'
import {client} from '@/sanity/client'
import {libraryItemsByPlaceQuery, placeBySlugQuery, storiesByPlaceQuery} from '@/sanity/queries'
import {toRelatedLibraryItems} from '@/sanity/library'
import {toStoryViewModel, type StoryViewModel} from '@/sanity/story'
import {editorialImageSrc, type EditorialImageFields} from '@/sanity/image'
import {notFound} from 'next/navigation'

type PageProps = {params: Promise<{slug: string}>}

export async function generateMetadata({params}: PageProps) {
  const {slug} = await params
  const raw = await client.fetch(placeBySlugQuery, {slug})
  if (!raw) notFound()
  return pageMetadata({title: `${raw.name} — The World From Below`, description: raw.summary, path: `/places/${slug}`})
}

export default async function PlaceDetailPage({params}: PageProps) {
  const {slug} = await params
  const raw = await client.fetch(placeBySlugQuery, {slug})
  const place = asPlace(raw)
  if (!place) notFound()
  const related: StoryViewModel[] = (await client.fetch(storiesByPlaceQuery, {placeId: place.id}) || []).map(
    (item: Record<string, unknown>) => toStoryViewModel(item),
  )
  const library = toRelatedLibraryItems(await client.fetch(libraryItemsByPlaceQuery, {placeId: place.id}))

  return (
    <PaperSheet width="site">
      <main className="site-main">
        <header className="index-header">
          <p className="index-kicker">Place</p>
          <p className="marginalia">{[place.country, place.region].filter(Boolean).join(' · ')}</p>
          <h1 className="detail-title">{place.name}</h1>
          {place.summary ? <p>{place.summary}</p> : null}
        </header>
        {place.image && editorialImageSrc(place.image as EditorialImageFields, 1400) ? (
          <div className="cover-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={editorialImageSrc(place.image as EditorialImageFields, 1400)} alt={place.name} />
          </div>
        ) : null}
        <div className="band-inner">
          {place.forces.length ? (
            <section>
              <p className="section-label">Related forces</p>
              {place.forces.map((force) => (
                <Link key={force.id} href={`/forces/${force.slug}`} className="force-row">
                  <span className="force-name">{force.name}</span>
                </Link>
              ))}
            </section>
          ) : null}
          <section style={{marginTop: 48}}>
            <p className="section-label">Stories</p>
            {related.length ? (
              related.map((story) => (
                <Link key={story.id} href={`/stories/${story.slug}`} className="story-row" style={{paddingLeft: 0, paddingRight: 0}}>
                  <h2>{story.title}</h2>
                  {story.dek ? <p className="story-dek">{story.dek}</p> : null}
                </Link>
              ))
            ) : (
              <p className="empty-note">No related stories yet.</p>
            )}
          </section>
          {library.length ? (
            <section style={{marginTop: 48}}>
              <p className="section-label">Library</p>
              {library.map((item) => (
                <Link key={item.id} href={`/library/${item.slug}`} className="story-row" style={{paddingLeft: 0, paddingRight: 0}}>
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
