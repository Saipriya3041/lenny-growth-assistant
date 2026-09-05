from fastapi import FastAPI
from app.api import chat, health, sessions

app = FastAPI(title="Lenny Growth Assistant")
app.include_router(chat.router)
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(health.router, prefix="/api/health", tags=["Health"])
app.include_router(sessions.router, prefix="/api/sessions", tags=["Sessions"])

@app.get("/")
def root():
    return {"message": "Lenny Growth Assistant Backend is running"}
