import { Link } from 'react-router-dom'
import { ArrowRight, Flame, RotateCcw } from 'lucide-react'
import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'
import ProgressRing from '../components/common/ProgressRing.jsx'
import TopicListCard from '../components/dashboard/TopicListCard.jsx'
import ActivityList from '../components/dashboard/ActivityList.jsx'
import { useOnboarding } from '../context/OnboardingContext.jsx'
import { EXAMS } from '../data/examOptions.js'
import {
  SAMPLE_PROGRESS,
  SAMPLE_TOPICS,
  SAMPLE_TODAY_REVISION,
  SAMPLE_RECENT_ACTIVITY,
} from '../data/mockDashboard.js'

export default function Dashboard() {
  const { exam } = useOnboarding()
  const examLabel = EXAMS.find((e) => e.id === exam)?.label || 'your exam'

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Welcome + quick start */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="text-sm text-ink-faint mb-1">Preparing for</p>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Welcome back — <span className="text-primary-700">{examLabel}</span>
          </h1>
        </div>
        <Button as={Link} to="/topic" size="lg" className="shrink-0">
          Quick Start <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Overall progress */}
      <Card className="p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-8">
        <ProgressRing percent={SAMPLE_PROGRESS.overallPercent} size={92} strokeWidth={7} />
        <div className="flex-1 grid grid-cols-3 gap-6 w-full text-center sm:text-left">
          <div>
            <p className="text-xs text-ink-faint mb-1">Overall Progress</p>
            <p className="text-xl font-mono font-semibold">{SAMPLE_PROGRESS.overallPercent}%</p>
          </div>
          <div>
            <p className="text-xs text-ink-faint mb-1">Topics Done</p>
            <p className="text-xl font-mono font-semibold">
              {SAMPLE_PROGRESS.topicsCompleted}/{SAMPLE_PROGRESS.topicsTotal}
            </p>
          </div>
          <div>
            <p className="text-xs text-ink-faint mb-1 flex items-center gap-1 justify-center sm:justify-start">
              <Flame className="h-3.5 w-3.5 text-accent-600" /> Streak
            </p>
            <p className="text-xl font-mono font-semibold">{SAMPLE_PROGRESS.currentStreakDays}d</p>
          </div>
        </div>
      </Card>

      {/* Strong / Blurred / Weak */}
      <div className="grid md:grid-cols-3 gap-4">
        <TopicListCard title="Strong Topics" tone="primary" topics={SAMPLE_TOPICS.strong} />
        <TopicListCard title="Blurred Topics" tone="blurred" topics={SAMPLE_TOPICS.blurred} />
        <TopicListCard title="Weak Topics" tone="weak" topics={SAMPLE_TOPICS.weak} />
      </div>

      {/* Today's revision + Recent activity */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="h-4 w-4 text-primary-700" />
            <h3 className="font-semibold text-sm">Today&apos;s Revision</h3>
          </div>
          <ul className="space-y-3">
            {SAMPLE_TODAY_REVISION.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-ink-faint">{item.subject}</p>
                </div>
                <span className="text-xs shrink-0 px-2.5 py-1 rounded-full bg-accent-50 text-accent-700 font-medium">
                  {item.dueLabel}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <ActivityList items={SAMPLE_RECENT_ACTIVITY} />
      </div>

      <p className="text-xs text-ink-faint text-center pt-2">
        Sample data shown above — this will reflect your real progress once you start learning topics.
      </p>
    </div>
  )
}
