import { useState } from 'react'
import { BRAND } from '../../config'
import { Marginalia } from '../editorial/EditorialMarginalia'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section>
      <div style={{ maxWidth: 1400, margin: '0 auto' }} className="px-6 md:px-12 py-20 flex flex-col items-center text-center">
        <Marginalia lines={[BRAND.newsletter.name]} className="mb-4" />
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
          color: 'var(--pub-fg)', lineHeight: 1.22, margin: '12px 0 8px', letterSpacing: '-0.02em',
        }}>
          {BRAND.newsletter.description}
        </h2>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--pub-fg-muted)', marginBottom: 28, maxWidth: 340 }}>
          An irregular dispatch. No noise. No marketing.
        </p>
        {done ? (
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--pub-accent)', letterSpacing: '0.05em' }}>You're subscribed. Thank you.</p>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email) setDone(true) }} className="flex w-full" style={{ maxWidth: 380 }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Your email" required
              style={{
                fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--pub-fg)',
                background: 'var(--pub-card)', border: '1px solid var(--pub-border)',
                borderRight: 'none', padding: '10px 14px', outline: 'none', flex: 1,
              }} />
            <button type="submit" style={{
              fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--pub-bg)', background: 'var(--pub-fg)',
              border: '1px solid var(--pub-fg)', padding: '10px 18px', cursor: 'pointer', whiteSpace: 'nowrap',
            }}>Subscribe</button>
          </form>
        )}
      </div>
    </section>
  )
}
