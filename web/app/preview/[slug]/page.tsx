import {StoryPage} from '@/components/story/StoryPage'
import {client} from '@/sanity/client'
import {storyBySlugQuery} from '@/sanity/queries'
import {toStoryViewModel} from '@/sanity/story'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

type PageProps = {params: Promise<{slug: string}>}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params
  const raw = await client.fetch(storyBySlugQuery, {slug})
  if (!raw) return {title: 'Preview', robots: {index: false, follow: false}}
  return {
    title: `Preview: ${raw.title} — The World From Below`,
    description: raw.dek,
    robots: {index: false, follow: false},
  }
}

export default async function PreviewPage({params}: PageProps) {
  const {slug} = await params
  const raw = await client.fetch(storyBySlugQuery, {slug})
  if (!raw) notFound()
  return <StoryPage story={toStoryViewModel(raw)} />
}
