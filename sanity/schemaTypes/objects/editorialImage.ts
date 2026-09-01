import {defineField, defineType} from 'sanity'
import {editorialImageProblems} from '../../lib/validation'
import {PROVENANCE, RIGHTS} from '../constants'

export const editorialImageFields = [
  defineField({
    name: 'image',
    title: 'Image',
    type: 'image',
    options: {hotspot: true},
    description:
      'Upload from the computer after the Sanity project is claimed. Until then, use an external URL below.',
  }),
  defineField({
    name: 'externalUrl',
    title: 'External image URL',
    type: 'url',
    description: 'Use while uploads are unavailable, or for remote archives. Prefer uploads when possible.',
    validation: (Rule) =>
      Rule.uri({
        scheme: ['http', 'https'],
        allowRelative: false,
      }),
  }),
  defineField({
    name: 'alt',
    title: 'Alt text',
    type: 'string',
    description: 'Describe the picture for readers who cannot see it. Required.',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'caption',
    title: 'Caption',
    type: 'text',
    rows: 3,
    description: 'Editorial caption shown with the picture.',
  }),
  defineField({
    name: 'credit',
    title: 'Photographer / maker',
    type: 'string',
    fieldset: 'rights',
  }),
  defineField({
    name: 'source',
    title: 'Source',
    type: 'string',
    fieldset: 'rights',
    description: 'Archive, publication, collection, or agency.',
  }),
  defineField({
    name: 'rights',
    title: 'Rights',
    type: 'string',
    fieldset: 'rights',
    options: {list: [...RIGHTS]},
    initialValue: 'unknown',
  }),
  defineField({
    name: 'rightsHolder',
    title: 'Rights holder',
    type: 'string',
    fieldset: 'rights',
  }),
  defineField({
    name: 'recordedAt',
    title: 'Date recorded',
    type: 'date',
    fieldset: 'provenance',
  }),
  defineField({
    name: 'location',
    title: 'Location',
    type: 'string',
    fieldset: 'provenance',
    description: 'Only if verified. Do not invent a place.',
  }),
  defineField({
    name: 'provenanceStatus',
    title: 'Provenance',
    type: 'string',
    fieldset: 'provenance',
    options: {list: [...PROVENANCE], layout: 'radio'},
    initialValue: 'placeholder',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'provenanceNote',
    title: 'Provenance note',
    type: 'text',
    rows: 2,
    fieldset: 'provenance',
    description: 'Required when Unverified. Explain what is unknown.',
  }),
]

export const editorialImage = defineType({
  name: 'editorialImage',
  title: 'Editorial image',
  type: 'object',
  fieldsets: [
    {name: 'rights', title: 'Caption, source & rights'},
    {name: 'provenance', title: 'Provenance', options: {collapsible: true, collapsed: false}},
  ],
  fields: editorialImageFields,
  preview: {
    select: {
      title: 'caption',
      alt: 'alt',
      media: 'image',
      status: 'provenanceStatus',
    },
    prepare({title, alt, media, status}) {
      return {
        title: title || alt || 'Image',
        subtitle: status ? `Provenance: ${status}` : 'Provenance missing',
        media,
      }
    },
  },
  validation: (Rule) =>
    Rule.custom((value) => {
      const problems = editorialImageProblems(value as never, {required: false})
      return problems[0] || true
    }),
})
