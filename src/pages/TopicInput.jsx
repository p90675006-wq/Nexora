import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Plus,
  List,
  Trash2,
} from 'lucide-react'

import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'

import {
  EXAMS,
  SUBJECTS_BY_EXAM,
  DIFFICULTY_LEVELS,
} from '../data/examOptions.js'

function readTopics() {
  try {
    return JSON.parse(
      localStorage.getItem('studymate_topics') || '[]'
    )
  } catch {
    return []
  }
}

export default function TopicInput() {
  const navigate = useNavigate()

  const [topic, setTopic] = useState('')
  const [exam, setExam] = useState('neet')
  const [subject, setSubject] = useState('Biology')
  const [difficulty, setDifficulty] = useState('medium')
  const [topics, setTopics] = useState(readTopics)

  const subjects = SUBJECTS_BY_EXAM[exam] || []

  const handleExamChange = (value) => {
    setExam(value)

    const nextSubjects = SUBJECTS_BY_EXAM[value] || []
    setSubject(nextSubjects[0] || '')
  }

  const addTopic = () => {
    const cleanTopic = topic.trim()

    if (!cleanTopic) return

    const topicData = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: cleanTopic,
      exam,
      subject,
      difficulty,
      progress: 0,
      createdAt: new Date().toISOString(),
    }

    const existing = readTopics()

    const updated = [
      topicData,
      ...existing.filter(
        (item) =>
          !(
            item.name.toLowerCase() ===
              cleanTopic.toLowerCase() &&
            item.exam === exam &&
            item.subject === subject
          )
      ),
    ]

    localStorage.setItem(
      'studymate_topics',
      JSON.stringify(updated)
    )

    // Keep compatibility with existing app
    localStorage.setItem(
      'nexora_current_topic',
      JSON.stringify(topicData)
    )

    setTopics(updated)
    setTopic('')

    navigate(
      `/learn?${new URLSearchParams({
        topic: cleanTopic,
        exam,
        subject,
        difficulty,
      }).toString()}`
    )
  }

  const removeTopic = (id) => {
    const updated = topics.filter(
      (item) => item.id !== id
    )

    localStorage.setItem(
      'studymate_topics',
      JSON.stringify(updated)
    )

    setTopics(updated)
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-up">

      <div className="mb-8">
        <p className="text-sm text-ink-faint">
          StudyMate
        </p>

        <h1 className="text-3xl sm:text-4xl font-semibold mt-1">
          What do you want to learn?
        </h1>

        <p className="mt-2 text-ink-soft">
          Add a topic and let Nexora AI build your learning path.
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
                  addTopic()
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
              const selected =
                difficulty === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setDifficulty(item.id)
                  }
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

        {/* Add */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={addTopic}
            disabled={!topic.trim()}
            className="w-full sm:w-auto"
          >
            <Sparkles className="h-4 w-4" />
            Add & Start Learning
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

      </Card>

      {/* Existing topics */}
      {topics.length > 0 && (
        <Card className="mt-6 p-6">

          <div className="flex items-center gap-2 mb-5">
            <List className="h-5 w-5 text-primary-700" />

            <div>
              <h2 className="font-semibold">
                Your Topics
              </h2>

              <p className="text-xs text-ink-faint">
                {topics.length} topic
                {topics.length !== 1 ? 's' : ''} added
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {topics.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-black/5 bg-paper p-4"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-primary-50 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-700" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">
                    {item.name}
                  </p>

                  <p className="text-xs text-ink-faint mt-1">
                    {item.exam} · {item.subject} ·{' '}
                    {item.difficulty}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeTopic(item.id)
                  }
                  className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center text-ink-faint hover:text-red-600 hover:bg-red-50 transition"
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-primary-50 border border-primary-100 p-4">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary-700" />

              <p className="text-sm font-medium text-primary-800">
                Want to study another topic?
              </p>
            </div>

            <p className="text-xs text-primary-700/80 mt-1">
              Enter another topic above. Your existing topics will stay saved.
            </p>
          </div>

        </Card>
      )}

      <Card className="mt-6 p-5 bg-primary-50 border-primary-100">
        <p className="text-sm text-ink-soft">
          💡 Each topic gets its own Learn, Watch, Remember,
          Play, PYQs, Analyze and Revise learning loop.
        </p>
      </Card>

    </div>
  )
}
