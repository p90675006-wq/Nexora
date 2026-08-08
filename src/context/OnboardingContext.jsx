import { Link } from 'react-router-dom'
import { ArrowRight, Flame, RotateCcw } from 'lucide-react'
import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'
import ProgressRing from '../components/common/ProgressRing.jsx'
import TopicListCard from '../components/dashboard/TopicListCard.jsx'
import ActivityList from '../components/dashboard/ActivityList.jsx'
import { useOnboarding } from '../context/OnboardingContext.jsx'
import { EXAMS } from '../data/examOptions.js'

export default function Dashboard() {
  const { exam, subjects, loading } = useOnboarding()

  const examLabel =
    EXAMS.find((item) => item.id === exam)?.label || 'your exam'

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-ink-soft">
          Loading your StudyMate...
        </p>
      </div>
    )
  }

  const selectedSubjects = subjects || []

  const subjectTopics = selectedSubjects.map((subject) => ({
    id: subject,
    name: `Start ${subject}`,
    subject,
    percent: 0,
  }))

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Welcome */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="text-sm text-ink-faint mb-1">
            Preparing for
          </p>

          <h1 className="text-2xl sm:text-3xl font-semibold">
            Welcome back —{' '}
            <span className="text-primary-700">
              {examLabel}
            </span>
          </h1>

          <p className="text-sm text-ink-soft mt-2">
            Your selected subjects:{' '}
            {selectedSubjects.length > 0
              ? selectedSubjects.join(', ')
              : 'None selected yet'}
          </p>
        </div>

        <Button
          as={Link}
          to="/topic"
          size="lg"
          className="shrink-0"
        >
          Quick Start
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Overall progress */}
      <Card className="p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-8">
        <ProgressRing
          percent={0}
          size={92}
          strokeWidth={7}
        />

        <div className="flex-1 grid grid-cols-3 gap-6 w-full text-center sm:text-left">
          <div>
            <p className="text-xs text-ink-faint mb-1">
              Overall Progress
            </p>
            <p className="text-xl font-mono font-semibold">
              0%
            </p>
          </div>

          <div>
            <p className="text-xs text-ink-faint mb-1">
              Topics Done
            </p>
            <p className="text-xl font-mono font-semibold">
              0
            </p>
          </div>

          <div>
            <p className="text-xs text-ink-faint mb-1 flex items-center gap-1 justify-center sm:justify-start">
              <Flame className="h-3.5 w-3.5 text-accent-600" />
              Streak
            </p>

            <p className="text-xl font-mono font-semibold">
              0d
            </p>
          </div>
        </div>
      </Card>

      {/* Selected subjects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold">
              Your Subjects
            </h2>

            <p className="text-xs text-ink-faint mt-1">
              Start learning to build your progress.
            </p>
          </div>
        </div>

        {selectedSubjects.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {subjectTopics.map((topic) => (
              <TopicListCard
                key={topic.id}
                title={topic.subject}
                tone="primary"
                topics={[topic]}
              />
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <p className="text-sm text-ink-soft">
              You haven't selected any subjects yet.
            </p>

            <Button
              as={Link}
              to="/onboarding/subjects"
              size="sm"
              className="mt-4"
            >
              Select Subjects
            </Button>
          </Card>
        )}
      </div>

      {/* Today's revision */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="h-4 w-4 text-primary-700" />

            <h3 className="font-semibold text-sm">
              Today&apos;s Revision
            </h3>
          </div>

          <div className="py-5 text-center">
            <p className="text-sm text-ink-soft">
              No revision topics yet.
            </p>

            <p className="text-xs text-ink-faint mt-1">
              Start learning a topic and your revision list
              will appear here.
            </p>
          </div>
        </Card>

        <ActivityList items={[]} />
      </div>

      <p className="text-xs text-ink-faint text-center pt-2">
        Your dashboard will update automatically as you
        learn and complete topics.
      </p>
    </div>
  )
}
