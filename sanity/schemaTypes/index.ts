import {aboutPage} from './documents/aboutPage'
import {author} from './documents/author'
import {force} from './documents/force'
import {libraryItem} from './documents/libraryItem'
import {place} from './documents/place'
import {siteSettings} from './documents/siteSettings'
import {story} from './documents/story'
import {aside, divider, sourceEntry, sourceNote, videoEmbed} from './objects/editorialBlocks'
import {editorialImage} from './objects/editorialImage'
import {epigraph, pullQuote, sourceQuote} from './objects/quotes'
import {bodyImage, fullImage, gallery, imagePair, portraitImage, wideImage} from './objects/semanticImages'

export const schemaTypes = [
  story,
  place,
  force,
  libraryItem,
  author,
  aboutPage,
  siteSettings,
  editorialImage,
  bodyImage,
  wideImage,
  fullImage,
  portraitImage,
  imagePair,
  gallery,
  pullQuote,
  sourceQuote,
  epigraph,
  aside,
  videoEmbed,
  divider,
  sourceNote,
  sourceEntry,
]
