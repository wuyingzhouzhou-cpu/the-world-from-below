import {defineField, defineType} from 'sanity'
import {sourceQuoteProblems} from '../../lib/validation'

export const pullQuote = defineType({
  name: 'pullQuote',
  title: 'Pull Quote',
  type: 'object',
  description: 'A line lifted from the story for emphasis. Not a citation.',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'Optional. Leave blank if the line belongs to the narrator.',
    }),
  ],
  preview: {
    select: {title: 'text', subtitle: 'attribution'},
    prepare({title, subtitle}) {
      return {
        title: title ? `“${title}”` : 'Pull Quote',
        subtitle: subtitle || 'Pull Quote',
      }
    },
  },
})

export const sourceQuote = defineType({
  name: 'sourceQuote',
  title: 'Source Quote',
  type: 'object',
  description: 'A quotation from a named source. Attribution and source are required.',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Who is speaking',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'The interview, book, film, document, or archive.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'text', attribution: 'attribution', source: 'source'},
    prepare({title, attribution, source}) {
      return {
        title: title ? `“${title}”` : 'Source Quote',
        subtitle: [attribution, source].filter(Boolean).join(' · '),
      }
    },
  },
  validation: (Rule) =>
    Rule.custom((value) => {
      const problems = sourceQuoteProblems(value as never)
      return problems[0] || true
    }),
})

export const epigraph = defineType({
  name: 'epigraph',
  title: 'Epigraph',
  type: 'object',
  description: 'An opening quotation that frames the piece. Usually one per story, near the top.',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'text', subtitle: 'attribution'},
  },
})
