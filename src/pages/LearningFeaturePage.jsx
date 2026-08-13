import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Play,
  Gamepad2,
  FileQuestion,
  BarChart3,
  RotateCcw,
  CheckCircle2,
  Circle,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { LEARNING_ACTIONS } from '../data/learningActions.js'

const lessons = {
  learn: {
    icon: BookOpen,
    title: 'Learn',
    description: 'Understand the topic step by step.',
    sections: [
      {
        title: 'Start with the basics',
        text: 'Begin by understanding the definition, purpose and fundamental concepts of the topic. Focus on why the concept is important before memorising details.',
      },
      {
        title: 'Understand the core concept',
        text: 'Break the topic into smaller ideas. Connect each idea with examples so that you can recall the concept instead of simply memorising it.',
      },
      {
        title: 'Important points',
        text: 'Identify definitions, processes, formulas, diagrams and facts that are most likely to be useful during practice and revision.',
      },
    ],
    quiz: {
      question: 'What is the best way to learn a new concept?',
      options: [
        'Only memorise the definition',
        'Understand the concept and connect it with examples',
        'Read it once and move on',
        'Skip difficult parts',
      ],
      answer: 1,
    },
  },

  watch: {
    icon: Play,
    title: 'Watch',
    description: 'Learn visually and reinforce your understanding.',
    sections: [
      {
        title: 'Visual learning',
        text: 'Use diagrams, animations and visual explanations to understand processes that are difficult to imagine from text alone.',
      },
      {
        title: 'Active watching',
        text: 'Do not watch passively. Pause when you see an important idea and try explaining it yourself.',
      },
      {
        title: 'After watching',
        text: 'Close the video and recall the main points. This turns visual learning into active recall.',
      },
    ],
    quiz: {
      question: 'What should you do after watching a concept video?',
      options: [
        'Immediately watch another video',
        'Close it and recall the important points',
        'Skip revision',
        'Memorise the video',
      ],
      answer: 1,
    },
  },

  remember: {
    icon: Brain,
    title: 'Remember',
    description: 'Use active recall and memory techniques.',
    sections: [
      {
        title: 'Active recall',
        text: 'Look away from your notes and try to explain the concept using your own words.',
      },
      {
        title: 'Memory connections',
        text: 'Create associations, mnemonics, stories or visual connections for information that is difficult to remember.',
      },
      {
        title: 'Spaced revision',
        text: 'Review difficult information repeatedly over increasing intervals instead of studying it only once.',
      },
    ],
    quiz: {
      question: 'Which technique is most useful for long-term retention?',
      options: [
        'Active recall and spaced revision',
        'Reading the same page repeatedly',
        'Highlighting everything',
        'Studying only once',
      ],
      answer: 0,
    },
  },

  play: {
    icon: Gamepad2,
    title: 'Play',
    description: 'Reinforce learning with a quick challenge.',
    sections: [
      {
        title: 'Challenge yourself',
        text: 'Turn revision into a challenge by answering questions without checking your notes.',
      },
      {
        title: 'Beat your score',
        text: 'Record your mistakes and try the same topic again after revising the weak concepts.',
      },
      {
        title: 'Learn from mistakes',
        text: 'Every incorrect answer is useful feedback. Find out why your answer was wrong before continuing.',
      },
    ],
    quiz: {
      question: 'What should you do after getting a question wrong?',
      options: [
        'Ignore it',
        'Guess the next answer',
        'Understand the mistake and revise the concept',
        'Stop studying',
      ],
      answer: 2,
    },
  },

  pyqs: {
    icon: FileQuestion,
    title: 'PYQs',
    description: 'Practice previous-year style questions.',
    sections: [
      {
        title: 'Understand the pattern',
        text: 'Previous-year questions help you understand the type, difficulty and concepts commonly tested in an examination.',
      },
      {
        title: 'Solve before checking',
        text: 'Attempt every question independently before looking at the solution.',
      },
      {
        title: 'Analyse mistakes',
        text: 'Do not only count your marks. Identify the concept behind every incorrect answer.',
      },
    ],
    quiz: {
      question: 'Why are PYQs useful?',
      options: [
        'They replace studying',
        'They help understand exam patterns and tested concepts',
        'They guarantee the same questions',
        'They are only useful after exams',
      ],
      answer: 1,
    },
  },

  analyze: {
    icon: BarChart3,
    title: 'Analyze',
    description: 'Find your strengths and weak areas.',
    sections: [
      {
        title: 'Track accuracy',
        text: 'Compare the number of correct and incorrect answers to understand your current preparation level.',
      },
      {
        title: 'Find weak topics',
        text: 'Topics where you repeatedly make mistakes should receive additional study time.',
      },
      {
        title: 'Plan smarter',
        text: 'Use your performance to decide what to study next instead of spending equal time on every topic.',
      },
    ],
    quiz: {
      question: 'What should your analysis identify?',
      options: [
        'Only your strongest topic',
        'Only your total study time',
        'Both strengths and weak areas',
        'Nothing useful',
      ],
      answer: 2,
    },
  },

  revise: {
    icon: RotateCcw,
    title: 'Revise',
    description: 'Quickly refresh the most important information.',
    sections: [
      {
        title: 'Quick recall',
        text: 'Try recalling definitions, processes and formulas before looking at your notes.',
      },
      {
        title: 'Focus on weak points',
        text: 'Spend more revision time on information that you previously forgot or answered incorrectly.',
      },
      {
        title: 'Final check',
        text: 'Finish by explaining the complete concept in your own words without using your notes.',
      },
    ],
    quiz: {
      question: 'What should revision focus on most?',
      options: [
        'Only information you already know',
        'Weak and frequently forgotten concepts',
        'Reading everything from the beginning',
        'Skipping difficult concepts',
      ],
      answer: 1,
    },
  },
}

export default function LearningFeaturePage() {
  const { feature } = useParams()
  const [searchParams] = useSearchParams()

  const topic = searchParams.get('topic') || 'Your Topic'

  const action = LEARNING_ACTIONS.find(
    (item) => item.id === feature
  )

  const data =
    lessons[feature] || lessons.learn

  const Icon = data.icon

  const [started, setStarted] = useState(false)
  const [section, setSection] = useState(0)
  const [completed, setCompleted] = useState(false)

  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizFinished, setQuizFinished] = useState(false)

  const currentSection = data.sections[section]
  const totalSections = data.sections.length

  const progress = Math.round(
    ((section + (completed ? 1 : 0)) / totalSections) * 100
  )

  const startLearning = () => {
    setStarted(true)

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 100)
  }

  const nextSection = () => {
    if (section < totalSections - 1) {
      setSection(section + 1)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      setCompleted(true)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const previousSection = () => {
    if (section > 0) {
      setSection(section - 1)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const submitQuiz = () => {
    if (selectedAnswer === null) return
    setQuizFinished(true)
  }

  const restart = () => {
    setStarted(false)
    setSection(0)
    setCompleted(false)
    setSelectedAnswer(null)
    setQuizFinished(false)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

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

      {/* Header */}
      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-card">

        <div className="flex items-start gap-4">
          <div className="h-14 w-14 shrink-0 rounded-2xl bg-accent-50 flex items-center justify-center">
            <Icon className="h-7 w-7 text-accent-600" />
          </div>

          <div className="flex-1">
            <p className="text-sm text-ink-faint">
              {action?.label || data.title}
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold">
              {topic}
            </h1>

            <p className="text-ink-soft mt-2">
              {data.description}
            </p>
          </div>
        </div>

        {/* Not started */}
        {!started && !completed && (
          <div className="mt-8">

            <div className="rounded-2xl bg-accent-50/60 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="h-5 w-5 text-accent-600" />

                <h2 className="font-semibold">
                  Ready to start?
                </h2>
              </div>

              <p className="text-sm text-ink-soft">
                This lesson contains {totalSections} short
                learning sections followed by a quick quiz.
              </p>
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

        {/* Lesson */}
        {started && !completed && (
          <div className="mt-8">

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-ink-soft">
                  Lesson progress
                </span>

                <span className="font-medium">
                  {section + 1}/{totalSections}
                </span>
              </div>

              <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                <div
                  className="h-full bg-accent-600 transition-all duration-300"
                  style={{
                    width: `${((section + 1) / totalSections) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Section */}
            <div className="rounded-2xl border border-black/5 p-6">

              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-full bg-accent-50 flex items-center justify-center">
                  <span className="font-semibold text-accent-700">
                    {section + 1}
                  </span>
                </div>

                <h2 className="text-xl font-semibold">
                  {currentSection.title}
                </h2>
              </div>

              <p className="text-base leading-7 text-ink-soft">
                {currentSection.text}
              </p>

            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">

              <button
                onClick={previousSection}
                disabled={section === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-5 py-3 font-medium disabled:opacity-40 hover:bg-black/5 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>

              <button
                onClick={nextSection}
                className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-5 py-3 text-white font-medium hover:opacity-90 transition"
              >
                {section === totalSections - 1
                  ? 'Finish Lesson'
                  : 'Next'}

                <ArrowRight className="h-4 w-4" />
              </button>

            </div>

          </div>
        )}

        {/* Completed */}
        {completed && (
          <div className="mt-8">

            {!quizFinished ? (
              <>
                <div className="rounded-2xl bg-accent-50/60 p-6 text-center">

                  <div className="mx-auto h-16 w-16 rounded-full bg-accent-100 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-accent-600" />
                  </div>

                  <h2 className="text-2xl font-semibold mt-4">
                    Lesson Complete 🎉
                  </h2>

                  <p className="text-ink-soft mt-2">
                    Great job! Now test what you learned.
                  </p>

                </div>

                {/* Quiz */}
                <div className="mt-8">

                  <h2 className="text-xl font-semibold">
                    Quick Quiz
                  </h2>

                  <p className="text-ink-soft mt-2 mb-6">
                    {data.quiz.question}
                  </p>

                  <div className="space-y-3">
                    {data.quiz.options.map((option, index) => {

                      const selected =
                        selectedAnswer === index

                      return (
                        <button
                          key={option}
                          onClick={() =>
                            setSelectedAnswer(index)
                          }
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
                              <Circle className="h-5 w-5 text-ink-faint" />
                            )}

                            <span>
                              {option}
                            </span>

                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={submitQuiz}
                    disabled={selectedAnswer === null}
                    className="mt-6 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium disabled:opacity-40 hover:opacity-90 transition"
                  >
                    Submit Answer
                  </button>

                </div>
              </>
            ) : (
              <div className="text-center">

                <div className="mx-auto h-20 w-20 rounded-full bg-accent-50 flex items-center justify-center">
                  <Trophy className="h-10 w-10 text-accent-600" />
                </div>

                <h2 className="text-2xl font-semibold mt-5">
                  {selectedAnswer === data.quiz.answer
                    ? 'Correct! 🎉'
                    : 'Good attempt! 💪'}
                </h2>

                <p className="text-ink-soft mt-2">
                  {selectedAnswer === data.quiz.answer
                    ? 'You understood the concept correctly.'
                    : `The correct answer was: ${data.quiz.options[data.quiz.answer]}`}
                </p>

                <div className="flex justify-center gap-3 mt-7">

                  <button
                    onClick={restart}
                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-5 py-3 font-medium hover:bg-black/5 transition"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Study Again
                  </button>

                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-5 py-3 text-white font-medium hover:opacity-90 transition"
                  >
                    Dashboard
                  </Link>

                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  )
      }
