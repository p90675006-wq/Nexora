// Sample data to give the dashboard UI something real to render.
// This is static placeholder data, not AI-generated content.
// It will be replaced by real user progress once the backend exists.

export const SAMPLE_PROGRESS = {
  overallPercent: 42,
  topicsCompleted: 38,
  topicsTotal: 90,
  currentStreakDays: 5,
}

export const SAMPLE_TOPICS = {
  strong: [
    { id: 't1', name: 'Cell Structure', subject: 'Biology', masteryPercent: 92 },
    { id: 't2', name: 'Laws of Motion', subject: 'Physics', masteryPercent: 88 },
    { id: 't3', name: 'Periodic Table Trends', subject: 'Chemistry', masteryPercent: 85 },
  ],
  blurred: [
    { id: 't4', name: 'Chemical Bonding', subject: 'Chemistry', masteryPercent: 58 },
    { id: 't5', name: 'Human Reproduction', subject: 'Biology', masteryPercent: 54 },
    { id: 't6', name: 'Thermodynamics', subject: 'Physics', masteryPercent: 49 },
  ],
  weak: [
    { id: 't7', name: 'Organic Reaction Mechanisms', subject: 'Chemistry', masteryPercent: 22 },
    { id: 't8', name: 'Genetics & Evolution', subject: 'Biology', masteryPercent: 18 },
    { id: 't9', name: 'Electromagnetic Induction', subject: 'Physics', masteryPercent: 15 },
  ],
}

export const SAMPLE_TODAY_REVISION = [
  { id: 'r1', name: 'Photosynthesis', subject: 'Biology', dueLabel: 'Due today' },
  { id: 'r2', name: "Newton's Laws", subject: 'Physics', dueLabel: 'Due today' },
  { id: 'r3', name: 'Mole Concept', subject: 'Chemistry', dueLabel: 'Due tomorrow' },
]

export const SAMPLE_RECENT_ACTIVITY = [
  { id: 'a1', label: 'Completed a revision session', topic: 'Cell Structure', time: '2h ago' },
  { id: 'a2', label: 'Practiced PYQs', topic: 'Laws of Motion', time: 'Yesterday' },
  { id: 'a3', label: 'Started learning', topic: 'Chemical Bonding', time: '2 days ago' },
]
