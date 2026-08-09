import { useEffect, useState } from 'react'
import { Plus, Trash2, Save, NotebookPen } from 'lucide-react'
import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'

const STORAGE_KEY = 'studymate.notes'

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function Notes() {
  const [notes, setNotes] = useState(loadNotes)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const createNote = () => {
    setTitle('')
    setContent('')
  }

  const saveNote = () => {
    if (!title.trim() && !content.trim()) return

    const newNote = {
      id: Date.now(),
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      createdAt: new Date().toISOString(),
    }

    setNotes((previous) => [newNote, ...previous])
    setTitle('')
    setContent('')
  }

  const deleteNote = (id) => {
    setNotes((previous) => previous.filter((note) => note.id !== id))
  }

  return (
    <div className="space-y-8 animate-fade-up">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-ink-faint mb-1">
            StudyMate Notes
          </p>

          <h1 className="text-2xl sm:text-3xl font-semibold">
            Your Notes
          </h1>

          <p className="text-sm text-ink-soft mt-2">
            Save important concepts, ideas and revision notes in one place.
          </p>
        </div>

        <Button onClick={createNote}>
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <NotebookPen className="h-5 w-5 text-primary-700" />
          <h2 className="font-semibold">
            Create a Note
          </h2>
        </div>

        <div className="space-y-4">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your notes here..."
            rows={7}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <div className="flex justify-end">
            <Button onClick={saveNote}>
              <Save className="h-4 w-4" />
              Save Note
            </Button>
          </div>

        </div>
      </Card>

      <div>
        <h2 className="font-semibold mb-4">
          Saved Notes ({notes.length})
        </h2>

        {notes.length === 0 ? (
          <Card className="p-8 text-center">
            <NotebookPen className="h-9 w-9 text-primary-500 mx-auto mb-3" />

            <p className="font-medium">
              No notes yet
            </p>

            <p className="text-sm text-ink-faint mt-1">
              Create your first study note above.
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <Card key={note.id} className="p-5">

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">
                      {note.title}
                    </h3>

                    <p className="text-sm text-ink-soft mt-2 whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteNote(note.id)}
                    className="shrink-0 p-2 rounded-lg text-red-500 hover:bg-red-50"
                    aria-label="Delete note"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

              </Card>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
