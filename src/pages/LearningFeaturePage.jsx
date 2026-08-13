import { useParams, useSearchParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Brain, Play, CheckCircle, BarChart3, RotateCcw, Sparkles } from 'lucide-react'
import { LEARNING_ACTIONS } from '../data/learningActions.js'

const featureData = {
  learn: {
    icon: BookOpen,
    title: 'Learn',
    heading: 'Understand the topic',
    description: 'Learn the core concepts in a simple, structured way.',
    items: [
      'Start with the basic definition and core concepts.',
      'Break the topic into smaller concepts.',
      'Focus on important terms and examples.',
      'Finish with a quick self-check.'
    ]
  },
  watch: {
    icon: Play,
    title: 'Watch',
    heading: 'Learn visually',
    description: 'Use visual learning to understand difficult concepts.',
    items: [
      'Watch concept-based explanations.',
      'Pause and revise important points.',
      'Write down key observations.',
      'Test yourself after watching.'
    ]
  },
  remember: {
    icon: Brain,
    title: 'Remember',
    heading: 'Build your memory',
    description: 'Use active recall to remember what you study.',
    items: [
      'Recall the definition without looking.',
      'Remember important formulas and facts.',
      'Create mental associations.',
      'Review difficult points again.'
    ]
  },
  play: {
    icon: Sparkles,
    title: 'Play',
    heading: 'Learn through a challenge',
    description: 'Turn revision into a quick learning game.',
    items: [
      'Answer a question from the topic.',
      'Give yourself 30 seconds.',
      'Check your answer.',
      'Track your score.'
    ]
  },
  practice: {
    icon: CheckCircle,
    title: 'Practice',
    heading: 'Practice the topic',
    description: 'Strengthen your understanding with questions.',
    items: [
      'Solve easy questions first.',
      'Move to application-based questions.',
      'Review every incorrect answer.',
      'Repeat weak concepts.'
    ]
  },
  analyze: {
    icon: BarChart3,
    title: 'Analyze',
    heading: 'Analyze your preparation',
    description: 'Find what you know and what needs more work.',
    items: [
      'Identify your strongest concepts.',
      'Find topics that need revision.',
      'Track your accuracy.',
      'Plan your next study session.'
    ]
  },
  revise: {
    icon: RotateCcw,
    title: 'Revise',
    heading: 'Quick revision',
    description: 'Refresh the most important information.',
    items: [
      'Review key definitions.',
      'Recall important points.',
      'Revise formulas and facts.',
      'Finish with active recall.'
    ]
  }
}

export default function LearningFeaturePage() {
  const { feature } = useParams()
  const [params] = useSearchParams()

  const topic = params.get('topic') || 'this topic'
  const action = LEARNING_ACTIONS.find((a) => a.id === feature)

  const data = featureData[feature] || {
    icon: BookOpen,
    title: action?.label || 'Learn',
    heading: `${action?.label || 'Learn'} "${topic}"`,
    description: action?.desc || 'Continue learning this topic.',
    items: [
      'Review the important concepts.',
      'Make short notes.',
      'Practice questions.',
      'Revise the difficult parts.'
    ]
  }

  const Icon = data.icon
  const hubUrl = `/learn?${params.toString()}`

  return (
    <div className="animate-fade-up max-w-4xl">
      <Link
        to={hubUrl}
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {topic}
      </Link>

      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-card">
        <div className="flex items-start gap-4 mb-8">
          <div className="h-14 w-14 rounded-2xl bg-accent-50 flex items-center justify-center">
            <Icon className="h-7 w-7 text-accent-600" />
          </div>

          <div>
            <p className="text-sm text-ink-faint mb-1">{data.title}</p>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {data.heading}
            </h1>
            <p className="text-ink-soft mt-2">
              Topic: <span className="font-medium text-ink">{topic}</span>
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-accent-50/60 p-5 mb-6">
          <p className="text-ink-soft">{data.description}</p>
        </div>

        <h2 className="text-lg font-semibold mb-4">
          Your study steps
        </h2>

        <div className="space-y-3">
          {data.items.map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-black/5 p-4 hover:shadow-sm transition"
            >
              <div className="h-8 w-8 shrink-0 rounded-full bg-accent-100 flex items-center justify-center text-sm font-semibold text-accent-700">
                {index + 1}
              </div>

              <span className="text-sm sm:text-base">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="rounded-xl bg-accent-600 px-5 py-3 text-white font-medium hover:opacity-90 transition"
          >
            Start studying
          </button>

          <Link
            to="/dashboard"
            className="rounded-xl border border-black/10 px-5 py-3 font-medium hover:bg-black/5 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
