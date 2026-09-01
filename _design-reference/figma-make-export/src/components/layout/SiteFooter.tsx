import { BRAND } from '../../config'
import type { View } from '../../App'

interface Props {
  navigate: (v: View) => void
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontFamily: 'var(--font-ui)',
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--pub-fg-faint)',
  }}>{children}</span>
)

export default function SiteFooter({ navigate }: Props) {
  return (
    <footer style={{ borderTop: '1px solid var(--pub-border)', background: 'var(--pub-card)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-6 md:px-12">

        {/* Link groups */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'var(--pub-fg)',
              marginBottom: 16,
            }}>
              {BRAND.name}
            </p>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 12,
              color: 'var(--pub-fg-muted)',
              lineHeight: 1.7,
              maxWidth: 180,
            }}>
              {BRAND.tagline}
            </p>
          </div>

          {/* Read */}
          <div className="flex flex-col gap-3">
            <Label>Read</Label>
            {[
              { label: 'Stories',  view: 'feature'  as View },
              { label: 'Places',   view: 'places'   as View },
              { label: 'Forces',   view: 'forces'   as View },
              { label: 'Library',  view: 'library'  as View },
            ].map(({ label, view }) => (
              <button
                key={label}
                onClick={() => navigate(view)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: 'var(--pub-fg-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--pub-fg)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--pub-fg-muted)')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Publication */}
          <div className="flex flex-col gap-3">
            <Label>Publication</Label>
            {[
              { label: 'About',               view: 'about' as View },
              { label: 'Editorial Principles', view: 'about' as View },
            ].map(({ label, view }) => (
              <button
                key={label}
                onClick={() => navigate(view)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: 'var(--pub-fg-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--pub-fg)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--pub-fg-muted)')}
              >
                {label}
              </button>
            ))}
            {['Contact', 'Archive'].map(item => (
              <span key={item} style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--pub-fg-faint)' }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div
          className="py-5 flex items-center"
          style={{ borderTop: '1px solid var(--pub-border)' }}
        >
          <Label>© 2024 {BRAND.name}. Independent publishing.</Label>
        </div>
      </div>
    </footer>
  )
}
