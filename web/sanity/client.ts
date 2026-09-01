import {createClient} from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-23',
  useCdn: true,
  perspective: 'published',
  token: process.env.SANITY_API_READ_TOKEN,
  timeout: 20000,
})
