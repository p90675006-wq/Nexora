import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Brain,
  Trophy,
  RotateCcw,
  Film,
  FileQuestion,
  BarChart3,
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
    description: 'Visualise the concept through a simple sequence.',
  },
  remember: {
    label: 'Remember',
    icon: Brain,
    description: 'Use memory techniques to retain the topic.',
  },
  play: {
    label: 'Play',
    icon: Trophy,
    description: 'Test your understanding with a quick challenge.',
  },
  pyqs: {
    label: 'PYQs',
    icon: FileQuestion,
    description: 'Practice an exam-style question.',
  },
  analyze: {
    label: 'Analyze',
    icon: BarChart3,
    description: 'Understand your current topic status.',
  },
  revise: {
    label: 'Revise',
    icon: RotateCcw,
    description: 'Review the most important parts quickly.',
  },
}

/* =========================================================
   TOPIC CONTENT
   ========================================================= */

const TOPIC_CONTENT = {
  matrix: {
    definition:
      'A matrix is a rectangular arrangement of numbers, symbols or expressions in rows and columns. If a matrix has m rows and n columns, its order is m × n.',

    concepts: [
      'Rows run horizontally and columns run vertically.',
      'Two matrices can be added or subtracted only when they have the same order.',
      'Matrix multiplication AB is possible when the number of columns of A equals the number of rows of B.',
      'The determinant is defined only for square matrices.',
      'An inverse exists when the determinant of a square matrix is non-zero.',
    ],

    example:
      'If A = [[1, 2], [3, 4]], then A is a 2 × 2 matrix. Its determinant is |A| = (1 × 4) − (2 × 3) = −2.',

    key:
      'For JEE, focus especially on matrix operations, determinants, inverse of a matrix and solving linear equations.',

    question:
      'If A is a 2 × 3 matrix and B is a 3 × 2 matrix, what is the order of AB?',

    options: [
      '2 × 2',
      '3 × 3',
      '2 × 3',
      '3 × 2',
    ],

    answer: 0,

    explanation:
      'A is 2 × 3 and B is 3 × 2. The inner dimensions 3 match, so AB exists and its order is 2 × 2.',
  },

  'cell biology': {
    definition:
      'The cell is the basic structural and functional unit of life. Cells contain specialised structures called organelles that perform specific functions.',

    concepts: [
      'The plasma membrane controls movement of substances into and out of the cell.',
      'The nucleus contains genetic material in eukaryotic cells.',
      'Mitochondria are major sites of aerobic respiration and ATP production.',
      'Ribosomes are responsible for protein synthesis.',
      'Plant cells contain chloroplasts for photosynthesis.',
    ],

    example:
      'Mitochondria contain their own DNA and ribosomes, which supports the endosymbiotic theory.',

    key:
      'For NEET, compare prokaryotic and eukaryotic cells and learn the functions of major organelles.',

    question:
      'Which organelle is primarily associated with ATP production in aerobic respiration?',

    options: [
      'Ribosome',
      'Mitochondria',
      'Golgi apparatus',
      'Lysosome',
    ],

    answer: 1,

    explanation:
      'Mitochondria are the major sites of aerobic respiration and oxidative phosphorylation.',
  },

  photosynthesis: {
    definition:
      'Photosynthesis is the process by which green plants convert light energy into chemical energy, producing carbohydrates from carbon dioxide and water.',

    concepts: [
      'Light reactions occur mainly in the thylakoid membranes.',
      'The Calvin cycle occurs in the chloroplast stroma.',
      'ATP and NADPH produced during light reactions are used in carbon fixation.',
      'RuBisCO plays an important role in carbon fixation in C3 plants.',
      'C4 plants have specialised adaptations that reduce photorespiration.',
    ],

    example:
      'In C3 plants, the first stable product of carbon fixation is a three-carbon compound, 3-PGA.',

    key:
      'For NEET, remember the difference between C3, C4 and CAM pathways and the role of RuBisCO.',

    question:
      'Where do the light-dependent reactions of photosynthesis mainly occur?',

    options: [
      'Chloroplast stroma',
      'Thylakoid membranes',
      'Nucleus',
      'Mitochondrial matrix',
    ],

    answer: 1,

    explanation:
      'The light-dependent reactions occur on the thylakoid membranes of chloroplasts.',
  },

  'laws of motion': {
    definition:
      'Newton’s laws of motion describe the relationship between the motion of an object and the forces acting on it.',

    concepts: [
      'Newton’s first law describes inertia.',
      'Newton’s second law gives the relationship F = ma.',
      'Newton’s third law states that forces occur in equal and opposite pairs.',
      'Net force determines the acceleration of an object.',
    ],

    example:
      'If a net force of 10 N acts on a 2 kg object, its acceleration is a = F/m = 10/2 = 5 m/s².',

    key:
      'For JEE, practise free-body diagrams and carefully identify all forces acting on the object.',

    question:
      'A net force of 20 N acts on a 5 kg body. What is its acceleration?',

    options: [
      '2 m/s²',
      '4 m/s²',
      '5 m/s²',
      '10 m/s²',
    ],

    answer: 1,

    explanation:
      'Using F = ma, a = F/m = 20/5 = 4 m/s².',
  },

  'chemical bonding': {
    definition:
      'Chemical bonding is the attractive interaction that holds atoms or ions together to form stable molecules and compounds.',

    concepts: [
      'Ionic bonding involves transfer of electrons.',
      'Covalent bonding involves sharing of electrons.',
      'Coordinate bonds involve a shared pair donated by one atom.',
      'Molecular geometry can be explained using concepts such as VSEPR theory.',
    ],

    example:
      'In NaCl, sodium transfers an electron to chlorine, producing Na⁺ and Cl⁻ ions that are held together by electrostatic attraction.',

    key:
      'For JEE, focus on Lewis structures, formal charge, VSEPR shapes, hybridisation and bond parameters.',

    question:
      'Which type of bond is formed by sharing of electron pairs between atoms?',

    options: [
      'Ionic bond',
      'Covalent bond',
      'Metallic bond',
      'Hydrogen bond',
    ],

    answer: 1,

    explanation:
      'A covalent bond is formed when atoms share one or more pairs of electrons.',
  },
}

/* =========================================================
   FALLBACK CONTENT
   ========================================================= */

function getTopicContent(topic) {
  const key = topic.trim().toLowerCase()

  if (TOPIC_CONTENT[key]) {
    return TOPIC_CONTENT[key]
  }

  if (key.includes('matrix')) {
    return TOPIC_CONTENT.matrix
  }

  if (key.includes('cell')) {
    return TOPIC_CONTENT['cell biology']
  }

  if (key.includes('photosynthesis')) {
    return TOPIC_CONTENT.photosynthesis
  }

  if (
    key.includes('newton') ||
    key.includes('motion') ||
    key.includes('force')
  ) {
    return TOPIC_CONTENT['laws of motion']
  }

  if (
    key.includes('bond') ||
    key.includes('chemical')
  ) {
    return TOPIC_CONTENT['chemical bonding']
  }

  return {
    definition:
      `${topic} is an important concept that should be understood through its definition, core principles and applications.`,

    concepts: [
      `Understand the basic definition and terminology of ${topic}.`,
      `Break ${topic} into smaller concepts and connect them logically.`,
      `Identify important formulas, facts or processes related to ${topic}.`,
      `Practise questions based on ${topic} instead of relying only on memorisation.`,
    ],

    example:
      `Take one simple example of ${topic} and explain the reasoning behind it step by step.`,

    key:
      `For exam preparation, focus on concepts, active recall, question practice and spaced revision.`,

    question:
      `Which approach is most effective when studying ${topic}?`,

    options: [
      'Only memorise the textbook',
      'Understand the concept and practise questions',
      'Skip difficult parts',
      'Study it once and never revise',
    ],

    answer: 1,

    explanation:
      'Conceptual understanding followed by practice and revision is the strongest approach for exam preparation.',
  }
}

/* =========================================================
   MAIN PAGE
   ========================================================= */

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
    FEATURE_CONFIG[feature] || FEATURE_CONFIG.learn

  const Icon = config.icon

  const [completed, setCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const topicKey = `${topic}-${feature}`

  const markComplete = () => {
    setCompleted(true)

    const existing = JSON.parse(
      localStorage.getItem('nexora_completed_features') || '[]'
    )

    if (!existing.includes(topicKey)) {
      localStorage.setItem(
        'nexora_completed_features',
        JSON.stringify([...existing, topicKey])
      )
    }

    const savedTopic = JSON.parse(
      localStorage.getItem('nexora_current_topic') || 'null'
    )

    if (savedTopic && savedTopic.name === topic) {
      const updatedTopic = {
        ...savedTopic,
        progress: Math.max(savedTopic.progress || 0, 15),
      }

      localStorage.setItem(
        'nexora_current_topic',
        JSON.stringify(updatedTopic)
      )
    }
  }

  const reset = () => {
    setCompleted(false)
    setSelectedAnswer(null)
    setShowAnswer(false)
  }

  const hubParams = new URLSearchParams({
    topic,
    ...(exam && { exam }),
    ...(subject && { subject }),
    ...(difficulty && { difficulty }),
  })

  return (
    <div className="max-w-4xl animate-fade-up">

      {/* Back */}
      <Link
        to={`/learn?${hubParams.toString()}`}
        className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Learning Hub
      </Link>

      {/* Main Card */}
      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-card">

        {/* Header */}
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

            {(exam || subject) && (
              <p className="text-xs text-ink-faint mt-2">
                {[exam, subject, difficulty]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}

          </div>
        </div>

        {/* =================================================
            LEARN
           ================================================= */}

        {feature === 'learn' && (() => {
          const content = getTopicContent(topic)

          return (
            <div className="mt-8 space-y-5">

              <Section
                number="01"
                title={`What is ${topic}?`}
              >
                <p>
                  {content.definition}
                </p>
              </Section>

              <Section
                number="02"
                title="Core concepts"
              >
                <ul className="list-disc pl-5 space-y-2">
                  {content.concepts.map((item) => (
                    <li key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section
                number="03"
                title="Worked example"
              >
                <p>
                  {content.example}
                </p>
              </Section>

              <div className="rounded-2xl bg-accent-50/60 p-6">

                <div className="flex gap-3">

                  <Lightbulb className="h-5 w-5 text-accent-600 shrink-0" />

                  <div>

                    <p className="font-semibold">
                      Exam Focus
                    </p>

                    <p className="text-sm text-ink-soft mt-1">
                      {content.key}
                    </p>

                  </div>

                </div>

              </div>

            </div>
          )
        })()}

        {/* =================================================
            WATCH
           ================================================= */}

        {feature === 'watch' && (
          <div className="mt-8">

            <div className="rounded-2xl bg-black/5 p-6">

              <div className="flex items-center justify-center h-48 rounded-xl bg-accent-50">
                <Film className="h-14 w-14 text-accent-600" />
              </div>

              <h2 className="text-xl font-semibold mt-6">
                Visual walkthrough
              </h2>

              <p className="text-ink-soft mt-2">
                Imagine {topic} as a sequence rather than a
                collection of facts.
              </p>

            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-5">

              <MiniStep
                number="1"
                title="Start"
                text={`Identify the main idea of ${topic}.`}
              />

              <MiniStep
                number="2"
                title="Connect"
                text="Connect the important parts together."
              />

              <MiniStep
                number="3"
                title="Apply"
                text="Use the concept to solve a question."
              />

            </div>

          </div>
        )}

        {/* =================================================
            REMEMBER
           ================================================= */}

        {feature === 'remember' && (
          <div className="mt-8 space-y-5">

            <div className="rounded-2xl bg-accent-50/60 p-6">

              <Brain className="h-8 w-8 text-accent-600 mb-4" />

              <h2 className="text-xl font-semibold">
                Make {topic} memorable
              </h2>

              <p className="text-ink-soft mt-2">
                Use active recall instead of repeatedly reading
                the same information.
              </p>

            </div>

            <Section
              number="01"
              title="Close your notes"
            >
              <p>
                Try to explain {topic} without looking at your
                study material.
              </p>
            </Section>

            <Section
              number="02"
              title="Create a mental connection"
            >
              <p>
                Connect the concept to an example, image,
                analogy or story that is easy to remember.
              </p>
            </Section>

            <Section
              number="03"
              title="Recall it later"
            >
              <p>
                Revisit the topic after some time instead of
                studying everything in one session.
              </p>
            </Section>

          </div>
        )}

        {/* =================================================
            PLAY
           ================================================= */}

        {feature === 'play' && (
          <Quiz
            topic={topic}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
          />
        )}

        {/* =================================================
            PYQS
           ================================================= */}

        {feature === 'pyqs' && (() => {
          const content = getTopicContent(topic)

          return (
            <div className="mt-8">

              <div className="rounded-2xl border border-black/5 p-6">

                <p className="text-xs text-ink-faint uppercase tracking-wide">
                  Exam-style Practice
                </p>

                <h2 className="text-xl font-semibold mt-3">
                  {content.question}
                </h2>

                <div className="space-y-3 mt-6">

                  {content.options.map((answer, index) => (
                    <button
                      key={answer}
                      onClick={() => {
                        setSelectedAnswer(index)
                        setShowAnswer(true)
                      }}
                      className={`w-full text-left rounded-xl border p-4 transition ${
                        selectedAnswer === index
                          ? 'border-accent-500 bg-accent-50'
                          : 'border-black/10 hover:bg-black/5'
                      }`}
                    >
                      {answer}
                    </button>
                  ))}

                </div>

                {showAnswer && (
                  <div className="mt-6 rounded-xl bg-accent-50/60 p-5">

                    {selectedAnswer === content.answer ? (
                      <p className="font-semibold text-green-700">
                        Correct! 🎯
                      </p>
                    ) : (
                      <p className="font-semibold">
                        Not quite. Review the explanation.
                      </p>
                    )}

                    <p className="text-sm text-ink-soft mt-2">
                      {content.explanation}
                    </p>

                  </div>
                )}

              </div>

            </div>
          )
        })()}

        {/* =================================================
            ANALYZE
           ================================================= */}

        {feature === 'analyze' && (
          <div className="mt-8">

            <div className="grid sm:grid-cols-3 gap-4">

              <Stat
                title="Current status"
                value={completed ? 'Done' : 'Learning'}
              />

              <Stat
                title="Difficulty"
                value={difficulty || 'Medium'}
              />

              <Stat
                title="Subject"
                value={subject || 'General'}
              />

            </div>

            <div className="mt-6 rounded-2xl bg-primary-50 p-6">

              <BarChart3 className="h-7 w-7 text-primary-700 mb-3" />

              <h2 className="font-semibold">
                Topic analysis
              </h2>

              <p className="text-sm text-ink-soft mt-2">
                Keep learning and practising {topic}. Your
                progress will become more meaningful as you
                complete lessons and quizzes.
              </p>

            </div>
