import { useState } from 'react'
import Nav from './components/layout/SiteHeader'
import Footer from './components/layout/SiteFooter'
import HomePage from './pages/HomePage'
import HomeTypographic from './pages/HomeTypographic'
import HomeSplit from './pages/HomeSplit'
import FeatureStory from './pages/articles/PaperFeatureArticle'
import EssayPage from './pages/articles/EssayArticle'
import BookStory from './pages/articles/LibraryItemDetail'
import FieldNote from './pages/articles/FieldNoteArticle'
import PlacesIndex from './pages/PlacesPage'
import ForcesIndex from './pages/ForcesPage'
import LibraryIndex from './pages/LibraryPage'
import AboutPage from './pages/AboutPage'

export type View =
  | 'home'
  | 'home-typographic'
  | 'home-split'
  | 'feature'
  | 'essay'
  | 'book'
  | 'field-note'
  | 'places'
  | 'forces'
  | 'library'
  | 'about'

const homeVariants: { label: string; view: View; desc: string }[] = [
  { label: 'Photo', view: 'home', desc: 'Lead image dominant' },
  { label: 'Type', view: 'home-typographic', desc: 'Typography-first, no image' },
  { label: 'Split', view: 'home-split', desc: 'Image left, headline right' },
]

export default function App() {
  const [view, setView] = useState<View>('home')
  const [overlayOpen, setOverlayOpen] = useState(false)

  const navigate = (v: View) => {
    setView(v)
    setOverlayOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const renderPage = () => {
    switch (view) {
      case 'home':             return <HomePage navigate={navigate} />
      case 'home-typographic': return <HomeTypographic navigate={navigate} />
      case 'home-split':       return <HomeSplit navigate={navigate} />
      case 'feature':          return <FeatureStory navigate={navigate} />
      case 'essay':            return <EssayPage navigate={navigate} />
      case 'book':             return <BookStory navigate={navigate} />
      case 'field-note':       return <FieldNote navigate={navigate} />
      case 'places':           return <PlacesIndex navigate={navigate} />
      case 'forces':           return <ForcesIndex navigate={navigate} />
      case 'library':          return <LibraryIndex navigate={navigate} />
      case 'about':            return <AboutPage navigate={navigate} />
    }
  }

  const isHomeVariant = view === 'home' || view === 'home-typographic' || view === 'home-split'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav currentView={view} navigate={navigate} />
      <div style={{ flex: 1 }}>
        {renderPage()}
      </div>
      <Footer navigate={navigate} />

      {/* Prototype demo overlay — cover variant switcher, not part of editorial UI */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 500 }}>
        {overlayOpen && (
          <div style={{
            background: 'var(--pub-fg)',
            color: 'var(--pub-bg)',
            padding: '16px 0',
            marginBottom: 8,
            minWidth: 200,
            boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
          }}>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--pub-fg-faint)',
              padding: '0 16px 12px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              marginBottom: 8,
            }}>
              Cover Variants
            </p>
            {homeVariants.map(({ label, view: v, desc }) => (
              <button
                key={v}
                onClick={() => navigate(v)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 16px',
                  background: view === v ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseOver={e => { if (view !== v) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseOut={e => { if (view !== v) e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: view === v ? 'var(--pub-bg)' : 'rgba(255,255,255,0.6)',
                  marginBottom: 2,
                }}>
                  {label}
                  {view === v && <span style={{ marginLeft: 6, color: 'var(--pub-accent)', filter: 'brightness(2)' }}>●</span>}
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
                  {desc}
                </span>
              </button>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 8, padding: '10px 16px 0' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Prototype navigation only
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => setOverlayOpen(!overlayOpen)}
          title="Prototype: switch cover variant"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-ui)',
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: isHomeVariant ? 'var(--pub-bg)' : 'var(--pub-fg-faint)',
            background: isHomeVariant ? 'var(--pub-fg)' : 'var(--pub-card)',
            border: '1px solid var(--pub-border)',
            padding: '7px 12px',
            cursor: 'pointer',
            opacity: 0.8,
            transition: 'opacity 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '1')}
          onMouseOut={e => (e.currentTarget.style.opacity = '0.8')}
        >
          <span>⊞</span>
          <span>Covers</span>
        </button>
      </div>
    </div>
  )
}
