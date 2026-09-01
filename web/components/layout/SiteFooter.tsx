import Link from 'next/link'
import {client} from '@/sanity/client'
import {siteSettingsQuery} from '@/sanity/queries'
import {toSiteSettings} from '@/sanity/home'

export async function SiteFooter() {
  const raw = await client.fetch(siteSettingsQuery)
  const settings = toSiteSettings(raw)

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div>
            <p className="pub-wordmark" style={{marginBottom: 16}}>
              {settings.title}
            </p>
            {settings.tagline ? <p className="site-footer-tagline">{settings.tagline}</p> : null}
          </div>
          <div className="site-footer-col">
            <p className="index-kicker">Read</p>
            <Link href="/stories">Stories</Link>
            <Link href="/places">Places</Link>
            <Link href="/forces">Forces</Link>
            <Link href="/library">Library</Link>
          </div>
          <div className="site-footer-col">
            <p className="index-kicker">Publication</p>
            <Link href="/about">About</Link>
            <Link href="/search">Search</Link>
          </div>
        </div>
        <p className="site-footer-copy">© {new Date().getFullYear()} {settings.title}. Independent publishing.</p>
      </div>
    </footer>
  )
}
