# Main2

This repository is a static Three.js site. Serve the repository root over HTTP to run it locally.

## Run locally

From `/home/runner/work/Main2/Main2`:

```bash
python -m http.server 8000
```

Or with Node:

```bash
npx serve -s . -l 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Push the site files to the `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**.
5. Save, then open the published URL shown by GitHub Pages.
