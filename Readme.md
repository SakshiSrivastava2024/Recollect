# Recollect 

Developer workspace memory powered by Cognee's graph-vector hybrid memory.

## The Problem
Developers constantly save code snippets, error solutions, and helpful links. But finding them later is impossible—you remember *what* you saved, not *where*. Standard clipboard managers give you a flat, useless list.

## The Solution
Recollect saves everything you don't want to forget and lets you find it by context, not keywords.

**Save once:** "React useEffect hook for auth" + "dashboard redesign project"  
**Find instantly:** "What was that grid layout I saved with the auth hook?"  
→ Graph traversal connects the dots and finds it.

## How It Uses Cognee

Recollect implements all 4 Cognee lifecycle operations:

- **remember()** — Every snippet you paste gets ingested into Cognee's knowledge graph, linked by project context
- **recall()** — Natural language queries traverse the graph to find contextually related items, not just keyword matches
- **improve()** — Memory learns from patterns. Cognee automatically strengthens connections and identifies recurring gaps
- **forget()** — Permanently remove projects or specific snippets from your memory graph

## Tech Stack

**Backend**
- Python with FastAPI
- Cognee Cloud for persistent graph-vector memory
- SQLite + LanceDB for local caching

**Frontend**
- Next.js with TypeScript
- Tailwind CSS for responsive design
- Lucide React for icons

## Quick Start

### Backend
```bash
cd Recollect
python -m venv venv
venv\Scripts\activate  # Windows
pip install cognee fastapi uvicorn python-dotenv
```

Create `.env`:
COGNEE_SERVICE_URL=your_tenant_url
COGNEE_API_KEY=your_api_key
COGNEE_SKIP_CONNECTION_TEST=true

Run:
```bash
uvicorn main:app --reload
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

## Project Structure
Recollect/
├── main.py              (FastAPI backend)
├── cognee_client.py     (Cognee wrapper)
├── .env                 (config)
└── frontend/
├── app/
│   ├── page.tsx     (landing)
│   └── workspace/   (app dashboard)
└── package.json


## Demo

**Landing Page:** `http://localhost:3000`  
**Workspace:** `http://localhost:3000/workspace`

1. Save a snippet with project context
2. Ask a natural question
3. Graph finds contextually related items
4. See `improve()` optimize memory
5. Use `forget()` to delete projects

## Features

- 💾 **remember()** — Save with project context
- 🔍 **recall()** — Search by context, not keywords
- ✨ **improve()** — Auto-learning memory
- 🗑️ **forget()** — Complete privacy control
- 📱 Fully responsive design
- 🚀 Production-ready architecture

## Built For

WeMakeDevs x Cognee Hackathon 2024 — Best Use of Cognee Cloud Track

## License

MIT