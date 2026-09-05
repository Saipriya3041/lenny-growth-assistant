# Initial Scaffolding

## Frontend
- Framework: React (Vite)
- Styling: Tailwind CSS
- Entry point: `src/App.tsx`
- Components:
  - `ChatPane` → main chat interface
  - `ModelSelector` → choose AI model
  - `MessageItem` → display chat messages
  - `ArtifactViewer` → preview generated artifacts

## Backend
- Framework: FastAPI
- Endpoint: `POST /query` for Q&A
- WebSocket: `ws://localhost:8000/ws` for streaming responses

## Setup Commands
```bash
npm create vite@latest frontend
cd frontend
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

