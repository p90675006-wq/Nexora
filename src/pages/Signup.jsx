import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, User, Mail, Phone, Lock } from 'lucide-react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase.js'
import Logo from '../components/common/Logo.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'

export default function Signup() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    try {
      setLoading(true)

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      )

      const user = userCredential.user

      await updateProfile(user, {
        displayName: form.name,
      })

      await setDoc(doc(db, 'users', user.uid), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        createdAt: new Date().toISOString(),
      })

      localStorage.removeItem('studymate.profile')

      navigate('/onboarding/exam')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
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
              Welcome to StudyMate
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
              Create your account
            </h1>

            <p className="text-ink-soft">
              Save your progress and personalize your study experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={User}
              label="Full name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              required
            />

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
              icon={Phone}
              label="Phone number"
              type="tel"
              placeholder="10-digit mobile number"
              maxLength={10}
              value={form.phone}
              onChange={(e) =>
                update('phone', e.target.value.replace(/\D/g, ''))
              }
              required
            />

            <Input
              icon={Lock}
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              required
            />

            <Input
              icon={Lock}
              label="Confirm password"
              type="password"
              placeholder="Enter password again"
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <p className="text-sm text-center text-ink-soft mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary-700 hover:text-primary-800"
            >
              Sign in
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
