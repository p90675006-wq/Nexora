import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LogOut,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    // Clear StudyMate/Nexora local session data
    localStorage.removeItem('nexora_user')
    localStorage.removeItem('studymate_user')
    localStorage.removeItem('nexora_auth')
    localStorage.removeItem('studymate_auth')

    setSidebarOpen(false)
    navigate('/login', { replace: true })
  }

  const isDashboard = location.pathname === '/dashboard'

  return (
    <div className="min-h-screen bg-paper lg:flex">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main application */}
      <div className="flex-1 min-w-0">

        {/* Mobile topbar */}
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Desktop application header */}
        <header className="hidden lg:flex h-16 items-center justify-between px-8 border-b border-border bg-white/80 backdrop-blur sticky top-0 z-20">

          <div className="flex items-center gap-2 min-w-0">

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-ink">
                {isDashboard ? 'My Learning' : 'Study Space'}
              </span>

              <ChevronRight className="h-4 w-4 text-ink-faint" />

              <span className="text-sm text-ink-faint truncate">
                {isDashboard
                  ? 'Dashboard'
                  : location.pathname
                      .split('/')
                      .filter(Boolean)
                      .pop()
                      ?.replace(/-/g, ' ')
                      ?.replace(/\b\w/g, (letter) =>
                        letter.toUpperCase()
                      )}
              </span>
            </div>

          </div>

          <div className="flex items-center gap-3">

            {/* Nexora AI badge */}
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent-600" />

              <span className="text-xs font-semibold text-accent-700">
                Nexora AI
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-soft-pulse" />
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2 text-sm font-medium text-ink-soft hover:bg-black/[0.03] hover:text-ink transition"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>

          </div>
        </header>

        {/* Main content */}
        <main className="container-page py-6 sm:py-8 lg:py-10">

          {/* Mobile Nexora badge */}
          <div className="flex lg:hidden justify-end mb-4">
            <div className="ai-badge">
              <Sparkles className="h-3.5 w-3.5" />
              Nexora AI
            </div>
          </div>

          <Outlet />

        </main>

        {/* Mobile logout */}
        <div className="lg:hidden container-page pb-8">

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-ink-soft hover:bg-black/[0.03] hover:text-ink transition"
          >
            <LogOut className="h-4 w-4" />
            Logout from StudyMate
          </button>

        </div>

      </div>
    </div>
  )
}
