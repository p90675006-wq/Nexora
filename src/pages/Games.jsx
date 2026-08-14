import { useState } from 'react'
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Heart,
  Star,
  Zap,
  Brain,
} from 'lucide-react'

const GAME_QUESTIONS = [
  {
    q: 'Which phase of the cell cycle involves DNA replication?',
    options: ['G1 phase', 'S phase', 'G2 phase', 'M phase'],
    answer: 1,
  },
  {
    q: 'Which phase comes immediately after S phase?',
    options: ['G1', 'M', 'G2', 'Cytokinesis'],
    answer: 2,
  },
  {
    q: 'During which phase do chromosomes become clearly visible?',
    options: ['Prophase', 'Interphase', 'G1', 'S phase'],
    answer: 0,
  },
  {
    q: 'What is the main purpose of mitosis?',
    options: [
      'Produce identical daughter cells',
      'Reduce chromosome number',
      'Produce gametes',
      'Increase mutation rate',
    ],
    answer: 0,
  },
  {
    q: 'Which structure helps chromosomes move during cell division?',
    options: [
      'Ribosome',
      'Spindle fibres',
      'Golgi body',
      'Lysosome',
    ],
    answer: 1,
  },
  {
    q: 'How many daughter cells are generally produced after mitosis?',
    options: ['1', '2', '3', '4'],
    answer: 1,
  },
  {
    q: 'Which stage follows metaphase?',
    options: ['Prophase', 'Anaphase', 'Telophase', 'G1'],
    answer: 1,
  },
  {
    q: 'During anaphase, sister chromatids:',
    options: [
      'Replicate',
      'Disappear',
      'Move toward opposite poles',
      'Form the nuclear membrane',
    ],
    answer: 2,
  },
  {
    q: 'What happens during cytokinesis?',
    options: [
      'DNA replication',
      'Division of cytoplasm',
      'Chromosome replication',
      'Protein synthesis',
    ],
    answer: 1,
  },
  {
    q: 'The complete sequence of growth and division of a cell is called:',
    options: [
      'Cell cycle',
      'Gene expression',
      'Translation',
      'Transcription',
    ],
    answer: 0,
  },
]

const CANDIES = ['🍬', '🍭', '🧬', '⭐', '🔬', '🧠']

export default function Games() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [finished, setFinished] = useState(false)
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(null)

  const current = GAME_QUESTIONS[index]

  const answer = (optionIndex) => {
    if (selected !== null) return

    const isCorrect = optionIndex === current.answer

    setSelected(optionIndex)
    setCorrect(isCorrect)

    if (isCorrect) {
      setScore((value) => value + 10)
    } else {
      setLives((value) => Math.max(0, value - 1))
    }

    setTimeout(() => {
      const nextIndex = index + 1

      if (nextIndex >= GAME_QUESTIONS.length) {
        setFinished(true)
        localStorage.setItem(
          'studymate_game_score',
          String(
            isCorrect ? score + 10 : score
          )
        )
        return
      }

      setIndex(nextIndex)
      setSelected(null)
      setCorrect(null)
    }, 700)
  }

  const restart = () => {
    setStarted(false)
    setIndex(0)
    setScore(0)
    setLives(3)
    setFinished(false)
    setSelected(null)
    setCorrect(null)
  }

  if (finished) {
    const mastery = Math.round(
      (score / (GAME_QUESTIONS.length * 10)) * 100
    )

    return (
      <div className="min-h-[70vh] animate-fade-up flex items-center justify-center">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-card">

          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-center text-white">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15">
              <Trophy className="h-10 w-10" />
            </div>

            <p className="mt-5 text-sm uppercase tracking-widest text-white/70">
              Challenge Complete
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Great Job! 🎉
            </h1>

            <p className="mt-2 text-white/80">
              You completed the Cell Cycle challenge.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">

            <div className="rounded-2xl bg-black/5 p-5 text-center">
              <Star className="mx-auto h-6 w-6 text-yellow-500" />
              <p className="mt-2 text-2xl font-bold">
                {score}
              </p>
              <p className="text-xs text-ink-faint">
                Score
              </p>
            </div>

            <div className="rounded-2xl bg-black/5 p-5 text-center">
              <Brain className="mx-auto h-6 w-6 text-accent-600" />
              <p className="mt-2 text-2xl font-bold">
                {mastery}%
              </p>
              <p className="text-xs text-ink-faint">
                Mastery
              </p>
            </div>

            <div className="rounded-2xl bg-black/5 p-5 text-center col-span-2 sm:col-span-1">
              <Heart className="mx-auto h-6 w-6 text-red-500" />
              <p className="mt-2 text-2xl font-bold">
                {lives}
              </p>
              <p className="text-xs text-ink-faint">
                Lives left
              </p>
            </div>

          </div>

          <div className="px-6 pb-7">

            <button
              onClick={restart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 font-medium text-white hover:bg-accent-700"
            >
              <RotateCcw className="h-4 w-4" />
              Play Again
            </button>

          </div>

        </div>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="min-h-[70vh] animate-fade-up flex items-center justify-center">

        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-card">

          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white sm:p-10">

            <div className="absolute -right-10 -top-10 text-8xl opacity-20">
              🍬
            </div>

            <div className="absolute -bottom-8 -left-5 text-7xl opacity-20">
              🧬
            </div>

            <div className="relative">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Gamepad2 className="h-8 w-8" />
              </div>

              <p className="mt-6 text-sm uppercase tracking-widest text-white/70">
                StudyMate Game Zone
              </p>

              <h1 className="mt-2 text-4xl font-bold">
                Brain Candy 🍬
              </h1>

              <p className="mt-3 max-w-lg text-white/80">
                Turn revision into a quick game.
                Solve Biology challenges, earn points
                and test how well you remember the concept.
              </p>

            </div>

          </div>

          <div className="p-6 sm:p-8">

            <div className="grid gap-3 sm:grid-cols-3">

              <div className="rounded-2xl bg-black/5 p-4">
                <Star className="h-5 w-5 text-yellow-500" />
                <p className="mt-2 font-semibold">
                  Earn Points
                </p>
                <p className="mt-1 text-xs text-ink-soft">
                  +10 for every correct answer
                </p>
              </div>

              <div className="rounded-2xl bg-black/5 p-4">
                <Heart className="h-5 w-5 text-red-500" />
                <p className="mt-2 font-semibold">
                  3 Lives
                </p>
                <p className="mt-1 text-xs text-ink-soft">
                  Don't lose them all!
                </p>
              </div>

              <div className="rounded-2xl bg-black/5 p-4">
                <Zap className="h-5 w-5 text-accent-600" />
                <p className="mt-2 font-semibold">
                  Quick Challenge
                </p>
                <p className="mt-1 text-xs text-ink-soft">
                  10 concept questions
                </p>
              </div>

            </div>

            <button
              onClick={() => setStarted(true)}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-4 text-lg font-semibold text-white hover:bg-accent-700"
            >
              <Gamepad2 className="h-5 w-5" />
              Start Brain Candy
            </button>

          </div>

        </div>

      </div>
    )
  }

  const progress =
    ((index + 1) / GAME_QUESTIONS.length) * 100

  return (
    <div className="min-h-[70vh] animate-fade-up">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <p className="text-xs uppercase tracking-widest text-ink-faint">
            Brain Candy
          </p>

          <h1 className="text-xl font-bold">
            Cell Cycle Challenge 🧬
          </h1>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
          <Heart className="h-4 w-4 fill-current" />
          {lives}
        </div>

      </div>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-accent-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">

        <div className="rounded-2xl bg-white p-4 text-center shadow-card">
          <p className="text-xs text-ink-faint">
            Question
          </p>
          <p className="mt-1 font-bold">
            {index + 1}/{GAME_QUESTIONS.length}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 text-center shadow-card">
          <p className="text-xs text-ink-faint">
            Score
          </p>
          <p className="mt-1 font-bold">
            {score}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 text-center shadow-card">
          <p className="text-xs text-ink-faint">
            Topic
          </p>
          <p className="mt-1 font-bold">
            Biology
          </p>
        </div>

      </div>

      <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5 shadow-card sm:p-7">

        <div className="absolute right-5 top-4 text-4xl opacity-30">
          🍬
        </div>

        <div className="absolute bottom-3 right-16 text-2xl opacity-20">
          ⭐
        </div>

        <div className="grid grid-cols-6 gap-2 sm:gap-3">

          {Array.from({ length: 18 }).map((_, i) => (

            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-xl bg-white/10 text-xl backdrop-blur sm:text-2xl"
            >
              {CANDIES[i % CANDIES.length]}
            </div>

          ))}

        </div>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">

        <p className="text-sm font-medium text-accent-600">
          Challenge {index + 1}
        </p>

        <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
          {current.q}
        </h2>

        <div className="mt-6 grid gap-3">

          {current.options.map((option, optionIndex) => {

            const isSelected =
              selected === optionIndex

            const isAnswer =
              optionIndex === current.answer

            let buttonClass =
              'border-black/10 bg-white hover:bg-black/5'

            if (selected !== null) {
              if (isAnswer) {
                buttonClass =
                  'border-green-400 bg-green-50 text-green-700'
              } else if (isSelected) {
                buttonClass =
                  'border-red-400 bg-red-50 text-red-700'
              }
            }

            return (
              <button
                key={option}
                disabled={selected !== null}
                onClick={() => answer(optionIndex)}
                className={`rounded-2xl border p-4 text-left font-medium transition-all ${buttonClass}`}
              >

                <div className="flex items-center gap-3">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/5 text-sm">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>

                  <span>
                    {option}
                  </span>

                </div>

              </button>
            )
          })}

        </div>

        {selected !== null && (
          <div
            className={`mt-5 rounded-2xl p-4 text-center font-semibold ${
              correct
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {correct
              ? '🍬 Correct! +10 points!'
              : `💡 Correct answer: ${
                  current.options[current.answer]
                }`}
          </div>
        )}

      </div>

    </div>
  )
}
