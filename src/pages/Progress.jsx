import { TrendingUp, Trophy, Target, BookOpen } from 'lucide-react'

export default function Progress() {
  const pyqScore = Number(
    localStorage.getItem('nexora_last_pyq_score') || 0
  )

  const gameScore = Number(
    localStorage.getItem('nexora_game_score') || 0
  )

  const notes = JSON.parse(
    localStorage.getItem('nexora_notes') || '[]'
  )

  return (
    <div className="animate-fade-up">
      <div className="mb-8">
        <p className="text-sm text-ink-faint">
          Your learning
        </p>

        <h1 className="text-3xl font-semibold">
          Progress
        </h1>

        <p className="mt-2 text-ink-soft">
          Track your practice and learning activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={Target}
          title="PYQ Score"
          value={`${pyqScore}/5`}
        />

        <Stat
          icon={Trophy}
          title="Game Score"
          value={`${gameScore}/3`}
        />

        <Stat
          icon={BookOpen}
          title="Saved Notes"
          value={notes.length}
        />

        <Stat
          icon={TrendingUp}
          title="Learning"
          value="Active"
        />
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold">
          Keep going 🚀
        </h2>

        <p className="mt-2 text-ink-soft">
          Complete Learn sessions, practise PYQs and revise
          your weak topics regularly.
        </p>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, title, value }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <Icon className="h-6 w-6 text-accent-600" />

      <p className="mt-4 text-sm text-ink-soft">
        {title}
      </p>

      <p className="mt-1 text-2xl font-semibold">
        {value}
      </p>
    </div>
  )
}
