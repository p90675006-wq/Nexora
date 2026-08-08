import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import OnboardingShell from '../../components/common/OnboardingShell.jsx'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/common/Button.jsx'
import { SUBJECTS_BY_EXAM } from '../../data/examOptions.js'
import { useOnboarding } from '../../context/OnboardingContext.jsx'

export default function OnboardingSubjects() {
  const navigate = useNavigate()
  const { exam, level, subjects, setSubjects } = useOnboarding()

  useEffect(() => {
    if (!exam) navigate('/onboarding/exam', { replace: true })
    else if (!level) navigate('/onboarding/level', { replace: true })
  }, [exam, level, navigate])

  const options = SUBJECTS_BY_EXAM[exam] || []

  const toggle = (subject) => {
    setSubjects(
      subjects.includes(subject)
        ? subjects.filter((s) => s !== subject)
        : [...subjects, subject],
    )
  }

  const handleContinue = () => navigate('/dashboard')

  return (
    <OnboardingShell
      step={3}
      title="What subjects do you want to study?"
      subtitle="Pick as many as you like — you can always change this later."
      onBack={true}
    >
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {options.map((subject) => {
          const isSelected = subjects.includes(subject)
          return (
            <Card
              as="button"
              key={subject}
              onClick={() => toggle(subject)}
              className={[
                'text-left p-4 flex items-center justify-between hover:shadow-card-hover',
                isSelected ? 'border-primary-500 ring-1 ring-primary-500' : '',
              ].join(' ')}
            >
              <span className="font-semibold text-sm">{subject}</span>
              <span
                className={[
                  'h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0',
                  isSelected ? 'border-primary-500 bg-primary-500' : 'border-border',
                ].join(' ')}
              >
                {isSelected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
              </span>
            </Card>
          )
        })}
      </div>

      <Button size="lg" className="w-full sm:w-auto" disabled={subjects.length === 0} onClick={handleContinue}>
        Continue to Dashboard
      </Button>
    </OnboardingShell>
  )
}
