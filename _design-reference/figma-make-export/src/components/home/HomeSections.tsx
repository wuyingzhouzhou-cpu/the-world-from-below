import FeaturedStory from './FeaturedStory'
import ExploreByForce from './ExploreByForce'
import PlacesSection from './PlacesSection'
import LibrarySection from './LibrarySection'
import FieldNotesSection from './FieldNotesSection'
import NewsletterSection from './NewsletterSection'
import type { View } from '../../App'

interface Props { navigate: (v: View) => void }

export default function HomeSections({ navigate }: Props) {
  return (
    <>
      <FeaturedStory navigate={navigate} />
      <ExploreByForce navigate={navigate} />
      <PlacesSection navigate={navigate} />
      <LibrarySection navigate={navigate} />
      <FieldNotesSection navigate={navigate} />
      <NewsletterSection />
    </>
  )
}
