import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import StepProgress from './StepProgress.jsx'

export default function OnboardingShell({ step, total = 3, title, subtitle, children, onBack }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="container-page h-20 flex items-center justify-between">
        <Logo to="/" />
        <StepProgress step={step} total={total} />
      </header>

      <main className="flex-1 container-page flex flex-col justify-center pb-16">
        <div className="max-w-xl w-full mx-auto animate-fade-up">
          {onBack && (
            <button
              onClick={() => (onBack === true ? navigate(-1) : onBack())}
              className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          )}
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-balance">{title}</h1>
          {subtitle && <p className="text-ink-soft mb-8">{subtitle}</p>}
          {children}
        </div>
      </main>
    </div>
  )
}
