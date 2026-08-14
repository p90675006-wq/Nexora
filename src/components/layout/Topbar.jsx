import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, LogOut, Loader2 } from 'lucide-react'

import Logo from '../common/Logo.jsx'
import { supabase } from '../../lib/supabase.js'

export default function Topbar({ onMenuClick }) {
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
      navigate('/login', { replace: true })
      setLoggingOut(false)
    }
  }

  return (
    <header className="lg:hidden sticky top-0 z-20 h-16 bg-paper/90 backdrop-blur border-b border-border flex items-center justify-between px-4">

      <Logo to="/dashboard" />

      <div className="flex items-center gap-1">

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="p-2 rounded-lg text-ink-soft hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50"
          aria-label="Log out"
          title="Log out"
        >
          {loggingOut ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
        </button>

        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-black/[0.04]"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

      </div>
    </header>
  )
}
