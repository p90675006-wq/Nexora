import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'studymate.onboarding'

const OnboardingContext = createContext(null)

function loadInitial() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore malformed/unavailable storage
  }
  return { exam: null, level: null, subjects: [] }
}

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(loadInitial)

  const persist = (next) => {
    setData(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // storage may be unavailable (e.g. private mode) — non-fatal
    }
  }

  const setExam = (exam) => persist({ ...data, exam, subjects: [] })
  const setLevel = (level) => persist({ ...data, level })
  const setSubjects = (subjects) => persist({ ...data, subjects })
  const reset = () => persist({ exam: null, level: null, subjects: [] })

  const value = useMemo(
    () => ({ ...data, setExam, setLevel, setSubjects, reset }),
    [data],
  )

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}
