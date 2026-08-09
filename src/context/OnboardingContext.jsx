import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase.js'

const STORAGE_KEY = 'studymate.onboarding'

const OnboardingContext = createContext(null)

function loadInitial() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (raw) {
      return JSON.parse(raw)
    }
  } catch {
    // Ignore storage errors
  }

  return {
    exam: null,
    level: null,
    subjects: [],
  }
}

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(loadInitial)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const userRef = doc(db, 'users', user.uid)
        const snapshot = await getDoc(userRef)

        if (snapshot.exists()) {
          const firestoreData = snapshot.data()

          const next = {
            exam: firestoreData.exam ?? null,
            level: firestoreData.level ?? null,
            subjects: firestoreData.subjects ?? [],
          }

          setData(next)

          try {
            window.localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(next),
            )
          } catch {
            // Ignore storage errors
          }
        }
      } catch (error) {
        console.error('Failed to load onboarding data:', error)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const persist = async (next) => {
    setData(next)

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(next),
      )
    } catch {
      // Ignore storage errors
    }

    const user = auth.currentUser

    if (!user) return

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          exam: next.exam,
          level: next.level,
          subjects: next.subjects,
        },
        { merge: true },
      )
    } catch (error) {
      console.error('Failed to save onboarding data:', error)
    }
  }

  const setExam = (exam) => {
    persist({
      ...data,
      exam,
      subjects: [],
    })
  }

  const setLevel = (level) => {
    persist({
      ...data,
      level,
    })
  }

  const setSubjects = (subjects) => {
    persist({
      ...data,
      subjects,
    })
  }

  const reset = () => {
    persist({
      exam: null,
      level: null,
      subjects: [],
    })
  }

  const value = useMemo(
    () => ({
      ...data,
      loading,
      setExam,
      setLevel,
      setSubjects,
      reset,
    }),
    [data, loading],
  )

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)

  if (!context) {
    throw new Error(
      'useOnboarding must be used within OnboardingProvider',
    )
  }

  return context
}
