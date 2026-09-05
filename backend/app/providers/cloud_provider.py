from sqlalchemy import create_engine, Column, Integer, String, Float, Table, MetaData, text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from typing import List, Optional

# Load environment variables from .env file (root of project)
load_dotenv()

# Get database URL from environment
DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Please add it to your .env file.")

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
metadata = MetaData()

# Table for storing embeddings
embeddings_table = Table(
    "embeddings",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("text", String, nullable=False),
    Column("vector", ARRAY(Float), nullable=False)
)

# Create table if not exists
metadata.create_all(engine)


def save_embedding(text: str, vector: List[float]) -> None:
    """Save a text + embedding vector into the database"""
    with SessionLocal() as session:
        session.execute(
            embeddings_table.insert().values(text=text, vector=vector)
        )
        session.commit()


def get_all_embeddings() -> List[tuple]:
    """Retrieve all embeddings stored in the database"""
    with SessionLocal() as session:
        results = session.execute(embeddings_table.select()).fetchall()
        return results


def search_similar_embeddings(query_vector: List[float], limit: int = 5) -> List[tuple]:
    """
    Retrieve embeddings most similar to the query vector using pgvector.
    Requires pgvector extension enabled in PostgreSQL.
    """
    with SessionLocal() as session:
        sql = text("""
            SELECT text, vector
            FROM embeddings
            ORDER BY vector <-> :query_vector
            LIMIT :limit
        """)
        results = session.execute(sql, {"query_vector": query_vector, "limit": limit}).fetchall()
        return results
