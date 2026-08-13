import { useEffect, useState } from 'react'
import {
  TrendingUp,
  Trophy,
  Target,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
} from 'lucide-react'
import Card from '../components/common/Card.jsx'
import ProgressRing from '../components/common/ProgressRing.jsx'

const FEATURES = [
  'learn',
  'watch',
  'remember',
  'play',
  'pyqs',
  'analyze',
  'revise',
]

const FEATURE_LABELS = {
  learn: 'Learn',
  watch: 'Watch',
  remember: 'Remember',
  play: 'Play',
  pyqs: 'PYQs',
  analyze: 'Analyze',
  revise: 'Revise',
}

export default function Progress() {
  const [completedFeatures, setCompletedFeatures] = useState([])
  const [topic, setTopic] = useState(null)

  const [pyqScore, setPyqScore] = useState(0)
  const [gameScore, setGameScore] = useState(0)
  const [notesCount, setNotesCount] = useState(0)

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = () => {
    const completed = JSON.parse(
      localStorage.getItem('nexora_completed_features') || '[]'
    )

    const currentTopic = JSON.parse(
      localStorage.getItem('nexora_current_topic') || 'null'
    )

    const notes = JSON.parse(
      localStorage.getItem('nexora_notes') || '[]'
    )

    setCompletedFeatures(completed)
    setTopic(currentTopic)
    setNotesCount(notes.length)

    setPyqScore(
      Number(localStorage.getItem('nexora_last_pyq_score') || 0)
    )

    setGameScore(
      Number(localStorage.getItem('nexora_game_score') || 0)
    )
  }

  /*
   * Count only completed features belonging
   * to the current topic.
   */
  const topicCompleted = topic
    ? completedFeatures.filter((item) =>
        item.startsWith(`${topic.name}-`)
      )
    : []

  const completedCount = topicCompleted.length

  const overallProgress =
    FEATURES.length > 0
      ? Math.round((completedCount / FEATURES.length) * 100)
      : 0

  return (
    <div className="animate-fade-up">

      {/* Header */}
      <div className="mb-8">

        <p className="text-sm text-ink-faint">
          Your learning
        </p>

        <h1 className="text-3xl font-semibold">
          Progress
        </h1>

        <p className="mt-2 text-ink-soft">
          Track what you have learned and what needs attention.
        </p>

      </div>

      {/* Current Topic */}
      <Card className="p-6 sm:p-7">

        <div className="flex flex-col sm:flex-row items-center gap-7">

          <ProgressRing
            percent={overallProgress}
            size={105}
            strokeWidth={8}
            tone="primary"
          />

          <div className="flex-1 text-center sm:text-left">

            <p className="text-xs text-ink-faint uppercase tracking-wide">
              Current Topic
            </p>

            <h2 className="text-2xl font-semibold mt-1">
              {topic?.name || 'No topic started yet'}
            </h2>

            {topic ? (
              <p className="text-sm text-ink-soft mt-2">
                {topic.exam || 'Exam'} ·{' '}
                {topic.subject || 'Subject'}
              </p>
            ) : (
              <p className="text-sm text-ink-soft mt-2">
                Start a topic to begin tracking your progress.
              </p>
            )}

            <p className="text-sm font-medium text-primary-700 mt-3">
              {completedCount}/{FEATURES.length} learning activities completed
            </p>

          </div>

        </div>

      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">

        <Stat
          icon={Target}
          title="PYQ Score"
          value={`${pyqScore}/5`}
        />

        <Stat
          icon={Trophy}
          title="Game Score"
          value={`${gameScore}/3`}
        />

        <Stat
          icon={BookOpen}
          title="Saved Notes"
          value={notesCount}
        />

        <Stat
          icon={TrendingUp}
          title="Overall"
          value={`${overallProgress}%`}
        />

      </div>

      {/* Learning Loop */}
      <div className="mt-8">

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="text-xl font-semibold">
              Learning Loop
            </h2>

            <p className="text-sm text-ink-soft mt-1">
              Complete each step to master your topic.
            </p>
          </div>

          <span className="text-sm font-medium text-primary-700">
            {completedCount}/{FEATURES.length}
          </span>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {FEATURES.map((feature) => {

            const isComplete = topicCompleted.some(
              (item) => item === `${topic?.name}-${feature}`
            )

            return (
              <FeatureCard
                key={feature}
                label={FEATURE_LABELS[feature]}
                completed={isComplete}
              />
            )
          })}

        </div>

      </div>

      {/* Strength Analysis */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">

        <AnalysisCard
          title="Strong"
          description={
            completedCount >= 5
              ? 'You are building strong consistency in this topic.'
              : 'Complete more learning activities to identify your strongest areas.'
          }
          icon={CheckCircle2}
        />

        <AnalysisCard
          title="In Progress"
          description={
            completedCount > 0
              ? `${FEATURES.length - completedCount} activities are still waiting to be completed.`
              : 'Start your first learning activity.'
          }
          icon={Clock3}
        />

        <AnalysisCard
          title="Streak"
          description="Keep returning every day to build a consistent study habit."
          icon={Flame}
        />

      </div>

      {/* Motivation */}
      <Card className="mt-8 p-6 bg-primary-50 border-primary-100">

        <h2 className="text-xl font-semibold">
          Keep going 🚀
        </h2>

        <p className="mt-2 text-sm text-ink-soft max-w-2xl">
          Understanding is only the first step. Complete the
          learning loop, practise questions and revisit weak
          areas regularly.
        </p>

      </Card>

    </div>
  )
}

function Stat({ icon: Icon, title, value }) {
  return (
    <Card className="p-5">

      <Icon className="h-6 w-6 text-accent-600" />

      <p className="mt-4 text-sm text-ink-soft">
        {title}
      </p>

      <p className="mt-1 text-2xl font-semibold">
        {value}
      </p>

    </Card>
  )
}

function FeatureCard({ label, completed }) {
  return (
    <Card
      className={`p-5 transition ${
        completed
          ? 'border-primary-200 bg-primary-50/40'
          : ''
      }`}
    >

      <div className="flex items-center justify-between">

        <div>
          <p className="font-semibold">
            {label}
          </p>

          <p className="text-xs text-ink-faint mt-1">
            {completed
              ? 'Completed'
              : 'Not completed yet'}
          </p>
        </div>

        {completed && (
          <CheckCircle2 className="h-5 w-5 text-primary-600" />
        )}

      </div>

    </Card>
  )
}

function AnalysisCard({
  title,
  description,
  icon: Icon,
}) {
  return (
    <Card className="p-5">

      <Icon className="h-5 w-5 text-accent-600" />

      <h3 className="font-semibold mt-4">
        {title}
      </h3>

      <p className="text-sm text-ink-soft mt-2 leading-relaxed">
        {description}
      </p>

    </Card>
  )
}
