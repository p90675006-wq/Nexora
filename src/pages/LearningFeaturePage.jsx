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
} from 'lucide-react'

const FEATURE_CONFIG = {
  learn: {
    label: 'Learn',
    icon: BookOpen,
    description: 'Understand the concept step by step.',
  },
  watch: {
    label: 'Watch',
    icon: Film,
    description: 'Visualise the concept through a simple sequence.',
  },
  remember: {
    label: 'Remember',
    icon: Brain,
    description: 'Use memory techniques to retain the topic.',
  },
  play: {
    label: 'Play',
    icon: Trophy,
    description: 'Test your understanding with a quick challenge.',
  },
  pyqs: {
    label: 'PYQs',
    icon: FileQuestion,
    description: 'Practice an exam-style question.',
  },
  analyze: {
    label: 'Analyze',
    icon: BarChart3,
    description: 'Understand your current topic status.',
  },
  revise: {
    label: 'Revise',
    icon: RotateCcw,
    description: 'Review the most important parts quickly.',
  },
}

const QUIZ_OPTIONS = [
  'Memorise everything without understanding',
  'Understand the concept and apply it to examples',
  'Read it once and never revise',
  'Skip difficult parts',
]

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
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const topicKey = `${topic}-${feature}`

  const markComplete = () => {
    setCompleted(true)

    const existing = JSON.parse(
      localStorage.getItem('nexora_completed_features') || '[]'
    )

    if (!existing.includes(topicKey)) {
      localStorage.setItem(
        'nexora_completed_features',
        JSON.stringify([...existing, topicKey])
      )
    }

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
  }

  const reset = () => {
    setCompleted(false)
    setSelectedAnswer(null)
    setShowAnswer(false)
  }

  const hubParams = new URLSearchParams({
    topic,
    ...(exam && { exam }),
    ...(subject && { subject }),
    ...(difficulty && { difficulty }),
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

            {(exam || subject) && (
              <p className="text-xs text-ink-faint mt-2">
                {[exam, subject, difficulty]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}

          </div>
        </div>

        {/* LEARN */}

        {feature === 'learn' && (
          <div className="mt-8 space-y-5">

            <Section
              number="01"
              title={`What is ${topic}?`}
            >
              <p>
                Start by understanding the basic meaning of{' '}
                <strong>{topic}</strong>. Focus on what it is,
                why it matters, and where it is used.
              </p>
            </Section>

            <Section
              number="02"
              title="Build the concept"
            >
              <p>
                Break the topic into smaller ideas. Connect
                important terms, processes, rules and examples
                instead of trying to memorise everything at once.
              </p>
            </Section>

            <Section
              number="03"
              title="Apply it"
            >
              <p>
                Try explaining <strong>{topic}</strong> in your
                own words and then apply the idea to a simple
                example or question.
              </p>
            </Section>

            <KeyPoint topic={topic} />

          </div>
        )}

        {/* WATCH */}

        {feature === 'watch' && (
          <div className="mt-8">

            <div className="rounded-2xl bg-black/5 p-6">

              <div className="flex items-center justify-center h-48 rounded-xl bg-accent-50">
                <Film className="h-14 w-14 text-accent-600" />
              </div>

              <h2 className="text-xl font-semibold mt-6">
                Visual walkthrough
              </h2>

              <p className="text-ink-soft mt-2">
                Imagine {topic} as a sequence rather than a
                collection of facts.
              </p>

            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-5">

              <MiniStep
                number="1"
                title="Start"
                text={`Identify the main idea of ${topic}.`}
              />

              <MiniStep
                number="2"
                title="Connect"
                text="Connect the important parts together."
              />

              <MiniStep
                number="3"
                title="Apply"
                text="Use the concept to solve a question."
              />

            </div>

          </div>
        )}

        {/* REMEMBER */}

        {feature === 'remember' && (
          <div className="mt-8 space-y-5">

            <div className="rounded-2xl bg-accent-50/60 p-6">

              <Brain className="h-8 w-8 text-accent-600 mb-4" />

              <h2 className="text-xl font-semibold">
                Make {topic} memorable
              </h2>

              <p className="text-ink-soft mt-2">
                Use active recall instead of repeatedly reading
                the same information.
              </p>

            </div>

            <Section
              number="01"
              title="Close your notes"
            >
              <p>
                Try to explain {topic} without looking at your
                study material.
              </p>
            </Section>

            <Section
              number="02"
              title="Create a mental connection"
            >
              <p>
                Connect the concept to an example, image,
                analogy or story that is easy to remember.
              </p>
            </Section>

            <Section
              number="03"
              title="Recall it later"
            >
              <p>
                Revisit the topic after some time instead of
                studying everything in one session.
              </p>
            </Section>

          </div>
        )}

        {/* PLAY */}

        {feature === 'play' && (
          <Quiz
            topic={topic}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
          />
        )}

        {/* PYQS */}

        {feature === 'pyqs' && (
          <div className="mt-8">

            <div className="rounded-2xl border border-black/5 p-6">

              <p className="text-xs text-ink-faint uppercase tracking-wide">
                Practice Question
              </p>

              <h2 className="text-xl font-semibold mt-3">
                Which approach is most effective for mastering {topic}?
              </h2>

              <div className="space-y-3 mt-6">

                {[
                  'Passive reading only',
                  'Understanding, active recall and practice',
                  'Memorising without revision',
                  'Skipping difficult questions',
                ].map((answer, index) => (
                  <button
                    key={answer}
                    onClick={() => {
                      setSelectedAnswer(index)
                      setShowAnswer(true)
                    }}
                    className={`w-full text-left rounded-xl border p-4 transition ${
                      selectedAnswer === index
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-black/10 hover:bg-black/5'
                    }`}
                  >
                    {answer}
                  </button>
                ))}

              </div>

              {showAnswer && (
                <div className="mt-6 rounded-xl bg-accent-50/60 p-5">

                  <p className="font-semibold">
                    Correct approach: understanding + practice 🎯
                  </p>

                  <p className="text-sm text-ink-soft mt-2">
                    For {topic}, focus on understanding the
                    concept first and then testing yourself.
                  </p>

                </div>
              )}

            </div>

          </div>
        )}

        {/* ANALYZE */}

        {feature === 'analyze' && (
          <div className="mt-8">

            <div className="grid sm:grid-cols-3 gap-4">

              <Stat
                title="Current status"
                value={completed ? 'Done' : 'Learning'}
              />

              <Stat
                title="Difficulty"
                value={difficulty || 'Medium'}
              />

              <Stat
                title="Subject"
                value={subject || 'General'}
              />

            </div>

            <div className="mt-6 rounded-2xl bg-primary-50 p-6">

              <BarChart3 className="h-7 w-7 text-primary-700 mb-3" />

              <h2 className="font-semibold">
                Topic analysis
              </h2>

              <p className="text-sm text-ink-soft mt-2">
                Keep learning and practising {topic}. Your
                progress will become more meaningful as you
                complete lessons and quizzes.
              </p>

            </div>

          </div>
        )}

        {/* REVISE */}

        {feature === 'revise' && (
          <div className="mt-8 space-y-4">

            {[
              `Define ${topic} in your own words.`,
              `Recall the three most important ideas in ${topic}.`,
              `Solve one question without looking at your notes.`,
              `Explain why ${topic} matters.`,
            ].map((item, index) => (
              <label
                key={item}
                className="flex items-start gap-3 rounded-xl border border-black/10 p-4 cursor-pointer hover:bg-black/5"
              >

                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                />

                <span className="text-sm">
                  {index + 1}. {item}
                </span>

              </label>
            ))}

          </div>
        )}

        {/* COMPLETION */}

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

/* SECTION */

function Section({ number, title, children }) {
  return (
    <div className="rounded-2xl border border-black/5 p-6">

      <div className="flex items-center gap-3 mb-3">

        <span className="text-xs font-mono text-ink-faint">
          {number}
        </span>

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

      </div>

      <div className="text-base leading-7 text-ink-soft">
        {children}
      </div>

    </div>
  )
}

/* KEY POINT */

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
            Don&apos;t just memorise {topic}. Try explaining
            it in your own words.
          </p>

        </div>

      </div>

    </div>
  )
}

/* MINI STEP */

function MiniStep({ number, title, text }) {
  return (
    <div className="rounded-xl border border-black/5 p-5">

      <span className="text-xs text-ink-faint">
        Step {number}
      </span>

      <h3 className="font-semibold mt-1">
        {title}
      </h3>

      <p className="text-sm text-ink-soft mt-2">
        {text}
      </p>

    </div>
  )
}

/* STAT */

function Stat({ title, value }) {
  return (
    <div className="rounded-xl border border-black/5 p-5">

      <p className="text-xs text-ink-faint">
        {title}
      </p>

      <p className="font-semibold mt-2 capitalize">
        {value}
      </p>

    </div>
  )
}

/* QUIZ */

function Quiz({
  topic,
  selectedAnswer,
  setSelectedAnswer,
  showAnswer,
  setShowAnswer,
}) {
  return (
    <div className="mt-8">

      <div className="text-center">

        <div className="mx-auto h-16 w-16 rounded-full bg-accent-50 flex items-center justify-center">
          <Trophy className="h-8 w-8 text-accent-600" />
        </div>

        <h2 className="text-2xl font-semibold mt-4">
          Quick Challenge
        </h2>

        <p className="text-ink-soft mt-2">
          Test your understanding of {topic}.
        </p>

      </div>

      <div className="mt-8 rounded-2xl border border-black/5 p-6">

        <p className="font-semibold">
          What is the best way to master {topic}?
        </p>

        <div className="space-y-3 mt-5">

          {QUIZ_OPTIONS.map((answer, index) => {

            const selected = selectedAnswer === index

            return (
              <button
                key={answer}
                onClick={() => {
                  setSelectedAnswer(index)
                  setShowAnswer(false)
                }}
                className={`w-full text-left rounded-xl border p-4 transition ${
                  selected
                    ? 'border-accent-500 bg-accent-50'
                    : 'border-black/10 hover:bg-black/5'
                }`}
              >

                <div className="flex items-center gap-3">

                  {selected ? (
                    <CheckCircle2 className="h-5 w-5 text-accent-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-black/20" />
                  )}

                  <span>
                    {answer}
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

            {selectedAnswer === 1 ? (
              <>
                <p className="font-semibold text-green-700">
                  Correct! 🎉
                </p>

                <p className="text-sm text-ink-soft mt-2">
                  Understanding and applying a concept is
                  much more effective than memorising it
                  without understanding.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold">
                  Good attempt! 💪
                </p>

                <p className="text-sm text-ink-soft mt-2">
                  The best answer is to understand the
                  concept and apply it to examples.
                </p>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  )
}
