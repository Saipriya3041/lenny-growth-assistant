"""
test_api.py
Tests FastAPI endpoints for basic functionality and response structure.
"""

from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)

def test_query_endpoint():
    payload = {"question": "What is growth hacking?"}
    response = client.post("/query", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert isinstance(data["answer"], str)

def test_websocket_connection():
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("Hello")
        message = websocket.receive_text()
        assert isinstance(message, str)
