import { useState } from 'react'
import { RotateCcw, CheckCircle2, Trash2 } from 'lucide-react'

const DEFAULT_TOPICS = [
  'Review your difficult topics',
  'Revise important formulas',
  'Review your PYQ mistakes',
]

export default function Revision() {
  const [topics, setTopics] = useState(() => {
    const saved = localStorage.getItem('nexora_revision')

    return saved
      ? JSON.parse(saved)
      : DEFAULT_TOPICS.map((title, index) => ({
          id: index,
          title,
          done: false,
        }))
  })

  const update = (next) => {
    setTopics(next)
    localStorage.setItem(
      'nexora_revision',
      JSON.stringify(next)
    )
  }

  const toggle = (id) => {
    update(
      topics.map((topic) =>
        topic.id === id
          ? { ...topic, done: !topic.done }
          : topic
      )
    )
  }

  const remove = (id) => {
    update(topics.filter((topic) => topic.id !== id))
  }

  return (
    <div className="max-w-3xl animate-fade-up">
      <div className="mb-8">
        <p className="text-sm text-ink-faint">
          Smart revision
        </p>

        <h1 className="text-3xl font-semibold">
          Revision
        </h1>

        <p className="mt-2 text-ink-soft">
          Keep the concepts you need to revisit in one place.
        </p>
      </div>

      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card"
          >
            <button
              onClick={() => toggle(topic.id)}
              className="shrink-0"
            >
              <CheckCircle2
                className={`h-6 w-6 ${
                  topic.done
                    ? 'text-green-600'
                    : 'text-black/20'
                }`}
              />
            </button>

            <p
              className={`flex-1 ${
                topic.done
                  ? 'text-ink-faint line-through'
                  : ''
              }`}
            >
              {topic.title}
            </p>

            <button
              onClick={() => remove(topic.id)}
              className="text-ink-faint hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {topics.length === 0 && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-card">
          <RotateCcw className="mx-auto h-8 w-8 text-accent-600" />

          <p className="mt-3 font-medium">
            Revision queue is empty.
          </p>

          <p className="mt-1 text-sm text-ink-soft">
            Add weak topics here after studying.
          </p>
        </div>
      )}
    </div>
  )
}
