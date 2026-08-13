import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Brain,
  Trophy,
  RotateCcw,
  Film,
  FileQuestion,
  BarChart3,
  Loader2,
} from 'lucide-react'

import {
  summarizeTopic,
  generateVideoLesson,
  generateMemorySong,
  generatePuzzle,
} from '../lib/ai.js'

const FEATURE_CONFIG = {
  learn: {
    label: 'Learn',
    icon: BookOpen,
    description: 'Understand the concept step by step with AI.',
  },
  watch: {
    label: 'Watch',
    icon: Film,
    description: 'Learn the topic through an AI-generated lesson.',
  },
  remember: {
    label: 'Remember',
    icon: Brain,
    description: 'Create an AI-powered memory aid.',
  },
  play: {
    label: 'Play',
    icon: Trophy,
    description: 'Test yourself with an AI-generated challenge.',
  },
  pyqs: {
    label: 'PYQs',
    icon: FileQuestion,
    description: 'Practice an AI-generated exam-style question.',
  },
  analyze: {
    label: 'Analyze',
    icon: BarChart3,
    description: 'Get an AI-powered topic analysis.',
  },
  revise: {
    label: 'Revise',
    icon: RotateCcw,
    description: 'Generate a quick AI revision guide.',
  },
}

export default function LearningFeaturePage() {
  const { feature } = useParams()
  const [searchParams] = useSearchParams()

  const topic =
    searchParams.get('topic') ||
    searchParams.get('q') ||
    'Your Topic'

  const exam = searchParams.get('exam') || ''
  const subject = searchParams.get('subject') || ''
  const difficulty = searchParams.get('difficulty') || ''

  const config =
    FEATURE_CONFIG[feature] || FEATURE_CONFIG.learn

  const Icon = config.icon

  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aiContent, setAiContent] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const topicKey = `${topic}-${feature}`

  async function runAI() {
    setLoading(true)
    setError('')
    setAiContent(null)
    setSelectedAnswer(null)
    setShowAnswer(false)

    try {
      let result

      if (feature === 'learn') {
        result = await summarizeTopic(topic)
      } else if (feature === 'watch') {
        result = await generateVideoLesson(topic)
      } else if (feature === 'remember') {
        result = await generateMemorySong(topic)
      } else if (feature === 'play' || feature === 'pyqs') {
        result = await generatePuzzle(topic)
      } else if (feature === 'analyze') {
        result = await summarizeTopic(
          `${topic}. Analyse the most important concepts, common mistakes, exam importance and areas students should focus on.`
        )
      } else if (feature === 'revise') {
        result = await summarizeTopic(
          `${topic}. Create a concise revision guide with key definitions, formulas or facts, important points and last-minute exam tips.`
        )
      }

      if (!result) {
        throw new Error('No AI response received.')
      }

      setAiContent(result)
    } catch (err) {
      console.error(err)

      setError(
        err?.message ||
          'AI could not generate this content. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  function markComplete() {
    setCompleted(true)

    let existing = []

    try {
      existing = JSON.parse(
        localStorage.getItem('nexora_completed_features') || '[]'
      )
    } catch {
      existing = []
    }

    if (!existing.includes(topicKey)) {
      localStorage.setItem(
        'nexora_completed_features',
        JSON.stringify([...existing, topicKey])
      )
    }

    try {
      const savedTopic = JSON.parse(
        localStorage.getItem('nexora_current_topic') || 'null'
      )

      if (savedTopic && savedTopic.name === topic) {
        const updatedTopic = {
          ...savedTopic,
          progress: Math.max(savedTopic.progress || 0, 15),
        }

        localStorage.setItem(
          'nexora_current_topic',
          JSON.stringify(updatedTopic)
        )
      }
    } catch {
      // Ignore localStorage errors.
    }
  }

  function reset() {
    setCompleted(false)
    setSelectedAnswer(null)
    setShowAnswer(false)
    setAiContent(null)
    setError('')
  }

  const hubParams = new URLSearchParams({
    topic,
    ...(exam ? { exam } : {}),
    ...(subject ? { subject } : {}),
    ...(difficulty ? { difficulty } : {}),
  })

  return (
    <div className="max-w-4xl animate-fade-up">

      <Link
        to={`/learn?${hubParams.toString()}`}
        className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Learning Hub
      </Link>

      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-card">

        <div className="flex items-start gap-4">

          <div className="h-14 w-14 shrink-0 rounded-2xl bg-accent-50 flex items-center justify-center">
            <Icon className="h-7 w-7 text-accent-600" />
          </div>

          <div className="min-w-0">

            <p className="text-sm text-ink-faint">
              {config.label}
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold">
              {topic}
            </h1>

            <p className="text-ink-soft mt-2">
              {config.description}
            </p>

            {(exam || subject || difficulty) && (
              <p className="text-xs text-ink-faint mt-2">
                {[exam, subject, difficulty]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}

          </div>

        </div>

        <div className="mt-8">

          {!loading && !aiContent && !error && (
            <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 text-center">

              <Icon className="h-10 w-10 mx-auto text-primary-700 mb-4" />

              <h2 className="text-xl font-semibold">
                Ready to learn {topic}?
              </h2>

              <p className="text-sm text-ink-soft mt-2">
                Let Nexora AI create personalised content for this topic.
              </p>

              <button
                onClick={runAI}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium hover:opacity-90 transition"
              >
                Generate with AI
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>
          )}

          {loading && (
            <div className="rounded-2xl border border-black/5 p-10 text-center">

              <Loader2 className="h-10 w-10 mx-auto animate-spin text-accent-600" />

              <h2 className="text-xl font-semibold mt-5">
                Nexora AI is thinking...
              </h2>

              <p className="text-sm text-ink-soft mt-2">
                Creating your personalised content.
              </p>

            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

              <p className="font-semibold text-red-700">
                AI request failed
              </p>

              <p className="text-sm text-red-600 mt-2 break-words">
                {error}
              </p>

              <button
                onClick={runAI}
                className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-white text-sm font-medium"
              >
                Try Again
              </button>

            </div>
          )}

          {aiContent && (
            <AIContent
              feature={feature}
              topic={topic}
              content={aiContent}
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              showAnswer={showAnswer}
              setShowAnswer={setShowAnswer}
            />
          )}

        </div>

        <div className="mt-8 pt-6 border-t border-border">

          {completed ? (
            <div className="rounded-xl bg-green-50 p-5">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="h-6 w-6 text-green-600" />

                <div>

                  <p className="font-semibold text-green-700">
                    {config.label} completed!
                  </p>

                  <p className="text-sm text-ink-soft mt-1">
                    Your progress has been saved.
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-3 mt-4">

                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium hover:bg-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  Do Again
                </button>

                <Link
                  to="/progress"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-4 py-2.5 text-sm font-medium text-white"
                >
                  View Progress
                  <ArrowRight className="h-4 w-4" />
                </Link>

              </div>

            </div>
          ) : (
            <button
              onClick={markComplete}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium hover:opacity-90 transition"
            >
              Mark as Complete
              <CheckCircle2 className="h-4 w-4" />
            </button>
          )}

        </div>

      </div>
    </div>
  )
}

function AIContent({
  feature,
  topic,
  content,
  selectedAnswer,
  setSelectedAnswer,
  showAnswer,
  setShowAnswer,
}) {
  if (feature === 'learn') {
    return (
      <div className="space-y-5">

        <div className="rounded-2xl border border-black/5 p-6">

          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-accent-600" />

            <h2 className="text-xl font-semibold">
              AI Explanation
            </h2>
          </div>

          <p className="text-base leading-7 text-ink-soft">
            {content.summary || content.content || 'No summary generated.'}
          </p>

        </div>

        {content.points && content.points.length > 0 && (
          <div className="rounded-2xl border border-black/5 p-6">

            <h2 className="text-xl font-semibold mb-4">
              Key Points
            </h2>

            <div className="space-y-3">

              {content.points.map((point, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl bg-primary-50/60 p-4"
                >

                  <span className="font-semibold text-primary-700">
                    {index + 1}.
                  </span>

                  <p className="text-sm text-ink-soft">
                    {point}
                  </p>

                </div>
              ))}

            </div>

          </div>
        )}

        <KeyPoint topic={topic} />

      </div>
    )
  }

  if (feature === 'watch') {
    return (
      <div className="space-y-5">

        <div className="rounded-2xl bg-black/5 p-6">

          <div className="flex items-center gap-3 mb-4">
            <Film className="h-6 w-6 text-accent-600" />

            <h2 className="text-xl font-semibold">
              AI Video Lesson
            </h2>
          </div>

          <div className="whitespace-pre-wrap text-sm leading-7 text-ink-soft">
            {content.content || content.summary}
          </div>

        </div>

      </div>
    )
  }

  if (feature === 'remember') {
    return (
      <div className="space-y-5">

        <div className="rounded-2xl bg-accent-50/60 p-6">

          <Brain className="h-8 w-8 text-accent-600 mb-4" />

          <h2 className="text-xl font-semibold">
            AI Memory Aid
          </h2>

          <p className="text-sm text-ink-soft mt-2">
            A personalised memory technique for {topic}.
          </p>

        </div>

        <div className="rounded-2xl border border-black/5 p-6">

          <div className="whitespace-pre-wrap text-sm leading-7 text-ink-soft">
            {content.content || content.summary}
          </div>

        </div>

      </div>
    )
  }

  if (feature === 'play' || feature === 'pyqs') {
    return (
      <div className="rounded-2xl border border-black/5 p-6">

        <div className="flex items-center gap-3 mb-5">

          {feature === 'play' ? (
            <Trophy className="h-6 w-6 text-accent-600" />
          ) : (
            <FileQuestion className="h-6 w-6 text-accent-600" />
          )}

          <h2 className="text-xl font-semibold">
            {feature === 'play'
              ? 'AI Challenge'
              : 'AI Practice Question'}
          </h2>

        </div>

        <p className="font-semibold leading-7">
          {content.question}
        </p>

        <div className="space-y-3 mt-6">

          {content.options?.map((option, index) => {

            const selected = selectedAnswer === index

            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedAnswer(index)
                  setShowAnswer(false)
                }}
                className={
                  'w-full text-left rounded-xl border p-4 transition ' +
                  (
                    selected
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-black/10 hover:bg-black/5'
                  )
                }
              >

                <div className="flex items-center gap-3">

                  {selected ? (
                    <CheckCircle2 className="h-5 w-5 text-accent-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-black/20" />
                  )}

                  <span className="text-sm">
                    {option}
                  </span>

                </div>

              </button>
            )
          })}

        </div>

        <button
          disabled={selectedAnswer === null}
          onClick={() => setShowAnswer(true)}
          className="mt-6 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium disabled:opacity-40"
        >
          Check Answer
        </button>

        {showAnswer && (
          <div className="mt-6 rounded-xl bg-accent-50/60 p-5">

            {selectedAnswer === content.answer ? (
              <p className="font-semibold text-green-700">
                Correct! 🎉
              </p>
            ) : (
              <div>

                <p className="font-semibold">
                  Good attempt! 💪
                </p>

                <p className="text-sm text-ink-soft mt-2">
                  Correct answer:{' '}
                  {content.options?.[content.answer]}
                </p>

              </div>
            )}

            {content.explanation && (
              <p className="text-sm text-ink-soft mt-2">
                {content.explanation}
              </p>
            )}

          </div>
        )}

      </div>
    )
  }

  if (feature === 'analyze') {
    return (
      <div className="space-y-5">

        <div className="grid sm:grid-cols-3 gap-4">

          <Stat
            title="AI Status"
            value="Analyzed"
          />

          <Stat
            title="Topic"
            value={topic}
          />

          <Stat
            title="Source"
            value="Nexora AI"
          />

        </div>

        <div className="rounded-2xl bg-primary-50 p-6">

          <BarChart3 className="h-7 w-7 text-primary-700 mb-3" />

          <h2 className="font-semibold text-xl">
            AI Topic Analysis
          </h2>

          <div className="whitespace-pre-wrap text-sm leading-7 text-ink-soft mt-4">
            {content.summary || content.content}
          </div>

        </div>

        {content.points && content.points.length > 0 && (
          <div className="rounded-2xl border border-black/5 p-6">

            <h2 className="font-semibold text-xl mb-4">
              Important Areas
            </h2>

            <div className="space-y-3">

              {content.points.map((point, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-black/5 p-4 text-sm"
                >
                  {point}
                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    )
  }

  if (feature === 'revise') {
    return (
      <div className="space-y-5">

        <div className="rounded-2xl border border-black/5 p-6">

          <div className="flex items-center gap-3 mb-5">

            <RotateCcw className="h-6 w-6 text-accent-600" />

            <h2 className="text-xl font-semibold">
              AI Revision Guide
            </h2>

          </div>

          {content.summary && (
            <p className="text-sm leading-7 text-ink-soft mb-5">
              {content.summary}
            </p>
          )}

          {content.points && content.points.length > 0 && (
            <div className="space-y-3">

              {content.points.map((point, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl border border-black/5 p-4"
                >

                  <span className="font-semibold text-accent-600">
                    {index + 1}
                  </span>

                  <span className="text-sm text-ink-soft">
                    {point}
                  </span>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    )
  }

  return null
}

function KeyPoint({ topic }) {
  return (
    <div className="rounded-xl bg-accent-50/60 p-5">

      <div className="flex gap-3">

        <Lightbulb className="h-5 w-5 text-accent-600 shrink-0" />

        <div>

          <p className="font-medium">
            Key point
          </p>

          <p className="text-sm text-ink-soft mt-1">
            Don't just memorise {topic}. Try explaining it
            in your own words and test yourself afterwards.
          </p>

        </div>

      </div>

    </div>
  )
}

function Stat({ title, value }) {
  return (
    <div className="rounded-xl border border-black/5 p-5">

      <p className="text-xs text-ink-faint">
        {title}
      </p>

      <p className="font-semibold mt-2 capitalize truncate">
        {value}
      </p>

    </div>
  )
      }
