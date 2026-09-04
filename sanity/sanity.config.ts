import {defineLocations, presentationTool} from 'sanity/presentation'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {STORY_TYPE_LABELS, isStoryType} from './lib/validation'
import {schemaTypes} from './schemaTypes'
import {storyTemplates} from './schemaTypes/templates'
import {defaultDocumentNode, structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'The World From Below',

  projectId: 'e0cbf8ib',
  dataset: 'production',

  plugins: [
    structureTool({structure, defaultDocumentNode}),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000',
        preview: '/',
      },
      resolve: {
        locations: {
          story: defineLocations({
            select: {title: 'title', slug: 'slug.current', storyType: 'storyType'},
            resolve: (doc) => {
              const kind = isStoryType(doc?.storyType) ? STORY_TYPE_LABELS[doc.storyType] : 'Story'
              return {
                locations: doc?.slug
                  ? [{title: `${kind}: ${doc.title || 'Untitled'}`, href: `/preview/${doc.slug}`}]
                  : [],
              }
            },
          }),
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter(
        (template) => !['aboutPage', 'siteSettings', 'story'].includes(template.schemaType),
      ),
      ...storyTemplates,
    ],
  },

  form: {
    components: {
      portableText: {
        plugins: (props) =>
          props.renderDefault({
            ...props,
            plugins: {
              ...props.plugins,
              markdown: {enabled: false},
            },
          }),
      },
    },
  },
})
