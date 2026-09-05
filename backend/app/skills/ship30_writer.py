"""
ship30_writer.py
Generates structured writing drafts (essays, posts, reflections) using AI prompts.
"""

from datetime import datetime
from typing import List, Dict

def create_outline(topic: str, key_points: List[str]) -> str:
    """
    Create a structured outline for a writing piece.
    """
    outline = f"# {topic}\n\n"
    for i, point in enumerate(key_points, start=1):
        outline += f"{i}. {point}\n"
    return outline


def generate_draft(topic: str, outline: str, tone: str = "professional") -> str:
    """
    Generate a draft based on outline and tone.
    """
    intro = f"Let's explore {topic} in a {tone} tone.\n\n"
    body = "\n".join([f"- {line}" for line in outline.split("\n") if line.strip()])
    conclusion = "\n\nIn summary, {topic} offers valuable insights worth reflecting on."
    return intro + body + conclusion


def export_draft(draft: str, filename: str = "draft.txt") -> None:
    """
    Save the generated draft to a text file.
    """
    with open(filename, "w", encoding="utf-8") as f:
        f.write(f"Generated on {datetime.utcnow().isoformat()}\n\n{draft}")
