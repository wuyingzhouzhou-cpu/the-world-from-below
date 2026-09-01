import {PinIcon} from '@sanity/icons/Pin'
import {defineField, defineType} from 'sanity'

export const place = defineType({
  name: 'place',
  title: 'Place',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
    }),
    defineField({
      name: 'forces',
      title: 'Related forces',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'force'}]}],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'country', media: 'image.image'},
  },
})
