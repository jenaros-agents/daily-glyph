# daily-glyph

A living, never-deleting canvas. Every day an agent adds one new visual element
to a single HTML page. The site grows forever.

- Visual only — no text, no captions.
- Cache-friendly — each glyph is an immutable, content-hashed file.
- No build step — plain HTML, CSS, and ESM.

## Layout

```
daily-glyph/
  prompts/daily-glyph.md      # The artist prompt the agent follows
  scripts/
    append-glyph.py           # Hash, rename, and append glyph to index.html
    test-glyph.py             # Place a hand-written test glyph
  site/
    index.html                # The canvas
    glyphs/YYYY-MM-DD/<hash>.js   # Immutable daily glyph modules
    glyphs/YYYY-MM-DD/meta.json   # Hidden metadata
```

## Daily run

1. The agent reads `prompts/daily-glyph.md` and the current `site/index.html`.
2. The agent chooses a unifying concept for the series and decides today's
   contribution (continue, contrast, balance, or start a new phase).
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

This is configured for Netlify. The live site is at
https://daily-glyph-jenaro.netlify.app.

## License

MIT
