import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Brain,
  Target,
  Zap,
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

    if (!cleanTopic) return

    const topicData = {
      id: Date.now().toString(),
      name: cleanTopic,
      exam,
      subject,
      difficulty,
      progress: 0,
      createdAt: new Date().toISOString(),
    }

    /* Current topic */
    localStorage.setItem(
      'nexora_current_topic',
      JSON.stringify(topicData)
    )

    /* Keep topic history */
    const existing = JSON.parse(
      localStorage.getItem('nexora_topics') || '[]'
    )

    const updated = [
      topicData,
      ...existing.filter(
        (item) => item.name.toLowerCase() !== cleanTopic.toLowerCase()
      ),
    ].slice(0, 20)

    localStorage.setItem(
      'nexora_topics',
      JSON.stringify(updated)
    )

    localStorage.setItem(
      'nexora_last_activity',
      JSON.stringify({
        topic: cleanTopic,
        action: 'Started learning',
        time: new Date().toISOString(),
      })
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
    <div className="max-w-5xl mx-auto animate-fade-up">

      {/* Header */}
      <div className="mb-8">
        <div className="ai-badge mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Nexora AI Learning Engine
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
          What are you studying today?
        </h1>

        <p className="mt-3 text-ink-soft max-w-2xl">
          Pick any topic and Nexora will turn it into an
          AI-powered learning path with explanations, quizzes,
          revision and more.
        </p>
      </div>

      {/* Main card */}
      <Card className="p-6 sm:p-8 lg:p-10 shadow-premium">

        {/* Topic input */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Topic
          </label>

          <div className="relative">
            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-600" />

            <input
              autoFocus
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  startLearning()
                }
              }}
              placeholder="e.g. Human Respiration"
              className="w-full rounded-2xl border border-black/10 bg-white pl-12 pr-4 py-4 text-base outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
            />
          </div>
        </div>

        {/* Selects */}
        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Exam
            </label>

            <select
              value={exam}
              onChange={(e) => handleExamChange(e.target.value)}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
            >
              {EXAMS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Subject
            </label>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
            >
              {subjects.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Difficulty */}
        <div className="mt-7">
          <label className="block text-sm font-semibold mb-3">
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
                  className={[
                    'rounded-2xl border px-3 py-4 text-sm font-semibold transition-all',
                    selected
                      ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                      : 'border-black/10 bg-white text-ink-soft hover:border-primary-200 hover:bg-primary-50/40',
                  ].join(' ')}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Button
            type="button"
            onClick={startLearning}
            disabled={!topic.trim()}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Sparkles className="h-4 w-4" />
            Build My Learning Path
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Feature strip */}
      <div className="grid sm:grid-cols-3 gap-4 mt-5">

        <Card className="p-5">
          <Brain className="h-5 w-5 text-primary-600 mb-3" />
          <p className="font-semibold text-sm">AI Explanation</p>
          <p className="text-xs text-ink-faint mt-1">
            Understand concepts clearly.
          </p>
        </Card>

        <Card className="p-5">
          <Target className="h-5 w-5 text-primary-600 mb-3" />
          <p className="font-semibold text-sm">Exam Focused</p>
          <p className="text-xs text-ink-faint mt-1">
            Learn what actually matters.
          </p>
        </Card>

        <Card className="p-5">
          <Zap className="h-5 w-5 text-accent-600 mb-3" />
          <p className="font-semibold text-sm">7-Step Learning Loop</p>
          <p className="text-xs text-ink-faint mt-1">
            Learn → Practice → Revise.
          </p>
        </Card>

      </div>

      {/* Add another topic */}
      <div className="text-center mt-7">
        <p className="text-xs text-ink-faint">
          You can create multiple topics and switch between them anytime.
        </p>
      </div>

    </div>
  )
}
