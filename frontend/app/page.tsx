'use client'
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [dataset, setDataset] = useState('recollect')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [saveStatus, setSaveStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRemember = async () => {
    if (!text) return
    setLoading(true)
    const res = await fetch('http://localhost:8000/remember', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, dataset })
    })
    const data = await res.json()
    setSaveStatus(data.status === 'saved' ? '✅ Saved!' : '❌ Error')
    setText('')
    setLoading(false)
  }

  const handleRecall = async () => {
    if (!query) return
    setLoading(true)
    const res = await fetch('http://localhost:8000/recall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
    const data = await res.json()
    setResults(data.results || [])
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-2 text-indigo-400">
        Recollect
      </h1>
      <p className="text-center text-gray-400 mb-10">
        Your developer workspace memory
      </p>

      {/* Save Section */}
      <div className="max-w-2xl mx-auto mb-10 bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h2 className="text-lg font-semibold mb-4 text-indigo-300">
          💾 Save a Snippet
        </h2>
        <textarea
          className="w-full bg-gray-800 text-white p-3 rounded-lg mb-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Paste anything — code, link, error, note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          className="w-full bg-gray-800 text-white p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Project name (e.g. dashboard redesign)"
          value={dataset}
          onChange={(e) => setDataset(e.target.value)}
        />
        <button
          onClick={handleRemember}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save to Memory'}
        </button>
        {saveStatus && (
          <p className="text-center mt-3 text-green-400">{saveStatus}</p>
        )}
      </div>

      {/* Recall Section */}
      <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h2 className="text-lg font-semibold mb-4 text-indigo-300">
          🔍 Recall from Memory
        </h2>
        <input
          className="w-full bg-gray-800 text-white p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="What was that grid layout I saved with the auth hook?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleRecall}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search Memory'}
        </button>

        {results.length > 0 && (
          <div className="mt-6 space-y-3">
            {results.map((r, i) => (
              <div
                key={i}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-gray-200"
              >
                {r}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}