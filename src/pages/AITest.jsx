import { useState } from 'react'
import { testNexoraAI } from '../lib/ai'

export default function AITest() {
  const [topic, setTopic] = useState('Photosynthesis')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const testAI = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await testNexoraAI(topic)
      setResult(data)
    } catch (err) {
      setError(err?.message || 'AI request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">
        Nexora AI Test
      </h1>

      <p className="text-ink-soft mt-2">
        Testing Supabase AI connection
      </p>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full mt-6 rounded-xl border border-black/10 p-4"
        placeholder="Enter a topic"
      />

      <button
        onClick={testAI}
        disabled={loading}
        className="mt-4 rounded-xl bg-accent-600 px-6 py-3 text-white font-medium disabled:opacity-50"
      >
        {loading ? 'Connecting...' : 'Test AI'}
      </button>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-xl bg-green-50 p-5">
          <p className="font-semibold text-green-700">
            ✅ Supabase Function Connected
          </p>

          <pre className="mt-4 whitespace-pre-wrap text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
