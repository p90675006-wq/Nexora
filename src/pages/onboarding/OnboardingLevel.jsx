import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingShell from '../../components/common/OnboardingShell.jsx'
import Card from '../../components/common/Card.jsx'
import { LEVELS } from '../../data/examOptions.js'
import { useOnboarding } from '../../context/OnboardingContext.jsx'

export default function OnboardingLevel() {
  const navigate = useNavigate()
  const { exam, level, setLevel } = useOnboarding()

  useEffect(() => {
    if (!exam) navigate('/onboarding/exam', { replace: true })
  }, [exam, navigate])

  const handleSelect = (id) => {
    setLevel(id)
    navigate('/onboarding/subjects')
  }

  return (
    <OnboardingShell
      step={2}
      title="What is your current level?"
      subtitle="Be honest — we’ll pace explanations and practice to match where you are."
      onBack={true}
    >
      <div className="space-y-3">
        {LEVELS.map((option) => {
          const isSelected = level === option.id
          return (
            <Card
              as="button"
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={[
                'w-full text-left p-4 flex items-center justify-between hover:shadow-card-hover',
                isSelected ? 'border-primary-500 ring-1 ring-primary-500' : '',
              ].join(' ')}
            >
              <span>
                <span className="block font-semibold text-sm">{option.label}</span>
                <span className="block text-xs text-ink-faint mt-0.5">{option.description}</span>
              </span>
              <span
                className={[
                  'h-5 w-5 rounded-full border-2 shrink-0',
                  isSelected ? 'border-primary-500 bg-primary-500' : 'border-border',
                ].join(' ')}
              />
            </Card>
          )
        })}
      </div>
    </OnboardingShell>
  )
}
