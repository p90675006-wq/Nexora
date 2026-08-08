import { useParams } from 'react-router-dom'
import ComingSoon from '../components/common/ComingSoon.jsx'
import { NAV_LINKS } from '../data/navigation.js'

export default function ComingSoonPage() {
  const { feature } = useParams()
  const link = NAV_LINKS.find((l) => l.to === `/coming-soon/${feature}`)
  const label = link ? link.label : 'This section'

  return (
    <ComingSoon
      title={`${label} is coming soon`}
      description="We're building this in the next development stage. Check back soon."
    />
  )
}
