import Link from 'next/link'
import {PaperSheet} from '@/components/layout/PaperSheet'
import {pageMetadata} from '@/lib/metadata'
import {sanitizeSearchQuery, searchMatchPattern} from '@/lib/search'
import {client} from '@/sanity/client'
import {searchQuery} from '@/sanity/queries'

type PageProps = {searchParams: Promise<{q?: string}>}

export async function generateMetadata({searchParams}: PageProps) {
  const {q} = await searchParams
  const query = sanitizeSearchQuery(q)
  return pageMetadata({
    title: query ? `Search: ${query} — The World From Below` : 'Search — The World From Below',
    description: 'Search stories, places, forces, and library items.',
    path: '/search',
    robots: {index: false, follow: true},
  })
}

function emptyResults() {
  return {stories: [], places: [], forces: [], library: []}
}

export default async function SearchPage({searchParams}: PageProps) {
  const {q} = await searchParams
  const query = sanitizeSearchQuery(q)
  const results = query
    ? await client.fetch(searchQuery, {pattern: searchMatchPattern(query)})
    : emptyResults()
  const total =
    (results.stories?.length || 0) +
    (results.places?.length || 0) +
    (results.forces?.length || 0) +
    (results.library?.length || 0)

  return (
    <PaperSheet width="site">
      <main className="site-main">
        <header className="index-header">
          <p className="index-kicker">Search</p>
          <h1>Look through the publication</h1>
          <form className="search-form" action="/search" method="get" role="search">
            <label className="sr-only" htmlFor="q">
              Search
            </label>
            <input id="q" name="q" type="search" defaultValue={query} placeholder="Title, place, force, work…" />
            <button type="submit">Search</button>
          </form>
        </header>
        <div className="band-inner">
          {!query ? (
            <p className="empty-note">Enter a term to search stories, places, forces, and the library.</p>
          ) : total === 0 ? (
            <p className="empty-note">No results for “{query}”.</p>
          ) : (
            <>
              {results.stories?.length ? (
                <section className="search-group">
                  <h2>Stories</h2>
                  {results.stories.map((item: {_id: string; title: string; slug?: string; dek?: string}) => (
                    <Link key={item._id} href={`/stories/${item.slug}`} className="story-row" style={{paddingLeft: 0, paddingRight: 0}}>
                      <h3>{item.title}</h3>
                      {item.dek ? <p className="story-dek">{item.dek}</p> : null}
                    </Link>
                  ))}
                </section>
              ) : null}
              {results.places?.length ? (
                <section className="search-group">
                  <h2>Places</h2>
                  {results.places.map((item: {_id: string; name: string; slug?: string; summary?: string}) => (
                    <Link key={item._id} href={`/places/${item.slug}`} className="story-row" style={{paddingLeft: 0, paddingRight: 0}}>
                      <h3>{item.name}</h3>
                      {item.summary ? <p className="story-dek">{item.summary}</p> : null}
                    </Link>
                  ))}
                </section>
              ) : null}
              {results.forces?.length ? (
                <section className="search-group">
                  <h2>Forces</h2>
                  {results.forces.map((item: {_id: string; name: string; slug?: string; question?: string}) => (
                    <Link key={item._id} href={`/forces/${item.slug}`} className="story-row" style={{paddingLeft: 0, paddingRight: 0}}>
                      <h3>{item.name}</h3>
                      {item.question ? <p className="story-dek">{item.question}</p> : null}
                    </Link>
                  ))}
                </section>
              ) : null}
              {results.library?.length ? (
                <section className="search-group">
                  <h2>Library</h2>
                  {results.library.map((item: {_id: string; title: string; slug?: string; creator?: string}) => (
                    <Link key={item._id} href={`/library/${item.slug}`} className="story-row" style={{paddingLeft: 0, paddingRight: 0}}>
                      <h3>{item.title}</h3>
                      {item.creator ? <p className="marginalia">{item.creator}</p> : null}
                    </Link>
                  ))}
                </section>
              ) : null}
            </>
          )}
        </div>
      </main>
    </PaperSheet>
  )
}
