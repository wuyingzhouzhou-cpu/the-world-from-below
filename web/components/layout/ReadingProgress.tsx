'use client'

import {useEffect, useState} from 'react'

export function ReadingProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setWidth(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="reading-progress" style={{width: `${width}%`}} aria-hidden />
}
