import {StoryPage} from '@/components/story/StoryPage'
import {JsonLd} from '@/components/site/JsonLd'
import {articleJsonLd} from '@/lib/jsonLd'
import {pageMetadata} from '@/lib/metadata'
import {canonicalUrl} from '@/lib/siteUrl'
import {client} from '@/sanity/client'
import {editorialImageSrc, type EditorialImageFields} from '@/sanity/image'
import {storyBySlugQuery} from '@/sanity/queries'
import {toStoryViewModel} from '@/sanity/story'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

type PageProps = {params: Promise<{slug: string}>}

async function loadRaw(slug: string) {
  return client.fetch(storyBySlugQuery, {slug})
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params
  const raw = await loadRaw(slug)
  if (!raw) notFound()
  const story = toStoryViewModel(raw)
  return pageMetadata({
    title: `${story.title} — The World From Below`,
    description: story.dek,
    path: `/stories/${slug}`,
    metaTitle: raw.metaTitle,
    metaDescription: raw.metaDescription,
    canonicalUrl: raw.canonicalUrl,
    socialImage: raw.socialImage,
    openGraphType: 'article',
  })
}

export default async function StoryRoute({params}: PageProps) {
  const {slug} = await params
  const raw = await loadRaw(slug)
  if (!raw) notFound()
  const story = toStoryViewModel(raw)
  const url = canonicalUrl(`/stories/${slug}`, raw.canonicalUrl)
  const social = raw.socialImage as EditorialImageFields | undefined
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: story.title,
          description: story.dek,
          datePublished: story.publishedAt,
          url,
          authors: story.authors,
          image: social,
          imageUrl: social ? editorialImageSrc(social, 1200) : undefined,
        })}
      />
      <StoryPage story={story} />
    </>
  )
}
