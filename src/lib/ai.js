import { supabase } from './supabase'

export async function testNexoraAI(topic = 'Matrix') {
  const { data, error } = await supabase.functions.invoke(
    'dynamic-action',
    {
      body: {
        action: 'test',
        topic,
      },
    }
  )

  if (error) {
    throw error
  }

  return data
}

export async function generateAITest(topic, { difficulty = 'medium', count = 5 } = {}) {
  const { data, error } = await supabase.functions.invoke(
    'dynamic-action',
    {
      body: {
        action: 'generate-test',
        topic,
        difficulty,
        count,
      },
    }
  )

  if (error) {
    throw error
  }

  return data
}
