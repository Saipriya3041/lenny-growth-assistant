import os
import requests

TRANSCRIPTS_DIR = "agent_transcripts"

def download_transcripts():
    """
    Example: download transcripts from a remote API and save them locally.
    Replace the URL with your actual source.
    """
    os.makedirs(TRANSCRIPTS_DIR, exist_ok=True)

    # Example: pretend we have an API returning transcripts
    url = "https://example.com/api/transcripts"
    response = requests.get(url)
    transcripts = response.json()  # assume list of {id, text}

    for t in transcripts:
        file_path = os.path.join(TRANSCRIPTS_DIR, f"{t['id']}.txt")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(t["text"])
        print(f"Saved transcript {t['id']}")

if __name__ == "__main__":
    download_transcripts()
