# AI Video Studio — Frontend

A responsive React frontend concept for one AI platform with two main tools:
- **AI Noise Remover** — interface for cleaning audio in videos.
- **AI Shorts Generator** — interface for finding important moments in long videos.
- Shared dashboard, projects, exports and video editor screens.

## Tech stack
- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React icons

## Run locally

Install Node.js (LTS), then in this project folder run:

```bash
npm install
npm run dev
```

Open the local URL Vite prints in the terminal.

To test a production build:

```bash
npm run build
npm run preview
```

## GitHub upload

Upload the contents of this folder to the root of your repository. Include `package.json`, `index.html`, config files, `README.md`, and `src/`. Do not upload `node_modules` or `dist`.

## Important
This is a **frontend-only prototype**. The upload controls, processing progress, project list, audio controls and export buttons demonstrate the UI using local demo state. They do not yet upload/process videos or connect to AI models. A backend (for example, Python + FastAPI + FFmpeg + suitable AI models) must be added later.
