import { Video, PlayCircle, Search } from 'lucide-react'
import { useState } from 'react'

const LECTURES = [
  {
    title: 'Concept Building Session',
    subject: 'Science',
    level: 'Beginner',
  },
  {
    title: 'Problem Solving Masterclass',
    subject: 'Mathematics',
    level: 'Intermediate',
  },
  {
    title: 'Exam Strategy & Revision',
    subject: 'All Subjects',
    level: 'All Levels',
  },
  {
    title: 'PYQ Analysis Session',
    subject: 'Competitive Exams',
    level: 'Advanced',
  },
]

export default function Lectures() {
  const [search, setSearch] = useState('')

  const filtered = LECTURES.filter((lecture) =>
    `${lecture.title} ${lecture.subject}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="animate-fade-up">
      <div className="mb-8">
        <p className="text-sm text-ink-faint">
          Learn from teachers
        </p>

        <h1 className="text-3xl font-semibold">
          Teacher Lectures
        </h1>

        <p className="mt-2 text-ink-soft">
          Explore lecture-style learning sessions.
        </p>
      </div>

      <div className="relative mb-6 max-w-xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search lectures..."
          className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 outline-none focus:border-accent-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((lecture) => (
          <div
            key={lecture.title}
            className="rounded-2xl bg-white p-5 shadow-card"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50">
              <Video className="h-6 w-6 text-accent-600" />
            </div>

            <h2 className="mt-5 font-semibold">
              {lecture.title}
            </h2>

            <p className="mt-1 text-sm text-ink-soft">
              {lecture.subject}
            </p>

            <span className="mt-4 inline-block rounded-full bg-black/5 px-3 py-1 text-xs">
              {lecture.level}
            </span>

            <button
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 font-medium hover:bg-black/5"
              onClick={() =>
                window.open(
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    lecture.title
                  )}`,
                  '_blank'
                )
              }
            >
              <PlayCircle className="h-4 w-4" />
              Find Lecture
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
