import {BookIcon} from '@sanity/icons/Book'
import {defineField, defineType} from 'sanity'

export const libraryItem = defineType({
  name: 'libraryItem',
  title: 'Library item',
  type: 'document',
  icon: BookIcon,
  groups: [
    {name: 'work', title: 'Work', default: true},
    {name: 'notes', title: 'Editorial notes'},
    {name: 'relations', title: 'Relations'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'work',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'work',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'creator',
      title: 'Author / maker',
      type: 'string',
      group: 'work',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'work',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      group: 'work',
      options: {
        list: [
          {title: 'Book', value: 'book'},
          {title: 'Film', value: 'film'},
          {title: 'Photography', value: 'photography'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Cover / still',
      type: 'editorialImage',
      group: 'work',
    }),
    defineField({
      name: 'whyICame',
      title: 'Why I came to this work',
      type: 'text',
      rows: 5,
      group: 'notes',
    }),
    defineField({
      name: 'whoseWorld',
      title: 'Whose world does it open?',
      type: 'text',
      rows: 5,
      group: 'notes',
    }),
    defineField({
      name: 'largerForces',
      title: 'The larger forces',
      type: 'text',
      rows: 5,
      group: 'notes',
    }),
    defineField({
      name: 'whatChoicesRemain',
      title: 'What choices remain?',
      type: 'text',
      rows: 5,
      group: 'notes',
    }),
    defineField({
      name: 'oneQuestion',
      title: 'One question I kept thinking about',
      type: 'text',
      rows: 3,
      group: 'notes',
    }),
    defineField({
      name: 'readWatchNext',
      title: 'Read / watch next',
      type: 'text',
      rows: 3,
      group: 'notes',
    }),
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
  ],
  preview: {
    select: {title: 'title', creator: 'creator', medium: 'medium', media: 'cover.image'},
    prepare({title, creator, medium, media}) {
      return {
        title: title || 'Untitled work',
        subtitle: [creator, medium].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
