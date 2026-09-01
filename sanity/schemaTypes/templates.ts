import {ComposeIcon} from '@sanity/icons/Compose'
import {DocumentSheetIcon} from '@sanity/icons/DocumentSheet'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import type {Template} from 'sanity'

export const storyTemplates: Template[] = [
  {
    id: 'story-feature',
    title: 'New Feature',
    schemaType: 'story',
    icon: DocumentTextIcon,
    value: {
      storyType: 'feature',
      visualMood: 'documentary',
      editorialStatus: 'draft',
    },
  },
  {
    id: 'story-essay',
    title: 'New Essay',
    schemaType: 'story',
    icon: ComposeIcon,
    value: {
      storyType: 'essay',
      visualMood: 'quiet',
      editorialStatus: 'draft',
    },
  },
  {
    id: 'story-fieldNote',
    title: 'New Field Note',
    schemaType: 'story',
    icon: DocumentSheetIcon,
    value: {
      storyType: 'fieldNote',
      visualMood: 'minimal',
      editorialStatus: 'draft',
    },
  },
]
