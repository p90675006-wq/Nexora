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
  Undo2,
  Redo2,
  PenLine,
  Highlighter,
  Eraser,
  Type,
  StickyNote,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import Card from '../components/common/Card.jsx'
import Button from '../components/common/Button.jsx'

const STORAGE_KEY = 'studymate.notes'
const BOARD_KEY = 'studymate.canvas'

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function loadBoard() {
  try {
    const saved = localStorage.getItem(BOARD_KEY)

    return saved
      ? JSON.parse(saved)
      : {
          title: 'My Study Board',
          strokes: [],
          elements: [],
        }
  } catch {
    return {
      title: 'My Study Board',
      strokes: [],
      elements: [],
    }
  }
}

export default function Notes() {
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)
  const pdfInputRef = useRef(null)

  const [notes, setNotes] = useState(loadNotes)
  const [board, setBoard] = useState(loadBoard)
  const [mode, setMode] = useState('canvas')
  const [tool, setTool] = useState('pen')
  const [title, setTitle] = useState('My Study Board')
  const [search, setSearch] = useState('')
  const [color, setColor] = useState('#5b4b8a')
  const [brushSize, setBrushSize] = useState(4)
  const [zoom, setZoom] = useState(1)
  const [drawing, setDrawing] = useState(false)
  const [selectedElement, setSelectedElement] = useState(null)
  const [draggingElement, setDraggingElement] = useState(false)

  const [quickTitle, setQuickTitle] = useState('')
  const [quickContent, setQuickContent] = useState('')
  const [showTextBox, setShowTextBox] = useState(false)
  const [textValue, setTextValue] = useState('')
  const [showSticky, setShowSticky] = useState(false)
  const [stickyValue, setStickyValue] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem(BOARD_KEY, JSON.stringify(board))
  }, [board])

  const getCanvasPoint = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    const source =
      event.touches?.[0] ||
      event.changedTouches?.[0] ||
      event

    return {
      x: (source.clientX - rect.left) / zoom,
      y: (source.clientY - rect.top) / zoom,
    }
  }

  const redrawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width
    canvas.height = rect.height

    ctx.fillStyle = '#fffdf8'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#eee7df'
    ctx.lineWidth = 1

    for (let y = 35; y < canvas.height; y += 32) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    board.strokes.forEach((stroke) => {
      if (!stroke.points?.length) return

      ctx.beginPath()
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y)

      stroke.points.slice(1).forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      if (stroke.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineWidth = stroke.size * 4
        ctx.strokeStyle = 'rgba(0,0,0,1)'
      } else if (stroke.tool === 'highlight') {
        ctx.globalCompositeOperation = 'source-over'
        ctx.lineWidth = stroke.size * 4
        ctx.strokeStyle = `${stroke.color}55`
      } else {
        ctx.globalCompositeOperation = 'source-over'
        ctx.lineWidth = stroke.size
        ctx.strokeStyle = stroke.color
      }

      ctx.stroke()
      ctx.globalCompositeOperation = 'source-over'
    })
  }

  useEffect(() => {
    redrawCanvas()
  }, [board.strokes, zoom])

  useEffect(() => {
    const handleResize = () => redrawCanvas()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [board.strokes, zoom])

  const startDrawing = (event) => {
    if (tool === 'text' || tool === 'sticky') return

    event.preventDefault()

    const point = getCanvasPoint(event)

    setDrawing(true)

    const stroke = {
      id: Date.now(),
      tool,
      color,
      size: brushSize,
      points: [point],
    }

    setBoard((previous) => ({
      ...previous,
      strokes: [...previous.strokes, stroke],
    }))
  }

  const draw = (event) => {
    if (!drawing) return

    event.preventDefault()

    const point = getCanvasPoint(event)

    setBoard((previous) => {
      const strokes = [...previous.strokes]
      const last = strokes[strokes.length - 1]

      if (!last) return previous

      strokes[strokes.length - 1] = {
        ...last,
        points: [...last.points, point],
      }

      return {
        ...previous,
        strokes,
      }
    })
  }

  const stopDrawing = () => {
    setDrawing(false)
  }

  const clearCanvas = () => {
    setBoard((previous) => ({
      ...previous,
      strokes: [],
    }))
  }

  const undo = () => {
    setBoard((previous) => ({
      ...previous,
      strokes: previous.strokes.slice(
        0,
        Math.max(0, previous.strokes.length - 1)
      ),
    }))
  }

  const saveBoard = () => {
    const updatedBoard = {
      ...board,
      title,
    }

    localStorage.setItem(
      BOARD_KEY,
      JSON.stringify(updatedBoard)
    )

    setBoard(updatedBoard)
  }
  const addText = () => {
    if (!textValue.trim()) return

    const element = {
      id: Date.now(),
      type: 'text',
      text: textValue.trim(),
      x: 100,
      y: 100,
      size: 22,
      color,
    }

    setBoard((previous) => ({
      ...previous,
      elements: [...previous.elements, element],
    }))

    setTextValue('')
    setShowTextBox(false)
  }

  const addSticky = () => {
    if (!stickyValue.trim()) return

    const element = {
      id: Date.now(),
      type: 'sticky',
      text: stickyValue.trim(),
      x: 150,
      y: 150,
      color: '#fff1a8',
    }

    setBoard((previous) => ({
      ...previous,
      elements: [...previous.elements, element],
    }))

    setStickyValue('')
    setShowSticky(false)
  }

  const addImage = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const element = {
        id: Date.now(),
        type: 'image',
        src: reader.result,
        x: 120,
        y: 120,
        width: 220,
        height: 160,
      }

      setBoard((previous) => ({
        ...previous,
        elements: [...previous.elements, element],
      }))
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const addPdf = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    const element = {
      id: Date.now(),
      type: 'pdf',
      name: file.name,
      x: 120,
      y: 120,
    }

    setBoard((previous) => ({
      ...previous,
      elements: [...previous.elements, element],
    }))

    event.target.value = ''
  }

  const deleteElement = (id) => {
    setBoard((previous) => ({
      ...previous,
      elements: previous.elements.filter(
        (element) => element.id !== id
      ),
    }))

    setSelectedElement(null)
  }

  const startDragging = (event, element) => {
    event.preventDefault()

    setSelectedElement(element.id)
    setDraggingElement(true)

    const start = getCanvasPoint(event)

    const move = (moveEvent) => {
      moveEvent.preventDefault()

      const current = getCanvasPoint(moveEvent)

      const dx = current.x - start.x
      const dy = current.y - start.y

      setBoard((previous) => ({
        ...previous,
        elements: previous.elements.map((item) =>
          item.id === element.id
            ? {
                ...item,
                x: item.x + dx,
                y: item.y + dy,
              }
            : item
        ),
      }))
    }

    const stop = () => {
      setDraggingElement(false)

      window.removeEventListener(
        'mousemove',
        move
      )

      window.removeEventListener(
        'mouseup',
        stop
      )

      window.removeEventListener(
        'touchmove',
        move
      )

      window.removeEventListener(
        'touchend',
        stop
      )
    }

    window.addEventListener(
      'mousemove',
      move
    )

    window.addEventListener(
      'mouseup',
      stop
    )

    window.addEventListener(
      'touchmove',
      move,
      { passive: false }
    )

    window.addEventListener(
      'touchend',
      stop
    )
  }

  const saveQuickNote = () => {
    if (
      !quickTitle.trim() &&
      !quickContent.trim()
    ) {
      return
    }

    const newNote = {
      id: Date.now(),
      title:
        quickTitle.trim() ||
        'Untitled Note',
      content:
        quickContent.trim(),
      createdAt:
        new Date().toISOString(),
    }

    setNotes((previous) => [
      newNote,
      ...previous,
    ])

    setQuickTitle('')
    setQuickContent('')
  }

  const deleteNote = (id) => {
    setNotes((previous) =>
      previous.filter(
        (note) => note.id !== id
      )
    )
  }

  const filteredNotes = notes.filter(
    (note) =>
      `${note.title} ${note.content}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  )

  return (
    <div className="space-y-7 animate-fade-up">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="flex items-center gap-2 mb-2">

            <div className="p-2 rounded-xl bg-primary-100">
              <NotebookPen className="h-5 w-5 text-primary-700" />
            </div>

            <span className="text-sm font-medium text-primary-700">
              StudyMate Notes
            </span>

          </div>

          <h1 className="text-3xl sm:text-4xl font-bold">
            Your creative study space ✨
          </h1>

          <p className="text-sm text-ink-soft mt-2">
            Write, draw, collect and organise
            your study material.
          </p>
        </div>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={() =>
              setMode('quick')
            }
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'quick'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-surface-soft text-ink-soft'
            }`}
          >
            Quick Notes
          </button>

          <Button
            onClick={() => {
              setMode('canvas')
              setTool('pen')
            }}
          >
            <Plus className="h-4 w-4" />
            New Board
          </Button>

        </div>
      </div>

      {mode === 'canvas' && (
        <Card className="overflow-hidden">

          <div className="p-3 border-b border-border bg-surface flex flex-wrap gap-2 items-center">

            <button
              type="button"
              onClick={() =>
                setTool('pen')
              }
              className={`p-2.5 rounded-xl ${
                tool === 'pen'
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-surface-soft'
              }`}
            >
              <PenLine className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setTool('highlight')
              }
              className={`p-2.5 rounded-xl ${
                tool === 'highlight'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'hover:bg-surface-soft'
              }`}
            >
              <Highlighter className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setTool('eraser')
              }
              className={`p-2.5 rounded-xl ${
                tool === 'eraser'
                  ? 'bg-gray-200 text-gray-700'
                  : 'hover:bg-surface-soft'
              }`}
            >
              <Eraser className="h-5 w-5" />
            </button>

            <div className="w-px h-7 bg-border mx-1" />

            <button
              type="button"
              onClick={() =>
                setShowTextBox(true)
              }
              className="p-2.5 rounded-xl hover:bg-surface-soft"
            >
              <Type className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setShowSticky(true)
              }
              className="p-2.5 rounded-xl hover:bg-surface-soft"
            >
              <StickyNote className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="p-2.5 rounded-xl hover:bg-surface-soft"
            >
              <ImageIcon className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                cameraInputRef.current?.click()
              }
              className="p-2.5 rounded-xl hover:bg-surface-soft"
            >
              <Camera className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                pdfInputRef.current?.click()
              }
              className="p-2.5 rounded-xl hover:bg-surface-soft"
            >
              <FileText className="h-5 w-5" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={addImage}
            />

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={addImage}
            />

            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={addPdf}
            />

            <div className="w-px h-7 bg-border mx-1" />

            <button
              type="button"
              onClick={undo}
              className="p-2.5 rounded-xl hover:bg-surface-soft"
            >
              <Undo2 className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setZoom((previous) =>
                  Math.min(
                    previous + 0.1,
                    1.6
                  )
                )
              }
              className="p-2.5 rounded-xl hover:bg-surface-soft"
            >
              <ZoomIn className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                setZoom((previous) =>
                  Math.max(
                    previous - 0.1,
                    0.7
                  )
                )
              }
              className="p-2.5 rounded-xl hover:bg-surface-soft"
            >
              <ZoomOut className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 ml-auto">

              <input
                type="color"
                value={color}
                onChange={(e) =>
                  setColor(
                    e.target.value
                  )
                }
                className="h-8 w-8 rounded-lg border-0"
              />

              <input
                type="range"
                min="1"
                max="15"
                value={brushSize}
                onChange={(e) =>
                  setBrushSize(
                    Number(e.target.value)
                  )
                }
                className="w-20"
              />

            </div>

          </div>

          <div className="px-4 py-3 bg-[#faf8f5] border-b border-border">

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="bg-transparent font-semibold text-lg outline-none w-full"
              placeholder="Board title..."
            />

          </div>

          <div className="relative overflow-auto bg-[#eeeae5] p-4 sm:p-7">

            <div
              className="relative mx-auto shadow-xl"
              style={{
                width: `${Math.max(
                  850,
                  900 * zoom
                )}px`,
                height: `${Math.max(
                  650,
                  650 * zoom
                )}px`,
              }}
            >

              <canvas
                ref={canvasRef}
                onMouseDown={
                  startDrawing
                }
                onMouseMove={draw}
                onMouseUp={
                  stopDrawing
                }
                onMouseLeave={
                  stopDrawing
                }
                onTouchStart={
                  startDrawing
                }
                onTouchMove={draw}
                onTouchEnd={
                  stopDrawing
                }
                className="absolute inset-0 rounded-sm touch-none"
              />

              {board.elements.map(
                (element) => (
                  <div
                    key={element.id}
                    onMouseDown={(event) =>
                      startDragging(
                        event,
                        element
                      )
                    }
                    onTouchStart={(event) =>
                      startDragging(
                        event,
                        element
                      )
                    }
                    className={`absolute cursor-move ${
                      selectedElement ===
                      element.id
                        ? 'ring-2 ring-primary-400'
                        : ''
                    }`}
                    style={{
                      left: element.x,
                      top: element.y,
                    }}
                  >

                    {element.type === 'text' && (
                      <div
                        style={{
                          fontSize:
                            element.size,
                          color:
                            element.color,
                          fontWeight: 600,
                        }}
                      >
                        {element.text}
                      </div>
                    )}

                    {element.type === 'sticky' && (
                      <div
                        className="w-44 min-h-36 p-4 shadow-lg"
                        style={{
                          backgroundColor:
                            element.color,
                          transform:
                            'rotate(-2deg)',
                        }}
                      >
                        <p className="text-sm font-medium whitespace-pre-wrap">
                          {element.text}
                        </p>
                      </div>
                    )}

                    {element.type === 'image' && (
                      <img
                        src={element.src}
                        alt="Study material"
                        style={{
                          width:
                            element.width,
                          height:
                            element.height,
                          objectFit:
                            'cover',
                        }}
                        className="rounded-xl shadow-md border-4 border-white"
                      />
                    )}

                    {element.type === 'pdf' && (
                      <div className="w-48 rounded-2xl bg-white shadow-lg p-5 border border-border">

                        <FileText className="h-9 w-9 text-primary-600 mb-3" />

                        <p className="text-xs font-medium break-words">
                          {element.name}
                        </p>

                        <p className="text-[11px] text-ink-faint mt-1">
                          PDF attachment
                        </p>

                      </div>
                    )}

                    {selectedElement ===
                      element.id && (
                      <button
                        type="button"
                        onClick={() =>
                          deleteElement(
                            element.id
                          )
                        }
                        className="absolute -right-3 -top-3 bg-red-500 text-white rounded-full p-1.5 shadow"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}

                  </div>
                )
              )}

            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center p-4 bg-surface border-t border-border">

            <button
              type="button"
              onClick={clearCanvas}
              className="text-sm text-red-500"
            >
              Clear drawings
            </button>

            <Button onClick={saveBoard}>
              <Save className="h-4 w-4" />
              Save Board
            </Button>

          </div>

        </Card>
      )}
      {mode === 'quick' && (
        <Card className="p-5 sm:p-7">

          <div className="flex items-center justify-between mb-5">

            <div>
              <p className="text-xs uppercase tracking-wider text-primary-600 font-semibold">
                Quick Note
              </p>

              <h2 className="text-xl font-semibold mt-1">
                Capture something quickly
              </h2>
            </div>

            <NotebookPen className="h-6 w-6 text-primary-600" />

          </div>

          <div className="space-y-4">

            <input
              value={quickTitle}
              onChange={(e) =>
                setQuickTitle(e.target.value)
              }
              placeholder="Note title"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none"
            />

            <textarea
              value={quickContent}
              onChange={(e) =>
                setQuickContent(e.target.value)
              }
              placeholder="Write your quick note..."
              rows={8}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm resize-none outline-none"
            />

            <div className="flex justify-end">

              <Button onClick={saveQuickNote}>
                <Save className="h-4 w-4" />
                Save Note
              </Button>

            </div>

          </div>

        </Card>
      )}

      {showTextBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <Card className="w-full max-w-md p-6">

            <div className="flex justify-between items-center mb-5">

              <h3 className="font-semibold">
                Add text
              </h3>

              <button
                type="button"
                onClick={() =>
                  setShowTextBox(false)
                }
                className="p-2 rounded-xl hover:bg-surface-soft"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <textarea
              value={textValue}
              onChange={(e) =>
                setTextValue(e.target.value)
              }
              placeholder="Type something..."
              rows={4}
              className="w-full rounded-xl border border-border p-4 text-sm resize-none outline-none"
            />

            <div className="flex justify-end mt-4">

              <Button onClick={addText}>
                Add to board
              </Button>

            </div>

          </Card>

        </div>
      )}

      {showSticky && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <Card className="w-full max-w-md p-6">

            <div className="flex justify-between items-center mb-5">

              <h3 className="font-semibold">
                Add sticky note 📌
              </h3>

              <button
                type="button"
                onClick={() =>
                  setShowSticky(false)
                }
                className="p-2 rounded-xl hover:bg-surface-soft"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <textarea
              value={stickyValue}
              onChange={(e) =>
                setStickyValue(e.target.value)
              }
              placeholder="Important formula, reminder, idea..."
              rows={4}
              className="w-full rounded-xl border border-border p-4 text-sm resize-none outline-none"
            />

            <div className="flex justify-end mt-4">

              <Button onClick={addSticky}>
                Add sticky
              </Button>

            </div>

          </Card>

        </div>
      )}

      <div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">

          <div>
            <h2 className="text-xl font-semibold">
              Quick Notes
            </h2>

            <p className="text-sm text-ink-faint mt-1">
              {filteredNotes.length} saved
            </p>
          </div>

          <div className="relative w-full sm:w-64">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search..."
              className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-sm outline-none"
            />

          </div>

        </div>

        {filteredNotes.length === 0 ? (
          <Card className="p-8 text-center">

            <NotebookPen className="h-9 w-9 text-primary-500 mx-auto mb-3" />

            <p className="font-medium">
              No quick notes yet
            </p>

            <p className="text-sm text-ink-faint mt-1">
              Your saved notes will appear here.
            </p>

          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                className="p-5 hover:-translate-y-1 transition-transform duration-300"
              >

                <div className="flex justify-between gap-3">

                  <div className="min-w-0">

                    <h3 className="font-semibold truncate">
                      {note.title}
                    </h3>

                    <p className="text-xs text-ink-faint mt-1">
                      {new Date(
                        note.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      deleteNote(note.id)
                    }
                    className="p-2 rounded-xl text-red-400 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>

                <p className="text-sm text-ink-soft mt-4 whitespace-pre-wrap leading-6">
                  {note.content}
                </p>

              </Card>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}
