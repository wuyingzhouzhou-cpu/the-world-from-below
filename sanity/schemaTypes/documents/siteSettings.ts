import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Publication name',
      type: 'string',
      initialValue: 'The World From Below',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Editorial question',
      type: 'text',
      rows: 2,
      initialValue: "How do ordinary people live in a world they didn't design?",
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'newsletterName',
      title: 'Newsletter name',
      type: 'string',
      initialValue: 'Letters From Below',
    }),
    defineField({
      name: 'newsletterDescription',
      title: 'Newsletter description',
      type: 'string',
    }),
    defineField({
      name: 'homepageCover',
      title: 'Homepage cover',
      type: 'string',
      options: {
        list: [
          {title: 'Photo', value: 'photo'},
          {title: 'Typographic', value: 'typographic'},
          {title: 'Split', value: 'split'},
        ],
        layout: 'radio',
      },
      initialValue: 'photo',
      description: 'Editorial homepage composition. Readers do not switch this.',
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
