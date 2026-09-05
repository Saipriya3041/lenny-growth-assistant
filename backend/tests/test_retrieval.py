
"""
test_retrieval.py
Tests pgvector-based embedding retrieval and similarity search.
"""

from app.db import get_similar_embeddings

def test_similarity_search():
    query_vector = [0.1] * 1536  # Example vector
    results = get_similar_embeddings(query_vector, limit=5)
    assert isinstance(results, list)
    assert len(results) <= 5
    if results:
        assert "text" in results[0]
        assert "similarity_score" in results[0]
