import { useState } from 'react'
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react'

const questions = [
  {
    question: 'Which of the following is the best way to prepare for an exam?',
    options: [
      'Only read the textbook once',
      'Understand concepts and practise questions',
      'Memorise every sentence',
      'Study only the night before',
    ],
    answer: 1,
    explanation:
      'Understanding concepts and practising questions helps you apply what you have learned and identify weak areas.',
  },
  {
    question: 'What should you do after getting a practice question wrong?',
    options: [
      'Ignore the question',
      'Memorise the answer only',
      'Understand the mistake and revise the concept',
      'Skip the entire topic',
    ],
    answer: 2,
    explanation:
      'Analysing mistakes helps you understand the underlying concept and prevents the same error from happening again.',
  },
  {
    question: 'Why are previous-year questions useful?',
    options: [
      'They guarantee the exact questions in the exam',
      'They help you understand question patterns and important concepts',
      'They eliminate the need for revision',
      'They are useful only after the exam',
    ],
    answer: 1,
    explanation:
      'PYQs help you understand the type of questions asked and the concepts that are commonly tested.',
  },
  {
    question: 'Which approach is most useful during revision?',
    options: [
      'Read everything repeatedly',
      'Focus mainly on weak concepts and mistakes',
      'Avoid difficult topics',
      'Study without testing yourself',
    ],
    answer: 1,
    explanation:
      'Targeting weak concepts makes revision more efficient and improves your overall performance.',
  },
  {
    question: 'What is active recall?',
    options: [
      'Reading the same page repeatedly',
      'Trying to remember information without looking at the notes',
      'Highlighting every sentence',
      'Watching a video without taking a break',
    ],
    answer: 1,
    explanation:
      'Active recall means retrieving information from memory instead of simply rereading it.',
  },
]

export default function PYQs() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[current]

  const submitAnswer = () => {
    if (selected === null) return

    setSubmitted(true)

    if (selected === question.answer) {
      setScore((prev) => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1)
      setSelected(null)
      setSubmitted(false)
    } else {
      setFinished(true)
    }
  }

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setSubmitted(false)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    )

    return (
      <div className="max-w-3xl animate-fade-up">

        <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-card text-center">

          <div className="mx-auto h-16 w-16 rounded-full bg-accent-50 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-accent-600" />
          </div>

          <h1 className="text-3xl font-semibold mt-5">
            Practice Complete 🎉
          </h1>

          <p className="text-ink-soft mt-2">
            You scored {score} out of {questions.length}.
          </p>

          <div className="mt-7 rounded-2xl bg-accent-50/60 p-6">
            <p className="text-sm text-ink-soft">
              Your accuracy
            </p>

            <p className="text-4xl font-bold mt-1">
              {percentage}%
            </p>
          </div>

          <button
            onClick={restart}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium"
          >
            <RotateCcw className="h-4 w-4" />
            Practice Again
          </button>

        </div>

      </div>
    )
  }

  return (
    <div className="max-w-3xl animate-fade-up">

      <div className="mb-6">
        <p className="text-sm text-ink-faint">
          Practice
        </p>

        <h1 className="text-3xl font-semibold">
          Previous Year Questions
        </h1>

        <p className="text-ink-soft mt-2">
          Test your understanding and learn from your mistakes.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">

        <div className="flex justify-between text-sm mb-2">
          <span className="text-ink-soft">
            Question {current + 1} of {questions.length}
          </span>

          <span className="font-medium">
            Score: {score}
          </span>
        </div>

        <div className="h-2 rounded-full bg-black/5 overflow-hidden">
          <div
            className="h-full bg-accent-600 transition-all"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

      </div>

      {/* Question */}
      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-card">

        <h2 className="text-xl font-semibold leading-7">
          {question.question}
        </h2>

        <div className="space-y-3 mt-7">

          {question.options.map((option, index) => {

            const isSelected = selected === index
            const isCorrect = index === question.answer

            let classes =
              'border-black/10 hover:bg-black/5'

            if (submitted && isCorrect) {
              classes =
                'border-green-500 bg-green-50'
            } else if (
              submitted &&
              isSelected &&
              !isCorrect
            ) {
              classes =
                'border-red-500 bg-red-50'
            } else if (isSelected) {
              classes =
                'border-accent-500 bg-accent-50'
            }

            return (
              <button
                key={option}
                disabled={submitted}
                onClick={() => setSelected(index)}
                className={`w-full text-left rounded-xl border p-4 transition ${classes}`}
              >
                <div className="flex items-center gap-3">

                  {submitted && isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  ) : submitted &&
                    isSelected &&
                    !isCorrect ? (
                    <XCircle className="h-5 w-5 text-red-600 shrink-0" />
                  ) : (
                    <div
                      className={`h-5 w-5 rounded-full border ${
                        isSelected
                          ? 'border-accent-600'
                          : 'border-black/20'
                      }`}
                    />
                  )}

                  <span>{option}</span>

                </div>
              </button>
            )
          })}

        </div>

        {/* Explanation */}
        {submitted && (
          <div className="mt-6 rounded-xl bg-accent-50/60 p-5">

            <p className="font-semibold">
              Explanation
            </p>

            <p className="text-sm text-ink-soft mt-2 leading-6">
              {question.explanation}
            </p>

          </div>
        )}

        {/* Buttons */}
        <div className="mt-7">

          {!submitted ? (
            <button
              onClick={submitAnswer}
              disabled={selected === null}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium disabled:opacity-40"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium"
            >
              {current === questions.length - 1
                ? 'See Result'
                : 'Next Question'}

              <ArrowRight className="h-4 w-4" />
            </button>
          )}

        </div>

      </div>

    </div>
  )
              }
