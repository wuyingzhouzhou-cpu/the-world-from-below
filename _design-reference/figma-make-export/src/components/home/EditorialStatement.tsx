import { BRAND } from '../../config'
import { Marginalia } from '../editorial/EditorialMarginalia'

export default function EditorialStatement() {
  return (
    <section style={{ borderBottom: '1px solid var(--pub-border)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-5 md:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-6 md:gap-8">
          <div className="hidden md:block md:col-span-1">
            <Marginalia lines={['Vol. 1', 'No. 1', '—', 'Autumn', '2024']} />
          </div>
          <div className="md:col-span-7">
            {/* Roman — not italic. Documentary, not literary fashion. */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem, 3.8vw, 3.2rem)',
              lineHeight: 1.2,
              color: 'var(--pub-fg)',
              letterSpacing: '-0.02em',
            }}>
              {BRAND.question}
            </h1>
          </div>
          <div className="md:col-span-4">
            <div className="hidden md:block" style={{ borderLeft: '1px solid var(--pub-border)', paddingLeft: 'clamp(16px, 2vw, 32px)' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--pub-fg-muted)', lineHeight: 1.65, marginBottom: 14 }}>
                {BRAND.tagline}
              </p>
              <Marginalia lines={['Editorial Demo · Issue 001']} />
            </div>
            <div className="md:hidden">
              <Marginalia lines={['Issue 001 · Autumn 2024']} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
