"""
artifact_generator.py
Generates structured artifacts (reports, summaries, insights) from AI responses.
"""

from datetime import datetime
from typing import Dict, Any

def generate_artifact(title: str, content: str, metadata: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Create a formatted artifact dictionary with metadata.
    """
    artifact = {
        "title": title.strip(),
        "content": content.strip(),
        "created_at": datetime.utcnow().isoformat(),
        "metadata": metadata or {},
    }
    return artifact


def format_artifact_html(artifact: Dict[str, Any]) -> str:
    """
    Convert artifact dictionary into a styled HTML block.
    """
    return f"""
    <div style="font-family:Inter,sans-serif;padding:20px;background:#faf9f7;border-radius:12px;">
        <h2 style="color:#3b2f26;">{artifact['title']}</h2>
        <p style="color:#4d4742;line-height:1.6;">{artifact['content']}</p>
        <small style="color:#9a918a;">Generated on {artifact['created_at']}</small>
    </div>
    """


def save_artifact_to_file(artifact: Dict[str, Any], filename: str = "artifact.html") -> None:
    """
    Save artifact as an HTML file.
    """
    html = format_artifact_html(artifact)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html)
