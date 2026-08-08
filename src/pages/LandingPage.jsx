import { Link } from 'react-router-dom'
import {
  BookOpen, Film, Music2, Gamepad2, FileQuestion, BarChart3, RotateCcw, ArrowRight,
} from 'lucide-react'
import Logo from '../components/common/Logo.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'
import ProgressRing from '../components/common/ProgressRing.jsx'

const FEATURES = [
  { icon: BookOpen, title: 'Learn', desc: 'Break a topic into clear, exam-focused explanations.' },
  { icon: Film, title: 'Watch', desc: 'Visual walkthroughs for ideas that click better in motion.' },
  { icon: Music2, title: 'Remember', desc: 'Memory aids that make facts stick past the exam.' },
  { icon: Gamepad2, title: 'Play', desc: 'Quick, focused games that turn recall into a habit.' },
  { icon: FileQuestion, title: 'PYQs', desc: 'Practice with previous years’ questions, organised by topic.' },
  { icon: BarChart3, title: 'Analyze', desc: 'See exactly which topics are strong, blurred, or weak.' },
  { icon: RotateCcw, title: 'Revise', desc: 'A revision queue that brings topics back before you forget them.' },
]

const SUBJECT_PREVIEW = [
  { label: 'Biology', percent: 78, tone: 'primary' },
  { label: 'Physics', percent: 54, tone: 'blurred' },
  { label: 'Chemistry', percent: 31, tone: 'weak' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Top bar */}
      <header className="container-page flex items-center justify-between h-20">
        <Logo to="/" size="lg" />
        <nav className="hidden sm:flex items-center gap-3">
          <Button as={Link} to="/onboarding/exam" variant="ghost" size="sm">
            Sign in
          </Button>
          <Button as={Link} to="/onboarding/exam" variant="primary" size="sm">
            Get Started
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="container-page pt-10 pb-16 sm:pt-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 mb-6">
            Built for NEET, JEE, CUET &amp; more
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] font-semibold text-balance mb-5">
            Learn smarter.
            <br />
            Remember longer.
          </h1>
          <p className="text-lg text-ink-soft max-w-md mb-8 text-balance">
            StudyMate turns your syllabus into a clear, trackable study path —
            so every topic you touch moves from weak to strong, and stays
            there through exam day.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button as={Link} to="/onboarding/exam" size="lg">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as={Link} to="/dashboard" variant="secondary" size="lg">
              View demo dashboard
            </Button>
          </div>
        </div>

        {/* Educational visual: a live-feeling preview of the mastery dashboard */}
        <div className="animate-fade-up [animation-delay:120ms]">
          <Card className="p-6 sm:p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-medium text-ink-faint uppercase tracking-wide">Today&apos;s snapshot</p>
                <p className="font-display text-lg font-semibold">NEET · Biology, Physics, Chemistry</p>
              </div>
              <ProgressRing percent={54} size={52} tone="primary" />
            </div>

            <div className="space-y-3">
              {SUBJECT_PREVIEW.map((s) => (
                <div key={s.label} className="flex items-center gap-4">
                  <ProgressRing percent={s.percent} size={40} strokeWidth={4} tone={s.tone} showLabel={false} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{s.label}</span>
                      <span className="text-ink-faint font-mono text-xs">{s.percent}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary-500"
                        style={{ width: `${s.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-sm">
              <span className="text-ink-faint">Sample preview — your data will look like this</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Feature preview cards */}
      <section className="container-page pb-20 sm:pb-28">
        <div className="mb-10 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Every topic, one loop</h2>
          <p className="text-ink-soft">
            Each topic in StudyMate moves through the same seven-step loop —
            so learning something new never feels like starting from scratch.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="p-5 hover:shadow-card-hover hover:-translate-y-0.5">
              <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary-700" strokeWidth={1.8} />
              </div>
              <h3 className="font-semibold mb-1.5">{title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container-page pb-24">
        <Card className="p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-primary-500 border-none">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
              Start your first topic today
            </h2>
            <p className="text-primary-50/90 max-w-md">
              Tell us what you&apos;re preparing for, and we&apos;ll set up your study space.
            </p>
          </div>
          <Button as={Link} to="/onboarding/exam" variant="accent" size="lg" className="shrink-0">
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </section>

      <footer className="container-page py-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-faint">
        <Logo size="sm" />
        <p>© {new Date().getFullYear()} StudyMate. Built step by step.</p>
      </footer>
    </div>
  )
}
