import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Flame,
  RotateCcw,
  BookOpen,
  Sparkles,
  BarChart3,
  CheckCircle2,
} from 'lucide-react'

import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'
import ProgressRing from '../components/common/ProgressRing.jsx'

import { useOnboarding } from '../context/OnboardingContext.jsx'
import { EXAMS } from '../data/examOptions.js'

const FEATURES = [
  'learn',
  'watch',
  'remember',
  'play',
  'pyqs',
  'analyze',
  'revise',
]

export default function Dashboard() {
  const { exam, level, subjects, loading } = useOnboarding()

  const [progress, setProgress] = useState(0)
  const [topicsDone, setTopicsDone] = useState(0)
  const [currentTopic, setCurrentTopic] = useState(null)
  const [lastActivity, setLastActivity] = useState(null)

  const examLabel =
    EXAMS.find((item) => item.id === exam)?.label || 'your exam'

  const subjectList = Array.isArray(subjects) ? subjects : []

  useEffect(() => {
    loadDashboardData()

    const handleStorage = () => {
      loadDashboardData()
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const loadDashboardData = () => {
    try {
      const topic = JSON.parse(
        localStorage.getItem('nexora_current_topic') || 'null'
      )

      const completedFeatures = JSON.parse(
        localStorage.getItem('nexora_completed_features') || '[]'
      )

      const activity = JSON.parse(
        localStorage.getItem('nexora_last_activity') || 'null'
      )

      setCurrentTopic(topic)
      setLastActivity(activity)

      if (topic?.name) {
        const topicCompleted = completedFeatures.filter(
          (item) =>
            item.startsWith(`${topic.name}-`)
        )

        const completedCount = topicCompleted.length

        const calculatedProgress = Math.min(
          100,
          Math.round(
            (completedCount / FEATURES.length) * 100
          )
        )

        setProgress(calculatedProgress)

        setTopicsDone(
          completedCount > 0 ? 1 : 0
        )
      } else {
        setProgress(0)
        setTopicsDone(0)
      }
    } catch (error) {
      console.error('Failed to load dashboard progress:', error)

      setProgress(0)
      setTopicsDone(0)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">

          <div className="h-10 w-10 rounded-full border-4 border-primary-100 border-t-primary-700 animate-spin mx-auto mb-4" />

          <p className="text-sm text-ink-faint">
            Loading your dashboard...
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-up">

      {/* Welcome */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <p className="
