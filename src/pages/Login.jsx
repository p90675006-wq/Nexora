import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Mail, Lock } from 'lucide-react'
import Logo from '../components/common/Logo.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'

export default function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const raw = localStorage.getItem('studymate.profile')

    if (!raw) {
      setError('No account found. Please create an account first.')
      return
    }

    const profile = JSON.parse(raw)

    if (profile.email !== form.email) {
      setError('No account found with this email.')
      return
    }

    // Temporary login check.
    // Firebase Authentication will replace this later.
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="container-page h-20 flex items-center">
        <Logo to="/" size="lg" />
      </header>

      <main className="flex-1 container-page flex items-center justify-center pb-16">
        <Card className="w-full max-w-lg p-6 sm:p-8">
          <div className="mb-7">
            <p className="text-sm font-semibold text-primary-700 mb-2">
              Welcome back
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
              Sign in to StudyMate
            </h1>

            <p className="text-ink-soft">
              Continue your learning journey where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={Mail}
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              required
            />

            <Input
              icon={Lock}
              label="Password"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full">
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-center text-ink-soft mt-6">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-primary-700 hover:text-primary-800"
            >
              Create one
            </Link>
          </p>
        </Card>
      </main>
    </div>
  )
}

function Input({ icon: Icon, label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">
        {label}
      </span>

      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />

        <input
          {...props}
          className="w-full rounded-xl border border-border bg-surface pl-11 pr-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
      </div>
    </label>
  )
}
