import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import Logo from '../components/common/Logo.jsx'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center text-center px-6">
      <Logo size="lg" className="mb-8" />
      <p className="font-mono text-sm text-ink-faint mb-2">404</p>
      <h1 className="text-2xl font-semibold mb-3">Page not found</h1>
      <p className="text-ink-soft mb-7 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button as={Link} to="/">Back to home</Button>
    </div>
  )
}
