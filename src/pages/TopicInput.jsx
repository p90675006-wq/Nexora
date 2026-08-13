import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'

import {
  EXAMS,
  DIFFICULTY_LEVELS,
  SUBJECTS_BY_EXAM,
} from '../data/examOptions.js'

import { useOnboarding } from '../context/OnboardingContext.jsx'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-soft mb-1.5">
        {label}
      </span>

      {children}
    </label>
  )
}

const inputClasses =
  'w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink ' +
  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors'

export default function TopicInput() {
  const navigate = useNavigate()

  const { exam: onboardedExam } = useOnboarding()

  const [topicName, setTopicName] = useState('')
  const [exam, setExam] = useState(onboardedExam || '')
  const [subject, setSubject] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [error, setError] = useState('')

  const subjectOptions = SUBJECTS_BY_EXAM[exam] || []

  const canSubmit =
    topicName.trim().length > 0 &&
    exam &&
    subject

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!canSubmit) {
      setError('Please complete all fields before continuing.')
      return
    }

    setError('')

    const topic = {
      id: `${Date.now()}`,
      name: topicName.trim(),
      exam,
      subject,
      difficulty,
      createdAt: new Date().toISOString(),
      progress: 0,
    }

    // Save current topic
    localStorage.setItem(
      'nexora_current_topic',
      JSON.stringify(topic)
    )

    // Add to topic history
    const existingTopics = JSON.parse(
      localStorage.getItem('nexora_topics') || '[]'
    )

    const updatedTopics = [
      topic,
      ...existingTopics.filter(
        (item) => item.name.toLowerCase() !== topic.name.toLowerCase()
      ),
    ]

    localStorage.setItem(
      'nexora_topics',
      JSON.stringify(updatedTopics)
    )

    const params = new URLSearchParams({
      topic: topic.name,
      exam: topic.exam,
      subject: topic.subject,
      difficulty: topic.difficulty,
    })

    navigate(`/learn?${params.toString()}`)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">

      {/* Header */}
      <div className="text-center mb-8">

        <span className="inline-flex h-11 w-11 rounded-2xl bg-primary-50 items-center justify-center mb-4">
          <Sparkles
            className="h-5 w-5 text-primary-700"
            strokeWidth={1.8}
          />
        </span>

        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-balance">
          What do you want to learn today?
        </h1>

        <p className="text-ink-soft">
          Give us a topic and we&apos;ll set up your learning hub.
        </p>
      </div>

      {/* Form */}
      <Card className="p-6 sm:p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Topic */}
          <Field label="Topic name">

            <input
              type="text"
              value={topicName}
              onChange={(e) => {
                setTopicName(e.target.value)
                setError('')
              }}
              placeholder="e.g. Photosynthesis"
              className={inputClasses}
              required
            />

          </Field>

          {/* Exam + Subject */}
          <div className="grid sm:grid-cols-2 gap-5">

            <Field label="Exam">

              <select
                value={exam}
                onChange={(e) => {
                  setExam(e.target.value)
                  setSubject('')
                  setError('')
                }}
                className={inputClasses}
                required
              >

                <option value="" disabled>
                  Select exam
                </option>

                {EXAMS.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.label}
                  </option>
                ))}

              </select>

            </Field>

            <Field label="Subject">

              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value)
                  setError('')
                }}
                className={inputClasses}
                disabled={!exam}
                required
              >

                <option value="" disabled>
                  {exam
                    ? 'Select subject'
                    : 'Select exam first'}
                </option>

                {subjectOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </Field>

          </div>

          {/* Difficulty */}
          <Field label="Difficulty level">

            <div className="flex gap-2">

              {DIFFICULTY_LEVELS.map((d) => (

                <button
                  type="button"
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  className={[
                    'flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors',
                    difficulty === d.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-border text-ink-soft hover:border-primary-300',
                  ].join(' ')}
                >
                  {d.label}
                </button>

              ))}

            </div>

          </Field>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!canSubmit}
          >
            <Sparkles className="h-4 w-4" />
            Start Learning
          </Button>

        </form>

      </Card>
    </div>
  )
      }
