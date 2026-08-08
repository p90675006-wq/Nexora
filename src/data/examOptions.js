// Central place for onboarding configuration.
// Keeping this separate from components makes it easy to extend
// (e.g. wire up to a real backend) without touching UI code.

export const EXAMS = [
  {
    id: 'neet',
    label: 'NEET',
    description: 'Medical entrance',
    icon: 'Stethoscope',
  },
  {
    id: 'jee',
    label: 'JEE',
    description: 'Engineering entrance',
    icon: 'Cpu',
  },
  {
    id: 'cuet',
    label: 'CUET',
    description: 'Central university entrance',
    icon: 'Landmark',
  },
  {
    id: 'school',
    label: 'School Exams',
    description: 'Class 9–12 boards',
    icon: 'GraduationCap',
  },
  {
    id: 'college',
    label: 'College Exams',
    description: 'University coursework',
    icon: 'BookOpenCheck',
  },
  {
    id: 'other',
    label: 'Other',
    description: 'A different goal',
    icon: 'Sparkles',
  },
]

export const LEVELS = [
  {
    id: 'beginner',
    label: 'Just starting out',
    description: "I'm new to most topics",
  },
  {
    id: 'intermediate',
    label: 'Building up',
    description: "I know the basics, need practice",
  },
  {
    id: 'advanced',
    label: 'Almost exam-ready',
    description: "I'm revising and sharpening",
  },
]

export const SUBJECTS_BY_EXAM = {
  neet: ['Physics', 'Chemistry', 'Biology'],
  jee: ['Physics', 'Chemistry', 'Mathematics'],
  cuet: ['General Test', 'Domain Subject', 'Languages'],
  school: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Social Science'],
  college: ['Core Subject 1', 'Core Subject 2', 'Elective'],
  other: ['Subject 1', 'Subject 2', 'Subject 3'],
}

export const DIFFICULTY_LEVELS = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
]
