import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Brain,
  RotateCcw,
  Film,
  FileQuestion,
  BarChart3,
  Loader2,
  Volume2,
  Play,
} from 'lucide-react'

const FEATURE_CONFIG = {
  learn: {
    label: 'Learn',
    icon: BookOpen,
    description: 'Understand the concept step by step.',
  },
  watch: {
    label: 'Watch',
    icon: Film,
    description: 'Learn the topic through a visual lesson.',
  },
  remember: {
    label: 'Remember',
    icon: Brain,
    description: 'Create a memory aid for the topic.',
  },
  play: {
    label: 'Play',
    icon: Brain,
    description: 'Test yourself with an AI challenge.',
  },
  pyqs: {
    label: 'PYQs',
    icon: FileQuestion,
    description: 'Practice exam-style questions.',
  },
  analyze: {
    label: 'Analyze',
    icon: BarChart3,
    description: 'Get an advanced topic analysis.',
  },
  revise: {
    label: 'Revise',
    icon: RotateCcw,
    description: 'Generate a quick revision guide.',
  },
}

export default function LearningFeaturePage() {
  const { feature } = useParams()
  const [searchParams] = useSearchParams()

  const topic =
    searchParams.get('topic') ||
    searchParams.get('q') ||
    'Your Topic'

  const exam = searchParams.get('exam') || ''
  const subject = searchParams.get('subject') || ''
  const difficulty = searchParams.get('difficulty') || ''

  const config =
    FEATURE_CONFIG[feature] ||
    FEATURE_CONFIG.learn

  const Icon = config.icon

  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aiContent, setAiContent] = useState(null)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [checkedAnswers, setCheckedAnswers] = useState({})

  useEffect(() => {
    setAiContent(null)
    setError('')
    setLoading(false)
    setSelectedAnswers({})
    setCheckedAnswers({})
    setCompleted(false)
  }, [feature, topic])

  async function runAI() {
    setLoading(true)
    setError('')
    setAiContent(null)
    setSelectedAnswers({})
    setCheckedAnswers({})

    try {
      await new Promise(resolve => setTimeout(resolve, 700))

      if (feature === 'learn') {
        setAiContent({
          type: 'summary',

          summary: `${topic} is an important concept that can be understood by breaking it into its basic definition, mechanism, applications and exam-important points.

The first step is to understand what ${topic} actually means and why it is important. Once the basic idea is clear, the next step is to understand how the process works and how the different parts are connected.

For strong conceptual clarity, focus on three things: the definition, the mechanism and the application. Instead of memorising isolated facts, connect each fact with the underlying concept.

For examination preparation, students should pay special attention to important terminology, sequences, diagrams, exceptions, common misconceptions and frequently tested facts.

A good study strategy for ${topic} is to first understand the complete concept, then revise the key points, and finally solve application-based questions. This makes the topic easier to remember and improves accuracy in exams.`,

          points: [
            `Understand the basic definition and core idea of ${topic}.`,
            'Learn the complete mechanism or process step by step.',
            'Remember important terminology and relationships.',
            'Focus on diagrams, sequences and important factual information.',
            'Identify common mistakes and frequently tested concepts.',
            'Solve practice questions after understanding the theory.',
            'Revise the topic again before the examination.'
          ]
        })

        return
      }

      if (feature === 'watch') {
        setAiContent({
          type: 'video',
          status: 'ready',
          demo: true,
          topic
        })

        return
      }

      if (feature === 'remember') {
        setAiContent({
          type: 'song',
          demo: true,
          topic,

          lyrics: `🎵 Nexora Memory Aid — ${topic}

Learn the concept, understand it right,
Key facts together, make them bright.

Definition first, then the way,
Important points revise each day.

Remember the sequence,
Remember the key,
Understand the concept,
And master what you see!

🎶 Concept → Mechanism → Facts → Practice → Revision 🎶`
        })

        return
      }

      if (
        feature === 'play' ||
        feature === 'pyqs'
      ) {
        const questions = Array.from(
          { length: 15 },
          (_, index) => ({
            question:
              `Question ${index + 1}: Which statement best describes an important concept related to ${topic}?`,

            options: [
              `It represents an important principle of ${topic}.`,
              `It is completely unrelated to ${topic}.`,
              `It is only applicable in unrelated situations.`,
              `None of the above.`
            ],

            answer: 0,

            explanation:
              `Option A is the best answer because it represents the fundamental concept associated with ${topic}.`
          })
        )

        setAiContent({
          type: 'quiz',

          title:
            feature === 'play'
              ? `${topic} — AI Challenge`
              : `${topic} — PYQ Practice`,

          questions
        })

        return
      }

      if (feature === 'analyze') {
        setAiContent({
          type: 'summary',

          summary: `${topic} can be analysed from conceptual, application and examination perspectives.

The most important approach is to understand the core principle first and then connect it with related concepts. Students should also identify common mistakes and question patterns because these areas often determine performance in competitive examinations.`,

          points: [
            'Core definition and fundamental concept',
            'Important mechanisms and relationships',
            'Application of the concept',
            'Common student mistakes',
            'Frequently tested areas',
            'High-priority revision topics'
          ]
        })

        return
      }

      if (feature === 'revise') {
        setAiContent({
          type: 'summary',

          summary: `Quick Revision Guide — ${topic}

Start with the definition and core idea. Then revise the mechanism, important terminology, sequences, diagrams and important factual information.

Before the examination, focus on commonly confused concepts, exceptions, formulas or relationships and frequently tested areas.

The fastest effective revision method is:

Understand → Recall → Practice → Correct mistakes → Revise again.`,

          points: [
            'Definition and core idea',
            'Important mechanism or process',
            'Key terminology',
            'Important facts',
            'Common mistakes',
            'Frequently tested concepts',
            'Last-minute revision points'
          ]
        })

        return
      }

    } catch (err) {
      console.error(err)

      setError(
        err?.message ||
          'Unable to generate content.'
      )
    } finally {
      setLoading(false)
    }
  }

  function markComplete() {
    setCompleted(true)

    let existing = []

    try {
      existing = JSON.parse(
        localStorage.getItem(
          'nexora_completed_features'
        ) || '[]'
      )
    } catch {
      existing = []
    }

    const topicKey = `${topic}-${feature}`

    if (!existing.includes(topicKey)) {
      localStorage.setItem(
        'nexora_completed_features',
        JSON.stringify([
          ...existing,
          topicKey
        ])
      )
    }
  }

  function reset() {
    setCompleted(false)
    setSelectedAnswers({})
    setCheckedAnswers({})
    setAiContent(null)
    setError('')
  }

  function selectAnswer(questionIndex, optionIndex) {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }))
  }

  function checkAnswer(questionIndex) {
    setCheckedAnswers(prev => ({
      ...prev,
      [questionIndex]: true
    }))
  }

  const hubParams = new URLSearchParams({
    topic,
    ...(exam ? { exam } : {}),
    ...(subject ? { subject } : {}),
    ...(difficulty ? { difficulty } : {})
  })

  return (
    <div className="max-w-4xl animate-fade-up">

      <Link
        to={`/learn?${hubParams.toString()}`}
        className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Learning Hub
      </Link>

      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-card">

        <div className="flex items-start gap-4">

          <div className="h-14 w-14 shrink-0 rounded-2xl bg-accent-50 flex items-center justify-center">
            <Icon className="h-7 w-7 text-accent-600" />
          </div>

          <div className="min-w-0">

            <p className="text-sm text-ink-faint">
              {config.label}
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold">
              {topic}
            </h1>

            <p className="text-ink-soft mt-2">
              {config.description}
            </p>

            {(exam || subject || difficulty) && (
              <p className="text-xs text-ink-faint mt-2">
                {[
                  exam,
                  subject,
                  difficulty
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}

          </div>

        </div>

        <div className="mt-8">

          {!loading &&
            !aiContent &&
            !error && (

              <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6 text-center">

                <Icon className="h-10 w-10 mx-auto text-primary-700 mb-4" />

                <h2 className="text-xl font-semibold">
                  Ready to learn {topic}?
                </h2>

                <p className="text-sm text-ink-soft mt-2">
                  Let Nexora create personalised learning content.
                </p>

                <button
                  onClick={runAI}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium"
                >
                  Generate with AI
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>
            )}

          {loading && (

            <div className="rounded-2xl border border-black/5 p-10 text-center">

              <Loader2 className="h-10 w-10 mx-auto animate-spin text-accent-600" />

              <h2 className="text-xl font-semibold mt-5">
                Nexora is preparing your content...
              </h2>

              <p className="text-sm text-ink-soft mt-2">
                Please wait a moment.
              </p>

            </div>
          )}

          {error && (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

              <p className="font-semibold text-red-700">
                Request failed
              </p>

              <p className="text-sm text-red-600 mt-2 break-words">
                {error}
              </p>

              <button
                onClick={runAI}
                className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-white text-sm font-medium"
              >
                Try Again
              </button>

            </div>
          )}

          {aiContent && (
            <AIContent
              feature={feature}
              topic={topic}
              content={aiContent}
              selectedAnswers={selectedAnswers}
              checkedAnswers={checkedAnswers}
              selectAnswer={selectAnswer}
              checkAnswer={checkAnswer}
            />
          )}

        </div>

        <div className="mt-8 pt-6 border-t border-border">

          {completed ? (

            <div className="rounded-xl bg-green-50 p-5">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="h-6 w-6 text-green-600" />

                <div>

                  <p className="font-semibold text-green-700">
                    {config.label} completed!
                  </p>

                  <p className="text-sm text-ink-soft mt-1">
                    Your progress has been saved.
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-3 mt-4">

                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium"
                >
                  <RotateCcw className="h-4 w-4" />
                  Do Again
                </button>

                <Link
                  to="/progress"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-4 py-2.5 text-sm font-medium text-white"
                >
                  View Progress
                  <ArrowRight className="h-4 w-4" />
                </Link>

              </div>

            </div>

          ) : (

            <button
              onClick={markComplete}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium"
            >
              Mark as Complete
              <CheckCircle2 className="h-4 w-4" />
            </button>

          )}

        </div>

      </div>
    </div>
  )
  }
function AIContent({
  feature,
  topic,
  content,
  selectedAnswers,
  checkedAnswers,
  selectAnswer,
  checkAnswer
}) {

  /* =========================
     LEARN
  ========================= */

  if (feature === 'learn') {

    return (
      <div className="space-y-5">

        <div className="rounded-2xl border border-black/5 p-6">

          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-accent-600" />

            <h2 className="text-xl font-semibold">
              Detailed Explanation
            </h2>
          </div>

          <p className="text-base leading-7 text-ink-soft whitespace-pre-wrap">
            {content.summary}
          </p>

        </div>

        {content.points?.length > 0 && (

          <div className="rounded-2xl border border-black/5 p-6">

            <h2 className="text-xl font-semibold mb-4">
              Key Points
            </h2>

            <div className="space-y-3">

              {content.points.map(
                (point, index) => (

                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-primary-50/60 p-4"
                  >

                    <span className="font-semibold text-primary-700">
                      {index + 1}.
                    </span>

                    <p className="text-sm text-ink-soft">
                      {point}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        )}

        <div className="rounded-2xl bg-accent-50/60 p-6">

          <div className="flex items-center gap-3">

            <Brain className="h-6 w-6 text-accent-600" />

            <h2 className="text-lg font-semibold">
              Nexora Study Tip
            </h2>

          </div>

          <p className="text-sm text-ink-soft mt-3 leading-6">
            First understand the concept, then close your notes
            and recall the important points. Finally solve
            practice questions to check your understanding.
          </p>

        </div>

      </div>
    )
  }


  /* =========================
     WATCH
  ========================= */

  if (feature === 'watch') {

    const isCellCycle =
      topic.toLowerCase().includes('cell cycle') ||
      topic.toLowerCase().includes('cell cycle and cell division')

    /*
      Demo video for Cell Cycle.
      It opens INSIDE Nexora through the iframe.
    */

    const videoId = 'e6N9_RhD10Q'

    if (isCellCycle) {

      return (
        <div className="space-y-5">

          <div className="rounded-2xl border border-black/5 bg-white overflow-hidden shadow-card">

            <div className="p-5 sm:p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="h-11 w-11 rounded-xl bg-accent-50 flex items-center justify-center">

                  <Film className="h-6 w-6 text-accent-600" />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-ink-faint">
                    Nexora Video Lesson
                  </p>

                  <h2 className="text-xl font-semibold">
                    {topic}
                  </h2>

                </div>

              </div>

              <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video">

                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title="Cell Cycle Video Lesson"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-green-700">

                <CheckCircle2 className="h-4 w-4" />

                Video lesson ready

              </div>

              <div className="mt-4 rounded-xl bg-primary-50 p-4">

                <p className="font-semibold text-sm">
                  🎬 Cell Cycle — Video Lesson
                </p>

                <p className="text-sm text-ink-soft mt-1">
                  Watch the visual lesson directly inside Nexora.
                </p>

              </div>

            </div>

          </div>

        </div>
      )
    }

    return (
      <div className="space-y-5">

        <div className="rounded-2xl border border-black/5 overflow-hidden">

          <div className="aspect-video bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">

            <div className="text-center text-white px-6">

              <div className="h-20 w-20 mx-auto rounded-full bg-white/15 flex items-center justify-center mb-5">

                <Play className="h-9 w-9 ml-1" />

              </div>

              <p className="text-xs uppercase tracking-widest text-white/60">
                Nexora AI Video Lesson
              </p>

              <h2 className="text-2xl font-semibold mt-2">
                {topic}
              </h2>

              <p className="text-sm text-white/70 mt-3">
                AI-generated educational video
              </p>

            </div>

          </div>

          <div className="p-6">

            <div className="flex items-center gap-3">

              <CheckCircle2 className="h-5 w-5 text-green-600" />

              <div>

                <p className="font-semibold">
                  Video generated successfully
                </p>

                <p className="text-sm text-ink-soft">
                  Your AI animated lesson is ready for playback.
                </p>

              </div>

            </div>

            <div className="mt-5 rounded-xl bg-primary-50 p-4 text-sm text-ink-soft">

              <strong>AI Video Preview:</strong>{' '}
              Nexora can generate an animated educational
              lesson with diagrams, narration and visual explanations.

            </div>

          </div>

        </div>

      </div>
    )
  }


  /* =========================
     REMEMBER
  ========================= */

  if (feature === 'remember') {

    return (
      <div className="space-y-5">

        <div className="rounded-2xl bg-accent-50/60 p-6">

          <Brain className="h-8 w-8 text-accent-600 mb-4" />

          <h2 className="text-xl font-semibold">
            AI Memory Song
          </h2>

          <p className="text-sm text-ink-soft mt-2">
            Original educational memory aid for {topic}.
          </p>

        </div>

        <div className="rounded-2xl border border-black/5 p-6">

          <div className="flex items-center gap-3 mb-4">

            <Volume2 className="h-5 w-5 text-accent-600" />

            <h3 className="font-semibold">
              Memory Song Preview
            </h3>

          </div>

          <div className="rounded-xl bg-primary-50 p-5">

            <p className="text-sm text-ink-soft">
              🎵 AI-generated educational memory song
            </p>

            <p className="text-xs text-ink-faint mt-2">
              Audio generation is connected in the production version.
            </p>

          </div>

        </div>

        {content.lyrics && (

          <div className="rounded-2xl border border-black/5 p-6">

            <h3 className="font-semibold mb-4">
              Lyrics / Memory Aid
            </h3>

            <div className="whitespace-pre-wrap text-sm leading-7 text-ink-soft">
              {content.lyrics}
            </div>

          </div>

        )}

      </div>
    )
  }


  /* =========================
     PLAY / PYQS
  ========================= */

  if (
    feature === 'play' ||
    feature === 'pyqs'
  ) {

    const questions =
      content.questions || []

    return (
      <div className="space-y-5">

        <div className="rounded-2xl border border-black/5 p-6">

          <div className="flex items-center gap-3 mb-2">

            <FileQuestion className="h-6 w-6 text-accent-600" />

            <h2 className="text-xl font-semibold">
              {content.title}
            </h2>

          </div>

          <p className="text-sm text-ink-soft">
            15 questions generated for {topic}
          </p>

        </div>

        {questions.map(
          (question, index) => {

            const selected =
              selectedAnswers[index]

            const checked =
              checkedAnswers[index]

            return (
              <div
                key={index}
                className="rounded-2xl border border-black/5 p-6"
              >

                <p className="font-semibold leading-7">
                  {index + 1}. {question.question}
                </p>

                <div className="space-y-3 mt-5">

                  {question.options.map(
                    (option, optionIndex) => {

                      const isSelected =
                        selected === optionIndex

                      const isCorrect =
                        checked &&
                        optionIndex === question.answer

                      const isWrong =
                        checked &&
                        isSelected &&
                        optionIndex !== question.answer

                      return (
                        <button
                          key={optionIndex}
                          onClick={() =>
                            !checked &&
                            selectAnswer(
                              index,
                              optionIndex
                            )
                          }
                          className={`w-full text-left rounded-xl border p-4 transition ${
                            isCorrect
                              ? 'border-green-500 bg-green-50'
                              : isWrong
                              ? 'border-red-500 bg-red-50'
                              : isSelected
                              ? 'border-accent-500 bg-accent-50'
                              : 'border-black/10 hover:bg-primary-50'
                          }`}
                        >

                          <span className="font-medium mr-2">
                            {String.fromCharCode(
                              65 + optionIndex
                            )}.
                          </span>

                          {option}

                        </button>
                      )
                    }
                  )}

                </div>

                {selected !== undefined &&
                  !checked && (

                    <button
                      onClick={() =>
                        checkAnswer(index)
                      }
                      className="mt-4 rounded-xl bg-accent-600 px-5 py-2.5 text-white text-sm font-medium"
                    >
                      Check Answer
                    </button>

                  )}

                {checked && (

                  <div className="mt-4 rounded-xl bg-green-50 p-4">

                    <p className="font-semibold text-green-700">

                      Correct Answer:{' '}
                      {String.fromCharCode(
                        65 + question.answer
                      )}

                    </p>

                    <p className="text-sm text-ink-soft mt-2">
                      {question.explanation}
                    </p>

                  </div>

                )}

              </div>
            )
          }
        )}

      </div>
    )
  }


  /* =========================
     FALLBACK
  ========================= */

  return (
    <div className="rounded-2xl border border-black/5 p-6">

      <h2 className="text-xl font-semibold">
        {feature}
      </h2>

      <p className="text-sm text-ink-soft mt-2">
        Content generated for {topic}.
      </p>

    </div>
  )
              }
