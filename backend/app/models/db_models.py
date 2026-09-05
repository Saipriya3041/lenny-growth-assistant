from importlib import import_module

from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.declarative import declarative_base

try:
    Vector = import_module("pgvector.sqlalchemy").Vector
except (ImportError, AttributeError):
    # Keep model imports working until the optional pgvector package is installed.
    Vector = lambda dimensions: ARRAY(Float, dimensions=1)

Base = declarative_base()

class Embedding(Base):
    __tablename__ = "embeddings"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    vector = Column(Vector(1536))  # Adjust dimension to match your model
    similarity_score = Column(Float, default=0.0)
