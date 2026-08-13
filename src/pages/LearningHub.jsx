import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  Gamepad2,
  RotateCcw,
} from 'lucide-react'

import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'

import { LEARNING_ACTIONS } from '../data/learningActions.js'
import { EXAMS } from '../data/examOptions.js'

export default function LearningHub() {
  const [params] = useSearchParams()

  // URL values
  const urlTopic = params.get('topic') || ''
  const urlExam = params.get('exam') || ''
  const urlSubject = params.get('subject') || ''
  const urlDifficulty = params.get('difficulty') || ''

  // Saved topic fallback
  let savedTopic = null

  try {
    savedTopic = JSON.parse(
      localStorage.getItem('nexora_current_topic') || 'null'
    )
  } catch {
    savedTopic = null
  }

  const topic = urlTopic || savedTopic?.name || 'Untitled topic'
  const examId = urlExam || savedTopic?.exam || ''
  const subject = urlSubject || savedTopic?.subject || ''
  const difficulty =
    urlDifficulty || savedTopic?.difficulty || ''

  const examLabel =
    EXAMS.find((e) => e.id === examId)?.label || examId

  // Preserve topic information while navigating
  const topicParams = new URLSearchParams({
    topic,
    ...(examId && { exam: examId }),
    ...(subject && { subject }),
    ...(difficulty && { difficulty }),
  })

  return (
    <div className="animate-fade-up space-y-8">

      {/* Topic Header */}
      <div>
        <p className="text-sm text-ink-faint mb-2">
          {[examLabel, subject]
            .filter(Boolean)
            .join(' | ') || 'Topic'}

          {difficulty && (
            <span className="ml-2 inline-flex items-center rounded-full bg-accent-50 text-accent-700 text-xs font-medium px-2.5 py-0.5 capitalize">
              {difficulty}
            </span>
          )}
        </p>

        <h1 className="text-2xl sm:text-3xl font-semibold text-balance">
          {topic}
        </h1>

        <p className="mt-2 text-sm text-ink-soft">
          Choose how you want to study this topic.
        </p>
      </div>

      {/* Learning Actions */}
      <div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {LEARNING_ACTIONS.map((action) => (
            <Card
              as={Link}
              key={action.id}
              to={`/learn/${action.id}?${topicParams.toString()}`}
              className="p-5 flex items-start gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              <span
                className="text-2xl leading-none"
                aria-hidden="true"
              >
                {action.emoji}
              </span>

              <span>
                <span className="block font-semibold mb-1">
                  {action.label}
                </span>

                <span className="block text-sm text-ink-soft">
                  {action.desc}
                </span>
              </span>
            </Card>
          ))}

        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-semibold mb-4">
          Continue studying
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">

          {/* Progress */}
          <Card className="p-5">
            <BarChart3 className="h-5 w-5 text-primary-700 mb-3" />

            <h3 className="font-semibold mb-1">
              Track Progress
            </h3>

            <p className="text-sm text-ink-soft mb-4">
              See how your overall learning is progressing.
            </p>

            <Button
              as={Link}
              to="/progress"
              variant="secondary"
              size="sm"
            >
              View Progress
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>

          {/* Revision */}
          <Card className="p-5">
            <RotateCcw className="h-5 w-5 text-primary-700 mb-3" />

            <h3 className="font-semibold mb-1">
              Revise Later
            </h3>

            <p className="text-sm text-ink-soft mb-4">
              Review topics that need another look.
            </p>

            <Button
              as={Link}
              to="/revision"
              variant="secondary"
              size="sm"
            >
              Open Revision
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>

          {/* Games */}
          <Card className="p-5">
            <Gamepad2 className="h-5 w-5 text-primary-700 mb-3" />

            <h3 className="font-semibold mb-1">
              Test Yourself
            </h3>

            <p className="text-sm text-ink-soft mb-4">
              Turn your revision into a quick challenge.
            </p>

            <Button
              as={Link}
              to="/games"
              variant="secondary"
              size="sm"
            >
              Play a Game
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>

        </div>
      </div>

      {/* Study Tip */}
      <Card className="p-6 bg-primary-50 border-primary-100">

        <p className="text-xs font-semibold uppercase tracking-wide text-primary-700 mb-2">
          Study tip
        </p>

        <p className="text-sm text-ink-soft">
          Don&apos;t just read {topic}. Try to explain it in your own words,
          then test yourself without looking at your notes.
        </p>

      </Card>

    </div>
  )
}
