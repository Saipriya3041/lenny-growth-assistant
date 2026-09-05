import requests

def query_ollama(prompt: str, context: str):
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "llama3.2:3b", "prompt": f"{context}\n\nUser: {prompt}"}
        )
        data = response.json()
        return data.get("response", "No response from model.")
    except Exception as e:
        return f"Error querying Ollama: {e}"
