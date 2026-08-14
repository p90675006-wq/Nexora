import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  Gamepad2,
  RotateCcw,
  Sparkles,
  PlayCircle,
  Brain,
  FileQuestion,
  BookOpen,
} from 'lucide-react'

import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'

import { LEARNING_ACTIONS } from '../data/learningActions.js'
import { EXAMS } from '../data/examOptions.js'

const ICONS = {
  learn: BookOpen,
  watch: PlayCircle,
  remember: Brain,
  play: Gamepad2,
  pyqs: FileQuestion,
  analyze: BarChart3,
  revise: RotateCcw,
}

export default function LearningHub() {
  const [params] = useSearchParams()

  let savedTopic = null

  try {
    savedTopic = JSON.parse(
      localStorage.getItem('nexora_current_topic') || 'null'
    )
  } catch {
    savedTopic = null
  }

  const topic =
    params.get('topic') ||
    savedTopic?.name ||
    'Your Topic'

  const examId =
    params.get('exam') ||
    savedTopic?.exam ||
    ''

  const subject =
    params.get('subject') ||
    savedTopic?.subject ||
    ''

  const difficulty =
    params.get('difficulty') ||
    savedTopic?.difficulty ||
    ''

  const examLabel =
    EXAMS.find((item) => item.id === examId)?.label ||
    examId ||
    'Exam Prep'

  const topicParams = new URLSearchParams({
    topic,
    ...(examId ? { exam: examId } : {}),
    ...(subject ? { subject } : {}),
    ...(difficulty ? { difficulty } : {}),
  })

  return (
    <div className="animate-fade-up space-y-7">

      {/* Hero */}
      <section className="rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 p-6 sm:p-8 text-white shadow-premium">

        <div className="flex items-start justify-between gap-5">

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2 mb-4">

              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                {examLabel}
              </span>

              {subject && (
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {subject}
                </span>
              )}

              {difficulty && (
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold capitalize backdrop-blur">
                  {difficulty}
                </span>
              )}

            </div>

            <p className="text-sm text-white/70 mb-2">
              Learning Hub
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight break-words">
              {topic}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-white/80 max-w-2xl">
              Choose the way you want to master this topic.
              Learn, practise, revise and test yourself with AI.
            </p>

          </div>

          <div className="hidden sm:flex h-16 w-16 rounded-2xl bg-white/10 items-center justify-center shrink-0">
            <Sparkles className="h-8 w-8 text-white" />
          </div>

        </div>

      </section>

      {/* Main learning actions */}
      <section>

        <div className="flex items-center justify-between mb-4">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
              Study modes
            </p>

            <h2 className="text-xl sm:text-2xl font-bold mt-1">
              How do you want to study?
            </h2>
          </div>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {LEARNING_ACTIONS.map((action) => {

            const Icon =
              ICONS[action.id] || Sparkles

            return (
              <Link
                key={action.id}
                to={`/learn/${action.id}?${topicParams.toString()}`}
                className="group"
              >

                <Card className="h-full p-5 border border-black/5 hover:border-primary-200 hover:shadow-premium hover:-translate-y-1 transition-all duration-200">

                  <div className="flex items-start justify-between gap-4">

                    <div className="h-12 w-12 rounded-2xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">

                      <Icon className="h-6 w-6 text-primary-700" />

                    </div>

                    <ArrowRight className="h-5 w-5 text-ink-faint group-hover:text-primary-700 group-hover:translate-x-1 transition-all" />

                  </div>

                  <h3 className="font-bold text-lg mt-5">
                    {action.label}
                  </h3>

                  <p className="text-sm text-ink-soft mt-2 leading-6">
                    {action.desc}
                  </p>

                  <div className="mt-5 text-xs font-semibold text-primary-700">
                    Start →
                  </div>

                </Card>

              </Link>
            )
          })}

        </div>

      </section>

      {/* Continue section */}
      <section>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-accent-600" />
          <h2 className="font-bold text-lg">
            Continue studying
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">

          <QuickCard
            icon={BarChart3}
            title="Track Progress"
            description="Check your learning progress and completed activities."
            to="/progress"
            button="View Progress"
          />

          <QuickCard
            icon={RotateCcw}
            title="Revision"
            description="Review topics that need another round of practice."
            to="/revision"
            button="Open Revision"
          />

          <QuickCard
            icon={Gamepad2}
            title="Test Yourself"
            description="Challenge yourself with quick AI-powered questions."
            to="/games"
            button="Play Now"
          />

        </div>

      </section>

      {/* Tip */}
      <Card className="p-5 sm:p-6 bg-accent-50 border-accent-100">

        <div className="flex gap-4">

          <div className="h-10 w-10 shrink-0 rounded-xl bg-accent-100 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-accent-700" />
          </div>

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-accent-700">
              Smart Study Tip
            </p>

            <p className="text-sm text-ink-soft mt-1 leading-6">
              Don't just read {topic}. Learn it, explain it in your
              own words, then test yourself without looking at your notes.
            </p>

          </div>

        </div>

      </Card>

      {/* Change topic */}
      <div className="flex justify-center pb-2">

        <Button
          as={Link}
          to="/topic"
          variant="secondary"
        >
          <BookOpen className="h-4 w-4" />
          Choose Another Topic
        </Button>

      </div>

    </div>
  )
}

function QuickCard({
  icon: Icon,
  title,
  description,
  to,
  button,
}) {
  return (
    <Card className="p-5">

      <Icon className="h-5 w-5 text-primary-700 mb-4" />

      <h3 className="font-bold">
        {title}
      </h3>

      <p className="text-sm text-ink-soft mt-2 leading-6">
        {description}
      </p>

      <Button
        as={Link}
        to={to}
        variant="secondary"
        size="sm"
        className="mt-4"
      >
        {button}
        <ArrowRight className="h-4 w-4" />
      </Button>

    </Card>
  )
}
