Here’s a complete **README.md file** you can drop directly into your project root. It’s formatted and ready to use:

```markdown
# Lenny Growth Assistant 🚀

An AI-powered web application that helps users analyze business growth strategies, generate insights, and create structured artifacts.  
Built with **FastAPI**, **React**, **PostgreSQL + pgvector**, and supports multiple AI providers (Claude, OpenAI, Ollama).

---

## 📂 Project Structure
```
lenny-growth-assistant/
│
├── backend/        # FastAPI backend
│   ├── app/        # Core application (main.py, db.py, providers, models)
│   ├── tests/      # Pytest test suite
│   └── docs/       # Architecture, design, PRD
│
├── frontend/       # React + Vite frontend
│   └── src/        # Components, pages, styles
│
└── README.md       # Project overview
```

---

## ⚙️ Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL with **pgvector** extension
- Ollama (for local model inference) → [Install here](https://ollama.ai)

---

## 🔧 Backend Setup
1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure environment variables in `.env`:
   ```
   DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/lenny_db
   ```
4. Run the backend:
   ```bash
   uvicorn app.main:app --reload
   ```

---

## 🎨 Frontend Setup
1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

---

## 🤖 Using Ollama
1. Install Ollama locally.  
2. Pull a model (example: Llama 3):
   ```bash
   ollama pull llama3
   ```
3. Run the model:
   ```bash
   ollama run llama3
   ```
4. Backend will connect to Ollama via its local API.

---

## 🧪 Running Tests
From project root:
```bash
pytest backend/tests -v
```

---

## 📄 Documentation
- `docs/architecture.md` → System architecture  
- `docs/design.md` → UI/UX design  
- `docs/PRD.md` → Product requirements  

---

## 🚀 Deployment
- **Frontend:** Deploy on Vercel or Netlify (`npm run build`).  
- **Backend:** Deploy on Render, Railway, or Heroku (`pip install -r requirements.txt && uvicorn app.main:app`).  
- Ensure environment variables (`DATABASE_URL`, API keys) are set in the hosting platform.

---

## ✅ GitHub Best Practices
- Do **not** upload `venv/`, `.pytest_cache/`, `.env`, or Ollama binaries.  
- Use `.gitignore` to keep your repo clean:
  ```
  venv/
  __pycache__/
  .pytest_cache/
  .env
  ```

---

## 📌 Roadmap
- Add dashboard analytics
- Support multi-user collaboration
- Voice input/output integration
```

---

This README is ready to commit. It explains setup, usage, docs, and deployment in one place.  

