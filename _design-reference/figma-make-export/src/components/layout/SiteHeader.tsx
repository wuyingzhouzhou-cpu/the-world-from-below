import { useState } from 'react'
import { BRAND } from '../../config'
import type { View } from '../../App'

interface Props {
  currentView: View
  navigate: (v: View) => void
}

const navItems: { label: string; view: View }[] = [
  { label: 'Stories', view: 'feature' },
  { label: 'Places',  view: 'places'  },
  { label: 'Forces',  view: 'forces'  },
  { label: 'Library', view: 'library' },
  { label: 'About',   view: 'about'   },
]

const homeViews: View[] = ['home', 'home-typographic', 'home-split']

export default function SiteHeader({ currentView, navigate }: Props) {
  const [open, setOpen] = useState(false)

  const isActive = (view: View) =>
    !homeViews.includes(currentView) && currentView === view

  return (
    <header
      style={{
        background: 'var(--pub-bg)',
        borderBottom: '1px solid var(--pub-border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'background 0.5s ease',
      }}
    >
      <div
        style={{ maxWidth: 1400, margin: '0 auto' }}
        className="px-6 md:px-12 flex items-center justify-between h-14"
      >
        {/* Wordmark */}
        <button
          onClick={() => { navigate('home'); setOpen(false) }}
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--pub-fg)',
            fontSize: '1rem',
            fontWeight: 600,
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {BRAND.name}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.view)}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isActive(item.view) ? 'var(--pub-fg)' : 'var(--pub-fg-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s ease',
                borderBottom: isActive(item.view) ? '1px solid var(--pub-accent)' : '1px solid transparent',
                paddingBottom: 1,
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--pub-fg-muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label="Search"
          >
            Search
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: open ? 'var(--pub-accent)' : 'var(--pub-fg-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
        >
          {open ? '× Close' : '≡ Contents'}
        </button>
      </div>

      {/* Mobile drawer — editorial table of contents */}
      {open && (
        <div
          className="md:hidden"
          style={{ borderTop: '1px solid var(--pub-border)', background: 'var(--pub-bg)' }}
        >
          <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--pub-border)' }}>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--pub-fg-faint)',
            }}>
              Vol. I · No. 1 · Autumn 2024
            </p>
          </div>

          <nav aria-label="Mobile navigation">
            {navItems.map((item, i) => (
              <button
                key={item.label}
                onClick={() => { navigate(item.view); setOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  width: '100%',
                  padding: '18px 24px',
                  background: 'none',
                  border: 'none',
                  borderBottom: i < navItems.length - 1 ? '1px solid var(--pub-border)' : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  color: 'var(--pub-fg-faint)',
                  minWidth: 24,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: isActive(item.view) ? 'var(--pub-accent)' : 'var(--pub-fg)',
                  letterSpacing: '-0.01em',
                }}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
