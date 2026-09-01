import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'aboutSection',
          fields: [
            defineField({name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'body', title: 'Body', type: 'text', rows: 6, validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'heading'}},
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About'}
    },
  },
})
