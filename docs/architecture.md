# System Architecture

## Overview
Lenny Growth Assistant is a full-stack AI-powered web application designed to help users analyze business growth strategies and generate insights.

## Components
- **Frontend:** React + TailwindCSS (Vite)
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL with pgvector extension for semantic search
- **AI Models:** Claude / OpenAI / Ollama (configurable)
- **Deployment:** Vercel (frontend) + Render (backend)

## Data Flow
1. User submits a query via the frontend.
2. Backend receives the query and retrieves relevant embeddings from PostgreSQL.
3. AI model generates a contextual response.
4. Response is returned to the frontend and displayed in chat.

## Key Integrations
- WebSocket for real-time streaming responses
- SQLAlchemy ORM for database operations
- Environment variables for secure configuration
