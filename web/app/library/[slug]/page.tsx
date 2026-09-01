import Link from 'next/link'
import {PaperSheet} from '@/components/layout/PaperSheet'
import {pageMetadata} from '@/lib/metadata'
import {client} from '@/sanity/client'
import {libraryItemBySlugQuery} from '@/sanity/queries'
import {libraryMediumLabel, toLibraryItemView} from '@/sanity/library'
import {editorialImageSrc, type EditorialImageFields} from '@/sanity/image'
import {notFound} from 'next/navigation'

type PageProps = {params: Promise<{slug: string}>}

export async function generateMetadata({params}: PageProps) {
  const {slug} = await params
  const raw = await client.fetch(libraryItemBySlugQuery, {slug})
  if (!raw) return {title: 'Library'}
  return pageMetadata({
    title: `${raw.title} — The World From Below`,
    description: raw.whyICame || raw.creator,
  })
}

export default async function LibraryDetailPage({params}: PageProps) {
  const {slug} = await params
  const item = toLibraryItemView(await client.fetch(libraryItemBySlugQuery, {slug}))
  if (!item) notFound()
  const coverSrc = item.cover ? editorialImageSrc(item.cover as EditorialImageFields, 600) : undefined

  return (
    <PaperSheet width="site" mood="archive">
      <main className="library-detail">
        <aside>
          {coverSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverSrc} alt={item.title} style={{width: '100%', maxWidth: 180, marginBottom: 24}} />
          ) : (
            <div className="book-spine" style={{width: 180, height: 260, fontSize: 14, marginBottom: 24}}>
              {item.title}
            </div>
          )}
          <dl className="library-meta">
            {item.creator ? (
              <>
                <dt>Author / maker</dt>
                <dd>{item.creator}</dd>
              </>
            ) : null}
            {item.year ? (
              <>
                <dt>Year</dt>
                <dd>{item.year}</dd>
              </>
            ) : null}
            {item.medium ? (
              <>
                <dt>Medium</dt>
                <dd>{libraryMediumLabel(item.medium) || item.medium}</dd>
              </>
            ) : null}
          </dl>
          {item.forces.length ? (
            <div>
              <p className="marginalia">Forces</p>
              {item.forces.map((force) => (
                <Link key={force.id} href={`/forces/${force.slug}`} className="quiet-link" style={{display: 'block', marginTop: 6}}>
                  {force.name}
                </Link>
              ))}
            </div>
          ) : null}
          {item.places.length ? (
            <div style={{marginTop: 20}}>
              <p className="marginalia">Places</p>
              {item.places.map((place) => (
                <Link key={place.id} href={`/places/${place.slug}`} className="quiet-link" style={{display: 'block', marginTop: 6}}>
                  {place.name}
                </Link>
              ))}
            </div>
          ) : null}
        </aside>
        <article>
          <p className="marginalia">Library{item.medium ? ` · ${libraryMediumLabel(item.medium) || item.medium}` : ''}</p>
          <h1 className="detail-title" style={{fontSize: 'clamp(2rem, 4vw, 3.4rem)'}}>
            {item.title}
          </h1>
          {item.sections.length ? (
            item.sections.map((section) => (
              <section key={section.key} className="library-section">
                <p className="section-label">
                  {section.n} · {section.label}
                </p>
                <p style={{fontFamily: 'var(--font-reading)', fontSize: '1.05rem', lineHeight: 1.82, whiteSpace: 'pre-wrap'}}>
                  {section.body}
                </p>
              </section>
            ))
          ) : (
            <p className="empty-note">No editorial notes have been written for this work yet.</p>
          )}
        </article>
      </main>
    </PaperSheet>
  )
}
