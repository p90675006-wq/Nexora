import { Link, useSearchParams } from 'react-router-dom'
import Card from '../components/common/Card.jsx'
import { LEARNING_ACTIONS } from '../data/learningActions.js'
import { EXAMS } from '../data/examOptions.js'

export default function LearningHub() {
  const [params] = useSearchParams()
  const topic = params.get('topic') || 'Untitled topic'
  const examId = params.get('exam') || ''
  const subject = params.get('subject') || ''
  const difficulty = params.get('difficulty') || ''

  const examLabel = EXAMS.find((e) => e.id === examId)?.label || examId

  return (
    <div className="animate-fade-up">
      <div className="mb-8">
        <p className="text-sm text-ink-faint mb-2">
          {[examLabel, subject].filter(Boolean).join(' | ') || 'Topic'}
          {difficulty && (
            <span className="ml-2 inline-flex items-center rounded-full bg-accent-50 text-accent-700 text-xs font-medium px-2.5 py-0.5 capitalize">
              {difficulty}
            </span>
          )}
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-balance">{topic}</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEARNING_ACTIONS.map((action) => (
          <Card
            as={Link}
            key={action.id}
            to={`/learn/${action.id}?${params.toString()}`}
            className="p-5 flex items-start gap-4 hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <span className="text-2xl leading-none" aria-hidden="true">{action.emoji}</span>
            <span>
              <span className="block font-semibold mb-1">{action.label}</span>
              <span className="block text-sm text-ink-soft">{action.desc}</span>
            </span>
          </Card>
        ))}
      </div>
    </div>
  )
}
