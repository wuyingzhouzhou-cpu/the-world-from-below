import {Box, Card, Text} from '@sanity/ui'
import type {SanityDocument} from 'sanity'

type PreviewIframeProps = {
  document: {
    displayed: SanityDocument & {
      slug?: {current?: string}
      title?: string
    }
  }
}

export function PreviewIframe(props: PreviewIframeProps) {
  const slug = props.document.displayed?.slug?.current
  const title = props.document.displayed?.title

  if (!slug) {
    return (
      <Box padding={4}>
        <Text size={1}>Add a slug to open the development preview. This preview is for CMS testing only — not the final design.</Text>
      </Box>
    )
  }

  const src = `http://localhost:3000/preview/${slug}`

  return (
    <Card height="fill" tone="transparent">
      <Box padding={3} style={{borderBottom: '1px solid var(--card-border-color)'}}>
        <Text size={1} muted>
          Development preview{title ? ` — ${title}` : ''}. Start the website with npm run dev in /web.
        </Text>
      </Box>
      <iframe
        src={src}
        title="Article preview"
        style={{width: '100%', height: 'calc(100% - 44px)', border: 0}}
      />
    </Card>
  )
}
