import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import OnboardingExam from './pages/onboarding/OnboardingExam.jsx'
import OnboardingLevel from './pages/onboarding/OnboardingLevel.jsx'
import OnboardingSubjects from './pages/onboarding/OnboardingSubjects.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TopicInput from './pages/TopicInput.jsx'
import LearningHub from './pages/LearningHub.jsx'
import LearningFeaturePage from './pages/LearningFeaturePage.jsx'
import ComingSoonPage from './pages/ComingSoonPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* Marketing / entry points — no app shell */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding/exam" element={<OnboardingExam />} />
      <Route path="/onboarding/level" element={<OnboardingLevel />} />
      <Route path="/onboarding/subjects" element={<OnboardingSubjects />} />

      {/* App shell — sidebar + topbar */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/topic" element={<TopicInput />} />
        <Route path="/learn" element={<LearningHub />} />
        <Route path="/learn/:feature" element={<LearningFeaturePage />} />
        <Route path="/coming-soon/:feature" element={<ComingSoonPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
