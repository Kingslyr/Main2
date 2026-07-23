# EnviroCore (Main2)

This repository contains a static front-end demo (EnviroCore) that uses Three.js to render an Earth scene. I fixed the project so it can run immediately without needing any local asset uploads.

What I changed

- main.js
  - Replaced local texture loads (assets/*.jpg / *.png) with stable raw GitHub CDN URLs so the demo runs without local image files.
  - Fixed duplicate variable names and duplicate function declarations (two `stars` consts and two `animate()` functions were present). I renamed and consolidated starfields and merged the animation logic into a single `animate()` function.
  - Moved light creation before the animation loop.
  - Moved the `window.load` handler out of the resize listener and avoided variable shadowing.
  - Cleaned up the resize handler so it only updates camera/renderer.

- README.md (this file)

How to run locally

1. Clone the repo:

   git clone https://github.com/Kingslyr/Main2.git
   cd Main2

2. Serve the files over HTTP (required for module imports and textures). Examples:

   # Python 3
   python -m http.server 8000

   # Node (serve)
   npx serve -s . -l 8000

   # VS Code
   # Use the Live Server extension and "Go Live"

3. Open http://localhost:8000 in your browser.

Publishing with GitHub Pages

- In the repository Settings → Pages, set the source to the `main` branch (root) or the `gh-pages` branch if you prefer to deploy from a specific branch. Save and GitHub Pages will publish `index.html`.

Notes

- I used public textures hosted in the three.js repository so the demo works immediately. If you prefer to include your own images in `/assets`, replace the texture URLs in `main.js` with the local paths and commit the assets.

- The PR branch is `fix/threejs-run` and contains the changes. After reviewing you can merge to `main`.
