from pydantic import BaseModel
from typing import List

class EmbeddingCreate(BaseModel):
    text: str
    vector: List[float]

class EmbeddingResponse(BaseModel):
    id: int
    text: str
    similarity_score: float

    class Config:
        orm_mode = True
