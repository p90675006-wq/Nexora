import { supabase } from './supabase'

async function callAI(body) {
  const { data, error } = await supabase.functions.invoke(
    'dynamic-action',
    { body }
  )

  if (error) {
    let message = error.message || 'AI request failed.'

    if (error.context) {
      try {
        const response = error.context
        const text = await response.text()

        if (text) {
          try {
            const parsed = JSON.parse(text)
            message = parsed.error || parsed.message || text
          } catch {
            message = text
          }
        }
      } catch {
        // Keep original error.
      }
    }

    throw new Error(message)
  }

  if (!data) {
    throw new Error('AI returned an empty response.')
  }

  if (data.success === false) {
    throw new Error(data.error || 'AI request failed.')
  }

  return data
}

export async function testNexoraAI(topic = 'Matrix') {
  return callAI({
    action: 'test',
    topic,
  })
}

export async function generateAITest(
  topic,
  { difficulty = 'medium', count = 5 } = {}
) {
  return callAI({
    action: 'generate-test',
    topic,
    difficulty,
    count,
  })
}

export async function summarizeTopic(topic) {
  const detailedTopicPrompt = `
Teach the topic "${topic}" as a complete, crystal-clear lesson for a student.

IMPORTANT:
Do NOT give a short summary.
Do NOT assume the student already understands the topic.
Explain the topic from the basics and gradually move to exam-level understanding.

Create a detailed but easy-to-understand lesson using this structure:

1. INTRODUCTION
- Explain what ${topic} is.
- Explain why it matters.
- Give a simple real-world intuition or analogy wherever useful.

2. CORE CONCEPT
- Explain the fundamental idea from zero.
- Define every important term in simple language.
- Build the concept step by step.

3. DETAILED EXPLANATION
- Explain all major sub-concepts related to ${topic}.
- Show how the different concepts are connected.
- Do not skip important intermediate steps.

4. EXAMPLES
- Give clear examples wherever they help understanding.
- If the topic involves calculations, solve representative examples step by step.
- If the topic is Biology, Chemistry, Physics, Mathematics or another technical subject, use subject-appropriate examples.

5. FORMULAS / RULES / REACTIONS
- Include all important formulas, equations, laws, rules, definitions or relationships relevant to ${topic}.
- Explain what each symbol/term means.
- Explain when and how each formula or rule is used.
- Do not invent formulas.

6. IMPORTANT FACTS
- List the facts that a student must remember.
- Highlight commonly tested information.

7. COMMON CONFUSIONS & MISTAKES
- Explain common misconceptions.
- Explain similar concepts that students often confuse.
- Mention common exam mistakes and how to avoid them.

8. EXAM FOCUS
- Identify the most important parts of the topic for competitive exams and school/board-style exams.
- Explain what students should prioritize.
- Include likely conceptual question areas.

9. QUICK REVISION
- Give a concise final revision section containing the most important points.
- This should be useful for revising the topic later.

10. SELF-CHECK
- Give 5 short questions at the end to test whether the student actually understood the topic.
- Do not immediately reveal the answers unless necessary.

WRITING STYLE:
- Use clear headings.
- Use short paragraphs and bullet points where appropriate.
- Explain difficult ideas in simple language.
- Prefer teaching and explanation over merely listing facts.
- Maintain accuracy.
- Be detailed enough that a student can understand the topic without needing another basic explanation.
- Avoid unnecessary filler.
`

  return callAI({
    action: 'summarize',
    topic: detailedTopicPrompt,
  })
}

export async function generateVideoLesson(topic) {
  return callAI({
    action: 'video-start',
    topic,
  })
}

export async function checkVideoGeneration(operationName) {
  return callAI({
    action: 'video-status',
    operationName,
  })
}

export async function generateMemorySong(topic) {
  return callAI({
    action: 'song',
    topic,
  })
}

export async function generatePuzzle(topic) {
  return callAI({
    action: 'puzzle',
    topic,
  })
}
