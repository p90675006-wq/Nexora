import { NavLink } from 'react-router-dom'
import {
  X,
  Sparkles,
  LogOut,
  LayoutDashboard,
} from 'lucide-react'

import Logo from '../common/Logo.jsx'
import { NAV_LINKS } from '../../data/navigation.js'
import { ICON_MAP } from '../../data/iconMap.js'

export default function Sidebar({ open, onClose }) {
  const handleLogout = () => {
    localStorage.removeItem('nexora_current_topic')
    localStorage.removeItem('nexora_completed_features')
    localStorage.removeItem('nexora_last_activity')
    localStorage.removeItem('nexora_auth')
    window.location.href = '/Nexora/'
  }

  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 bg-ink/40 backdrop-blur-[2px] z-30 lg:hidden"
        />
      )}

      <aside
        className={[
          'fixed lg:sticky top-0 left-0 h-screen z-40',
          'w-[270px] shrink-0 bg-surface border-r border-border',
          'flex flex-col shadow-[4px_0_24px_rgba(5,44,37,0.03)]',
          'transition-transform duration-300 ease-out',
          open
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        {/* Brand */}
        <div className="px-5 h-[72px] border-b border-border flex items-center justify-between">
          <Logo to="/dashboard" size="lg" />

          <button
            className="lg:hidden p-2 rounded-xl hover:bg-black/[0.04]"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* AI badge */}
        <div className="px-4 pt-5">
          <div className="rounded-2xl bg-primary-50 border border-primary-100 p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-8 w-8 rounded-xl bg-primary-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>

              <div>
                <p className="text-sm font-bold text-primary-900">
                  Nexora AI
                </p>
                <p className="text-[11px] text-primary-700">
                  Your AI study partner
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">
            Study
          </p>

          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = ICON_MAP[link.icon]

              return (
                <NavLink
                  key={link.id}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'group flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold',
                      'transition-all duration-150',
                      isActive
                        ? 'bg-primary-600 text-white shadow-[0_6px_18px_rgba(14,124,102,0.18)]'
                        : 'text-ink-soft hover:bg-primary-50 hover:text-primary-700',
                    ].join(' ')
                  }
                >
                  {Icon && (
                    <Icon
                      className="h-[18px] w-[18px]"
                      strokeWidth={1.9}
                    />
                  )}

                  <span>{link.label}</span>
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-border space-y-3">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-soft hover:bg-black/[0.03]"
          >
            <LayoutDashboard className="h-[18px] w-[18px]" />
            Dashboard
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Log out
          </button>

          <p className="px-1 text-[10px] leading-relaxed text-ink-faint">
            Nexora AI · Smart learning for serious students
          </p>
        </div>
      </aside>
    </>
  )
}
