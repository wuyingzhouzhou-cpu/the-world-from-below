'use client'

import {useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const NAV = [
  {label: 'Stories', href: '/stories'},
  {label: 'Places', href: '/places'},
  {label: 'Forces', href: '/forces'},
  {label: 'Library', href: '/library'},
  {label: 'About', href: '/about'},
  {label: 'Search', href: '/search'},
]

function isActive(pathname: string, href: string) {
  if (href === '/stories') {
    return pathname === '/stories' || pathname.startsWith('/stories/')
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function PublicationHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname() || '/'

  return (
    <header className="pub-header">
      <div className="pub-header-inner">
        <Link href="/" className="pub-wordmark" onClick={() => setOpen(false)}>
          The World From Below
        </Link>
        <nav className="pub-nav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={isActive(pathname, item.href) ? 'is-active' : undefined}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="pub-nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-contents"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? '× Close' : '≡ Contents'}
        </button>
      </div>
      <nav
        id="mobile-contents"
        className={`pub-nav-mobile${open ? ' is-open' : ''}`}
        aria-label="Contents"
      >
        {NAV.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className={isActive(pathname, item.href) ? 'is-active' : undefined}
            onClick={() => setOpen(false)}
          >
            <span className="pub-nav-index">{String(index + 1).padStart(2, '0')}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
