import { Link } from 'react-router-dom'
import { Hammer } from 'lucide-react'
import Button from './Button.jsx'

export default function ComingSoon({
  title = 'This feature is coming soon',
  description = "We're building this in the next development stage. Check back soon.",
  backTo = '/dashboard',
  backLabel = 'Back to Dashboard',
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 animate-fade-up">
      <div className="h-14 w-14 rounded-2xl bg-accent-50 border border-accent-200 flex items-center justify-center mb-5">
        <Hammer className="h-6 w-6 text-accent-700" strokeWidth={1.75} />
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-ink-soft max-w-md mb-7">{description}</p>
      <Button as={Link} to={backTo} variant="secondary">
        {backLabel}
      </Button>
    </div>
  )
}
