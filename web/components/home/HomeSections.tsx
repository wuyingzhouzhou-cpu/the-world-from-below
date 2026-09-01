import Link from 'next/link'
import {StoryMarginalia} from '@/components/story/StoryMarginalia'
import type {HomepageView} from '@/sanity/home'
import {editorialImageSrc, type EditorialImageFields} from '@/sanity/image'

export function HomeSections({home}: {home: HomepageView}) {
  return (
    <>
      <FeaturedBand home={home} />
      <ForcesBand home={home} />
      <PlacesBand home={home} />
      <LibraryBand home={home} />
      <FieldNotesBand home={home} />
      <NewsletterBand
        name={home.settings.newsletterName}
        description={home.settings.newsletterDescription}
      />
    </>
  )
}

function FeaturedBand({home}: {home: HomepageView}) {
  const note = home.featuredFieldNote
  const book = home.featuredLibrary
  const place = home.featuredPlace
  if (!note && !book && !place) return null
  return (
    <section className="band">
      <div className="triptych">
        {note ? (
          <Link href={`/stories/${note.slug}`} className="triptych-panel triptych-panel--ink">
            <div>
              <StoryMarginalia lines={[`Field Note${note.noteNumber ? ` · ${note.noteNumber}` : ''}`]} />
              <h3 style={{fontFamily: 'var(--font-editorial)', fontSize: '1.35rem', lineHeight: 1.32, marginTop: 20}}>
                {note.title}
              </h3>
            </div>
            <span className="quiet-link">Read →</span>
          </Link>
        ) : null}
        {book ? (
          <Link href={`/library/${book.slug}`} className="triptych-panel triptych-panel--card">
            <div>
              <StoryMarginalia lines={[book.medium || 'Library']} />
              <h3 style={{fontFamily: 'var(--font-editorial)', fontWeight: 600, fontSize: '1.3rem', margin: '12px 0 4px'}}>
                {book.title}
              </h3>
              <p className="marginalia">{[book.creator, book.year].filter(Boolean).join(' · ')}</p>
              {book.whyICame ? (
                <p style={{fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.65, color: 'var(--ink-muted)', marginTop: 16}}>
                  {book.whyICame}
                </p>
              ) : null}
            </div>
            <span className="quiet-link">Library Entry →</span>
          </Link>
        ) : null}
        {place ? (
          <Link href={`/places/${place.slug}`} className="triptych-panel triptych-panel--photo">
            {place.image && editorialImageSrc(place.image as EditorialImageFields, 900) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={editorialImageSrc(place.image as EditorialImageFields, 900)} alt={place.name} />
            ) : null}
            <div className="triptych-photo-copy">
              <p className="index-kicker" style={{color: 'rgba(232,226,216,0.7)'}}>Place</p>
              <p style={{fontFamily: 'var(--font-editorial)', fontWeight: 700, fontSize: '1.9rem'}}>{place.name}</p>
            </div>
          </Link>
        ) : null}
      </div>
    </section>
  )
}

function ForcesBand({home}: {home: HomepageView}) {
  if (!home.forces.length) return null
  return (
    <section className="band">
      <div className="band-inner">
        <div className="section-head">
          <p className="section-label">Explore by Force</p>
          <Link href="/forces" className="quiet-link">
            All Forces →
          </Link>
        </div>
        {home.forces.map((force) => {
          const primary = force.id === home.featuredForce?.id
          return (
            <Link
              key={force.id}
              href={`/forces/${force.slug}`}
              className={`force-row${primary ? ' force-row--primary' : ''}`}
            >
              <span className="force-name">{force.name}</span>
              <span aria-hidden="true">→</span>
            </Link>
          )
        })}
        {home.featuredForce?.question ? (
          <div style={{marginTop: 28, borderLeft: '1px solid var(--rule)', paddingLeft: 20}}>
            <StoryMarginalia lines={[`${home.featuredForce.name}`, 'Featured Force']} />
            <p style={{fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.65, color: 'var(--ink-muted)', marginTop: 12}}>
              {home.featuredForce.question}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function PlacesBand({home}: {home: HomepageView}) {
  const places = [home.featuredPlace, ...home.otherPlaces].filter(Boolean)
  if (!places.length) return null
  return (
    <section className="band">
      <div className="band-inner">
        <div className="section-head">
          <p className="section-label">From Different Places</p>
          <Link href="/places" className="quiet-link">
            All Places →
          </Link>
        </div>
        <div className="place-mosaic">
          {places.map((place, index) =>
            place ? (
              <Link
                key={place.id}
                href={`/places/${place.slug}`}
                className={`place-tile${index === 0 ? ' place-tile--lead' : ''}`}
              >
                {place.image && editorialImageSrc(place.image as EditorialImageFields, 1200) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={editorialImageSrc(place.image as EditorialImageFields, 1200)} alt={place.name} />
                ) : (
                  <div className="place-hero-visual" />
                )}
                <div className="place-tile-copy">
                  <p>{place.name}</p>
                </div>
              </Link>
            ) : null,
          )}
        </div>
      </div>
    </section>
  )
}

function LibraryBand({home}: {home: HomepageView}) {
  if (!home.featuredLibrary) return null
  const featured = home.featuredLibrary
  return (
    <section className="band" style={{background: 'var(--card)'}}>
      <div className="band-inner">
        <div className="section-head">
          <p className="section-label">The Library</p>
          <Link href="/library" className="quiet-link">
            All Library →
          </Link>
        </div>
        <div className="library-feature">
          <Link href={`/library/${featured.slug}`}>
            <StoryMarginalia lines={['Library · Featured']} />
            <h3 className="cover-headline" style={{fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', margin: '20px 0 8px'}}>
              {featured.title}
            </h3>
            <p className="marginalia">{[featured.creator, featured.medium, featured.year].filter(Boolean).join(' · ')}</p>
            {featured.whyICame ? (
              <p style={{fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.68, color: 'var(--ink-muted)', marginTop: 16}}>
                {featured.whyICame}
              </p>
            ) : null}
          </Link>
          {home.supportingLibrary.length ? (
            <div className="library-support">
              {home.supportingLibrary.map((item) => (
                <Link key={item.id} href={`/library/${item.slug}`}>
                  <p style={{fontFamily: 'var(--font-editorial)', fontWeight: 600}}>{item.title}</p>
                  <p className="marginalia">{[item.creator, item.year].filter(Boolean).join(' · ')}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function FieldNotesBand({home}: {home: HomepageView}) {
  if (!home.fieldNotes.length) return null
  return (
    <section className="band">
      <div className="band-inner">
        <div className="section-head">
          <p className="section-label">Field Notes</p>
          <Link href="/stories?type=fieldNote" className="quiet-link">
            All Notes →
          </Link>
        </div>
        {home.fieldNotes.map((note) => (
          <Link key={note.id} href={`/stories/${note.slug}`} className="note-row">
            <span className="marginalia" style={{width: 44}}>
              {note.noteNumber || 'Note'}
            </span>
            <span style={{fontFamily: 'var(--font-editorial)', flex: 1}}>{note.title}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function NewsletterBand({name, description}: {name?: string; description?: string}) {
  if (!name && !description) return null
  return (
    <section className="newsletter">
      {name ? <StoryMarginalia lines={[name]} /> : null}
      {description ? <h2>{description}</h2> : null}
      <p className="empty-note" style={{maxWidth: 340, margin: '0 auto'}}>
        Subscription is not open yet. This is an editorial announcement, not a mailing list.
      </p>
    </section>
  )
}
