import { Menu, Sparkles } from 'lucide-react'
import Logo from '../common/Logo.jsx'

export default function Topbar({ onMenuClick }) {
  return (
    <header className="lg:hidden sticky top-0 z-20 h-16 bg-paper/90 backdrop-blur-xl border-b border-border flex items-center justify-between px-4">
      <Logo to="/dashboard" />

      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-primary-50 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary-700" />
        </div>

        <button
          onClick={onMenuClick}
          className="p-2.5 rounded-xl bg-surface border border-border shadow-sm"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
