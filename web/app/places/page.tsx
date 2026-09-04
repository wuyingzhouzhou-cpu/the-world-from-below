import Link from 'next/link'
import {PaperSheet} from '@/components/layout/PaperSheet'
import {pageMetadata} from '@/lib/metadata'
import {asPlace, type PlaceCard} from '@/sanity/home'
import {client} from '@/sanity/client'
import {allPlacesQuery} from '@/sanity/queries'
import {editorialImageSrc, type EditorialImageFields} from '@/sanity/image'

export async function generateMetadata() {
  return pageMetadata({
    title: 'Places — The World From Below',
    description: 'Geographic entry points into ordinary life.',
    path: '/places',
  })
}

export default async function PlacesIndexPage() {
  const raw = await client.fetch(allPlacesQuery)
  const places: PlaceCard[] = (raw || []).flatMap((item: unknown) => asPlace(item) || [])

  return (
    <PaperSheet width="site">
      <main className="site-main">
        <header className="index-header">
          <p className="index-kicker">Places</p>
          <div className="index-header-grid">
            <h1>Geographic Entry Points</h1>
            <p>Each place is a way of entering larger questions. Not a destination — a perspective.</p>
          </div>
        </header>
        {places.length ? (
          places.map((place) => (
            <Link key={place.id} href={`/places/${place.slug}`} className="place-hero-row">
              {place.image && editorialImageSrc(place.image as EditorialImageFields, 1200) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={editorialImageSrc(place.image as EditorialImageFields, 1200)} alt={place.name} />
              ) : (
                <div className="place-hero-visual" />
              )}
              <div className="place-hero-copy">
                <p className="marginalia">
                  {[place.country, place.region].filter(Boolean).join(' · ')}
                </p>
                <h2>{place.name}</h2>
                {place.summary ? <p className="cover-dek">{place.summary}</p> : null}
                <div className="story-header-kicker">
                  {place.forces.map((force) => (
                    <span key={force.id} className="story-kicker">
                      {force.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="empty-note" style={{padding: '2rem var(--sheet-gutter)'}}>
            No places have been published yet.
          </p>
        )}
      </main>
    </PaperSheet>
  )
}
