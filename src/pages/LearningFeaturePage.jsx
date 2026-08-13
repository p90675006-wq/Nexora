import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Brain,
  RotateCcw,
  Film,
  FileQuestion,
  BarChart3,
  Loader2,
  Volume2,
  Play,
  Sparkles,
} from 'lucide-react'

import {
  summarizeTopic,
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
    description: 'Learn through an animated AI lesson.',
  },
  remember: {
    label: 'Remember',
    icon: Brain,
    description: 'Turn important concepts into a memorable AI song.',
  },
  play: {
    label: 'Play',
    icon: Brain,
    description: 'Test yourself with an AI challenge.',
  },
  pyqs: {
    label: 'PYQs',
    icon: FileQuestion,
    description: 'Practice an exam-style question.',
  },
  analyze: {
    label: 'Analyze',
    icon: BarChart3,
    description: 'Get an advanced AI topic analysis.',
  },
  revise: {
    label: 'Revise',
    icon: RotateCcw,
    description: 'Generate a quick revision guide.',
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

  async function runAI() {
    setLoading(true)
    setError('')
    setAiContent(null)
    setSelectedAnswer(null)
    setShowAnswer(false)

    try {
      let result

      if (feature === 'learn') {
        result = await summarizeTopic(
          `${topic}

Give an advanced but student-friendly explanation.
Cover definition, core concepts, mechanism, important terminology,
examples, exam-important facts, common mistakes and advanced points.`
        )
      } else if (feature === 'watch') {
        result = await summarizeTopic(
          `${topic}

Create a complete animated educational lesson presentation.

Structure it as:
1. HOOK
2. VISUAL INTRODUCTION
3. MAIN CONCEPT 1
4. MAIN CONCEPT 2
5. MAIN CONCEPT 3
6. SIMPLE REAL-LIFE ANALOGY
7. EXAM ALERTS
8. QUICK RECAP
9. THREE QUIZ QUESTIONS

Write concise scene-by-scene content that can be displayed as an animated lesson.
Use visual descriptions such as diagrams, arrows, molecules, charts or process animations.
Do NOT say that video generation is unavailable.`
        )
      } else if (feature === 'remember') {
        result = await summarizeTopic(
          `${topic}

Create an ORIGINAL educational memory song.

Include:
- catchy title
- short original lyrics
- important concepts and facts
- mnemonic/rhyme where useful
- a short explanation of what each part helps remember

Do not copy any existing song lyrics.
Make it fun, catchy and suitable for students.`
        )
      } else if (feature === 'play' || feature === 'pyqs') {
        result = await generatePuzzle(topic)
      } else if (feature === 'analyze') {
        result = await summarizeTopic(
          `${topic}

Give an advanced analysis including:
important concepts, mechanism, exam importance,
common mistakes, frequently tested facts,
high-level connections and areas students should focus on.`
        )
      } else if (feature === 'revise') {
        result = await summarizeTopic(
          `${topic}

Create an advanced last-minute revision guide.
Include definitions, formulas, facts, processes,
important keywords, common mistakes and exam tips.`
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

    const topicKey = `${topic}-${feature}`

    if (!existing.includes(topicKey)) {
      localStorage.setItem(
        'nexora_completed_features',
        JSON.stringify([...existing, topicKey])
      )
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
                Let Nexora AI create personalised content.
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
  const text =
    content?.content ||
    content?.summary ||
    ''

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

          <p className="text-base leading-7 text-ink-soft whitespace-pre-wrap">
            {content.summary || text}
          </p>
        </div>

        {content.points?.length > 0 && (
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
        <div className="overflow-hidden rounded-2xl bg-black text-white shadow-card">
          <div className="relative min-h-[280px] p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
            <div className="absolute top-5 right-5">
              <Sparkles className="h-6 w-6 animate-pulse opacity-80" />
            </div>

            <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center mb-5">
              <Play className="h-9 w-9 ml-1" />
            </div>

            <p className="text-xs uppercase tracking-[0.25em] opacity-60">
              NEXORA AI LESSON
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold mt-3">
              {topic}
            </h2>

            <p className="text-sm opacity-70 mt-3">
              Animated educational lesson
            </p>

            <div className="flex gap-2 mt-6">
              <span className="h-2 w-10 rounded-full bg-white/80" />
              <span className="h-2 w-6 rounded-full bg-white/30" />
              <span className="h-2 w-6 rounded-full bg-white/30" />
              <span className="h-2 w-6 rounded-full bg-white/30" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 p-6">
          <div className="flex items-center gap-3 mb-5">
            <Film className="h-6 w-6 text-accent-600" />

            <h2 className="text-xl font-semibold">
              Animated Lesson
            </h2>
          </div>

          <div className="whitespace-pre-wrap text-sm leading-7 text-ink-soft">
            {text}
          </div>
        </div>
      </div>
    )
  }

  if (feature === 'remember') {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl bg-gradient-to-br from-accent-50 to-primary-50 p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Volume2 className="h-6 w-6 text-accent-600" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-ink-faint">
                NEXORA MEMORY STUDIO
              </p>

              <h2 className="text-xl font-semibold">
                {topic} Memory Song
              </h2>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
              <div
                key={bar}
                className="w-2 rounded-full bg-accent-500 animate-pulse"
                style={{
                  height: `${12 + (bar % 4) * 8}px`,
                  animationDelay: `${bar * 80}ms`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-6 w-6 text-accent-600" />

            <h3 className="font-semibold text-xl">
              Original Memory Song
            </h3>
          </div>

          <div className="whitespace-pre-wrap text-sm leading-7 text-ink-soft">
            {text}
          </div>
        </div>
      </div>
    )
  }

  if (feature === 'play' || feature === 'pyqs') {
    return (
      <div className="rounded-2xl border border-black/5 p-6">
        <div className="flex items-center gap-3 mb-5">
          <FileQuestion className="h-6 w-6 text-accent-600" />

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
                  (selected
                    ? 'border-accent-500 bg-accent-50'
                    : 'border-black/10 hover:bg-black/5')
                }
              >
                {option}
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
              <p className="font-semibold">
                Good attempt! 💪
              </p>
            )}

            <p className="text-sm text-ink-soft mt-2">
              Correct answer: {content.options?.[content.answer]}
            </p>

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
          <Stat title="AI Status" value="Analyzed" />
          <Stat title="Topic" value={topic} />
          <Stat title="Source" value="Nexora AI" />
        </div>

        <div className="rounded-2xl bg-primary-50 p-6">
          <BarChart3 className="h-7 w-7 text-primary-700 mb-3" />

          <h2 className="font-semibold text-xl">
            Advanced Topic Analysis
          </h2>

          <div className="whitespace-pre-wrap text-sm leading-7 text-ink-soft mt-4">
            {text}
          </div>
        </div>
      </div>
    )
  }

  if (feature === 'revise') {
    return (
      <div className="rounded-2xl border border-black/5 p-6">
        <div className="flex items-center gap-3 mb-5">
          <RotateCcw className="h-6 w-6 text-accent-600" />

          <h2 className="text-xl font-semibold">
            AI Revision Guide
          </h2>
        </div>

        <div className="whitespace-pre-wrap text-sm leading-7 text-ink-soft">
          {text}
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
            Don't just memorise {topic}. Explain it in your
            own words and test yourself afterwards.
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
