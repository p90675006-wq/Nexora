import { useState } from 'react'
import { User, Save } from 'lucide-react'

export default function Profile() {
  const [name, setName] = useState(
    localStorage.getItem('nexora_name') || ''
  )

  const [goal, setGoal] = useState(
    localStorage.getItem('nexora_goal') || ''
  )

  const [saved, setSaved] = useState(false)

  const save = () => {
    localStorage.setItem('nexora_name', name)
    localStorage.setItem('nexora_goal', goal)

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  return (
    <div className="max-w-2xl animate-fade-up">
      <div className="mb-8">
        <p className="text-sm text-ink-faint">
          Account
        </p>

        <h1 className="text-3xl font-semibold">
          Profile
        </h1>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50">
          <User className="h-7 w-7 text-accent-600" />
        </div>

        <div className="mt-7 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Name
            </span>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Study goal
            </span>

            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Score 90%+"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent-500"
            />
          </label>
        </div>

        <button
          onClick={save}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 font-medium text-white"
        >
          <Save className="h-4 w-4" />
          Save Profile
        </button>

        {saved && (
          <p className="mt-3 text-sm text-green-600">
            Profile saved successfully ✓
          </p>
        )}
      </div>
    </div>
  )
}
