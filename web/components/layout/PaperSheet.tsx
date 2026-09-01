import type {VisualMood} from '@/sanity/story'
import {PublicationHeader} from './PublicationHeader'
import {SiteFooter} from './SiteFooter'

export function PaperSheet({
  children,
  width = 'article',
  mood,
}: {
  children: React.ReactNode
  width?: 'article' | 'site'
  mood?: VisualMood
}) {
  return (
    <div className="page-surround">
      <div className={width === 'site' ? 'site-sheet' : 'paper-sheet'} data-mood={mood}>
        <PublicationHeader />
        {children}
        <SiteFooter />
      </div>
    </div>
  )
}
