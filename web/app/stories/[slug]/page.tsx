import {StoryPage} from '@/components/story/StoryPage'
import {pageMetadata} from '@/lib/metadata'
import {client} from '@/sanity/client'
import {storyBySlugQuery} from '@/sanity/queries'
import {toStoryViewModel} from '@/sanity/story'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

type PageProps = {params: Promise<{slug: string}>}

async function loadStory(slug: string) {
  const raw = await client.fetch(storyBySlugQuery, {slug})
  return raw ? toStoryViewModel(raw) : null
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params
  const raw = await client.fetch(storyBySlugQuery, {slug})
  if (!raw) return {title: 'Story'}
  const story = toStoryViewModel(raw)
  return pageMetadata({
    title: `${story.title} — The World From Below`,
    description: story.dek,
    metaTitle: raw.metaTitle,
    metaDescription: raw.metaDescription,
    canonicalUrl: raw.canonicalUrl,
    socialImage: raw.socialImage,
  })
}

export default async function StoryRoute({params}: PageProps) {
  const {slug} = await params
  const story = await loadStory(slug)
  if (!story) notFound()
  return <StoryPage story={story} />
}
