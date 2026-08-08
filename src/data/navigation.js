// Central nav config so Sidebar and any future top-nav / mobile-nav
// stay in sync without duplicating the list of links.

export const NAV_LINKS = [
  { id: 'home', label: 'Home', to: '/dashboard', icon: 'Home' },
  { id: 'learn', label: 'Learn', to: '/topic', icon: 'BookOpen' },
  { id: 'notes', label: 'Notes', to: '/coming-soon/notes', icon: 'NotebookPen' },
  { id: 'games', label: 'Games', to: '/coming-soon/games', icon: 'Gamepad2' },
  { id: 'pyqs', label: 'PYQs', to: '/coming-soon/pyqs', icon: 'FileQuestion' },
  { id: 'progress', label: 'Progress', to: '/coming-soon/progress', icon: 'TrendingUp' },
  { id: 'revision', label: 'Revision', to: '/coming-soon/revision', icon: 'RotateCcw' },
  { id: 'lectures', label: 'Teacher Lectures', to: '/coming-soon/lectures', icon: 'Video' },
  { id: 'profile', label: 'Profile', to: '/coming-soon/profile', icon: 'User' },
]
