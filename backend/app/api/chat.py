from fastapi import APIRouter
from pydantic import BaseModel
from app.providers.cloud_provider import save_embedding, search_similar_embeddings
from app.rag.embeddings import OllamaEmbeddingProvider
import requests

router = APIRouter()
embedder = OllamaEmbeddingProvider()

class ChatRequest(BaseModel):
    sessionId: str
    message: str

@router.post("/chat")
def chat_endpoint(req: ChatRequest):
    # Step 1: Embed user message
    vector = embedder.embed(req.message)

    # Step 2: Save embedding
    save_embedding(req.message, vector)

    # Step 3: Retrieve similar context
    context_results = search_similar_embeddings(vector)
    context_texts = [row.text for row in context_results]

    # Step 4: Call Ollama with context
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3.2:3b",
            "prompt": f"Context: {context_texts}\n\nUser: {req.message}\nAssistant:"
        }
    )
    answer = response.json().get("response", "")

    return {"answer": answer}
