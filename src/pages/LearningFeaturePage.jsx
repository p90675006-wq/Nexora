import { useParams, useSearchParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ComingSoon from '../components/common/ComingSoon.jsx'
import { LEARNING_ACTIONS } from '../data/learningActions.js'

export default function LearningFeaturePage() {
  const { feature } = useParams()
  const [params] = useSearchParams()
  const topic = params.get('topic') || 'this topic'
  const action = LEARNING_ACTIONS.find((a) => a.id === feature)

  const hubUrl = `/learn?${params.toString()}`

  return (
    <div className="animate-fade-up">
      <Link
        to={hubUrl}
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {topic}
      </Link>

      <ComingSoon
        title={`${action ? action.label : 'This feature'} for "${topic}" is coming soon`}
        description="We're building this in the next development stage. The navigation works today — the learning experience itself is next."
        backTo={hubUrl}
        backLabel="Back to Learning Hub"
      />
    </div>
  )
}
