'use client'

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl md:text-7xl font-black mb-6 text-center">Recollect</h1>
      <p className="text-lg md:text-2xl text-gray-400 mb-12 text-center max-w-2xl">
        Your developer workspace memory powered by Cognee's knowledge graph
      </p>
      
      <div className="flex gap-4 mb-20">
        <a href="/workspace" className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
          GET STARTED
        </a>
        <a href="#" className="border border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition">
          LEARN MORE
        </a>
      </div>

      <div className="grid md:grid-cols-4 gap-8 mt-20 max-w-4xl">
        <div className="text-center">
          <div className="text-4xl mb-3">💾</div>
          <h3 className="font-bold mb-2">remember()</h3>
          <p className="text-gray-400 text-sm">Save your snippets</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-bold mb-2">recall()</h3>
          <p className="text-gray-400 text-sm">Search by context</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="font-bold mb-2">improve()</h3>
          <p className="text-gray-400 text-sm">Get smarter</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">🗑️</div>
          <h3 className="font-bold mb-2">forget()</h3>
          <p className="text-gray-400 text-sm">Remove data</p>
        </div>
      </div>

      <footer className="border-t border-gray-800 mt-20 pt-8 text-center text-gray-500 text-sm w-full">
        <p>Built for WeMakeDevs x Cognee Hackathon © 2024</p>
      </footer>
    </div>
  )
}