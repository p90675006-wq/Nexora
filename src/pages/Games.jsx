import { useState } from 'react'
import { Gamepad2, Trophy, RotateCcw } from 'lucide-react'

const GAME_QUESTIONS = [
  {
    q: 'What does active recall improve?',
    options: [
      'Memory retrieval',
      'Screen brightness',
      'Typing speed',
      'Internet speed',
    ],
    answer: 0,
  },
  {
    q: 'Which method uses spaced study sessions?',
    options: [
      'Spaced repetition',
      'Random guessing',
      'Passive reading',
      'Skipping revision',
    ],
    answer: 0,
  },
  {
    q: 'What should you do with a difficult concept?',
    options: [
      'Avoid it',
      'Break it into smaller ideas',
      'Ignore it',
      'Memorise without understanding',
    ],
    answer: 1,
  },
]

export default function Games() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = GAME_QUESTIONS[index]

  const answer = (option) => {
    const newScore =
      score + (option === current.answer ? 1 : 0)

    if (index === GAME_QUESTIONS.length - 1) {
      setScore(newScore)
      setFinished(true)
      localStorage.setItem(
        'nexora_game_score',
        String(newScore)
      )
      return
    }

    setScore(newScore)
    setIndex((value) => value + 1)
  }

  const restart = () => {
    setStarted(false)
    setIndex(0)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="max-w-2xl animate-fade-up">
        <div className="rounded-2xl bg-white p-8 text-center shadow-card">
          <Trophy className="mx-auto h-12 w-12 text-accent-600" />

          <h1 className="mt-4 text-3xl font-semibold">
            Game Complete 🎮
          </h1>

          <p className="mt-2 text-ink-soft">
            Your score: {score}/{GAME_QUESTIONS.length}
          </p>

          <button
            onClick={restart}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Play Again
          </button>
        </div>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="max-w-2xl animate-fade-up">
        <div className="rounded-2xl bg-white p-8 shadow-card">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50">
            <Gamepad2 className="h-7 w-7 text-accent-600" />
          </div>

          <h1 className="mt-5 text-3xl font-semibold">
            Learning Games
          </h1>

          <p className="mt-2 text-ink-soft">
            Turn revision into a quick challenge.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="mt-7 rounded-xl bg-accent-600 px-6 py-3 font-medium text-white"
          >
            Start Game
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl animate-fade-up">
      <div className="mb-5 flex justify-between text-sm">
        <span>
          Question {index + 1}/{GAME_QUESTIONS.length}
        </span>

        <span className="font-medium">
          Score: {score}
        </span>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-xl font-semibold">
          {current.q}
        </h2>

        <div className="mt-6 space-y-3">
          {current.options.map((option, optionIndex) => (
            <button
              key={option}
              onClick={() => answer(optionIndex)}
              className="w-full rounded-xl border border-black/10 p-4 text-left hover:bg-black/5"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
