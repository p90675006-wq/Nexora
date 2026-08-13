import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'

import {
  EXAMS,
  SUBJECTS_BY_EXAM,
  DIFFICULTY_LEVELS,
} from '../data/examOptions.js'

export default function TopicInput() {
  const navigate = useNavigate()

  const [topic, setTopic] = useState('')
  const [exam, setExam] = useState('neet')
  const [subject, setSubject] = useState('Biology')
  const [difficulty, setDifficulty] = useState('medium')

  const subjects = SUBJECTS_BY_EXAM[exam] || []

  const handleExamChange = (value) => {
    setExam(value)

    const nextSubjects = SUBJECTS_BY_EXAM[value] || []

    setSubject(nextSubjects[0] || '')
  }

  const startLearning = () => {
    const cleanTopic = topic.trim()

    if (!cleanTopic) {
      return
    }

    const topicData = {
      name: cleanTopic,
      exam,
      subject,
      difficulty,
      progress: 0,
    }

    localStorage.setItem(
      'nexora_current_topic',
      JSON.stringify(topicData)
    )

    const params = new URLSearchParams({
      topic: cleanTopic,
      exam,
      subject,
      difficulty,
    })

    navigate(`/learn?${params.toString()}`)
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-up">

      {/* Header */}
      <div className="mb-8">

        <p className="text-sm text-ink-faint">
          Start learning
        </p>

        <h1 className="text-3xl sm:text-4xl font-semibold mt-1">
          What do you want to learn?
        </h1>

        <p className="mt-2 text-ink-soft">
          Enter a topic and Nexora will build your learning path.
        </p>

      </div>

      <Card className="p-6 sm:p-8">

        {/* Topic */}
        <div>

          <label className="block text-sm font-medium mb-2">
            Topic
          </label>

          <div className="relative">

            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-faint" />

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  startLearning()
                }
              }}
              placeholder="e.g. Human Respiration"
              className="w-full rounded-xl border border-black/10 bg-white pl-12 pr-4 py-3.5 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            />

          </div>

        </div>

        {/* Exam */}
        <div className="mt-6">

          <label className="block text-sm font-medium mb-2">
            Exam
          </label>

          <select
            value={exam}
            onChange={(e) => handleExamChange(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 outline-none focus:border-accent-500"
          >

            {EXAMS.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.label}
              </option>
            ))}

          </select>

        </div>

        {/* Subject */}
        <div className="mt-6">

          <label className="block text-sm font-medium mb-2">
            Subject
          </label>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 outline-none focus:border-accent-500"
          >

            {subjects.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>

        {/* Difficulty */}
        <div className="mt-6">

          <label className="block text-sm font-medium mb-2">
            Difficulty
          </label>

          <div className="grid grid-cols-3 gap-3">

            {DIFFICULTY_LEVELS.map((item) => {

              const selected = difficulty === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDifficulty(item.id)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    selected
                      ? 'border-accent-500 bg-accent-50 text-accent-700'
                      : 'border-black/10 hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}

          </div>

        </div>

        {/* Start */}
        <div className="mt-8">

          <Button
            type="button"
            onClick={startLearning}
            disabled={!topic.trim()}
            className="w-full sm:w-auto"
          >
            <Sparkles className="h-4 w-4" />
            Start Learning
            <ArrowRight className="h-4 w-4" />
          </Button>

        </div>

      </Card>

      {/* Info */}
      <Card className="mt-6 p-5 bg-primary-50 border-primary-100">

        <p className="text-sm text-ink-soft">
          💡 After starting, you'll get access to Learn, Watch,
          Remember, Play, PYQs, Analyze and Revise.
        </p>

      </Card>

    </div>
  )
}
