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
  Wand2,
  Zap,
  Star,
  MousePointer2,
} from 'lucide-react'

import Logo from '../components/common/Logo.jsx'
import Button from '../components/common/Button.jsx'
import Card from '../components/common/Card.jsx'

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Learn',
    desc: 'Understand difficult topics with clear, exam-focused AI explanations.',
  },
  {
    icon: Film,
    title: 'Watch',
    desc: 'Turn confusing concepts into visual learning experiences.',
  },
  {
    icon: Music2,
    title: 'Remember',
    desc: 'Make facts stick with creative mnemonics and memory aids.',
  },
  {
    icon: Gamepad2,
    title: 'Play',
    desc: 'Turn revision into quick, fun AI-powered challenges.',
  },
  {
    icon: FileQuestion,
    title: 'PYQs',
    desc: 'Practice questions around the exact topics you need.',
  },
  {
    icon: BarChart3,
    title: 'Analyze',
    desc: 'See what you know and where you should focus next.',
  },
  {
    icon: RotateCcw,
    title: 'Revise',
    desc: 'Build a smarter revision loop before your exams.',
  },
]

const STEPS = [
  {
    title: 'Tell us your goal',
    desc: 'Pick your exam, subjects and what you want to improve.',
  },
  {
    title: 'Choose what to study',
    desc: 'Add topics, chapters or concepts you want to work on.',
  },
  {
    title: 'Let AI do the magic',
    desc: 'Nexora AI turns your topics into a personalised study experience.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0b12] text-white overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px] animate-pulse" />

        <div className="absolute top-[35%] -right-40 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-[35%] h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

      </div>

      {/* HEADER */}

      <header className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-20">

        <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 px-3 py-2">
          <Logo to="/" size="lg" />
        </div>

        <nav className="hidden sm:flex items-center gap-2">

          <Button
            as={Link}
            to="/login"
            variant="ghost"
            size="sm"
            className="!text-white/70 hover:!text-white hover:!bg-white/10"
          >
            Sign in
          </Button>

          <Button
            as={Link}
            to="/signup"
            variant="primary"
            size="sm"
            className="!bg-white !text-[#17131f] hover:!bg-white/90"
          >
            Get Started
          </Button>

        </nav>

      </header>

      {/* HERO */}

      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 lg:pt-28 pb-24">

        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-14 lg:gap-20 items-center">

          {/* HERO COPY */}

          <div className="animate-fade-up">

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2 mb-7 backdrop-blur-md">

              <Sparkles className="h-3.5 w-3.5 text-violet-300" />

              <span className="text-xs sm:text-sm font-medium text-violet-200">
                Your AI-powered study universe
              </span>

            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] leading-[.96] font-semibold tracking-[-0.045em]">

              Studying,
              <br />

              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                but make it fun.
              </span>

            </h1>

            <p className="text-base sm:text-lg text-white/60 max-w-xl mt-7 leading-relaxed">

              Meet <strong className="text-white">StudyMate</strong> —
              the cute little AI study space that helps you
              <span className="text-violet-200"> learn, play, remember </span>
              and actually enjoy your revision.

            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">

              <Button
                as={Link}
                to="/signup"
                size="lg"
                className="!bg-white !text-[#17131f] hover:!bg-violet-100 !shadow-[0_0_35px_rgba(167,139,250,.18)]"
              >
                Start Studying
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                as={Link}
                to="/login"
                variant="ghost"
                size="lg"
                className="!text-white/80 !border !border-white/10 hover:!bg-white/10"
              >
                I already have an account
              </Button>

            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7 text-sm text-white/45">

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-300" />
                Personalised
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-fuchsia-300" />
                AI-powered
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-pink-300" />
                Exam-ready
              </div>

            </div>

          </div>

          {/* HERO PRODUCT MOCKUP */}

          <div className="relative animate-fade-up [animation-delay:150ms]">

            <div className="absolute -top-8 -right-3 sm:right-3 z-20 animate-bounce [animation-duration:3s]">

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#18141f]/90 backdrop-blur-xl px-4 py-3 shadow-2xl">

                <div className="h-7 w-7 rounded-lg bg-violet-400/15 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-violet-300" />
                </div>

                <div>
                  <p className="text-[10px] text-white/40">
                    NEXORA AI
                  </p>

                  <p className="text-xs font-medium text-white/80">
                    Your study buddy ✨
                  </p>
                </div>

              </div>

            </div>

            <div className="absolute -bottom-5 -left-4 z-20 hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-[#18141f]/90 backdrop-blur-xl px-4 py-3">

              <Zap className="h-4 w-4 text-yellow-300" />

              <span className="text-xs text-white/70">
                Focus mode: ON
              </span>

            </div>

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.055] backdrop-blur-2xl p-3 shadow-[0_30px_100px_rgba(0,0,0,.45)]">

              <div className="rounded-[1.5rem] border border-white/10 bg-[#15121c] overflow-hidden">

                {/* MOCKUP TOPBAR */}

                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">

                  <div className="flex items-center gap-2">

                    <div className="h-2.5 w-2.5 rounded-full bg-red-300/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-300/70" />

                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Sparkles className="h-3.5 w-3.5" />
                    StudyMate
                  </div>

                </div>

                <div className="p-5 sm:p-7">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-[10px] uppercase tracking-[.18em] text-violet-300/70">
                        Good morning, scholar
                      </p>

                      <h2 className="text-xl sm:text-2xl font-semibold mt-2">
                        What are we learning?
                      </h2>

                    </div>

                    <div className="h-10 w-10 rounded-xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center">
                      <Wand2 className="h-5 w-5 text-violet-300" />
                    </div>

                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-4">

                    <p className="text-[10px] uppercase tracking-wider text-white/35">
                      Try something like
                    </p>

                    <p className="text-sm text-white/70 mt-2">
                      “Explain photosynthesis like I’m 10”
                    </p>

                    <div className="flex justify-end mt-4">

                      <div className="h-8 w-8 rounded-lg bg-violet-400 flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">

                    <MiniTool
                      icon={BookOpen}
                      title="Learn"
                      text="AI explanations"
                    />

                    <MiniTool
                      icon={Gamepad2}
                      title="Play"
                      text="Study games"
                    />

                    <MiniTool
                      icon={Music2}
                      title="Remember"
                      text="Mnemonics"
                    />

                    <MiniTool
                      icon={FileQuestion}
                      title="Practice"
                      text="Smart questions"
                    />

                  </div>

                  <div className="mt-5 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-white/5 p-3 flex items-center gap-3">

                    <Star className="h-4 w-4 text-yellow-300 shrink-0" />

                    <p className="text-xs text-white/50">
                      Your next revision session is waiting.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* FLOATING MINI FEATURES */}

      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-24">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

          <FloatingFeature
            icon={Brain}
            title="Think smarter"
            text="AI explanations"
          />

          <FloatingFeature
            icon={Gamepad2}
            title="Learn by playing"
            text="Study games"
          />

          <FloatingFeature
            icon={Sparkles}
            title="Make it memorable"
            text="Creative revision"
          />

          <FloatingFeature
            icon={Zap}
            title="Stay focused"
            text="Smart study flow"
          />

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">

        <div className="max-w-2xl mb-10">

          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[.16em] text-violet-300 uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Simple by design
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-3">
            Your study session,
            <span className="text-white/40"> upgraded.</span>
          </h2>

          <p className="text-white/50 mt-4 leading-relaxed max-w-xl">
            No complicated setup. Just tell StudyMate what you
            need and start learning.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-4">

          {STEPS.map((step, index) => (

            <div
              key={step.title}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.06] hover:border-violet-300/20"
            >

              <div className="flex items-center justify-between mb-7">

                <div className="h-11 w-11 rounded-2xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center">

                  <span className="text-sm font-semibold text-violet-200">
                    0{index + 1}
                  </span>

                </div>

                <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-violet-300 transition-colors" />

              </div>

              <h3 className="text-lg font-semibold">
                {step.title}
              </h3>

              <p className="text-sm text-white/45 mt-3 leading-relaxed">
                {step.desc}
              </p>

              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            </div>

          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[.16em] text-fuchsia-300 uppercase">

              <Wand2 className="h-3.5 w-3.5" />

              The StudyMate universe

            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-3">
              One place.
              <br />
              <span className="text-white/40">
                So many ways to learn.
              </span>
            </h2>

          </div>

          <p className="text-sm text-white/40 max-w-sm leading-relaxed">
            From your first “what is this?” to your final
            revision — StudyMate stays with you.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {FEATURES.map(
            ({ icon: Icon, title, desc }, index) => (

              <div
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/[0.06] hover:border-white/15"
              >

                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <div className="h-11 w-11 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-violet-400/10 group-hover:border-violet-300/10 transition-all">

                      <Icon
                        className="h-5 w-5 text-white/70 group-hover:text-violet-200 transition-colors"
                        strokeWidth={1.7}
                      />

                    </div>

                    <span className="text-xs text-white/20">
                      0{index + 1}
                    </span>

                  </div>

                  <h3 className="font-semibold text-lg mt-6">
                    {title}
                  </h3>

                  <p className="text-sm text-white/45 leading-relaxed mt-2">
                    {desc}
                  </p>

                  <div className="flex items-center gap-1.5 mt-6 text-xs text-violet-300/70 opacity-0 group-hover:opacity-100 transition-opacity">

                    Explore

                    <ArrowRight className="h-3.5 w-3.5" />

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </section>

      {/* AI SECTION */}

      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">

        <div className="relative overflow-hidden rounded-[2rem] border border-violet-300/10 bg-gradient-to-br from-violet-500/10 via-white/[0.035] to-fuchsia-500/5 p-7 sm:p-12">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />

          <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-[80px]" />

          <div className="relative grid lg:grid-cols-[1fr_.8fr] gap-12 items-center">

            <div>

              <div className="h-12 w-12 rounded-2xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center mb-6">

                <Sparkles className="h-6 w-6 text-violet-200" />

              </div>

              <p className="text-xs font-semibold tracking-[.18em] text-violet-300 uppercase">
                Powered by Nexora AI
              </p>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-3 max-w-xl">
                Your AI,
                <span className="text-white/40">
                  {' '}
                  but actually useful.
                </span>
              </h2>

              <p className="text-white/50 mt-5 leading-relaxed max-w-xl">
                Instead of throwing another giant textbook at you,
                Nexora AI helps turn your topics into explanations,
                questions, games, memory aids and revision support.
              </p>

              <div className="flex flex-wrap gap-2 mt-7">

                <Pill text="Explain anything" />
                <Pill text="Generate practice" />
                <Pill text="Make revision fun" />

              </div>

            </div>

            {/* AI CHAT VISUAL */}

            <div className="rounded-3xl border border-white/10 bg-[#111018]/80 p-4 shadow-2xl">

              <div className="flex items-center gap-3 pb-4 border-b border-white/5">

                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center">

                  <Sparkles className="h-4 w-4 text-white" />

                </div>

                <div>

                  <p className="text-sm font-semibold">
                    Nexora AI
                  </p>

                  <p className="text-[10px] text-white/35">
                    Ready to help ✦
                  </p>

                </div>

              </div>

              <div className="space-y-3 py-5">

                <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-violet-500/15 border border-violet-300/10 p-3">

                  <p className="text-xs text-white/65">
                    Explain electrostatics in simple words.
                  </p>

                </div>

                <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white/[0.055] border border-white/5 p-3">

                  <p className="text-xs text-white/55 leading-relaxed">
                    Sure ✨ Let’s make it ridiculously simple...
                  </p>

                  <div className="flex gap-1 mt-3">

                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-bounce" />

                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-bounce [animation-delay:120ms]" />

                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-bounce [animation-delay:240ms]" />

                  </div>

                </div>

              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5 flex items-center justify-between">

                <span className="text-xs text-white/25">
                  Ask Nexora anything...
                </span>

                <div className="h-7 w-7 rounded-lg bg-violet-400 flex items-center justify-center">

                  <ArrowRight className="h-3.5 w-3.5 text-white" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* FINAL CTA */}

      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-20 sm:pb-28">

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent p-8 sm:p-12">

          <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-violet-400/20 blur-[100px]" />

          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-fuchsia-400/10 blur-[90px]" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-9">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/55 mb-5">

                <Sparkles className="h-3.5 w-3.5 text-violet-300" />

                Your next study session is waiting

              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">

                Ready to make studying
                <span className="text-violet-300">
                  {' '}
                  less boring?
                </span>

              </h2>

              <p className="text-white/45 mt-4 leading-relaxed max-w-xl">

                Create your StudyMate space and turn your syllabus
                into something you actually want to explore.

              </p>

            </div>

            <Button
              as={Link}
              to="/signup"
              size="lg"
              className="shrink-0 !bg-white !text-[#17131f] hover:!bg-violet-100 !shadow-[0_0_40px_rgba(196,181,253,.18)]"
            >

              Let's Study
              <ArrowRight className="h-4 w-4" />

            </Button>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-8 border-t border-white/10">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2">

              <Logo size="sm" />

            </div>

            <span className="text-white/20">
              •
            </span>

            <span className="text-xs text-white/35">
              Powered by Nexora AI
            </span>

          </div>

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} StudyMate. Made for curious minds ✦
          </p>

        </div>

      </footer>

    </div>
  )
}

/* ----------------------------- */
/* SMALL UI COMPONENTS           */
/* ----------------------------- */

function MiniTool({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="group rounded-2xl border border-white/7 bg-white/[0.035] p-3.5 transition-all duration-300 hover:bg-white/[0.07] hover:-translate-y-0.5">

      <div className="flex items-center gap-3">

        <div className="h-9 w-9 rounded-xl bg-violet-400/10 border border-violet-300/10 flex items-center justify-center shrink-0">

          <Icon className="h-4 w-4 text-violet-200" />

        </div>

        <div className="min-w-0">

          <p className="text-xs font-semibold text-white/75">
            {title}
          </p>

          <p className="text-[10px] text-white/30 mt-0.5">
            {text}
          </p>

        </div>

      </div>

    </div>
  )
}

function FloatingFeature({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-4 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1">

      <div className="flex items-center gap-3">

        <div className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">

          <Icon className="h-4 w-4 text-violet-200" />

        </div>

        <div>

          <p className="text-xs font-semibold text-white/75">
            {title}
          </p>

          <p className="text-[10px] text-white/30 mt-1">
            {text}
          </p>

        </div>

      </div>

    </div>
  )
}

function Pill({ text }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
      {text}
    </div>
  )
}
