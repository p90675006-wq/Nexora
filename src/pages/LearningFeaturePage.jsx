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
} from 'lucide-react'

export default function LearningFeaturePage() {
  const { feature } = useParams()
  const [searchParams] = useSearchParams()

  const topic =
    searchParams.get('topic') ||
    searchParams.get('q') ||
    'Your Topic'

  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const steps = [
    {
      title: `Understand ${topic}`,
      icon: BookOpen,
      content: `Let's learn ${topic} step by step. Start by identifying what the topic means, what problem it solves, and the main ideas you need to understand.`,
    },
    {
      title: 'Build the concept',
      icon: Brain,
      content: `Break ${topic} into smaller ideas. Focus on the relationship between the important terms, rules, formulas, processes or principles involved.`,
    },
    {
      title: 'Learn with an example',
      icon: Lightbulb,
      content: `Try connecting ${topic} with a simple example. A good example helps you understand how the concept works instead of simply memorising it.`,
    },
  ]

  const startLearning = () => {
    setStarted(true)
    setStep(0)

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 100)
  }

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      setStep(steps.length)
    }
  }

  const previousStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const resetLesson = () => {
    setStarted(false)
    setStep(0)
    setSelectedAnswer(null)
    setShowAnswer(false)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const isQuiz = step === steps.length

  return (
    <div className="animate-fade-up max-w-4xl">

      {/* Back */}
      <Link
        to={`/learn?${searchParams.toString()}`}
        className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {topic}
      </Link>

      {/* Main Card */}
      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-card">

        {/* Header */}
        <div className="flex items-start gap-4">

          <div className="h-14 w-14 shrink-0 rounded-2xl bg-accent-50 flex items-center justify-center">
            <BookOpen className="h-7 w-7 text-accent-600" />
          </div>

          <div>
            <p className="text-sm text-ink-faint">
              Learn
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold">
              {topic}
            </h1>

            <p className="text-ink-soft mt-2">
              Learn this topic step by step.
            </p>
          </div>

        </div>

        {/* START SCREEN */}
        {!started && (
          <div className="mt-8">

            <div className="rounded-2xl bg-accent-50/60 p-6">

              <h2 className="text-xl font-semibold">
                Ready to learn?
              </h2>

              <p className="text-ink-soft mt-2">
                We'll break <strong>{topic}</strong> into
                simple concepts, examples and a quick
                understanding check.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 mt-6">

                <div className="rounded-xl bg-white p-4">
                  <BookOpen className="h-5 w-5 text-accent-600 mb-2" />
                  <p className="font-medium text-sm">
                    Understand
                  </p>
                  <p className="text-xs text-ink-soft mt-1">
                    Learn the core idea
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4">
                  <Lightbulb className="h-5 w-5 text-accent-600 mb-2" />
                  <p className="font-medium text-sm">
                    Example
                  </p>
                  <p className="text-xs text-ink-soft mt-1">
                    Connect the concept
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4">
                  <Brain className="h-5 w-5 text-accent-600 mb-2" />
                  <p className="font-medium text-sm">
                    Practice
                  </p>
                  <p className="text-xs text-ink-soft mt-1">
                    Check your understanding
                  </p>
                </div>

              </div>

            </div>

            <button
              onClick={startLearning}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium hover:opacity-90 transition"
            >
              Start Studying
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>
        )}

        {/* LESSON */}
        {started && !isQuiz && (
          <div className="mt-8">

            {/* Progress */}
            <div className="mb-8">

              <div className="flex justify-between text-sm mb-2">
                <span className="text-ink-soft">
                  Learning progress
                </span>

                <span className="font-medium">
                  {step + 1}/{steps.length}
                </span>
              </div>

              <div className="h-2 rounded-full bg-black/5 overflow-hidden">

                <div
                  className="h-full bg-accent-600 transition-all duration-300"
                  style={{
                    width: `${((step + 1) / steps.length) * 100}%`,
                  }}
                />

              </div>

            </div>

            {/* Current lesson */}
            <div className="rounded-2xl border border-black/5 p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="h-10 w-10 rounded-full bg-accent-50 flex items-center justify-center">
                  {(() => {
                    const Icon = steps[step].icon
                    return (
                      <Icon className="h-5 w-5 text-accent-600" />
                    )
                  })()}
                </div>

                <div>
                  <p className="text-xs text-ink-faint">
                    Step {step + 1}
                  </p>

                  <h2 className="text-xl font-semibold">
                    {steps[step].title}
                  </h2>
                </div>

              </div>

              <p className="text-base leading-7 text-ink-soft">
                {steps[step].content}
              </p>

              {/* Key point */}
              <div className="mt-6 rounded-xl bg-accent-50/60 p-4">

                <div className="flex gap-3">

                  <Lightbulb className="h-5 w-5 text-accent-600 shrink-0" />

                  <div>
                    <p className="font-medium">
                      Key point
                    </p>

                    <p className="text-sm text-ink-soft mt-1">
                      Don't just memorise {topic}.
                      Try explaining it in your own words.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">

              <button
                onClick={previousStep}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-5 py-3 font-medium disabled:opacity-40 hover:bg-black/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>

              <button
                onClick={nextStep}
                className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-5 py-3 text-white font-medium hover:opacity-90"
              >
                {step === steps.length - 1
                  ? 'Check Understanding'
                  : 'Next'}

                <ArrowRight className="h-4 w-4" />
              </button>

            </div>

          </div>
        )}

        {/* QUIZ */}
        {started && isQuiz && (
          <div className="mt-8">

            <div className="text-center">

              <div className="mx-auto h-16 w-16 rounded-full bg-accent-50 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-accent-600" />
              </div>

              <h2 className="text-2xl font-semibold mt-4">
                Quick Check
              </h2>

              <p className="text-ink-soft mt-2">
                Let's see what you understood about {topic}.
              </p>

            </div>

            <div className="mt-8 rounded-2xl border border-black/5 p-6">

              <p className="font-semibold">
                Which approach is best when learning {topic}?
              </p>

              <div className="space-y-3 mt-5">

                {[
                  'Memorise everything without understanding it',
                  'Understand the concept and apply it to examples',
                  'Read it once and never revise it',
                  'Skip difficult parts',
                ].map((answer, index) => {

                  const selected =
                    selectedAnswer === index

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
                        Understanding a concept and applying it
                        to examples is much more effective than
                        memorising without understanding.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">
                        Good attempt! 💪
                      </p>

                      <p className="text-sm text-ink-soft mt-2">
                        The best approach is to understand the
                        concept and then apply it to examples.
                      </p>
                    </>
                  )}

                </div>
              )}

            </div>

            <div className="flex justify-center gap-3 mt-7">

              <button
                onClick={resetLesson}
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-5 py-3 font-medium hover:bg-black/5"
              >
                <RotateCcw className="h-4 w-4" />
                Study Again
              </button>

              <Link
                to="/dashboard"
                className="rounded-xl bg-accent-600 px-5 py-3 text-white font-medium"
              >
                Dashboard
              </Link>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}
