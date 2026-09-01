import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineType} from 'sanity'
import {STORY_TYPE_LABELS, isStoryType} from '../../lib/validation'
import {STORY_GROUPS} from '../constants'
import {storyFields} from '../fields'

export const story = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  icon: DocumentTextIcon,
  groups: STORY_GROUPS,
  fields: storyFields,
  preview: {
    select: {
      title: 'title',
      dek: 'dek',
      storyType: 'storyType',
      media: 'hero.image',
    },
    prepare({title, dek, storyType, media}) {
      const kind = isStoryType(storyType) ? STORY_TYPE_LABELS[storyType] : 'Story'
      return {
        title: title || `Untitled ${kind.toLowerCase()}`,
        subtitle: dek ? `${kind} · ${dek}` : kind,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Publication date',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
