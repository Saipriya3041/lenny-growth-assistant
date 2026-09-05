import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL")
    OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")

settings = Settings()
