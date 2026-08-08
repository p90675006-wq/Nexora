import { useNavigate } from 'react-router-dom'
import OnboardingShell from '../../components/common/OnboardingShell.jsx'
import Card from '../../components/common/Card.jsx'
import { EXAMS } from '../../data/examOptions.js'
import { ICON_MAP } from '../../data/iconMap.js'
import { useOnboarding } from '../../context/OnboardingContext.jsx'

export default function OnboardingExam() {
  const navigate = useNavigate()
  const { exam, setExam } = useOnboarding()

  const handleSelect = (id) => {
    setExam(id)
    navigate('/onboarding/level')
  }

  return (
    <OnboardingShell
      step={1}
      title="What are you preparing for?"
      subtitle="This helps us tailor topics, difficulty, and practice questions to your goal."
    >
      <div className="grid sm:grid-cols-2 gap-3">
        {EXAMS.map((option) => {
          const Icon = ICON_MAP[option.icon]
          const isSelected = exam === option.id
          return (
            <Card
              as="button"
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={[
                'text-left p-4 flex items-center gap-3 hover:shadow-card-hover hover:-translate-y-0.5',
                isSelected ? 'border-primary-500 ring-1 ring-primary-500' : '',
              ].join(' ')}
            >
              <span className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                {Icon && <Icon className="h-5 w-5 text-primary-700" strokeWidth={1.8} />}
              </span>
              <span>
                <span className="block font-semibold text-sm">{option.label}</span>
                <span className="block text-xs text-ink-faint">{option.description}</span>
              </span>
            </Card>
          )
        })}
      </div>
    </OnboardingShell>
  )
}
