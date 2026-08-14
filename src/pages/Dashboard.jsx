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
  Gamepad2,
  FileQuestion,
  StickyNote,
  Zap,
  Target,
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
    EXAMS.find((item) => item.id === exam)?.label ||
    'Your exam'

  const subjectList = Array.isArray(subjects)
    ? subjects
    : []

  useEffect(() => {
    loadDashboardData()

    const handleStorage = () => {
      loadDashboardData()
    }

    window.addEventListener(
      'storage',
      handleStorage
    )

    return () => {
      window.removeEventListener(
        'storage',
        handleStorage
      )
    }
  }, [])

  function safeParse(key, fallback) {
    try {
      const value =
        localStorage.getItem(key)

      if (!value) return fallback

      return JSON.parse(value)
    } catch {
      return fallback
    }
  }

  function loadDashboardData() {
    const savedTopics =
      safeParse(TOPICS_KEY, [])

    const savedCurrent =
      safeParse(
        CURRENT_TOPIC_KEY,
        null
      )

    const completedFeatures =
      safeParse(
        COMPLETED_KEY,
        []
      )

    const activity =
      safeParse(
        ACTIVITY_KEY,
        null
      )

    const topicList =
      Array.isArray(savedTopics)
        ? savedTopics
        : []

    let activeTopic =
      savedCurrent

    if (
      !activeTopic &&
      topicList.length > 0
    ) {
      activeTopic =
        topicList[0]

      localStorage.setItem(
        CURRENT_TOPIC_KEY,
        JSON.stringify(
          activeTopic
        )
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

    const completed =
      Array.isArray(
        completedFeatures
      )
        ? completedFeatures.filter(
            (item) =>
              item.startsWith(
                `${activeTopic.name}-`
              )
          )
        : []

    const percentage =
      Math.min(
        100,
        Math.round(
          (completed.length /
            TOTAL_FEATURES) *
            100
        )
      )

    setProgress(percentage)

    setTopicsDone(
      completed.length > 0
        ? 1
        : 0
    )
  }

  function switchTopic(topic) {
    localStorage.setItem(
      CURRENT_TOPIC_KEY,
      JSON.stringify(topic)
    )

    setCurrentTopic(topic)

    const completedFeatures =
      safeParse(
        COMPLETED_KEY,
        []
      )

    const completed =
      Array.isArray(
        completedFeatures
      )
        ? completedFeatures.filter(
            (item) =>
              item.startsWith(
                `${topic.name}-`
              )
          )
        : []

    setProgress(
      Math.min(
        100,
        Math.round(
          (completed.length /
            TOTAL_FEATURES) *
            100
        )
      )
    )

    setTopicsDone(
      completed.length > 0
        ? 1
        : 0
    )
  }

  function removeTopic(
    topicToRemove
  ) {
    const updatedTopics =
      topics.filter(
        (topic) =>
          topic.id !==
          topicToRemove.id
      )

    localStorage.setItem(
      TOPICS_KEY,
      JSON.stringify(
        updatedTopics
      )
    )

    if (
      currentTopic?.id ===
      topicToRemove.id
    ) {
      const nextTopic =
        updatedTopics[0] ||
        null

      if (nextTopic) {
        localStorage.setItem(
          CURRENT_TOPIC_KEY,
          JSON.stringify(
            nextTopic
          )
        )
      } else {
        localStorage.removeItem(
          CURRENT_TOPIC_KEY
        )
      }

      setCurrentTopic(
        nextTopic
      )
    }

    setTopics(
      updatedTopics
    )

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
    <div className="relative min-h-full space-y-7 animate-fade-up">

      {/* HERO */}

      <section className="relative overflow-hidden rounded-[2rem] border border-violet-300/10 bg-gradient-to-br from-[#171221] via-[#121019] to-[#100d15] p-6 sm:p-8 text-white shadow-xl">

        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-violet-500/15 blur-[90px]" />

        <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-fuchsia-500/10 blur-[80px]" />

        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-5">

              <Sparkles className="h-3.5 w-3.5 text-violet-300" />

              <span className="text-xs text-white/60">
                Your AI study space
              </span>

            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">

              {topics.length > 0
                ? 'Let’s keep the momentum.'
                : 'Let’s build your study space.'}

            </h1>

            <p className="text-sm text-white/45 mt-3 max-w-xl leading-relaxed">

              {topics.length > 0
                ? `You're preparing for ${examLabel}. Pick up where you left off or explore something new.`
                : 'Add your first topic and turn your syllabus into an interactive learning experience.'}

            </p>

            {level && (
              <div className="flex items-center gap-2 mt-4 text-xs text-white/35">

                <Target className="h-3.5 w-3.5 text-violet-300" />

                {level}

              </div>
            )}

          </div>

          <div className="flex flex-wrap gap-3">

            <Button
              as={Link}
              to="/topic"
              variant="secondary"
              className="!bg-white/5 !border-white/10 !text-white/80 hover:!bg-white/10"
            >
              <Plus className="h-4 w-4" />
              Add Topic
            </Button>

            <Button
              as={Link}
              to="/topic"
              className="!bg-white !text-[#17131f] hover:!bg-violet-100"
            >
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Button>

          </div>

        </div>

      </section>

      {/* QUICK ACTIONS */}

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        <QuickAction
          to="/learn"
          icon={Brain}
          title="Learn"
          text="Understand concepts"
        />

        <QuickAction
          to="/quiz"
          icon={FileQuestion}
          title="Quiz"
          text="Test yourself"
        />

        <QuickAction
          to="/notes"
          icon={StickyNote}
          title="Notes"
          text="Write & organise"
        />

        <QuickAction
          to="/games"
          icon={Gamepad2}
          title="Play"
          text="Learn through games"
        />

      </section>

      {/* TOPICS */}

      {topics.length > 0 && (
        <Card className="!bg-[#15121c] !border-white/10 text-white p-5 sm:p-6">

          <div className="flex items-center justify-between gap-4 mb-5">

            <div className="flex items-center gap-3">

              <div className="h-9 w-9 rounded-xl bg-violet-400/10 flex items-center justify-center">

                <Layers3 className="h-4 w-4 text-violet-300" />

              </div>

              <div>

                <h2 className="font-semibold">
                  My Topics
                </h2>

                <p className="text-xs text-white/30 mt-0.5">
                  Choose what you want to focus on
                </p>

              </div>

            </div>

            <span className="text-xs text-white/30">
              {topics.length}{' '}
              {topics.length === 1
                ? 'topic'
                : 'topics'}
            </span>

          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">

            {topics.map((topic) => {

              const active =
                currentTopic?.id ===
                topic.id

              return (
                <div
                  key={topic.id}
                  className={
                    'min-w-[220px] rounded-2xl border p-4 transition-all duration-300 ' +
                    (active
                      ? 'border-violet-300/20 bg-violet-400/10'
                      : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]')
                  }
                >

                  <button
                    type="button"
                    onClick={() =>
                      switchTopic(topic)
                    }
                    className="w-full text-left"
                  >

                    <p className="text-xs text-white/30">
                      {topic.subject ||
                        'General'}
                    </p>

                    <p className="font-semibold mt-1 truncate">
                      {topic.name}
                    </p>

                    <p className="text-xs text-white/25 mt-1">
                      {topic.exam ||
                        examLabel}
                    </p>

                    {active && (
                      <span className="inline-flex items-center gap-1 text-xs text-violet-300 font-medium mt-3">
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
                    className="mt-3 text-xs text-red-300/60 hover:text-red-300 inline-flex items-center gap-1"
                  >

                    <Trash2 className="h-3.5 w-3.5" />

                    Remove

                  </button>

                </div>
              )
            })}

            <Link
              to="/topic"
              className="min-w-[180px] rounded-2xl border border-dashed border-violet-300/20 bg-violet-400/5 flex flex-col items-center justify-center gap-2 text-violet-200 hover:bg-violet-400/10 transition"
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
        <Card className="!bg-[#15121c] !border-white/10 text-white p-8 sm:p-10 text-center">

          <div className="h-16 w-16 rounded-2xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center mx-auto mb-5">

            <BookOpen className="h-7 w-7 text-violet-300" />

          </div>

          <h2 className="text-xl font-semibold">
            Your study space is ready ✨
          </h2>

          <p className="text-sm text-white/40 max-w-md mx-auto mt-2">
            Add your first topic and StudyMate will
            build your learning loop around it.
          </p>

          <Button
            as={Link}
            to="/topic"
            size="lg"
            className="mt-6 !bg-white !text-[#17131f]"
          >
            Add Your First Topic
            <ArrowRight className="h-4 w-4" />
          </Button>

        </Card>
      )}
      {/* PROGRESS */}

      {currentTopic?.name && (
        <section className="grid lg:grid-cols-[1fr_auto] gap-4">

          <Card className="!bg-[#15121c] !border-white/10 text-white p-6 sm:p-7">

            <div className="flex flex-col sm:flex-row items-center gap-7">

              <div className="relative shrink-0">

                <ProgressRing
                  percent={progress}
                  size={100}
                  strokeWidth={7}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                  <span className="text-lg font-semibold">
                    {progress}%
                  </span>

                  <span className="text-[9px] text-white/30 uppercase tracking-wider">
                    progress
                  </span>

                </div>

              </div>

              <div className="flex-1 w-full">

                <div className="flex items-center justify-between gap-4 mb-5">

                  <div>

                    <p className="text-xs text-violet-300 font-medium uppercase tracking-wider">
                      Currently learning
                    </p>

                    <h2 className="text-xl font-semibold mt-1">
                      {currentTopic.name}
                    </h2>

                    <p className="text-xs text-white/30 mt-1">
                      {currentTopic.exam ||
                        examLabel}

                      {currentTopic.subject
                        ? ` · ${currentTopic.subject}`
                        : ''}
                    </p>

                  </div>

                  <div className="hidden sm:flex h-10 w-10 rounded-xl bg-violet-400/10 items-center justify-center">

                    <Zap className="h-4 w-4 text-violet-300" />

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3">

                  <StatCard
                    label="Activities"
                    value={topicsDone}
                    icon={CheckCircle2}
                  />

                  <StatCard
                    label="Study streak"
                    value={progress > 0 ? '1d' : '0d'}
                    icon={Flame}
                  />

                </div>

                <div className="flex flex-wrap gap-3 mt-5">

                  <Button
                    as={Link}
                    to="/learn"
                    size="sm"
                    className="!bg-white !text-[#17131f]"
                  >
                    Continue Learning
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <Button
                    as={Link}
                    to="/progress"
                    variant="secondary"
                    size="sm"
                    className="!bg-white/5 !border-white/10 !text-white/70"
                  >
                    <BarChart3 className="h-4 w-4" />
                    View Progress
                  </Button>

                </div>

              </div>

            </div>

          </Card>

          {/* DAILY FOCUS */}

          <Card className="!bg-gradient-to-br !from-violet-500/15 !to-fuchsia-500/5 !border-violet-300/10 text-white p-6 lg:w-[270px]">

            <div className="h-10 w-10 rounded-xl bg-violet-400/10 flex items-center justify-center mb-5">

              <Sparkles className="h-5 w-5 text-violet-300" />

            </div>

            <p className="text-xs text-violet-300 font-medium uppercase tracking-wider">
              Nexora AI
            </p>

            <h3 className="font-semibold mt-2">
              Today's focus
            </h3>

            <p className="text-sm text-white/40 mt-2 leading-relaxed">
              Keep building momentum with
              {currentTopic?.name
                ? ` ${currentTopic.name}.`
                : ' your current topic.'}
            </p>

            <Link
              to="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-200 mt-5 hover:text-white transition"
            >
              Continue
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

          </Card>

        </section>
      )}

      {/* SUBJECTS */}

      <section>

        <div className="flex items-center justify-between gap-4 mb-4">

          <div className="flex items-center gap-3">

            <div className="h-9 w-9 rounded-xl bg-violet-400/10 flex items-center justify-center">

              <BookOpen className="h-4 w-4 text-violet-300" />

            </div>

            <div>

              <h2 className="font-semibold">
                Your Subjects
              </h2>

              <p className="text-xs text-ink-faint mt-0.5">
                Your learning areas
              </p>

            </div>

          </div>

        </div>

        {subjectList.length > 0 ? (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">

            {subjectList.map(
              (subject, index) => {

                const isCurrentSubject =
                  currentTopic?.subject ===
                  subject

                const subjectProgress =
                  isCurrentSubject
                    ? progress
                    : 0

                return (
                  <Card
                    key={`${subject}-${index}`}
                    className="p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="font-medium">
                          {subject}
                        </p>

                        <p className="text-xs text-ink-faint mt-1">
                          {isCurrentSubject
                            ? `${subjectProgress}% progress`
                            : 'Ready to explore'}
                        </p>

                      </div>

                      <div className="h-9 w-9 rounded-xl bg-primary-50 flex items-center justify-center">

                        {isCurrentSubject &&
                        subjectProgress > 0 ? (
                          <CheckCircle2 className="h-4 w-4 text-primary-600" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-primary-600" />
                        )}

                      </div>

                    </div>

                    <div className="mt-4 h-1.5 rounded-full bg-slate-100 overflow-hidden">

                      <div
                        className="h-full rounded-full bg-primary-600 transition-all duration-700"
                        style={{
                          width: `${subjectProgress}%`,
                        }}
                      />

                    </div>

                  </Card>
                )
              }
            )}

          </div>

        ) : (

          <Card className="p-6 text-center">

            <BookOpen className="h-8 w-8 text-primary-600 mx-auto mb-3" />

            <h3 className="font-semibold">
              Choose your subjects
            </h3>

            <p className="text-sm text-ink-faint mt-1 mb-4">
              Select subjects to personalise
              your StudyMate experience.
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

      </section>

      {/* AI LEARNING INSIGHTS */}

      <section>

        <div className="flex items-center gap-3 mb-4">

          <div className="h-9 w-9 rounded-xl bg-violet-100 flex items-center justify-center">

            <Brain className="h-4 w-4 text-violet-600" />

          </div>

          <div>

            <h2 className="font-semibold">
              Learning Insights
            </h2>

            <p className="text-xs text-ink-faint mt-0.5">
              Your study journey at a glance
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-3">

          <InsightCard
            icon={CheckCircle2}
            title="Strong Topics"
            text="Topics with consistently strong performance will appear here."
          />

          <InsightCard
            icon={RotateCcw}
            title="Needs Revision"
            text="Topics you're learning but haven't mastered yet will appear here."
          />

          <InsightCard
            icon={Target}
            title="Focus Areas"
            text="Nexora AI will identify topics that need more attention."
          />

        </div>

      </section>

      {/* REVISION + ACTIVITY */}

      <section className="grid lg:grid-cols-2 gap-3">

        <Card className="p-6">

          <div className="flex items-center gap-3 mb-4">

            <div className="h-9 w-9 rounded-xl bg-primary-50 flex items-center justify-center">

              <RotateCcw className="h-4 w-4 text-primary-700" />

            </div>

            <div>

              <h3 className="font-semibold text-sm">
                Today's Revision
              </h3>

              <p className="text-xs text-ink-faint mt-0.5">
                Keep your memory fresh
              </p>

            </div>

          </div>

          <div className="rounded-2xl bg-primary-50/60 p-5 text-center">

            <Sparkles className="h-7 w-7 text-primary-600 mx-auto mb-3" />

            <p className="font-medium">

              {progress > 0
                ? 'Keep revising what you learned.'
                : 'Your revision list will appear here.'}

            </p>

            <p className="text-xs text-ink-faint mt-1">

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

          <div className="flex items-center gap-3 mb-4">

            <div className="h-9 w-9 rounded-xl bg-violet-50 flex items-center justify-center">

              <Zap className="h-4 w-4 text-violet-600" />

            </div>

            <div>

              <h3 className="font-semibold text-sm">
                Recent Activity
              </h3>

              <p className="text-xs text-ink-faint mt-0.5">
                Your latest study action
              </p>

            </div>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5 text-center">

            {lastActivity ? (
              <>
                <CheckCircle2 className="h-7 w-7 text-primary-600 mx-auto mb-3" />

                <p className="font-medium">
                  {lastActivity.label ||
                    'Study activity'}
                </p>

                <p className="text-xs text-ink-faint mt-1">
                  {lastActivity.topic ||
                    currentTopic?.name}
                </p>
              </>
            ) : (
              <>
                <p className="font-medium">
                  No activity yet
                </p>

                <p className="text-xs text-ink-faint mt-1">
                  Your study activity will appear
                  here.
                </p>
              </>
            )}

          </div>

        </Card>

      </section>
      {/* QUICK STUDY TOOLS */}

      <section>

        <div className="flex items-center justify-between gap-4 mb-4">

          <div>
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider">
              Study faster
            </p>

            <h2 className="text-xl font-semibold mt-1">
              Quick Study Tools
            </h2>
          </div>

          <Sparkles className="h-5 w-5 text-violet-400" />

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">

          <ToolCard
            to="/learn"
            icon={Brain}
            title="AI Learn"
            text="Understand any concept"
          />

          <ToolCard
            to="/quiz"
            icon={FileQuestion}
            title="AI Quiz"
            text="Test your knowledge"
          />

          <ToolCard
            to="/notes"
            icon={StickyNote}
            title="Notes"
            text="Create beautiful notes"
          />

          <ToolCard
            to="/games"
            icon={Gamepad2}
            title="Study Games"
            text="Learn while playing"
          />

        </div>

      </section>

      {/* FINAL CTA */}

      <Card className="relative overflow-hidden !bg-[#15121c] !border-white/10 text-white p-6 sm:p-8">

        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-violet-500/10 blur-[70px]" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          <div>

            <div className="inline-flex items-center gap-2 text-xs text-violet-300 font-medium mb-2">

              <Sparkles className="h-3.5 w-3.5" />

              NEXORA AI

            </div>

            <h3 className="text-xl font-semibold">
              Ready for your next topic?
            </h3>

            <p className="text-sm text-white/35 mt-1 max-w-lg">
              Add another topic without losing your
              existing learning progress.
            </p>

          </div>

          <Button
            as={Link}
            to="/topic"
            className="shrink-0 !bg-white !text-[#17131f] hover:!bg-violet-100"
          >
            <Plus className="h-4 w-4" />
            Add Topic
          </Button>

        </div>

      </Card>

    </div>
  )
}


/* -------------------------------- */
/* QUICK ACTION                     */
/* -------------------------------- */

function QuickAction({
  to,
  icon: Icon,
  title,
  text,
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-white/10 bg-[#15121c] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/20 hover:bg-[#1a1622] hover:shadow-xl"
    >

      <div className="flex items-center gap-3">

        <div className="h-10 w-10 rounded-xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">

          <Icon className="h-4 w-4 text-violet-300" />

        </div>

        <div className="min-w-0">

          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="text-xs text-ink-faint mt-0.5">
            {text}
          </p>

        </div>

        <ArrowRight className="h-4 w-4 ml-auto text-white/20 group-hover:text-violet-300 transition" />

      </div>

    </Link>
  )
}


/* -------------------------------- */
/* STAT CARD                        */
/* -------------------------------- */

function StatCard({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">

      <div className="flex items-center gap-2">

        <Icon className="h-3.5 w-3.5 text-violet-300" />

        <p className="text-[11px] text-white/35">
          {label}
        </p>

      </div>

      <p className="text-lg font-semibold mt-1">
        {value}
      </p>

    </div>
  )
}


/* -------------------------------- */
/* INSIGHT CARD                     */
/* -------------------------------- */

function InsightCard({
  icon: Icon,
  title,
  text,
}) {
  return (
    <Card className="p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">

      <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center mb-4">

        <Icon className="h-4 w-4 text-violet-600" />

      </div>

      <h3 className="font-semibold text-sm">
        {title}
      </h3>

      <p className="text-xs text-ink-faint mt-2 leading-relaxed">
        {text}
      </p>

    </Card>
  )
}


/* -------------------------------- */
/* TOOL CARD                        */
/* -------------------------------- */

function ToolCard({
  to,
  icon: Icon,
  title,
  text,
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-black/5 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >

      <div className="flex items-center justify-between">

        <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">

          <Icon className="h-4 w-4 text-primary-700" />

        </div>

        <ArrowRight className="h-4 w-4 text-ink-faint group-hover:text-primary-600 group-hover:translate-x-0.5 transition" />

      </div>

      <h3 className="font-semibold text-sm mt-4">
        {title}
      </h3>

      <p className="text-xs text-ink-faint mt-1">
        {text}
      </p>

    </Link>
  )
}
