import requests
from app.providers.base import BaseEmbeddingProvider

class OllamaEmbeddingProvider(BaseEmbeddingProvider):
    def __init__(self, model: str = "llama3.2:3b"):
        self.model = model

    def embed(self, text: str):
        response = requests.post(
            "http://localhost:11434/api/embeddings",
            json={"model": self.model, "prompt": text}
        )
        data = response.json()
        return data.get("embedding", [])
