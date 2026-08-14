import { Link } from 'react-router-dom'
import {
  BookOpen,
  Film,
  Music2,
  Gamepad2,
  FileQuestion,
  BarChart3,
  RotateCcw,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

import Logo from '../components/common/Logo.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Learn',
    desc: 'Understand any topic with clear, exam-focused AI explanations.',
  },
  {
    icon: Film,
    title: 'Watch',
    desc: 'Turn difficult concepts into visual AI-powered lessons.',
  },
  {
    icon: Music2,
    title: 'Remember',
    desc: 'Create memorable songs and mnemonics for important facts.',
  },
  {
    icon: Gamepad2,
    title: 'Play',
    desc: 'Challenge yourself with quick AI-powered practice.',
  },
  {
    icon: FileQuestion,
    title: 'PYQs',
    desc: 'Practice exam-style questions organised around your topics.',
  },
  {
    icon: BarChart3,
    title: 'Analyze',
    desc: 'Understand your strengths, gaps and areas that need attention.',
  },
  {
    icon: RotateCcw,
    title: 'Revise',
    desc: 'Build smarter revision habits before important exams.',
  },
]

const STEPS = [
  'Choose your exam and subjects',
  'Add the topics you want to study',
  'Let Nexora AI build your learning experience',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">

      {/* HEADER */}
      <header className="container-page flex items-center justify-between h-20">
        <Logo to="/" size="lg" />

        <nav className="hidden sm:flex items-center gap-3">
          <Button
            as={Link}
            to="/login"
            variant="ghost"
            size="sm"
          >
            Sign in
          </Button>

          <Button
            as={Link}
            to="/signup"
            variant="primary"
            size="sm"
          >
            Get Started
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section className="container-page pt-10 pb-20 sm:pt-20 sm:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="animate-fade-up">

            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold px-4 py-2 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered learning for students
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] font-semibold text-balance">
              Your syllabus.
              <br />
              <span className="text-primary-600">
                Your AI study partner.
              </span>
            </h1>

            <p className="text-lg text-ink-soft max-w-xl mt-6 mb-8 leading-relaxed">
              StudyMate helps you learn, practice, remember and revise
              smarter — with <strong>Nexora AI</strong> powering your
              personalised learning experience.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                as={Link}
                to="/signup"
                size="lg"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                as={Link}
                to="/login"
                variant="secondary"
                size="lg"
              >
                Sign in
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7 text-sm text-ink-soft">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-600" />
                Personalised learning
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-600" />
                AI-powered tools
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary-600" />
                Built for exam prep
              </div>
            </div>
          </div>

          {/* PRODUCT PREVIEW */}
          <div className="animate-fade-up [animation-delay:120ms]">

            <Card className="p-6 sm:p-7 shadow-card-hover">

              <div className="flex items-start justify-between gap-4 mb-7">
                <div>
                  <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                    StudyMate
                  </p>

                  <h2 className="text-xl font-semibold mt-1">
                    Meet your AI study space
                  </h2>

                  <p className="text-sm text-ink-soft mt-2">
                    Powered by Nexora AI
                  </p>
                </div>

                <div className="h-11 w-11 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-700" />
                </div>
              </div>

              <div className="rounded-2xl bg-primary-50/70 p-5">
                <p className="text-xs text-primary-700 font-semibold uppercase tracking-wide">
                  Start with a topic
                </p>

                <p className="text-lg font-semibold mt-2">
                  What do you want to learn today?
                </p>

                <div className="mt-4 rounded-xl bg-white border border-black/5 px-4 py-3 text-sm text-ink-faint">
                  e.g. Cell Structure, Thermodynamics...
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">

                <PreviewItem
                  icon={BookOpen}
                  title="Learn"
                  text="AI explanation"
                />

                <PreviewItem
                  icon={Film}
                  title="Watch"
                  text="Visual lesson"
                />

                <PreviewItem
                  icon={Music2}
                  title="Remember"
                  text="Memory aid"
                />

                <PreviewItem
                  icon={FileQuestion}
                  title="Practice"
                  text="AI questions"
                />

              </div>

              <div className="mt-5 pt-5 border-t border-border text-center">
                <p className="text-xs text-ink-faint">
                  Your dashboard starts fresh after you create your account.
                </p>
              </div>

            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-page pb-20 sm:pb-28">

        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-primary-600 mb-2">
            HOW IT WORKS
          </p>

          <h2 className="text-2xl sm:text-3xl font-semibold">
            One simple learning loop
          </h2>

          <p className="text-ink-soft mt-3 leading-relaxed">
            Start with what you need to study. StudyMate adapts the
            experience around your goals instead of giving you another
            generic study dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">

          {STEPS.map((step, index) => (
            <Card
              key={step}
              className="p-6"
            >
              <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                <span className="font-semibold text-primary-700">
                  {index + 1}
                </span>
              </div>

              <h3 className="font-semibold">
                {step}
              </h3>

              <p className="text-sm text-ink-soft mt-2 leading-relaxed">
                {index === 0 &&
                  'Tell StudyMate what exam or goal you are preparing for.'}

                {index === 1 &&
                  'Choose the exact concepts you want to understand or practice.'}

                {index === 2 &&
                  'Nexora AI helps turn those topics into personalised learning activities.'}
              </p>
            </Card>
          ))}

        </div>
      </section>

      {/* FEATURES */}
      <section className="container-page pb-20 sm:pb-28">

        <div className="mb-10 max-w-xl">
          <p className="text-sm font-semibold text-primary-600 mb-2">
            THE STUDYMATE LOOP
          </p>

          <h2 className="text-2xl sm:text-3xl font-semibold">
            Everything you need to move from learning to mastery
          </h2>

          <p className="text-ink-soft mt-3">
            Seven focused tools, connected in one learning experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="p-5 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <Icon
                  className="h-5 w-5 text-primary-700"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="font-semibold mb-1.5">
                {title}
              </h3>

              <p className="text-sm text-ink-soft leading-relaxed">
                {desc}
              </p>
            </Card>
          ))}

        </div>
      </section>

      {/* AI SECTION */}
      <section className="container-page pb-20 sm:pb-28">

        <Card className="p-8 sm:p-12 bg-primary-50 border-primary-100">

          <div className="max-w-2xl">

            <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-5">
              <Sparkles className="h-6 w-6 text-primary-700" />
            </div>

            <p className="text-sm font-semibold text-primary-700">
              POWERED BY NEXORA AI
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold mt-2">
              One AI layer behind your entire study experience.
            </h2>

            <p className="text-ink-soft mt-4 leading-relaxed">
              From explanations and questions to visual lessons,
              memory aids and revision support, Nexora AI is designed
              to make studying more interactive and personalised.
            </p>

          </div>

        </Card>
      </section>

      {/* FINAL CTA */}
      <section className="container-page pb-24">

        <Card className="p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7 bg-primary-500 border-none">

          <div>
            <p className="text-sm font-semibold text-primary-50 mb-2">
              READY WHEN YOU ARE
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Start your first study session.
            </h2>

            <p className="text-primary-50/90 max-w-lg mt-2">
              Create your StudyMate account and build your own
              personalised learning space.
            </p>
          </div>

          <Button
            as={Link}
            to="/signup"
            variant="accent"
            size="lg"
            className="shrink-0"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>

        </Card>

      </section>

      {/* FOOTER */}
      <footer className="container-page py-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-faint">

        <div className="flex items-center gap-3">
          <Logo size="sm" />

          <span className="hidden sm:inline text-border">
            |
          </span>

          <span>
            Powered by Nexora AI
          </span>
        </div>

        <p>
          © {new Date().getFullYear()} StudyMate.
        </p>

      </footer>

    </div>
  )
}

function PreviewItem({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="rounded-xl border border-black/5 bg-white p-4">

      <div className="flex items-center gap-3">

        <div className="h-9 w-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-primary-700" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="text-xs text-ink-faint mt-0.5">
            {text}
          </p>
        </div>

      </div>

    </div>
  )
}
