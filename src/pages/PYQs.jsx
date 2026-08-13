import { useState } from 'react'
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
} from 'lucide-react'

const QUESTIONS = [
  {
    q: 'Which approach is most effective for learning a new topic?',
    options: [
      'Memorising everything immediately',
      'Understanding the concept and practising it',
      'Reading only the summary',
      'Skipping examples',
    ],
    answer: 1,
    explanation:
      'Understanding the concept and applying it through practice creates stronger learning.',
  },
  {
    q: 'What should you do after making a mistake in a question?',
    options: [
      'Ignore it',
      'Memorise the answer',
      'Find and understand the reason for the mistake',
      'Skip the topic',
    ],
    answer: 2,
    explanation:
      'Analysing mistakes helps identify weak concepts and prevents repeated errors.',
  },
  {
    q: 'Why are previous-year questions useful?',
    options: [
      'They guarantee the exact exam questions',
      'They show important concepts and question patterns',
      'They replace the syllabus',
      'They remove the need for revision',
    ],
    answer: 1,
    explanation:
      'PYQs help students understand how concepts are commonly tested.',
  },
  {
    q: 'Which is an example of active recall?',
    options: [
      'Reading notes repeatedly',
      'Highlighting every line',
      'Trying to answer without looking at notes',
      'Watching the same lecture again',
    ],
    answer: 2,
    explanation:
      'Active recall means retrieving information from memory instead of simply rereading it.',
  },
  {
    q: 'What is the best use of revision time?',
    options: [
      'Only reading familiar topics',
      'Focusing on weak concepts and mistakes',
      'Avoiding difficult questions',
      'Studying without testing yourself',
    ],
    answer: 1,
    explanation:
      'Targeting weak areas makes revision more effective.',
  },
]

export default function PYQs() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = QUESTIONS[index]

  const submit = () => {
    if (selected === null) return

    setChecked(true)

    if (selected === current.answer) {
      setScore((value) => value + 1)
    }
  }

  const next = () => {
    if (index === QUESTIONS.length - 1) {
      setFinished(true)
      localStorage.setItem(
        'nexora_last_pyq_score',
        String(score + (selected === current.answer ? 1 : 0))
      )
      return
    }

    setIndex((value) => value + 1)
    setSelected(null)
    setChecked(false)
  }

  const restart = () => {
    setIndex(0)
    setSelected(null)
    setChecked(false)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const percentage = Math.round(
      (score / QUESTIONS.length) * 100
    )

    return (
      <div className="max-w-3xl animate-fade-up">
        <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-card">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-50">
            <Trophy className="h-8 w-8 text-accent-600" />
          </div>

          <h1 className="mt-5 text-3xl font-semibold">
            Practice Complete 🎉
          </h1>

          <p className="mt-2 text-ink-soft">
            You scored {score} / {QUESTIONS.length}
          </p>

          <div className="mt-7 rounded-2xl bg-accent-50 p-6">
            <p className="text-sm text-ink-soft">
              Accuracy
            </p>

            <p className="mt-1 text-4xl font-bold">
              {percentage}%
            </p>
          </div>

          <button
            onClick={restart}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 font-medium text-white"
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
      <div className="mb-7">
        <p className="text-sm text-ink-faint">
          Practice
        </p>

        <h1 className="text-3xl font-semibold">
          Previous Year Questions
        </h1>

        <p className="mt-2 text-ink-soft">
          Practice questions and learn from every mistake.
        </p>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-ink-soft">
            Question {index + 1} of {QUESTIONS.length}
          </span>

          <span className="font-medium">
            Score: {score}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-black/5">
          <div
            className="h-full bg-accent-600 transition-all"
            style={{
              width: `${((index + 1) / QUESTIONS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-xl font-semibold leading-7">
          {current.q}
        </h2>

        <div className="mt-7 space-y-3">
          {current.options.map((option, optionIndex) => {
            const isCorrect = optionIndex === current.answer
            const isSelected = optionIndex === selected

            let style =
              'border-black/10 hover:bg-black/5'

            if (checked && isCorrect) {
              style = 'border-green-500 bg-green-50'
            } else if (
              checked &&
              isSelected &&
              !isCorrect
            ) {
              style = 'border-red-500 bg-red-50'
            } else if (isSelected) {
              style = 'border-accent-500 bg-accent-50'
            }

            return (
              <button
                key={option}
                disabled={checked}
                onClick={() => setSelected(optionIndex)}
                className={`w-full rounded-xl border p-4 text-left transition ${style}`}
              >
                <div className="flex items-center gap-3">
                  {checked && isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                  ) : checked &&
                    isSelected &&
                    !isCorrect ? (
                    <XCircle className="h-5 w-5 shrink-0 text-red-600" />
                  ) : (
                    <div className="h-5 w-5 shrink-0 rounded-full border border-black/20" />
                  )}

                  <span>{option}</span>
                </div>
              </button>
            )
          })}
        </div>

        {checked && (
          <div className="mt-6 rounded-xl bg-accent-50 p-5">
            <p className="font-semibold">
              Explanation
            </p>

            <p className="mt-2 text-sm leading-6 text-ink-soft">
              {current.explanation}
            </p>
          </div>
        )}

        <div className="mt-7">
          {!checked ? (
            <button
              onClick={submit}
              disabled={selected === null}
              className="rounded-xl bg-accent-600 px-6 py-3 font-medium text-white disabled:opacity-40"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={next}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 font-medium text-white"
            >
              {index === QUESTIONS.length - 1
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
