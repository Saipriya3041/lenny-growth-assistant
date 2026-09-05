import os
from app.providers.cloud_provider import save_embedding
from app.rag.embeddings import OllamaEmbeddingProvider

TRANSCRIPTS_DIR = "../agent_transcripts"  # adjust path if running from backend

def ingest_transcripts():
    embedder = OllamaEmbeddingProvider()

    for filename in os.listdir(TRANSCRIPTS_DIR):
        if filename.endswith((".txt", ".md")):  # ✅ handle Markdown too
            file_path = os.path.join(TRANSCRIPTS_DIR, filename)
            with open(file_path, "r", encoding="utf-8") as f:
                text = f.read()

            # Generate embedding
            vector = embedder.embed(text)

            # Save to database
            save_embedding(text, vector)
            print(f"Ingested {filename}")

if __name__ == "__main__":
    ingest_transcripts()
