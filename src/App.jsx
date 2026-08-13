import { Routes, Route } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout.jsx'

import LandingPage from './pages/LandingPage.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'

import OnboardingExam from './pages/onboarding/OnboardingExam.jsx'
import OnboardingLevel from './pages/onboarding/OnboardingLevel.jsx'
import OnboardingSubjects from './pages/onboarding/OnboardingSubjects.jsx'

import Dashboard from './pages/Dashboard.jsx'
import TopicInput from './pages/TopicInput.jsx'
import LearningHub from './pages/LearningHub.jsx'
import LearningFeaturePage from './pages/LearningFeaturePage.jsx'

import Notes from './pages/Notes.jsx'
import PYQs from './pages/PYQs.jsx'
import Progress from './pages/Progress.jsx'
import Revision from './pages/Revision.jsx'
import Lectures from './pages/Lectures.jsx'
import Profile from './pages/Profile.jsx'

import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/onboarding/exam"
        element={<OnboardingExam />}
      />

      <Route
        path="/onboarding/level"
        element={<OnboardingLevel />}
      />

      <Route
        path="/onboarding/subjects"
        element={<OnboardingSubjects />}
      />

      <Route element={<AppLayout />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/topic"
          element={<TopicInput />}
        />

        <Route
          path="/learn"
          element={<LearningHub />}
        />

        <Route
          path="/learn/:feature"
          element={<LearningFeaturePage />}
        />

        <Route
          path="/notes"
          element={<Notes />}
        />

        <Route
          path="/pyqs"
          element={<PYQs />}
        />

        <Route
          path="/progress"
          element={<Progress />}
        />

        <Route
          path="/revision"
          element={<Revision />}
        />

        <Route
          path="/lectures"
          element={<Lectures />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  )
}
