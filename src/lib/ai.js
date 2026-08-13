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
