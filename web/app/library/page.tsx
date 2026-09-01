import Link from 'next/link'
import {PaperSheet} from '@/components/layout/PaperSheet'
import {pageMetadata} from '@/lib/metadata'
import {asLibrary, type LibraryCard} from '@/sanity/home'
import {client} from '@/sanity/client'
import {allLibraryItemsQuery} from '@/sanity/queries'
import {isLibraryMedium, libraryMediumLabel} from '@/sanity/library'

const FILTERS = [
  {label: 'All'},
  {label: 'Book', value: 'book'},
  {label: 'Film', value: 'film'},
  {label: 'Photography', value: 'photography'},
]

type PageProps = {searchParams: Promise<{medium?: string}>}

export async function generateMetadata() {
  return pageMetadata({
    title: 'Library — The World From Below',
    description: 'Books, films, and photography that attend to ordinary life.',
  })
}

export default async function LibraryIndexPage({searchParams}: PageProps) {
  const {medium} = await searchParams
  const selected = isLibraryMedium(medium) ? medium : undefined
  const raw = await client.fetch(allLibraryItemsQuery)
  const mapped: LibraryCard[] = (Array.isArray(raw) ? raw : []).flatMap((item: unknown) => asLibrary(item) || [])
  const items = mapped.filter((item) => !selected || item.medium === selected)

  return (
    <PaperSheet width="site" mood="archive">
      <main className="site-main">
        <header className="index-header">
          <p className="index-kicker">The Library</p>
          <div className="index-header-grid">
            <h1>Books, Films & Photography</h1>
            <p>Works that let readers enter another world from the inside.</p>
          </div>
        </header>
        <nav className="filter-row" aria-label="Medium">
          {FILTERS.map((filter) => {
            const href = filter.value ? `/library?medium=${filter.value}` : '/library'
            const active = filter.value === selected || (!filter.value && !selected)
            return (
              <Link key={filter.label} href={href} className={active ? 'is-active' : undefined}>
                {filter.label}
              </Link>
            )
          })}
        </nav>
        {items.length ? (
          items.map((item) => (
            <Link key={item.id} href={`/library/${item.slug}`} className="library-row story-row">
              <p className="story-kicker">{libraryMediumLabel(item.medium) || item.medium}</p>
              <h2>{item.title}</h2>
              <p className="marginalia">{[item.creator, item.year].filter(Boolean).join(' · ')}</p>
              {item.whyICame ? <p className="story-dek">{item.whyICame}</p> : null}
            </Link>
          ))
        ) : (
          <p className="empty-note" style={{padding: '2rem var(--sheet-gutter)'}}>
            No library items in this list yet.
          </p>
        )}
      </main>
    </PaperSheet>
  )
}
