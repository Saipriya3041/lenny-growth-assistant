import sys
import requests
import json

def main():
    if len(sys.argv) < 2:
        print("Usage: python -m scripts.query \"your question\"")
        return

    question = sys.argv[1]

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "llama3.2:3b", "prompt": question},
        stream=True
    )

    # Ollama streams JSON objects line by line
    for line in response.iter_lines():
        if line:
            data = json.loads(line.decode("utf-8"))
            if "response" in data:
                print(data["response"], end="", flush=True)
            if data.get("done"):
                print()  # newline at the end

if __name__ == "__main__":
    main()
