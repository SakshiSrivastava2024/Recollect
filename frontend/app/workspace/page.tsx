'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Search, Save, Zap, Trash2, Menu, X, Code2, Network } from 'lucide-react'

export default function Workspace() {
  const [text, setText] = useState('')
  const [dataset, setDataset] = useState('recollect')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [saveStatus, setSaveStatus] = useState('')
  const [forgetDataset, setForgetDataset] = useState('recollect')
  const [forgetStatus, setForgetStatus] = useState('')
  const [improveStatus, setImproveStatus] = useState('')
  const [textLoading, setTextLoading] = useState(false)
  const [queryLoading, setQueryLoading] = useState(false)
  const [forgetLoading, setForgetLoading] = useState(false)
  const [improveLoading, setImproveLoading] = useState(false)
  const [memoriesCount, setMemoriesCount] = useState(0)
  const [linksCount, setLinksCount] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const cleanDatasetName = (name: string) => name.replace(/\s+/g, '-').toLowerCase()

  const handleRemember = async () => {
    if (!text) return
    setTextLoading(true)
    try {
      const cleanDataset = cleanDatasetName(dataset)
      const res = await fetch('http://localhost:8000/remember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, dataset: cleanDataset })
      })
      const data = await res.json()
      setSaveStatus(data.status === 'saved' ? '✅ Saved to graph!' : '❌ Error')
      setText('')
      setMemoriesCount(memoriesCount + 1)
      setLinksCount(linksCount + 1)
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      setSaveStatus('❌ Error')
    } finally {
      setTextLoading(false)
    }
  }

  const handleRecall = async () => {
    if (!query) return
    setQueryLoading(true)
    try {
      const res = await fetch('http://localhost:8000/recall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setQueryLoading(false)
    }
  }

  const handleImprove = async () => {
    setImproveLoading(true)
    try {
      await fetch('http://localhost:8000/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      setImproveStatus('✨ Memory optimized!')
      setTimeout(() => setImproveStatus(''), 3000)
    } catch (error) {
      setImproveStatus('❌ Error')
    } finally {
      setImproveLoading(false)
    }
  }

  const handleForget = async () => {
    if (!forgetDataset) return
    setForgetLoading(true)
    try {
      const cleanDataset = cleanDatasetName(forgetDataset)
      const res = await fetch('http://localhost:8000/forget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataset: cleanDataset })
      })
      const data = await res.json()
      setForgetStatus(data.status === 'forgotten' ? '🗑️ Forgotten!' : '❌ Error')
      setLinksCount(Math.max(0, linksCount - 1))
      setTimeout(() => setForgetStatus(''), 3000)
    } catch (error) {
      setForgetStatus('❌ Error')
    } finally {
      setForgetLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative md:w-64 w-64 bg-gray-950 border-r border-gray-800/50 transition-transform duration-300 flex flex-col z-50 h-screen`}>
        <div className="p-4 md:p-6 border-b border-gray-800/50 flex items-center justify-between">
          <div className="text-lg md:text-xl font-black">Recollect</div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 md:p-4 space-y-2">
          <div className="flex items-center gap-3 px-3 md:px-4 py-3 text-gray-400 text-xs md:text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>all 4 ops active</span>
          </div>
          <div className="flex items-center gap-3 px-3 md:px-4 py-3 text-gray-400 text-xs md:text-sm">
            <span>📊</span>
            <span>{memoriesCount} memories</span>
          </div>
          <div className="flex items-center gap-3 px-3 md:px-4 py-3 text-gray-400 text-xs md:text-sm">
            <span>🔗</span>
            <span>{linksCount} nodes</span>
          </div>
        </nav>

        <div className="p-3 md:p-4 border-t border-gray-800/50 space-y-2 text-xs md:text-sm">
          <a href="#" className="block text-gray-400 hover:text-white transition">Documentation</a>
          <a href="#" className="block text-gray-400 hover:text-white transition">Support</a>
        </div>
      </div>

      <div className="flex-1 overflow-auto w-full">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
              >
                <Menu size={24} />
              </button>
            </div>

            <div className="md:flex md:items-center md:justify-between">
              <div>
                <div className="text-xs md:text-sm text-gray-400 mb-2">Explore</div>
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-0">
                  <h1 className="text-2xl md:text-4xl font-bold">recall()</h1>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 md:px-3 py-1 rounded-full">all 4 ops active</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 text-xs md:text-sm mt-4 md:mt-0">
                <div className="flex items-center gap-2 text-gray-400">
                  <span>📊</span>
                  <span>{memoriesCount} memories</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>🔗</span>
                  <span>{linksCount} nodes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recall Section */}
          <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-8">
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              <Search className="w-5 h-5 md:w-7 md:h-7 text-blue-400" />
              <span className="hidden md:inline">recall() — Search via Graph Traversal</span>
              <span className="md:hidden">recall()</span>
            </h2>
            <input
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 md:p-4 rounded-lg md:rounded-xl mb-4 md:mb-6 focus:outline-none focus:border-blue-500 transition text-sm md:text-base"
              placeholder="What was that grid layout?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={queryLoading}
            />
            <button
              onClick={handleRecall}
              disabled={queryLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 rounded-lg md:rounded-xl transition disabled:opacity-50 text-sm md:text-base"
            >
              {queryLoading ? 'Searching graph...' : 'Search Memory'}
            </button>

            {results.length > 0 && (
              <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                <p className="text-gray-400 text-xs md:text-sm">Found {results.length} result(s):</p>
                {results.map((r, i) => (
                  <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg md:rounded-xl p-4 md:p-6 hover:border-blue-500/50 transition">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                      <span className="text-xs text-gray-400">Graph Link</span>
                    </div>
                    <div className="text-xs md:text-sm text-gray-200">
                      <ReactMarkdown>{r}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Remember & Improve Grid */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
            {/* Remember */}
            <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl md:rounded-2xl p-4 md:p-8">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                <Save className="w-5 h-5 md:w-7 md:h-7 text-purple-400" />
                <span className="hidden md:inline">remember()</span>
              </h2>
              <div className="mb-3 md:mb-4">
                <label className="text-xs text-gray-400 block mb-1 md:mb-2">auto-tagging enabled</label>
              </div>
              <textarea
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 md:p-4 rounded-lg md:rounded-xl mb-3 md:mb-4 h-20 md:h-32 resize-none focus:outline-none focus:border-purple-500 transition text-xs md:text-base"
                placeholder="Paste anything..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={textLoading}
              />
              <input
                className="w-full bg-gray-800 border border-gray-700 text-white p-2 md:p-3 rounded-lg md:rounded-xl mb-3 md:mb-4 focus:outline-none focus:border-purple-500 transition text-xs md:text-sm"
                placeholder="Project context"
                value={dataset}
                onChange={(e) => setDataset(e.target.value)}
                disabled={textLoading}
              />
              <button
                onClick={handleRemember}
                disabled={textLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 md:py-3 rounded-lg md:rounded-xl transition disabled:opacity-50 text-sm md:text-base"
              >
                {textLoading ? 'Saving...' : 'Save to Memory Graph'}
              </button>
              {saveStatus && <p className="text-center mt-2 md:mt-3 text-white text-xs md:text-sm">{saveStatus}</p>}
            </div>

            {/* Improve & Forget */}
            <div className="space-y-4 md:space-y-8">
              {/* Improve */}
              <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl md:rounded-2xl p-4 md:p-8">
                <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 md:w-7 md:h-7 text-yellow-400" />
                  <span className="hidden md:inline">improve()</span>
                </h2>
                <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 hidden md:block">
                  Let AI analyze and optimize your saved context for better retrieval accuracy.
                </p>
                <button
                  onClick={handleImprove}
                  disabled={improveLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 rounded-lg md:rounded-xl transition disabled:opacity-50 mb-3 md:mb-4 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Zap className="w-4 h-4 md:w-5 md:h-5" />
                  Optimize Graph Nodes
                </button>
                  </div>

              {/* Forget */}
              <div className="bg-gray-900/30 border border-red-900/30 rounded-xl md:rounded-2xl p-4 md:p-8">
                <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                  <Trash2 className="w-5 h-5 md:w-7 md:h-7 text-red-400" />
                  <span className="hidden md:inline">forget()</span>
                </h2>
                <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-6 hidden md:block">
                  Permanently purge specific keys or entire project namespaces.
                </p>
                <input
                  className="w-full bg-gray-800 border border-gray-700 text-white p-2 md:p-3 rounded-lg md:rounded-xl mb-3 md:mb-4 focus:outline-none focus:border-red-500 transition text-xs md:text-sm"
                  placeholder="Project to forget"
                  value={forgetDataset}
                  onChange={(e) => setForgetDataset(e.target.value)}
                  disabled={forgetLoading}
                />
                <button
                  onClick={handleForget}
                  disabled={forgetLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 md:py-3 rounded-lg md:rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                  Forget from Memory
                </button>
                {forgetStatus && <p className="text-center mt-2 md:mt-3 text-white text-xs md:text-sm">{forgetStatus}</p>}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800/50 pt-6 md:pt-8 text-center text-gray-500 text-xs md:text-sm">
            <p>Recollect © 2024 Powered by Cognee</p>
          </div>
        </div>
      </div>
    </div>
  )
}