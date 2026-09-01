import {defineField, defineType} from 'sanity'

export const aside = defineType({
  name: 'aside',
  title: 'Aside / Context',
  type: 'object',
  description: 'A short contextual note beside or after the main argument. Not a sidebar you style in CSS.',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Context',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'body'},
    prepare({title, subtitle}) {
      return {
        title: title || 'Aside / Context',
        subtitle: subtitle,
      }
    },
  },
})

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video',
  type: 'object',
  description: 'A film clip or documentary excerpt. Paste a URL — do not embed HTML.',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'credit',
      title: 'Credit',
      type: 'string',
    }),
    defineField({
      name: 'provenanceStatus',
      title: 'Provenance',
      type: 'string',
      options: {
        list: [
          {title: 'Verified', value: 'verified'},
          {title: 'Placeholder', value: 'placeholder'},
          {title: 'Unverified', value: 'unverified'},
        ],
        layout: 'radio',
      },
      initialValue: 'placeholder',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'url'},
    prepare({title, subtitle}) {
      return {title: title || 'Video', subtitle}
    },
  },
})

export const divider = defineType({
  name: 'divider',
  title: 'Divider',
  type: 'object',
  description: 'A semantic break in the story. Not a decorative line you design.',
  fields: [
    defineField({
      name: 'intent',
      title: 'Kind of break',
      type: 'string',
      options: {
        list: [
          {title: 'Scene break', value: 'scene'},
          {title: 'Section break', value: 'section'},
        ],
        layout: 'radio',
      },
      initialValue: 'scene',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {intent: 'intent'},
    prepare({intent}) {
      return {
        title: 'Divider',
        subtitle: intent === 'section' ? 'Section break' : 'Scene break',
      }
    },
  },
})

export const sourceNote = defineType({
  name: 'sourceNote',
  title: 'Source Note',
  type: 'object',
  description: 'An inline note pointing at a source. The full bibliography lives in Sources at the end of the story.',
  fields: [
    defineField({
      name: 'text',
      title: 'Note',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Related source',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'text', subtitle: 'source'},
  },
})

export const sourceEntry = defineType({
  name: 'sourceEntry',
  title: 'Source',
  type: 'object',
  fields: [
    defineField({
      name: 'citation',
      title: 'Citation',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
      description: 'Author, title, year — a bibliography line, not a URL dump.',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'note',
      title: 'Editor note',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'citation'},
  },
})
