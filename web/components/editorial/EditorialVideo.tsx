function embedSrc(url?: string) {
  if (!url) return undefined
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : undefined
    }
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.replace('/', '')
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : undefined
    }
    if (parsed.hostname.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : undefined
    }
  } catch {
    return undefined
  }
  return undefined
}

export function EditorialVideo({
  value,
}: {
  value: {url?: string; title?: string; caption?: string; credit?: string}
}) {
  const src = embedSrc(value?.url)
  if (!value?.url) return null
  return (
    <figure className="editorial-video">
      {src ? (
        <iframe
          className="video-frame"
          src={src}
          title={value.title || 'Video'}
          allow="fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <p>
          <a href={value.url}>{value.title || value.url}</a>
        </p>
      )}
      {value.caption ? <figcaption className="source-line">{value.caption}</figcaption> : null}
    </figure>
  )
}
