import {BookIcon} from '@sanity/icons/Book'
import {CogIcon} from '@sanity/icons/Cog'
import {ComposeIcon} from '@sanity/icons/Compose'
import {DocumentSheetIcon} from '@sanity/icons/DocumentSheet'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {UserIcon} from '@sanity/icons/User'
import type {DefaultDocumentNodeResolver, StructureResolver} from 'sanity/structure'
import {PreviewIframe} from './components/PreviewIframe'

const storyViews = (S: Parameters<StructureResolver>[0]) =>
  S.document().views([S.view.form(), S.view.component(PreviewIframe).title('Preview')])

function storyList(
  S: Parameters<StructureResolver>[0],
  title: string,
  filter: string,
  templateId: string,
) {
  return S.documentList()
    .title(title)
    .schemaType('story')
    .filter(filter)
    .apiVersion('2026-06-23')
    .initialValueTemplates([S.initialValueTemplateItem(templateId)])
    .child((id) => storyViews(S).id(id).schemaType('story'))
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (schemaType === 'story') return storyViews(S)
  return S.document()
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('The World From Below')
    .items([
      S.listItem()
        .title('Stories')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Stories')
            .items([
              S.listItem()
                .title('All Stories')
                .icon(DocumentsIcon)
                .schemaType('story')
                .child(
                  S.documentList()
                    .title('All Stories')
                    .schemaType('story')
                    .filter('_type == "story"')
                    .apiVersion('2026-06-23')
                    .initialValueTemplates([
                      S.initialValueTemplateItem('story-feature'),
                      S.initialValueTemplateItem('story-essay'),
                      S.initialValueTemplateItem('story-fieldNote'),
                    ])
                    .child((id) => storyViews(S).id(id).schemaType('story')),
                ),
              S.divider(),
              S.listItem()
                .title('Features')
                .icon(DocumentTextIcon)
                .schemaType('story')
                .child(
                  storyList(S, 'Features', '_type == "story" && storyType == "feature"', 'story-feature'),
                ),
              S.listItem()
                .title('Essays')
                .icon(ComposeIcon)
                .schemaType('story')
                .child(storyList(S, 'Essays', '_type == "story" && storyType == "essay"', 'story-essay')),
              S.listItem()
                .title('Field Notes')
                .icon(DocumentSheetIcon)
                .schemaType('story')
                .child(
                  storyList(
                    S,
                    'Field Notes',
                    '_type == "story" && storyType == "fieldNote"',
                    'story-fieldNote',
                  ),
                ),
            ]),
        ),
      S.listItem()
        .title('World')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('World')
            .items([
              S.documentTypeListItem('place').title('Places').icon(EarthGlobeIcon),
              S.documentTypeListItem('force').title('Forces'),
            ]),
        ),
      S.documentTypeListItem('libraryItem').title('Library').icon(BookIcon),
      S.documentTypeListItem('author').title('Authors').icon(UserIcon),
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('About')
                .icon(InfoOutlineIcon)
                .child(S.document().schemaType('aboutPage').documentId('aboutPage').title('About')),
              S.listItem()
                .title('Site settings')
                .icon(CogIcon)
                .child(
                  S.document().schemaType('siteSettings').documentId('siteSettings').title('Site settings'),
                ),
            ]),
        ),
    ])
