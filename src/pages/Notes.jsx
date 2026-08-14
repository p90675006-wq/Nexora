import { useEffect, useRef, useState } from 'react'
import {
  Plus,
  Trash2,
  Save,
  NotebookPen,
  Search,
  FileText,
  Image as ImageIcon,
  Camera,
  X,
  Paperclip,
  Highlighter,
  PenLine,
} from 'lucide-react'
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

const noteStyles = [
  'bg-purple-50',
  'bg-pink-50',
  'bg-blue-50',
  'bg-yellow-50',
  'bg-green-50',
  'bg-orange-50',
]

export default function Notes() {
  const [notes, setNotes] = useState(loadNotes)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [search, setSearch] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [activeTool, setActiveTool] = useState('pen')

  const photoInputRef = useRef(null)
  const pdfInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const createNote = () => {
    setTitle('')
    setContent('')
    setAttachments([])
    setActiveTool('pen')
    setShowEditor(true)
  }

  const closeEditor = () => {
    setShowEditor(false)
    setTitle('')
    setContent('')
    setAttachments([])
  }

  const saveNote = () => {
    if (!title.trim() && !content.trim() && attachments.length === 0) return

    const newNote = {
      id: Date.now(),
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      attachments,
      style: noteStyles[Math.floor(Math.random() * noteStyles.length)],
      createdAt: new Date().toISOString(),
    }

    setNotes((previous) => [newNote, ...previous])
    closeEditor()
  }

  const deleteNote = (id) => {
    setNotes((previous) => previous.filter((note) => note.id !== id))
  }

  const handlePhoto = (event) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return

      const reader = new FileReader()

      reader.onload = () => {
        setAttachments((previous) => [
          ...previous,
          {
            id: Date.now() + Math.random(),
            type: 'image',
            name: file.name,
            data: reader.result,
          },
        ])
      }

      reader.readAsDataURL(file)
    })

    event.target.value = ''
  }

  const handlePdf = (event) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      if (file.type !== 'application/pdf') return

      setAttachments((previous) => [
        ...previous,
        {
          id: Date.now() + Math.random(),
          type: 'pdf',
          name: file.name,
        },
      ])
    })

    event.target.value = ''
  }

  const removeAttachment = (id) => {
    setAttachments((previous) =>
      previous.filter((item) => item.id !== id)
    )
  }

  const filteredNotes = notes.filter((note) => {
    const text = `${note.title} ${note.content}`.toLowerCase()
    return text.includes(search.toLowerCase())
  })

  return (
    <div className="min-h-screen space-y-8 animate-fade-up">

      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-xl bg-primary-100">
              <NotebookPen className="h-5 w-5 text-primary-700" />
            </div>

            <span className="text-sm font-medium text-primary-700">
              StudyMate Notes
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Your little study space ✨
          </h1>

          <p className="text-sm text-ink-soft mt-2 max-w-xl">
            Write, collect and organise everything you need for revision.
          </p>
        </div>

        <Button onClick={createNote}>
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your notes..."
          className="w-full rounded-2xl border border-border bg-surface pl-11 pr-4 py-3 text-sm text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
      </div>

      {/* Editor */}
      {showEditor && (
        <Card className="p-5 sm:p-7 overflow-hidden">

          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary-600 font-semibold">
                New notebook page
              </p>

              <h2 className="text-xl font-semibold mt-1">
                Create a beautiful note
              </h2>
            </div>

            <button
              type="button"
              onClick={closeEditor}
              className="p-2 rounded-xl hover:bg-black/5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">

            <button
              type="button"
              onClick={() => setActiveTool('pen')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                activeTool === 'pen'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-surface-soft text-ink-soft'
              }`}
            >
              <PenLine className="h-4 w-4" />
              Pen
            </button>

            <button
              type="button"
              onClick={() => setActiveTool('highlight')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                activeTool === 'highlight'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-surface-soft text-ink-soft'
              }`}
            >
              <Highlighter className="h-4 w-4" />
              Highlight
            </button>

            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-soft text-sm text-ink-soft hover:bg-primary-50"
            >
              <ImageIcon className="h-4 w-4" />
              Photo
            </button>

            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-soft text-sm text-ink-soft hover:bg-primary-50"
            >
              <Camera className="h-4 w-4" />
              Camera
            </button>

            <button
              type="button"
              onClick={() => pdfInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-soft text-sm text-ink-soft hover:bg-primary-50"
            >
              <FileText className="h-4 w-4" />
              PDF
            </button>

            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhoto}
            />

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhoto}
            />

            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              multiple
              className="hidden"
              onChange={handlePdf}
            />
          </div>

          {/* Notebook */}
          <div className="rounded-2xl border border-purple-100 bg-[#fffdf8] overflow-hidden shadow-inner">

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a title..."
              className="w-full bg-transparent px-5 pt-5 pb-3 text-xl font-semibold text-ink focus:outline-none"
            />

            <div className="mx-5 border-t border-purple-100" />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                activeTool === 'highlight'
                  ? 'Write something you want to highlight...'
                  : 'Start writing your thoughts, concepts or revision points...'
              }
              rows={10}
              className="w-full bg-transparent px-5 py-5 text-sm leading-7 text-ink resize-none focus:outline-none"
            />
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">

              {attachments.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-2xl border border-border bg-surface overflow-hidden"
                >

                  {item.type === 'image' ? (
                    <img
                      src={item.data}
                      alt={item.name}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="h-32 flex flex-col items-center justify-center gap-2">
                      <FileText className="h-8 w-8 text-primary-600" />
                      <span className="text-xs px-2 text-center truncate w-full">
                        {item.name}
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeAttachment(item.id)}
                    className="absolute right-2 top-2 p-1.5 rounded-full bg-white/90 shadow-sm"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Save */}
          <div className="flex justify-end gap-3 mt-5">

            <button
              type="button"
              onClick={closeEditor}
              className="px-4 py-2 rounded-xl text-sm text-ink-soft hover:bg-surface-soft"
            >
              Cancel
            </button>

            <Button onClick={saveNote}>
              <Save className="h-4 w-4" />
              Save Note
            </Button>

          </div>

        </Card>
      )}

      {/* Notes */}
      <div>

        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold">
              My Notes
            </h2>

            <p className="text-sm text-ink-faint mt-1">
              {filteredNotes.length} saved note
              {filteredNotes.length !== 1 ? 's' : ''}
            </p>
          </div>

          <Paperclip className="h-5 w-5 text-ink-faint" />
        </div>

        {filteredNotes.length === 0 ? (
          <Card className="p-10 text-center">

            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
              <NotebookPen className="h-8 w-8 text-primary-500" />
            </div>

            <p className="font-semibold">
              Your notebook is waiting ✨
            </p>

            <p className="text-sm text-ink-faint mt-2">
              Create your first note and start studying.
            </p>

            <div className="mt-5">
              <Button onClick={createNote}>
                <Plus className="h-4 w-4" />
                Create Note
              </Button>
            </div>

          </Card>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">

            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`break-inside-avoid rounded-3xl ${note.style || 'bg-purple-50'} p-5 shadow-sm border border-white/70 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg leading-tight">
                      {note.title}
                    </h3>

                    <p className="text-xs text-ink-faint mt-2">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteNote(note.id)}
                    className="shrink-0 p-2 rounded-xl text-red-400 hover:text-red-600 hover:bg-white/60"
                    aria-label="Delete note"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>

                {note.content && (
                  <p className="text-sm text-ink-soft mt-4 whitespace-pre-wrap leading-6">
                    {note.content}
                  </p>
                )}

                {note.attachments?.length > 0 && (
                  <div className="mt-4 space-y-2">

                    {note.attachments.map((item) =>
                      item.type === 'image' ? (
                        <img
                          key={item.id}
                          src={item.data}
                          alt={item.name}
                          className="w-full rounded-2xl object-cover max-h-64"
                        />
                      ) : (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-xl bg-white/60 p-3"
                        >
                          <FileText className="h-5 w-5 text-primary-600" />

                          <span className="text-xs font-medium truncate">
                            {item.name}
                          </span>
                        </div>
                      )
                    )}

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}
