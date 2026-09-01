import {BoltIcon} from '@sanity/icons/Bolt'
import {defineField, defineType} from 'sanity'

export const force = defineType({
  name: 'force',
  title: 'Force',
  type: 'document',
  icon: BoltIcon,
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
      name: 'question',
      title: 'Editorial question',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: 'The question this force asks of ordinary life.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'places',
      title: 'Related places',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'place'}]}],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'question'},
  },
})
