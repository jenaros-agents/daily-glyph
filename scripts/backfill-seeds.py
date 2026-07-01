#!/usr/bin/env python3
"""Backfill the last N days of glyphs."""
import os
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def main():
    days = int(sys.argv[1]) if len(sys.argv) > 1 else 7
    today = datetime.now(timezone.utc).date()
    for i in range(days, 0, -1):
        d = today - timedelta(days=i)
        date_str = d.strftime("%Y-%m-%d")
        print(f"\n=== Backfilling {date_str} ===")
        env = os.environ.copy()
        env["BACKFILL_DATE"] = date_str
        subprocess.run([sys.executable, "scripts/gather-seeds.py"], cwd=ROOT, env=env, check=True)
        print(f"Seed bundle ready for {date_str}. Next: generate glyph and append.")

if __name__ == "__main__":
    main()
