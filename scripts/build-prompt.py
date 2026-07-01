#!/usr/bin/env python3
"""
Build the agent prompt by substituting the seed bundle into the template.
Outputs the final prompt to stdout.
"""
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROMPT_FILE = ROOT / "prompts" / "daily-glyph.md"


def main():
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")
    seed_path = ROOT / "archive" / f"seed-bundle-{date_str}.json"

    if not seed_path.exists():
        print(f"Seed bundle not found: {seed_path}", file=sys.stderr)
        sys.exit(1)

    with open(seed_path) as f:
        bundle = json.load(f)

    with open(PROMPT_FILE) as f:
        prompt = f.read()

    prompt = prompt.replace("YYYY-MM-DD", date_str)
    prompt = prompt.replace(
        "archive/seed-bundle-YYYY-MM-DD.json", str(seed_path)
    )

    # Add a JSON dump of the seed bundle so the agent has exact values.
    seed_block = (
        "---\n\n"
        "## TODAY'S SEED BUNDLE\n\n"
        "```json\n"
        + json.dumps(bundle, indent=2)
        + "\n```\n"
    )

    print(prompt + seed_block)


if __name__ == "__main__":
    main()
