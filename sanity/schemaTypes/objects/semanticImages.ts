import {defineArrayMember, defineField, defineType} from 'sanity'
import {editorialImageFields} from './editorialImage'
import {editorialImageProblems} from '../../lib/validation'

const imageFieldsets = [
  {name: 'rights' as const, title: 'Caption, source & rights'},
  {
    name: 'provenance' as const,
    title: 'Provenance',
    options: {collapsible: true, collapsed: false},
  },
]

function semanticImageType(
  name: string,
  title: string,
  description: string,
) {
  return defineType({
    name,
    title,
    type: 'object',
    description,
    fieldsets: imageFieldsets,
    fields: editorialImageFields,
    preview: {
      select: {
        caption: 'caption',
        alt: 'alt',
        media: 'image',
        status: 'provenanceStatus',
      },
      prepare({caption, alt, media, status}) {
        return {
          title: caption || alt || title,
          subtitle: `${title}${status ? ` · ${status}` : ''}`,
          media,
        }
      },
    },
    validation: (Rule) =>
      Rule.custom((value) => {
        const problems = editorialImageProblems(value as never)
        return problems[0] || true
      }),
  })
}

export const bodyImage = semanticImageType(
  'bodyImage',
  'Body Image',
  'Sits in the reading column with the text. Choose this for most photographs. Do not enter pixel widths.',
)

export const wideImage = semanticImageType(
  'wideImage',
  'Wide Image',
  'Breaks out of the reading column, still within the page. Use for important documentary photographs.',
)

export const fullImage = semanticImageType(
  'fullImage',
  'Full Image',
  'Uses the full viewport width. Reserve for rare, emphatic pictures.',
)

export const portraitImage = semanticImageType(
  'portraitImage',
  'Portrait Image',
  'A vertical portrait. The layout will treat it as a person or figure, not a landscape.',
)

export const imagePair = defineType({
  name: 'imagePair',
  title: 'Image Pair',
  type: 'object',
  description: 'Two photographs shown together. Left and right are editorial roles, not pixel positions you must calculate.',
  fields: [
    defineField({
      name: 'left',
      title: 'Left image',
      type: 'editorialImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'right',
      title: 'Right image',
      type: 'editorialImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pairCaption',
      title: 'Shared caption',
      type: 'text',
      rows: 2,
      description: 'Optional caption for the pair as a whole.',
    }),
  ],
  preview: {
    select: {left: 'left.alt', right: 'right.alt', media: 'left.image'},
    prepare({left, right, media}) {
      return {
        title: 'Image Pair',
        subtitle: [left, right].filter(Boolean).join(' / ') || 'Two photographs',
        media,
      }
    },
  },
})

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  description: 'A sequence of photographs. Order is editorial, not a CSS grid you design.',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({type: 'editorialImage'})],
      validation: (Rule) => Rule.required().min(2).error('A gallery needs at least two images.'),
    }),
  ],
  preview: {
    select: {heading: 'heading', images: 'images'},
    prepare({heading, images}) {
      const count = Array.isArray(images) ? images.length : 0
      return {
        title: heading || 'Gallery',
        subtitle: `${count} photograph${count === 1 ? '' : 's'}`,
      }
    },
  },
})
