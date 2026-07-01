#!/usr/bin/env python3
"""
Run the full daily glyph pipeline without an agent.
Use this to test the scaffold with a hand-written glyph.
"""
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def main():
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")
    day_dir = ROOT / "site" / "glyphs" / date_str
    day_dir.mkdir(parents=True, exist_ok=True)

    # A simple test glyph: a glowing orb whose color changes with the day.
    glyph = """
const hue = (new Date().getDate() * 15) % 360;
const div = document.createElement('div');
div.style.position = 'absolute';
div.style.left = '10vw';
div.style.top = '10vh';
div.style.width = '20vmin';
div.style.height = '20vmin';
div.style.borderRadius = '50%';
div.style.background = `radial-gradient(circle, hsl(${hue}, 80%, 60%), transparent 70%)`;
div.style.filter = 'blur(8px)';
div.style.opacity = '0.8';
div.style.animation = 'pulse 8s ease-in-out infinite';

const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;
document.head.appendChild(style);
document.body.appendChild(div);
""".strip()

    (day_dir / "glyph.js").write_text(glyph)
    (day_dir / "meta.json").write_text(json.dumps({
        "date": date_str,
        "seeds_used": ["test"],
        "description": "A glowing orb test glyph.",
        "library": None,
    }, indent=2))

    print(f"Wrote test glyph to {day_dir}")

if __name__ == "__main__":
    main()
