import { useState } from 'react'
import {
  User,
  Save,
  Target,
  BookOpen,
  LogOut,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()

  const [name, setName] = useState(
    localStorage.getItem('nexora_name') || ''
  )

  const [goal, setGoal] = useState(
    localStorage.getItem('nexora_goal') || ''
  )

  const [saved, setSaved] = useState(false)

  const save = () => {
    localStorage.setItem(
      'nexora_name',
      name.trim()
    )

    localStorage.setItem(
      'nexora_goal',
      goal.trim()
    )

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  const logout = () => {
    localStorage.removeItem('nexora_user')
    localStorage.removeItem('nexora_auth')
    localStorage.removeItem('nexora_session')

    navigate('/login')
  }

  const initials =
    name.trim()
      ? name
          .trim()
          .split(/\s+/)
          .map((part) => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : 'SM'

  return (
    <div className="max-w-3xl mx-auto animate-fade-up">

      {/* Header */}
      <div className="mb-7">

        <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
          Account
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold mt-1">
          My Profile
        </h1>

        <p className="text-sm text-ink-soft mt-2">
          Manage your StudyMate profile and study goals.
        </p>

      </div>

      {/* Profile hero */}
      <div className="rounded-3xl bg-gradient-to-br from-primary-700 to-accent-600 p-6 sm:p-8 text-white shadow-premium">

        <div className="flex items-center gap-5">

          <div className="h-20 w-20 rounded-2xl bg-white/15 flex items-center justify-center text-2xl font-bold backdrop-blur">
            {initials}
          </div>

          <div className="min-w-0">

            <p className="text-sm text-white/70">
              Student Profile
            </p>

            <h2 className="text-2xl font-bold mt-1 truncate">
              {name || 'Your Name'}
            </h2>

            <p className="text-sm text-white/75 mt-1">
              Keep learning. Keep improving.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}
      <div className="mt-5 rounded-3xl bg-white border border-black/5 shadow-card p-6 sm:p-8">

        <div className="flex items-center gap-3 mb-7">

          <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
            <User className="h-5 w-5 text-primary-700" />
          </div>

          <div>

            <h2 className="font-bold text-lg">
              Personal Details
            </h2>

            <p className="text-xs text-ink-faint">
              Update your learning profile.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <label className="block">

            <span className="mb-2 block text-sm font-semibold">
              Your Name
            </span>

            <div className="relative">

              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
                className="w-full rounded-xl border border-border bg-white pl-11 pr-4 py-3.5 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              />

            </div>

          </label>

          <label className="block">

            <span className="mb-2 block text-sm font-semibold">
              Study Goal
            </span>

            <div className="relative">

              <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />

              <input
                value={goal}
                onChange={(e) =>
                  setGoal(e.target.value)
                }
                placeholder="e.g. Score 90%+"
                className="w-full rounded-xl border border-border bg-white pl-11 pr-4 py-3.5 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              />

            </div>

          </label>

        </div>

        <button
          onClick={save}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 font-semibold text-white hover:bg-accent-700 transition-colors"
        >
          <Save className="h-4 w-4" />
          Save Profile
        </button>

        {saved && (
          <p className="mt-3 text-sm font-medium text-green-600">
            Profile saved successfully ✓
          </p>
        )}

      </div>

      {/* Quick account cards */}
      <div className="grid sm:grid-cols-2 gap-4 mt-5">

        <div className="rounded-2xl bg-white border border-black/5 p-5">

          <BookOpen className="h-5 w-5 text-primary-700 mb-3" />

          <h3 className="font-bold">
            Keep Learning
          </h3>

          <p className="text-sm text-ink-soft mt-1">
            Continue with your current study topic.
          </p>

          <button
            onClick={() =>
              navigate('/topic')
            }
            className="mt-4 text-sm font-semibold text-primary-700"
          >
            Start Learning →
          </button>

        </div>

        <div className="rounded-2xl bg-white border border-black/5 p-5">

          <LogOut className="h-5 w-5 text-red-600 mb-3" />

          <h3 className="font-bold">
            Sign Out
          </h3>

          <p className="text-sm text-ink-soft mt-1">
            Leave your StudyMate account on this device.
          </p>

          <button
            onClick={logout}
            className="mt-4 text-sm font-semibold text-red-600"
          >
            Logout →
          </button>

        </div>

      </div>

    </div>
  )
}
