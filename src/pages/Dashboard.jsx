import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Flame,
  RotateCcw,
  BookOpen,
  Sparkles,
  BarChart3,
} from 'lucide-react'

import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'
import ProgressRing from '../components/common/ProgressRing.jsx'

import { useOnboarding } from '../context/OnboardingContext.jsx'
import { EXAMS } from '../data/examOptions.js'

export default function Dashboard() {
  const { exam, level, subjects, loading } = useOnboarding()

  const examLabel =
    EXAMS.find((item) => item.id === exam)?.label || 'your exam'

  const subjectList = Array.isArray(subjects) ? subjects : []

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

          {level && (
            <p className="text-sm text-ink-faint mt-2">
              Level: {level}
            </p>
          )}
        </div>

        <Button
          as={Link}
          to="/topic"
          size="lg"
          className="shrink-0"
        >
          Start Learning
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress */}
      <Card className="p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row items-center gap-8">

          <ProgressRing
            percent={0}
            size={92}
            strokeWidth={7}
          />

          <div className="flex-1 w-full">

            <div className="grid grid-cols-3 gap-6 text-center sm:text-left">

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

            {/* Progress link */}
            <div className="mt-5 flex justify-center sm:justify-start">
              <Button
                as={Link}
                to="/progress"
                variant="secondary"
                size="sm"
              >
                <BarChart3 className="h-4 w-4" />
                View Full Progress
              </Button>
            </div>

          </div>
        </div>
      </Card>

      {/* Subjects */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary-700" />

          <h2 className="font-semibold">
            Your Subjects
          </h2>
        </div>

        {subjectList.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {subjectList.map((subject, index) => (
              <Card
                key={`${subject}-${index}`}
                className="p-5 hover:shadow-md transition-shadow"
              >
                <p className="font-medium">
                  {subject}
                </p>

                <p className="text-xs text-ink-faint mt-1">
                  No progress yet
                </p>

                <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary-600"
                    style={{ width: '0%' }}
                  />
                </div>

                <p className="text-xs text-ink-faint mt-2">
                  0% completed
                </p>
              </Card>
            ))}

          </div>
        ) : (
          <Card className="p-6 text-center">

            <BookOpen className="h-8 w-8 text-primary-600 mx-auto mb-3" />

            <h3 className="font-semibold">
              Choose your subjects
            </h3>

            <p className="text-sm text-ink-faint mt-1 mb-4">
              Select subjects to personalise your StudyMate experience.
            </p>

            {/* FIXED: correct onboarding route */}
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

      {/* Strong / Blurred / Weak */}
      <div className="grid md:grid-cols-3 gap-4">

        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-2">
            Strong Topics
          </h3>

          <p className="text-sm text-ink-faint">
            Complete some topics and quizzes to discover your strong areas.
          </p>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-2">
            Blurred Topics
          </h3>

          <p className="text-sm text-ink-faint">
            Your learning patterns will appear here after you start studying.
          </p>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-sm mb-2">
            Weak Topics
          </h3>

          <p className="text-sm text-ink-faint">
            Quiz performance will help StudyMate identify topics that need revision.
          </p>
        </Card>

      </div>

      {/* Today's Revision */}
      <div className="grid lg:grid-cols-2 gap-4">

        <Card className="p-6">

          <div className="flex items-center gap-2 mb-3">
            <RotateCcw className="h-4 w-4 text-primary-700" />

            <h3 className="font-semibold text-sm">
              Today&apos;s Revision
            </h3>
          </div>

          <div className="text-center py-6">

            <Sparkles className="h-8 w-8 text-primary-600 mx-auto mb-3" />

            <p className="font-medium">
              Your revision list will appear here.
            </p>

            <p className="text-sm text-ink-faint mt-1">
              Start learning a topic to create your first revision task.
            </p>

          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">

          <h3 className="font-semibold text-sm mb-3">
            Recent Activity
          </h3>

          <div className="text-center py-6">

            <p className="font-medium">
              No activity yet
            </p>

            <p className="text-sm text-ink-faint mt-1">
              Your study activity will appear here.
            </p>

          </div>
        </Card>

      </div>

      {/* Quick Start */}
      <Card className="p-6 bg-primary-50 border-primary-100">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h3 className="font-semibold">
              Ready to start studying?
            </h3>

            <p className="text-sm text-ink-faint mt-1">
              Pick a topic and let StudyMate help you learn smarter.
            </p>
          </div>

          <Button
            as={Link}
            to="/topic"
            className="shrink-0"
          >
            Start a Topic
            <ArrowRight className="h-4 w-4" />
          </Button>

        </div>

      </Card>

    </div>
  )
}
