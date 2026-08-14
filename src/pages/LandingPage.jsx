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
  Brain,
  Zap,
  Layers3,
} from 'lucide-react'

import Logo from '../components/common/Logo.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Learn',
    desc: 'Understand difficult concepts with clear, exam-focused AI explanations.',
  },
  {
    icon: Film,
    title: 'Watch',
    desc: 'Turn complex topics into visual learning experiences.',
  },
  {
    icon: Music2,
    title: 'Remember',
    desc: 'Use songs, mnemonics and memory tricks to remember more.',
  },
  {
    icon: Gamepad2,
    title: 'Play',
    desc: 'Turn revision into quick interactive learning games.',
  },
  {
    icon: FileQuestion,
    title: 'Practice',
    desc: 'Practice questions built around the topics you are studying.',
  },
  {
    icon: BarChart3,
    title: 'Analyze',
    desc: 'See your progress, strengths and areas that need revision.',
  },
  {
    icon: RotateCcw,
    title: 'Revise',
    desc: 'Build smarter revision habits before your exams.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Choose your goal',
    text: 'Select your exam, subjects and the kind of learning you need.',
  },
  {
    number: '02',
    title: 'Pick a topic',
    text: 'Tell StudyMate exactly what you want to understand or revise.',
  },
  {
    number: '03',
    title: 'Let AI help',
    text: 'Turn one topic into explanations, notes, practice and revision.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09070f] text-white overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl animate-pulse" />

        <div
          className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

      </div>


      {/* HEADER */}

      <header className="relative z-10 container-page h-20 flex items-center justify-between">

        <Logo to="/" size="lg" />

        <nav className="hidden sm:flex items-center gap-3">

          <Button
            as={Link}
            to="/login"
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/5"
          >
            Sign in
          </Button>

          <Button
            as={Link}
            to="/signup"
            variant="primary"
            size="sm"
            className="shadow-lg shadow-violet-500/20"
          >
            Get Started
          </Button>

        </nav>

      </header>


      {/* HERO */}

      <section className="relative z-10 container-page pt-12 pb-24 sm:pt-20 sm:pb-32">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* HERO TEXT */}

          <div className="animate-fade-up">

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 mb-7 backdrop-blur">

              <Sparkles className="h-3.5 w-3.5 text-violet-300" />

              <span className="text-xs font-semibold text-violet-200">
                AI-powered learning for students
              </span>

            </div>


            <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] leading-[1.02] font-semibold tracking-tight">

              Study smarter.

              <br />

              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                Not harder.
              </span>

            </h1>


            <p className="text-base sm:text-lg text-white/60 max-w-xl mt-7 leading-relaxed">

              StudyMate turns your syllabus into an interactive
              learning space — with AI-powered explanations,
              notes, videos, memory aids, games and revision.

            </p>


            <div className="flex flex-wrap items-center gap-3 mt-8">

              <Button
                as={Link}
                to="/signup"
                size="lg"
                className="shadow-xl shadow-violet-500/20"
              >
                Start Learning

                <ArrowRight className="h-4 w-4" />

              </Button>

              <Button
                as={Link}
                to="/login"
                variant="secondary"
                size="lg"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                Sign in
              </Button>

            </div>


            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7">

              <HeroCheck text="Personalised learning" />

              <HeroCheck text="AI-powered tools" />

              <HeroCheck text="Built for students" />

            </div>

          </div>


          {/* APP PREVIEW */}

          <div
            className="animate-fade-up relative"
            style={{ animationDelay: '120ms' }}
          >

            <div className="absolute -inset-6 rounded-[2rem] bg-violet-500/10 blur-2xl" />

            <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-3 shadow-2xl backdrop-blur-xl">

              <div className="rounded-[1.35rem] border border-white/10 bg-[#11101a] overflow-hidden">

                {/* WINDOW BAR */}

                <div className="flex items-center gap-1.5 px-5 py-4 border-b border-white/5">

                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />

                  <span className="ml-auto text-[10px] text-white/25">
                    STUDYMATE AI
                  </span>

                </div>


                <div className="p-5 sm:p-6">

                  <div className="flex items-start justify-between gap-4 mb-6">

                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                        Your study space
                      </p>

                      <h2 className="text-xl font-semibold text-white mt-1">
                        What are you learning?
                      </h2>

                      <p className="text-xs text-white/40 mt-1">
                        Powered by Nexora AI
                      </p>

                    </div>

                    <div className="h-10 w-10 rounded-xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center">

                      <Sparkles className="h-4 w-4 text-violet-300" />

                    </div>

                  </div>


                  <div className="rounded-2xl border border-violet-300/10 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 p-5">

                    <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                      Start with a topic
                    </p>

                    <p className="text-base font-semibold text-white mt-2">
                      Cell Structure
                    </p>

                    <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">

                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400" />

                    </div>

                    <p className="text-[10px] text-white/35 mt-2">
                      AI learning path ready
                    </p>

                  </div>


                  <div className="grid grid-cols-2 gap-3 mt-4">

                    <PreviewItem
                      icon={Brain}
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
                      icon={Gamepad2}
                      title="Play"
                      text="Learn by playing"
                    />

                  </div>


                  <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.025] px-4 py-3 flex items-center gap-3">

                    <Zap className="h-4 w-4 text-amber-300" />

                    <p className="text-xs text-white/50">
                      Your learning loop adapts as you study.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* HOW IT WORKS */}

      <section className="relative z-10 container-page pb-24 sm:pb-32">

        <div className="max-w-2xl mb-10">

          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-300 mb-3">

            <Layers3 className="h-4 w-4" />

            How it works

          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
            One simple learning loop.
          </h2>

          <p className="text-white/50 mt-4 leading-relaxed">
            StudyMate connects the things students already use
            into one calm, personalised study experience.
          </p>

        </div>


        <div className="grid md:grid-cols-3 gap-4">

          {STEPS.map((step, index) => (

            <div
              key={step.number}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.055] hover:border-violet-300/20"
            >

              <div className="flex items-center justify-between mb-7">

                <div className="h-10 w-10 rounded-xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center">

                  <span className="text-xs font-semibold text-violet-300">
                    {step.number}
                  </span>

                </div>

                {index < STEPS.length - 1 && (
                  <ArrowRight className="hidden md:block h-4 w-4 text-white/10" />
                )}

              </div>

              <h3 className="text-base font-semibold text-white">
                {step.title}
              </h3>

              <p className="text-sm text-white/45 mt-2 leading-relaxed">
                {step.text}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* FEATURE GRID */}

      <section className="relative z-10 container-page pb-24 sm:pb-32">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">

          <div className="max-w-2xl">

            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300 mb-3">
              The StudyMate loop
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
              Everything your study session needs.
            </h2>

            <p className="text-white/50 mt-4 leading-relaxed">
              Learn something. Make it memorable. Practice it.
              Come back and revise it.
            </p>

          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-white/30">

            <Sparkles className="h-3.5 w-3.5 text-violet-300" />

            Powered by Nexora AI

          </div>

        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {FEATURES.map(
            ({ icon: Icon, title, desc }, index) => (

              <div
                key={title}
                className={
                  'group rounded-2xl border border-white/10 bg-white/[0.035] p-5 ' +
                  'transition-all duration-300 hover:-translate-y-1 ' +
                  'hover:bg-white/[0.06] hover:border-violet-300/20 ' +
                  'hover:shadow-2xl hover:shadow-violet-950/20 ' +
                  (index === 0
                    ? 'lg:col-span-2'
                    : '')
                }
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="h-11 w-11 rounded-2xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">

                    <Icon
                      className="h-5 w-5 text-violet-300"
                      strokeWidth={1.7}
                    />

                  </div>

                  <ArrowRight className="h-4 w-4 text-white/15 transition-all duration-300 group-hover:text-violet-300 group-hover:translate-x-1" />

                </div>

                <h3 className="text-base font-semibold text-white mt-6">
                  {title}
                </h3>

                <p className="text-sm text-white/45 mt-2 leading-relaxed max-w-md">
                  {desc}
                </p>

              </div>

            )
          )}

        </div>

      </section>


      {/* AI SECTION */}

      <section className="relative z-10 container-page pb-24 sm:pb-32">

        <div className="relative overflow-hidden rounded-[2rem] border border-violet-300/10 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent p-8 sm:p-12">

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative max-w-2xl">

            <div className="h-12 w-12 rounded-2xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center mb-6">

              <Sparkles className="h-6 w-6 text-violet-300" />

            </div>

            <p className="text-xs font-semibold tracking-[0.16em] text-violet-300">
              POWERED BY NEXORA AI
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mt-3">
              One AI layer behind your entire study experience.
            </h2>

            <p className="text-white/50 mt-5 leading-relaxed">
              From explanations and questions to visual lessons,
              memory aids, games and revision support, StudyMate
              brings everything together around the topic you're
              actually studying.
            </p>


            <div className="flex flex-wrap gap-3 mt-7">

              <AIChip text="Personalised" />

              <AIChip text="Interactive" />

              <AIChip text="Exam-focused" />

              <AIChip text="Student-first" />

            </div>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="relative z-10 container-page pb-24">

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-600/80 via-purple-700/70 to-fuchsia-700/60 p-8 sm:p-12 shadow-2xl shadow-violet-950/30">

          <div className="absolute -right-20 -bottom-32 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="absolute -left-20 -top-32 h-72 w-72 rounded-full bg-violet-300/10 blur-3xl" />


          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">

            <div>

              <p className="text-xs font-semibold tracking-[0.16em] text-violet-100/70 mb-3">
                READY WHEN YOU ARE
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                Your next study session
                starts here.
              </h2>

              <p className="text-sm sm:text-base text-white/70 max-w-lg mt-3 leading-relaxed">
                Create your StudyMate space and turn your syllabus
                into something you actually enjoy learning.
              </p>

            </div>


            <Button
              as={Link}
              to="/signup"
              variant="accent"
              size="lg"
              className="shrink-0 bg-white text-violet-700 hover:bg-white/90 shadow-xl"
            >
              Get Started

              <ArrowRight className="h-4 w-4" />

            </Button>

          </div>

        </div>

      </section>
      {/* FOOTER */}

      <footer className="relative z-10 container-page py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <Logo size="sm" />

          <span className="hidden sm:inline text-white/10">
            |
          </span>

          <span className="text-xs text-white/35">
            Powered by Nexora AI
          </span>

        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} StudyMate.
        </p>

      </footer>

    </div>
  )
}


/* -------------------------------------------------- */
/* HERO CHECK */
/* -------------------------------------------------- */

function HeroCheck({ text }) {
  return (
    <div className="flex items-center gap-2">

      <CheckCircle2 className="h-4 w-4 text-violet-300" />

      <span className="text-xs sm:text-sm text-white/45">
        {text}
      </span>

    </div>
  )
}


/* -------------------------------------------------- */
/* PREVIEW ITEM */
/* -------------------------------------------------- */

function PreviewItem({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="group rounded-xl border border-white/7 bg-white/[0.035] p-4 transition-all duration-300 hover:bg-white/[0.06]">

      <div className="flex items-center gap-3">

        <div className="h-9 w-9 rounded-xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">

          <Icon
            className="h-4 w-4 text-violet-300"
            strokeWidth={1.8}
          />

        </div>

        <div className="min-w-0">

          <p className="text-sm font-semibold text-white">
            {title}
          </p>

          <p className="text-[11px] text-white/35 mt-0.5">
            {text}
          </p>

        </div>

      </div>

    </div>
  )
}


/* -------------------------------------------------- */
/* AI CHIP */
/* -------------------------------------------------- */

function AIChip({ text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2">

      <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />

      <span className="text-xs font-medium text-white/65">
        {text}
      </span>

    </div>
  )
}
