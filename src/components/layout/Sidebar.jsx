import { NavLink, useNavigate } from 'react-router-dom'
import { X, LogOut, Loader2 } from 'lucide-react'
import { useState } from 'react'

import Logo from '../common/Logo.jsx'
import { NAV_LINKS } from '../../data/navigation.js'
import { ICON_MAP } from '../../data/iconMap.js'
import { supabase } from '../../lib/supabase.js'

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (loggingOut) return

    setLoggingOut(true)

    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('nexora_current_topic')
      localStorage.removeItem('nexora_last_activity')
      localStorage.removeItem('nexora_completed_features')
      onClose?.()
      navigate('/login', { replace: true })
      setLoggingOut(false)
    }
  }

  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 bg-ink/30 z-30 lg:hidden animate-fade-in"
        />
      )}

      <aside
        className={[
          'fixed lg:sticky top-0 left-0 h-screen z-40',
          'w-72 shrink-0 bg-surface border-r border-border',
          'flex flex-col transition-transform duration-300 ease-out',
          open
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >

        <div className="flex items-center justify-between px-5 h-16 border-b border-border">
          <Logo to="/dashboard" />

          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-black/[0.04]"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const Icon = ICON_MAP[link.icon]

            return (
              <NavLink
                key={link.id}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium',
                    'transition-colors duration-150',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-ink-soft hover:bg-black/[0.03] hover:text-ink',
                  ].join(' ')
                }
              >
                {Icon && (
                  <Icon
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.9}
                  />
                )}

                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="px-3 pb-3">

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-50"
          >
            {loggingOut ? (
              <Loader2 className="h-[18px] w-[18px] animate-spin" />
            ) : (
              <LogOut
                className="h-[18px] w-[18px]"
                strokeWidth={1.9}
              />
            )}

            {loggingOut ? 'Logging out...' : 'Log out'}
          </button>

        </div>

        <div className="px-5 py-4 border-t border-border">
          <p className="text-xs text-ink-faint">
            StudyMate is in active development. New features roll out step by step.
          </p>
        </div>

      </aside>
    </>
  )
}
