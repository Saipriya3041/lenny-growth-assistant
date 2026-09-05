import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()  # load .env file

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Example function for similarity search (pgvector)
def get_similar_embeddings(query_vector, limit=5):
    # Placeholder logic — replace with actual pgvector query
    return [
        {"text": "Example result", "similarity_score": 0.87}
    ]
