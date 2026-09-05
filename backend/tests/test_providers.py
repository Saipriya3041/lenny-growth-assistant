"""
test_providers.py
Tests AI provider integrations (Claude, OpenAI, Ollama).
"""

import pytest
from app.providers import ollama_client, openai_client, claude_client

@pytest.mark.parametrize("provider", ["ollama", "openai", "claude"])
def test_provider_response(provider):
    if provider == "ollama":
        response = ollama_client.ask("Explain growth loops.")
    elif provider == "openai":
        response = openai_client.ask("Explain growth loops.")
    else:
        response = claude_client.ask("Explain growth loops.")

    assert isinstance(response, str)
    assert len(response) > 10
