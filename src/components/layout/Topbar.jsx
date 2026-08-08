import { Menu } from 'lucide-react'
import Logo from '../common/Logo.jsx'

export default function Topbar({ onMenuClick }) {
  return (
    <header className="lg:hidden sticky top-0 z-20 h-16 bg-paper/90 backdrop-blur border-b border-border flex items-center justify-between px-4">
      <Logo to="/dashboard" />
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-black/[0.04]"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
    </header>
  )
}
