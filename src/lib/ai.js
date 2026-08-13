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
  return callAI({
    action: 'summarize',
    topic,
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
