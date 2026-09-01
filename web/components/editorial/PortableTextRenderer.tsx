import {PortableText, type PortableTextComponents} from 'next-sanity'
import {BodyImage} from './BodyImage'
import {WideImage} from './WideImage'
import {FullImage} from './FullImage'
import {PortraitImage} from './PortraitImage'
import {ImagePair} from './ImagePair'
import {EditorialGallery} from './EditorialGallery'
import {PullQuote} from './PullQuote'
import {SourceQuote} from './SourceQuote'
import {Epigraph} from './Epigraph'
import {EditorialAside} from './EditorialAside'
import {EditorialVideo} from './EditorialVideo'
import {EditorialDivider} from './EditorialDivider'
import {SourceNote} from './SourceNote'

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="story-body-copy">{children}</p>,
    h2: ({children}) => <h2 className="story-h2">{children}</h2>,
    h3: ({children}) => <h3 className="story-h3">{children}</h3>,
  },
  marks: {
    em: ({children}) => <em>{children}</em>,
    strong: ({children}) => <strong>{children}</strong>,
    link: ({children, value}) => (
      <a href={value?.href} rel="noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    pullQuote: ({value}) => <PullQuote value={value} />,
    sourceQuote: ({value}) => <SourceQuote value={value} />,
    epigraph: ({value}) => <Epigraph value={value} />,
    bodyImage: ({value}) => <BodyImage value={value} />,
    wideImage: ({value}) => <WideImage value={value} />,
    fullImage: ({value}) => <FullImage value={value} />,
    portraitImage: ({value}) => <PortraitImage value={value} />,
    imagePair: ({value}) => <ImagePair value={value} />,
    gallery: ({value}) => <EditorialGallery value={value} />,
    aside: ({value}) => <EditorialAside value={value} />,
    videoEmbed: ({value}) => <EditorialVideo value={value} />,
    divider: ({value}) => <EditorialDivider value={value} />,
    sourceNote: ({value}) => <SourceNote value={value} />,
  },
  unknownType: () => null,
}

export function PortableTextRenderer({value}: {value: unknown[]}) {
  if (!value?.length) return null
  return <PortableText value={value} components={components} />
}
