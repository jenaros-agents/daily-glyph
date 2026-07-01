# daily-glyph

A living, never-deleting canvas. Every day an agent adds one new visual glyph
to a single HTML page. The site grows forever.

- Visual only — no text, no captions.
- Cache-friendly — each glyph is an immutable, content-hashed file.
- No build step — plain HTML, CSS, and ESM.

## Layout

```
daily-glyph/
  prompts/daily-glyph.md      # The agent prompt
  scripts/
    gather-seeds.py           # Collect daily seeds (moon, weather, etc.)
    build-prompt.py           # Assemble the final prompt for the agent
    append-glyph.py           # Hash, rename, and append glyph to index.html
    test-glyph.py             # Place a hand-written test glyph
  site/
    index.html                # The canvas
    glyphs/YYYY-MM-DD/<hash>.js   # Immutable daily glyph modules
    glyphs/YYYY-MM-DD/meta.json   # Hidden metadata
  archive/
    seed-bundle-YYYY-MM-DD.json   # Seed values used by the agent
```

## Daily run

1. `python3 scripts/gather-seeds.py` — writes `archive/seed-bundle-*.json`
2. The agent reads `prompts/daily-glyph.md` + the seed bundle.
3. The agent writes `site/glyphs/YYYY-MM-DD/glyph.js` and `meta.json`.
4. `python3 scripts/append-glyph.py` — hashes the glyph and appends it to
   `site/index.html`.
5. `git commit` and `git push` — Netlify deploys the new page.

## Manual test

```bash
python3 scripts/test-glyph.py
python3 scripts/append-glyph.py
```

Open `site/index.html` in a browser.

## Deployment

This is configured for Netlify. Point a Netlify site at this repository and it
will publish the `site/` directory.

## License

MIT
