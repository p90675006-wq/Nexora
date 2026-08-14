import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Flame,
  RotateCcw,
  BookOpen,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Plus,
  Layers3,
  Trash2,
  Brain,
  StickyNote,
  Gamepad2,
  Play,
} from 'lucide-react'

import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'
import ProgressRing from '../components/common/ProgressRing.jsx'

import { useOnboarding } from '../context/OnboardingContext.jsx'
import { EXAMS } from '../data/examOptions.js'

const TOTAL_FEATURES = 7

const TOPICS_KEY = 'nexora_topics'
const CURRENT_TOPIC_KEY = 'nexora_current_topic'
const COMPLETED_KEY = 'nexora_completed_features'
const ACTIVITY_KEY = 'nexora_last_activity'

export default function Dashboard() {
  const { exam, level, subjects, loading } = useOnboarding()

  const [topics, setTopics] = useState([])
  const [currentTopic, setCurrentTopic] = useState(null)
  const [progress, setProgress] = useState(0)
  const [topicsDone, setTopicsDone] = useState(0)
  const [lastActivity, setLastActivity] = useState(null)

  const examLabel =
    EXAMS.find((item) => item.id === exam)?.label || 'your exam'

  const subjectList = Array.isArray(subjects) ? subjects : []

  useEffect(() => {
    loadDashboardData()

    const handleStorage = () => {
      loadDashboardData()
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  function safeParse(key, fallback) {
    try {
      const value = localStorage.getItem(key)

      if (!value) return fallback

      return JSON.parse(value)
    } catch {
      return fallback
    }
  }

  function loadDashboardData() {
    const savedTopics = safeParse(TOPICS_KEY, [])
    const savedCurrent = safeParse(CURRENT_TOPIC_KEY, null)
    const completedFeatures = safeParse(COMPLETED_KEY, [])
    const activity = safeParse(ACTIVITY_KEY, null)

    const topicList = Array.isArray(savedTopics)
      ? savedTopics
      : []

    let activeTopic = savedCurrent

    if (!activeTopic && topicList.length > 0) {
      activeTopic = topicList[0]

      localStorage.setItem(
        CURRENT_TOPIC_KEY,
        JSON.stringify(activeTopic)
      )
    }

    setTopics(topicList)
    setCurrentTopic(activeTopic)
    setLastActivity(activity)

    if (!activeTopic?.name) {
      setProgress(0)
      setTopicsDone(0)
      return
    }

    const completed = Array.isArray(completedFeatures)
      ? completedFeatures.filter((item) =>
          item.startsWith(`${activeTopic.name}-`)
        )
      : []

    const percentage = Math.min(
      100,
      Math.round(
        (completed.length / TOTAL_FEATURES) * 100
      )
    )

    setProgress(percentage)
    setTopicsDone(completed.length > 0 ? 1 : 0)
  }

  function switchTopic(topic) {
    localStorage.setItem(
      CURRENT_TOPIC_KEY,
      JSON.stringify(topic)
    )

    setCurrentTopic(topic)

    const completedFeatures = safeParse(
      COMPLETED_KEY,
      []
    )

    const completed = Array.isArray(
      completedFeatures
    )
      ? completedFeatures.filter((item) =>
          item.startsWith(`${topic.name}-`)
        )
      : []

    setProgress(
      Math.min(
        100,
        Math.round(
          (completed.length / TOTAL_FEATURES) * 100
        )
      )
    )

    setTopicsDone(completed.length > 0 ? 1 : 0)
  }

  function removeTopic(topicToRemove) {
    const updatedTopics = topics.filter(
      (topic) =>
        topic.id !== topicToRemove.id
    )

    localStorage.setItem(
      TOPICS_KEY,
      JSON.stringify(updatedTopics)
    )

    if (
      currentTopic?.id === topicToRemove.id
    ) {
      const nextTopic =
        updatedTopics[0] || null

      if (nextTopic) {
        localStorage.setItem(
          CURRENT_TOPIC_KEY,
          JSON.stringify(nextTopic)
        )
      } else {
        localStorage.removeItem(
          CURRENT_TOPIC_KEY
        )
      }

      setCurrentTopic(nextTopic)
    }

    setTopics(updatedTopics)
    loadDashboardData()
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">

          <div className="h-10 w-10 rounded-full border-4 border-primary-100 border-t-primary-700 animate-spin mx-auto mb-4" />

          <p className="text-sm text-ink-faint">
            Loading your dashboard...
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-up">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <p className="text-sm text-ink-faint mb-1">
            {topics.length > 0
              ? 'Your StudyMate workspace'
              : 'Welcome to StudyMate'}
          </p>

          <h1 className="text-2xl sm:text-3xl font-semibold">
            {topics.length > 0
              ? 'Keep learning smarter.'
              : 'Let’s set up your first topic.'}
          </h1>

          <p className="text-sm text-ink-faint mt-2">
            {examLabel}
            {level ? ` · ${level}` : ''}
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <Button
            as={Link}
            to="/topic"
            variant="secondary"
          >
            <Plus className="h-4 w-4" />
            Add Topic
          </Button>

          <Button
            as={Link}
            to="/topic"
            size="lg"
          >
            Start Learning
            <ArrowRight className="h-4 w-4" />
          </Button>

        </div>

      </div>


      {/* TOPIC SWITCHER */}

      {topics.length > 0 && (
        <Card className="p-5">

          <div className="flex items-center justify-between gap-4 mb-4">

            <div className="flex items-center gap-2">

              <Layers3 className="h-5 w-5 text-primary-700" />

              <h2 className="font-semibold">
                My Topics
              </h2>

            </div>

            <span className="text-xs text-ink-faint">
              {topics.length}{' '}
              {topics.length === 1
                ? 'topic'
                : 'topics'}
            </span>

          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">

            {topics.map((topic) => {

              const active =
                currentTopic?.id === topic.id

              return (
                <div
                  key={topic.id}
                  className={
                    'min-w-[220px] rounded-xl border p-4 transition ' +
                    (
                      active
                        ? 'border-violet-400 bg-violet-50'
                        : 'border-black/10 bg-white'
                    )
                  }
                >

                  <button
                    type="button"
                    onClick={() =>
                      switchTopic(topic)
                    }
                    className="w-full text-left"
                  >

                    <p className="text-xs text-ink-faint">
                      {topic.subject ||
                        'General'}
                    </p>

                    <p className="font-semibold mt-1 truncate">
                      {topic.name}
                    </p>

                    <p className="text-xs text-ink-faint mt-1">
                      {topic.exam ||
                        examLabel}
                    </p>

                    {active && (
                      <span className="inline-flex items-center gap-1 text-xs text-violet-700 font-medium mt-3">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Current topic
                      </span>
                    )}

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removeTopic(topic)
                    }
                    className="mt-3 text-xs text-red-500 hover:text-red-700 inline-flex items-center gap-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>

                </div>
              )
            })}

            <Link
              to="/topic"
              className="min-w-[180px] rounded-xl border border-dashed border-violet-300 bg-violet-50/50 flex flex-col items-center justify-center gap-2 text-violet-700 hover:bg-violet-50 transition"
            >

              <Plus className="h-6 w-6" />

              <span className="text-sm font-medium">
                Add another topic
              </span>

            </Link>

          </div>

        </Card>
      )}


      {/* EMPTY STATE */}

      {topics.length === 0 && (
        <Card className="p-8 sm:p-10 text-center border-violet-100 bg-violet-50/50">

          <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">

            <BookOpen className="h-7 w-7 text-violet-700" />

          </div>

          <h2 className="text-xl font-semibold">
            Your study space is ready.
          </h2>

          <p className="text-sm text-ink-soft max-w-md mx-auto mt-2">
            Add your first topic and StudyMate will build
            your learning loop around it.
          </p>

          <Button
            as={Link}
            to="/topic"
            size="lg"
            className="mt-5"
          >
            Add Your First Topic
            <ArrowRight className="h-4 w-4" />
          </Button>

        </Card>
      )}


      {/* PROGRESS */}

      {currentTopic?.name && (
        <Card className="p-6 sm:p-7">

          <div className="flex flex-col sm:flex-row items-center gap-8">

            <ProgressRing
              percent={progress}
              size={92}
              strokeWidth={7}
            />

            <div className="flex-1 w-full">

              <div className="grid grid-cols-3 gap-5 text-center sm:text-left">

                <div>

                  <p className="text-xs text-ink-faint mb-1">
                    Topic Progress
                  </p>

                  <p className="text-xl font-mono font-semibold">
                    {progress}%
                  </p>

                </div>

                <div>

                  <p className="text-xs text-ink-faint mb-1">
                    Activities Done
                  </p>

                  <p className="text-xl font-mono font-semibold">
                    {topicsDone}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-ink-faint mb-1 flex items-center gap-1 justify-center sm:justify-start">

                    <Flame className="h-3.5 w-3.5 text-accent-600" />

                    Streak

                  </p>

                  <p className="text-xl font-mono font-semibold">
                    {progress > 0 ? '1d' : '0d'}
                  </p>

                </div>

              </div>


              {/* DARK CURRENT TOPIC */}

              <div className="mt-5 rounded-2xl bg-[#15121c] border border-white/10 p-5 text-white shadow-lg">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-xs text-violet-300 font-semibold uppercase tracking-wider">
                      Current Topic
                    </p>

                    <p className="text-lg font-semibold text-white mt-1">
                      {currentTopic.name}
                    </p>

                    <p className="text-xs text-white/45 mt-1">
                      {currentTopic.exam ||
                        examLabel}

                      {currentTopic.subject
                        ? ` · ${currentTopic.subject}`
                        : ''}
                    </p>

                  </div>

                  <div className="h-10 w-10 rounded-xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center">

                    <Sparkles className="h-4 w-4 text-violet-300" />

                  </div>

                </div>


                <div className="grid grid-cols-2 gap-3 mt-5">

                  <DarkStat
                    label="Progress"
                    value={`${progress}%`}
                  />

                  <DarkStat
                    label="Activities"
                    value={topicsDone}
                  />

                </div>
                <div className="mt-5 flex flex-wrap gap-3">

                  <Button
                    as={Link}
                    to="/progress"
                    variant="secondary"
                    size="sm"
                  >
                    <BarChart3 className="h-4 w-4" />
                    View Progress
                  </Button>

                  <Button
                    as={Link}
                    to="/learn"
                    size="sm"
                  >
                    Continue Learning
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                </div>

              </div>

            </div>

          </div>

        </Card>
      )}


      {/* QUICK AI STUDY TOOLS */}

      <div>

        <div className="flex items-center justify-between mb-4">

          <div>

            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider">
              StudyMate AI
            </p>

            <h2 className="text-xl font-semibold mt-1">
              Your study tools
            </h2>

          </div>

          <Sparkles className="h-5 w-5 text-violet-500" />

        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <ToolCard
            to="/learn"
            icon={Brain}
            title="Learn"
            text="Understand difficult concepts with AI."
          />

          <ToolCard
            to="/notes"
            icon={StickyNote}
            title="Notes"
            text="Create beautiful notes your way."
          />

          <ToolCard
            to="/watch"
            icon={Play}
            title="Watch"
            text="Turn concepts into visual lessons."
          />

          <ToolCard
            to="/game"
            icon={Gamepad2}
            title="Play"
            text="Learn through interactive games."
          />

        </div>

      </div>


      {/* SUBJECTS */}

      <div>

        <div className="flex items-center gap-2 mb-4">

          <BookOpen className="h-5 w-5 text-violet-600" />

          <h2 className="font-semibold">
            Your Subjects
          </h2>

        </div>


        {subjectList.length > 0 ? (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {subjectList.map((subject, index) => {

              const isCurrentSubject =
                currentTopic?.subject === subject

              const subjectProgress =
                isCurrentSubject
                  ? progress
                  : 0

              return (

                <Card
                  key={`${subject}-${index}`}
                  className="p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex items-center justify-between">

                    <p className="font-medium">
                      {subject}
                    </p>

                    {isCurrentSubject &&
                      subjectProgress > 0 && (
                        <CheckCircle2 className="h-5 w-5 text-violet-600" />
                      )}

                  </div>

                  <p className="text-xs text-ink-faint mt-1">
                    {isCurrentSubject
                      ? `${subjectProgress}% progress`
                      : 'No progress yet'}
                  </p>

                  <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-violet-500 transition-all duration-500"
                      style={{
                        width: `${subjectProgress}%`,
                      }}
                    />

                  </div>

                </Card>

              )
            })}

          </div>

        ) : (

          <Card className="p-6 text-center">

            <BookOpen className="h-8 w-8 text-violet-500 mx-auto mb-3" />

            <h3 className="font-semibold">
              Choose your subjects
            </h3>

            <p className="text-sm text-ink-faint mt-1 mb-4">
              Select subjects to personalise your
              StudyMate experience.
            </p>

            <Button
              as={Link}
              to="/onboarding/subjects"
              variant="secondary"
            >
              Set Up Subjects
              <ArrowRight className="h-4 w-4" />
            </Button>

          </Card>

        )}

      </div>


      {/* LEARNING AREAS */}

      <div className="grid md:grid-cols-3 gap-4">

        <Card className="p-5">

          <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">

            <CheckCircle2 className="h-4 w-4 text-emerald-600" />

          </div>

          <h3 className="font-semibold text-sm mb-2">
            Strong Topics
          </h3>

          <p className="text-sm text-ink-faint">
            Topics with consistently strong quiz
            performance will appear here.
          </p>

        </Card>


        <Card className="p-5">

          <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center mb-4">

            <BookOpen className="h-4 w-4 text-amber-600" />

          </div>

          <h3 className="font-semibold text-sm mb-2">
            Learning Topics
          </h3>

          <p className="text-sm text-ink-faint">
            Topics you're currently learning but
            haven't mastered yet.
          </p>

        </Card>


        <Card className="p-5">

          <div className="h-9 w-9 rounded-xl bg-rose-50 flex items-center justify-center mb-4">

            <RotateCcw className="h-4 w-4 text-rose-500" />

          </div>

          <h3 className="font-semibold text-sm mb-2">
            Weak Topics
          </h3>

          <p className="text-sm text-ink-faint">
            Nexora AI will identify topics that need
            more revision.
          </p>

        </Card>

      </div>


      {/* REVISION + ACTIVITY */}

      <div className="grid lg:grid-cols-2 gap-4">

        <Card className="p-6">

          <div className="flex items-center gap-2 mb-3">

            <RotateCcw className="h-4 w-4 text-violet-600" />

            <h3 className="font-semibold text-sm">
              Today's Revision
            </h3>

          </div>

          <div className="text-center py-6">

            <Sparkles className="h-8 w-8 text-violet-500 mx-auto mb-3" />

            <p className="font-medium">

              {progress > 0
                ? 'Keep revising what you learned.'
                : 'Your revision list will appear here.'}

            </p>

            <p className="text-sm text-ink-faint mt-1">

              {progress > 0
                ? `Continue with ${
                    currentTopic?.name ||
                    'your topic'
                  }.`
                : 'Start learning to create your first revision task.'}

            </p>

          </div>

        </Card>


        <Card className="p-6">

          <h3 className="font-semibold text-sm mb-3">
            Recent Activity
          </h3>

          <div className="text-center py-6">

            {lastActivity ? (

              <>

                <CheckCircle2 className="h-8 w-8 text-violet-500 mx-auto mb-3" />

                <p className="font-medium">
                  {lastActivity.label ||
                    'Study activity'}
                </p>

                <p className="text-sm text-ink-faint mt-1">
                  {lastActivity.topic ||
                    currentTopic?.name}
                </p>

              </>

            ) : (

              <>

                <p className="font-medium">
                  No activity yet
                </p>

                <p className="text-sm text-ink-faint mt-1">
                  Your study activity will appear
                  here.
                </p>

              </>

            )}

          </div>

        </Card>

      </div>


      {/* QUICK START */}

      <Card className="p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 border-violet-100">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>

            <div className="flex items-center gap-2">

              <Sparkles className="h-4 w-4 text-violet-600" />

              <h3 className="font-semibold">
                Ready for another topic?
              </h3>

            </div>

            <p className="text-sm text-ink-faint mt-1">
              Add another topic without losing your
              existing progress.
            </p>

          </div>

          <Button
            as={Link}
            to="/topic"
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
            Add Topic
          </Button>

        </div>

      </Card>

    </div>
  )
}


/* -------------------------------------------------- */
/* DARK STAT */
/* -------------------------------------------------- */

function DarkStat({ label, value }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">

      <p className="text-[11px] uppercase tracking-wider text-white/40">
        {label}
      </p>

      <p className="text-lg font-semibold text-white mt-1">
        {value}
      </p>

    </div>
  )
}


/* -------------------------------------------------- */
/* TOOL CARD */
/* -------------------------------------------------- */

function ToolCard({
  to,
  icon: Icon,
  title,
  text,
}) {
  return (
    <Link
      to={to}
      className="group block"
    >

      <Card className="h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-violet-200">

        <div className="flex items-start justify-between gap-3">

          <div className="h-11 w-11 rounded-2xl bg-violet-50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">

            <Icon
              className="h-5 w-5 text-violet-600"
              strokeWidth={1.8}
            />

          </div>

          <ArrowRight
            className="h-4 w-4 text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet-500"
          />

        </div>

        <h3 className="font-semibold mt-5">
          {title}
        </h3>

        <p className="text-sm text-ink-faint mt-1 leading-relaxed">
          {text}
        </p>

      </Card>

    </Link>
  )
}
