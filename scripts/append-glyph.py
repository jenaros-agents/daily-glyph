#!/usr/bin/env python3
"""
Append today's glyph to site/index.html.

Expects:
  site/glyphs/YYYY-MM-DD/glyph.js
  site/glyphs/YYYY-MM-DD/meta.json

Renames glyph.js to its content hash, updates the HTML, and writes meta.json.
"""
import hashlib
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
GLYPHS = SITE / "glyphs"
INDEX = SITE / "index.html"

HASH_RE = re.compile(r"^[a-f0-9]{8}$")


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()[:8]


def main():
    backfill = os.environ.get("BACKFILL_DATE")
    if backfill:
        now = datetime.strptime(backfill, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    else:
        now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")
    day_dir = GLYPHS / date_str

    if not day_dir.exists():
        print(f"Glyph directory not found: {day_dir}", file=sys.stderr)
        sys.exit(1)

    glyph_file = day_dir / "glyph.js"
    meta_file = day_dir / "meta.json"

    if not glyph_file.exists():
        print(f"Glyph file not found: {glyph_file}", file=sys.stderr)
        sys.exit(1)

    if not meta_file.exists():
        print(f"Meta file not found: {meta_file}", file=sys.stderr)
        sys.exit(1)

    # Validate and update meta.json.
    with open(meta_file) as f:
        meta = json.load(f)
    meta["date"] = date_str
    meta.setdefault("seeds_used", [])
    meta.setdefault("description", "")
    meta.setdefault("library", None)
    with open(meta_file, "w") as f:
        json.dump(meta, f, indent=2)

    # Hash and copy glyph.js to immutable name.
    h = sha256_file(glyph_file)
    hashed_file = day_dir / f"{h}.js"
    if not hashed_file.exists():
        import shutil
        shutil.copy2(glyph_file, hashed_file)

    # Ensure the CSS file exists as either <hash>.css or none at all.
    css_file = day_dir / "glyph.css"
    hashed_css = day_dir / f"{h}.css"
    if css_file.exists() and not hashed_css.exists():
        import shutil
        shutil.copy2(css_file, hashed_css)

    # Build the HTML injection.
    rel_path = f"/glyphs/{date_str}/{hashed_file.name}"
    script_tag = f'  <script type="module" src="{rel_path}"></script>'

    rel_css_path = f"/glyphs/{date_str}/{hashed_css.name}"
    css_tag = f'  <link rel="stylesheet" href="{rel_css_path}">'

    with open(INDEX) as f:
        html = f.read()

    marker = "<!-- GLYPHS: injected by append-glyph.py -->"
    if marker not in html:
        print("Marker not found in index.html", file=sys.stderr)
        sys.exit(1)

    # Avoid duplicate entries for the same date.
    if date_str in html:
        print(f"Entry for {date_str} already exists in index.html, skipping append.", file=sys.stderr)
        sys.exit(0)

    insert_lines = [script_tag]
    if hashed_css.exists():
        insert_lines.insert(0, css_tag)
    insertion = "\n" + "\n".join(insert_lines) + "\n"

    # Insert after the marker so older scripts stay first in DOM order and render below newer ones.
    html = html.replace(
        marker,
        marker + insertion,
        1,
    )

    with open(INDEX, "w") as f:
        f.write(html)

    print(f"Appended {rel_path}")
    if hashed_css.exists():
        print(f"Appended {rel_css_path}")


if __name__ == "__main__":
    main()
