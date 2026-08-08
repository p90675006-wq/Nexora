# StudyMate

**Learn smarter. Remember longer.**

StudyMate is a learning platform for students preparing for NEET, JEE, CUET, school exams, college exams, and other competitive exams.

This repository currently contains the **foundation and UI only** — layout, navigation, onboarding flow, and screen states. AI and backend functionality will be layered in incrementally.

## Tech stack

- React 18
- Vite
- Tailwind CSS
- React Router
- lucide-react (icons)
- Plain JavaScript (no TypeScript, no state management library — just React state/context)

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
  components/
    common/       # Button, Card, Logo, ProgressRing, ComingSoon, etc. — reusable across the app
    layout/        # Sidebar, Topbar, AppLayout (the app shell)
    dashboard/     # Dashboard-specific pieces (TopicListCard, ActivityList)
  context/
    OnboardingContext.jsx   # holds exam / level / subjects across onboarding + app
  data/
    examOptions.js     # exams, levels, subjects, difficulty config
    navigation.js       # sidebar link config
    learningActions.js  # the 7 Learning Hub actions
    mockDashboard.js    # sample data for the dashboard (clearly not AI-generated)
    iconMap.js          # string -> lucide-react icon lookup
  pages/
    LandingPage.jsx
    onboarding/
      OnboardingExam.jsx
      OnboardingLevel.jsx
      OnboardingSubjects.jsx
    Dashboard.jsx
    TopicInput.jsx
    LearningHub.jsx
    LearningFeaturePage.jsx   # per-action (Learn/Watch/Remember/Play/PYQs/Analyze/Revise) placeholder
    ComingSoonPage.jsx         # generic placeholder for sidebar sections
    NotFound.jsx
  App.jsx        # route definitions
  main.jsx       # app entry point
```

## What's real vs. placeholder

- **Real UI, real navigation, real state:** landing page, onboarding flow (choices persist to `localStorage`), dashboard layout, topic input form, learning hub, sidebar/topbar, responsive behavior.
- **Sample data, not live data:** dashboard progress, strong/blurred/weak topics, revision list, and recent activity all come from `src/data/mockDashboard.js`, labeled as sample data in the UI.
- **Honest placeholders:** every Learning Hub action (Learn, Watch, Remember, Play, PYQs, Analyze, Revise) and every sidebar section without a built page (Notes, Games, PYQs, Progress, Revision, Teacher Lectures, Profile) navigates to a clearly labeled "coming soon" state — nothing claims to be AI-generated or functional before it is.

## Design notes

- Palette, type pairing (Fraunces display / Inter body / IBM Plex Mono for data), and the circular "mastery ring" are defined once in `tailwind.config.js` and `ProgressRing.jsx`, then reused everywhere progress is shown — dashboard, topic lists, and the landing page preview.
