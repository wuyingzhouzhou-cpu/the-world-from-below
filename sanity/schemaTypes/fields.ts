import {BlockElementIcon} from '@sanity/icons/BlockElement'
import {DocumentPdfIcon} from '@sanity/icons/DocumentPdf'
import {ImageIcon} from '@sanity/icons/Image'
import {ImagesIcon} from '@sanity/icons/Images'
import {InlineElementIcon} from '@sanity/icons/InlineElement'
import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {DoubleQuoteIcon} from '@sanity/icons/DoubleQuote'
import {SplitVerticalIcon} from '@sanity/icons/SplitVertical'
import {TextIcon} from '@sanity/icons/Text'
import {UlistIcon} from '@sanity/icons/Ulist'
import {defineArrayMember, defineField} from 'sanity'
import {bodyBlockProblems} from '../lib/validation'
import {MOODS, STORY_TYPES} from './constants'

export const articleBodyField = defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  group: 'body',
  description:
    'Write in this editor. Insert images and quotes from the + menu. You never need Markdown, HTML, CSS, or pixel widths. Some blocks belong only to certain story types — Studio will say so if a block does not fit.',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Section heading', value: 'h2'},
        {title: 'Subheading', value: 'h3'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Emphasis', value: 'em'},
          {title: 'Strong', value: 'strong'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto'],
                    allowRelative: false,
                  }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({type: 'bodyImage', title: 'Body Image', icon: ImageIcon}),
    defineArrayMember({type: 'wideImage', title: 'Wide Image', icon: ImageIcon}),
    defineArrayMember({type: 'fullImage', title: 'Full Image', icon: ImageIcon}),
    defineArrayMember({type: 'portraitImage', title: 'Portrait Image', icon: ImageIcon}),
    defineArrayMember({type: 'imagePair', title: 'Image Pair', icon: SplitVerticalIcon}),
    defineArrayMember({type: 'gallery', title: 'Gallery', icon: ImagesIcon}),
    defineArrayMember({type: 'pullQuote', title: 'Pull Quote', icon: DoubleQuoteIcon}),
    defineArrayMember({type: 'sourceQuote', title: 'Source Quote', icon: BlockquoteIcon}),
    defineArrayMember({type: 'epigraph', title: 'Epigraph', icon: TextIcon}),
    defineArrayMember({type: 'aside', title: 'Aside / Context', icon: InlineElementIcon}),
    defineArrayMember({type: 'videoEmbed', title: 'Video', icon: BlockElementIcon}),
    defineArrayMember({type: 'divider', title: 'Divider', icon: UlistIcon}),
    defineArrayMember({type: 'sourceNote', title: 'Source Note', icon: DocumentPdfIcon}),
  ],
  validation: (Rule) =>
    Rule.custom((body, context) => {
      const storyType = (context.document as {storyType?: unknown} | undefined)?.storyType
      const problems = bodyBlockProblems(body as {_type?: string}[] | undefined, storyType)
      return problems[0] || true
    }),
})

export const storyFields = [
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    group: 'story',
    validation: (Rule) => Rule.required().min(4),
  }),
  defineField({
    name: 'dek',
    title: 'Dek',
    type: 'text',
    rows: 3,
    group: 'story',
    description: 'The standfirst under the title — one or two sentences.',
    validation: (Rule) => Rule.required().min(20).warning('A dek should introduce the piece.'),
  }),
  defineField({
    name: 'storyType',
    title: 'Story type',
    type: 'string',
    group: 'story',
    options: {list: [...STORY_TYPES], layout: 'radio'},
    validation: (Rule) => Rule.required(),
    description: 'Feature, Essay, or Field Note. Changing this does not copy the document.',
  }),
  defineField({
    name: 'visualMood',
    title: 'Visual mood',
    type: 'string',
    group: 'story',
    options: {list: [...MOODS], layout: 'radio'},
    description:
      'Chooses the story’s atmosphere. Independent of story type. This is not a CSS control.',
  }),
  defineField({
    name: 'noteNumber',
    title: 'Note number',
    type: 'string',
    group: 'story',
    description: 'Editorial number, such as 01. Not a database ID.',
    hidden: ({document}) => document?.storyType !== 'fieldNote',
  }),
  defineField({
    name: 'authors',
    title: 'Authors',
    type: 'array',
    group: 'story',
    of: [{type: 'reference', to: [{type: 'author'}]}],
    description: 'Usually one person. Add another only for a collaboration.',
    validation: (Rule) => Rule.max(4),
  }),
  defineField({
    name: 'hero',
    title: 'Hero image',
    type: 'editorialImage',
    group: 'story',
  }),
  articleBodyField,
  defineField({
    name: 'places',
    title: 'Places',
    type: 'array',
    group: 'relations',
    of: [{type: 'reference', to: [{type: 'place'}]}],
  }),
  defineField({
    name: 'forces',
    title: 'Forces',
    type: 'array',
    group: 'relations',
    of: [{type: 'reference', to: [{type: 'force'}]}],
  }),
  defineField({
    name: 'relatedStories',
    title: 'Related stories',
    type: 'array',
    group: 'relations',
    of: [
      {
        type: 'reference',
        to: [{type: 'story'}],
        options: {
          filter: ({document}) => {
            const publishedId = document._id?.replace(/^drafts\./, '') || ''
            return {
              filter: '!(_id in [$id, $draftId])',
              params: {
                id: publishedId,
                draftId: `drafts.${publishedId}`,
              },
            }
          },
        },
      },
    ],
    validation: (Rule) =>
      Rule.custom((value, context) => {
        const publishedId = context.document?._id?.replace(/^drafts\./, '')
        if (!publishedId || !Array.isArray(value)) return true
        const refersToSelf = value.some(
          (item) =>
            item &&
            typeof item === 'object' &&
            '_ref' in item &&
            (item._ref === publishedId || item._ref === `drafts.${publishedId}`),
        )
        return refersToSelf ? 'A story cannot reference itself.' : true
      }),
  }),
  defineField({
    name: 'relatedLibraryItems',
    title: 'Library',
    type: 'array',
    group: 'relations',
    of: [{type: 'reference', to: [{type: 'libraryItem'}]}],
  }),
  defineField({
    name: 'sources',
    title: 'Sources',
    type: 'array',
    group: 'sources',
    of: [{type: 'sourceEntry'}],
    description: 'Bibliography for the piece. Editors fill this — not a developer file.',
  }),
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    group: 'publishing',
    options: {
      source: 'title',
      maxLength: 96,
      isUnique: (value, context) => context.defaultIsUnique(value, context),
    },
    validation: (Rule) => Rule.required(),
    description: 'Must be unique among all stories.',
  }),
  defineField({
    name: 'publishedAt',
    title: 'Publication date',
    type: 'datetime',
    group: 'publishing',
    description: 'Used for archive order, newsletter, and RSS.',
  }),
  defineField({
    name: 'editorialStatus',
    title: 'Editorial status',
    type: 'string',
    group: 'publishing',
    options: {
      list: [
        {title: 'Draft', value: 'draft'},
        {title: 'In review', value: 'in-review'},
        {title: 'Ready', value: 'ready'},
      ],
      layout: 'radio',
    },
    initialValue: 'draft',
    description: 'Internal workflow only. Not shown on the public site.',
  }),
  defineField({
    name: 'metaTitle',
    title: 'Meta title',
    type: 'string',
    group: 'seo',
    description: 'Optional. Defaults to the story title if empty.',
  }),
  defineField({
    name: 'metaDescription',
    title: 'Meta description',
    type: 'text',
    rows: 3,
    group: 'seo',
  }),
  defineField({
    name: 'socialImage',
    title: 'Social image',
    type: 'image',
    group: 'seo',
    options: {hotspot: true},
  }),
  defineField({
    name: 'canonicalUrl',
    title: 'Canonical URL',
    type: 'url',
    group: 'seo',
    validation: (Rule) =>
      Rule.uri({
        scheme: ['http', 'https'],
        allowRelative: false,
      }),
  }),
]
