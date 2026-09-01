'use client'

import Link from 'next/link'
import {useMemo, useState} from 'react'
import type {ForceCard} from '@/sanity/home'

export function ForcesExplorer({forces}: {forces: ForceCard[]}) {
  const [activeId, setActiveId] = useState(forces[0]?.id)
  const active = useMemo(() => forces.find((force) => force.id === activeId), [forces, activeId])

  if (!forces.length) {
    return <p className="empty-note">No forces have been published yet.</p>
  }

  return (
    <div className="forces-panels">
      <div className="force-list">
        {forces.map((force) => (
          <button
            key={force.id}
            type="button"
            onClick={() => setActiveId(force.id)}
            aria-pressed={force.id === activeId}
          >
            <span className="force-name" style={{fontWeight: force.id === activeId ? 700 : 400}}>
              {force.name}
            </span>
            <span aria-hidden="true">{force.id === activeId ? '←' : '→'}</span>
          </button>
        ))}
      </div>
      <div>
        {active ? (
          <div>
            <p className="marginalia">Force</p>
            <h2 className="detail-title" style={{fontSize: 'clamp(2rem, 4vw, 3rem)'}}>
              {active.name}
            </h2>
            {active.question ? <p className="force-question">{active.question}</p> : null}
            {active.description ? (
              <p style={{fontFamily: 'var(--font-reading)', lineHeight: 1.78, marginBottom: 24}}>{active.description}</p>
            ) : null}
            {active.places.length ? (
              <div>
                <p className="section-label">Covered in</p>
                {active.places.map((place) => (
                  <Link key={place.id} href={`/places/${place.slug}`} className="read-link" style={{display: 'inline-block', margin: '8px 12px 0 0'}}>
                    {place.name}
                  </Link>
                ))}
              </div>
            ) : null}
            {active.slug ? (
              <p style={{marginTop: 32}}>
                <Link href={`/forces/${active.slug}`} className="read-link">
                  Open {active.name} →
                </Link>
              </p>
            ) : null}
          </div>
        ) : (
          <p className="empty-note">Select a force to explore the question it opens.</p>
        )}
      </div>
    </div>
  )
}
