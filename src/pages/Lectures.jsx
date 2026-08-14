import {
  Video,
  PlayCircle,
  Search,
  ExternalLink,
} from 'lucide-react'
import { useState } from 'react'

const LECTURES = [
  {
    id: 1,
    title: 'ALLEN Aagaaz NEET',
    subject: 'NEET',
    teacher: 'ALLEN Faculty',
    level: 'All Levels',
    description:
      'Complete NEET-oriented lecture series from ALLEN.',
    playlistUrl:
      'https://www.youtube.com/results?search_query=ALLEN+Aagaaz+NEET+playlist',
  },

  {
    id: 2,
    title: 'Physics — Alakh Pandey',
    subject: 'Physics',
    teacher: 'Alakh Pandey',
    level: 'NEET / JEE',
    description:
      'Concept-focused Physics lectures from the early PW era.',
    playlistUrl:
      'https://www.youtube.com/@PhysicsWallah-AlakhPandey',
  },

  {
    id: 3,
    title: 'Biology — NEET Lectures',
    subject: 'Biology',
    teacher: 'Nexora Teacher Library',
    level: 'NEET',
    description:
      'Biology lecture collection for NEET preparation.',
    playlistUrl:
      'https://www.youtube.com/results?search_query=NEET+Biology+full+lecture+playlist',
  },

  {
    id: 4,
    title: 'Chemistry — NEET Lectures',
    subject: 'Chemistry',
    teacher: 'Nexora Teacher Library',
    level: 'NEET',
    description:
      'Chemistry lectures and concept-building sessions.',
    playlistUrl:
      'https://www.youtube.com/results?search_query=NEET+Chemistry+full+lecture+playlist',
  },

  {
    id: 5,
    title: 'NEET PYQ Analysis',
    subject: 'Competitive Exams',
    teacher: 'Nexora Exam Faculty',
    level: 'Advanced',
    description:
      'Lecture-style sessions focused on previous-year questions.',
    playlistUrl:
      'https://www.youtube.com/results?search_query=NEET+PYQ+analysis+playlist',
  },

  {
    id: 6,
    title: 'Revision & One Shot Lectures',
    subject: 'All Subjects',
    teacher: 'Nexora Teacher Library',
    level: 'Revision',
    description:
      'Quick revision and chapter-wise one-shot sessions.',
    playlistUrl:
      'https://www.youtube.com/results?search_query=NEET+one+shot+revision+playlist',
  },
]

export default function Lectures() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = LECTURES.filter((lecture) =>
    `${lecture.title} ${lecture.subject} ${lecture.teacher}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  if (selected) {
    return (
      <div className="animate-fade-up">

        <button
          onClick={() => setSelected(null)}
          className="mb-6 flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
        >
          ← Back to Teacher Lectures
        </button>

        <div className="rounded-2xl bg-white p-5 sm:p-7 shadow-card">

          <p className="text-sm text-ink-faint">
            Teacher Lecture Library
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-semibold">
            {selected.title}
          </h1>

          <div className="mt-3 flex flex-wrap gap-2">

            <span className="rounded-full bg-accent-50 px-3 py-1 text-xs text-accent-700">
              {selected.subject}
            </span>

            <span className="rounded-full bg-black/5 px-3 py-1 text-xs">
              {selected.level}
            </span>

            <span className="rounded-full bg-black/5 px-3 py-1 text-xs">
              {selected.teacher}
            </span>

          </div>

          <div className="mt-6 rounded-2xl bg-black overflow-hidden">

            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">

              <div className="text-center text-white px-6">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15">

                  <PlayCircle className="h-10 w-10" />

                </div>

                <p className="mt-5 text-xs uppercase tracking-widest text-white/60">
                  Nexora Teacher Library
                </p>

                <h2 className="mt-2 text-xl sm:text-2xl font-semibold">
                  {selected.title}
                </h2>

                <p className="mt-3 text-sm text-white/70">
                  Open the complete lecture playlist
                </p>

              </div>

            </div>

          </div>

          <div className="mt-5 rounded-xl bg-primary-50 p-5">

            <p className="font-semibold">
              {selected.description}
            </p>

            <p className="mt-2 text-sm text-ink-soft">
              The lecture source opens through the original
              YouTube page, so the content remains hosted by
              its original publisher.
            </p>

          </div>

          <button
            onClick={() =>
              window.open(
                selected.playlistUrl,
                '_blank',
                'noopener,noreferrer'
              )
            }
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-5 py-3 font-medium text-white hover:bg-accent-700"
          >

            <ExternalLink className="h-4 w-4" />

            Open Lecture Playlist

          </button>

        </div>

      </div>
    )
  }

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
          Access curated teacher-led lecture series for
          NEET preparation.
        </p>

      </div>

      <div className="relative mb-6 max-w-xl">

        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search teachers, subjects or lectures..."
          className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 outline-none focus:border-accent-500"
        />

      </div>

      {filtered.length === 0 ? (

        <div className="rounded-2xl bg-white p-8 text-center shadow-card">

          <Video className="mx-auto h-10 w-10 text-ink-faint" />

          <h2 className="mt-4 font-semibold">
            No lectures found
          </h2>

          <p className="mt-1 text-sm text-ink-soft">
            Try another search.
          </p>

        </div>

      ) : (

        <div className="grid gap-4 sm:grid-cols-2">

          {filtered.map((lecture) => (

            <div
              key={lecture.id}
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

              <p className="mt-1 text-xs text-ink-faint">
                By {lecture.teacher}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                <span className="rounded-full bg-black/5 px-3 py-1 text-xs">
                  {lecture.level}
                </span>

                <span className="rounded-full bg-accent-50 px-3 py-1 text-xs text-accent-700">
                  Playlist
                </span>

              </div>

              <button
                onClick={() => setSelected(lecture)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-4 py-3 font-medium text-white hover:bg-accent-700"
              >

                <PlayCircle className="h-4 w-4" />

                View Lecture Series

              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}
