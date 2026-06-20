# KanbanFlow — Real-time WebSocket-Powered Kanban Board

> A fully interactive Kanban board with live WebSocket sync, drag-and-drop task management, file attachments, priority & category assignment, and real-time progress charts.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Socket.IO-4-010101?logo=socket.io" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest" alt="Vitest" />
  <img src="https://img.shields.io/badge/Playwright-latest-45BA4B?logo=playwright" alt="Playwright" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite" alt="Vite" />
</p>

---

<p align="center">
  <a href="https://vyorius-assignment-ivory.vercel.app/Screen%20Recording%202026-06-20%20212855.mp4" target="_blank">
    <img src="https://img.shields.io/badge/▶-Watch%20Demo-1d1d1d?style=for-the-badge&logo=github" alt="Watch Demo" />
  </a>
</p>

> [▶ Click here to watch the demo video](https://vyorius-assignment-ivory.vercel.app/Screen%20Recording%202026-06-20%20212855.mp4)

---

## Features

| Feature | Description |
|---------|-------------|
| **Drag & Drop** | Move tasks between **To Do**, **In Progress**, and **Done** columns using dnd-kit |
| **Real-time WebSocket Sync** | Every board change syncs instantly across all connected clients via Socket.IO |
| **Priority & Categories** | Assign priority (Low/Medium/High) and category (Bug/Feature/Enhancement) to each task |
| **File Upload** | Attach images and PDFs to tasks with instant preview |
| **Progress Charts** | Bar and pie charts powered by Recharts, updating in real-time |
| **Live Dashboard** | Response time monitoring, task completion stats, and active connection counters |
| **Comprehensive Testing** | Unit tests (Vitest), integration tests, and end-to-end tests (Playwright) |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, Recharts, dnd-kit, Socket.IO Client |
| **Backend** | Node.js, Express, Socket.IO |
| **Testing** | Vitest, React Testing Library, Playwright |
| **Deployment** | Render (backend), Vercel (frontend) |

## Project Structure

```
websocket-kanban-vitest-playwright/
├── backend/                        # Node.js WebSocket server
│   ├── server.js                   # Express + Socket.IO setup
│   └── package.json
│
├── frontend/                       # React app (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AegisHeader.jsx     # Sticky navigation header
│   │   │   ├── AegisHero.jsx       # Hero section with live console
│   │   │   ├── AegisFeatures.jsx   # Feature grid
│   │   │   ├── AegisMetricsBand.jsx# Metrics counter band
│   │   │   ├── AegisHowItWorks.jsx # How-it-works section
│   │   │   ├── AegisPricing.jsx    # Tech stack showcase
│   │   │   ├── AegisCTABand.jsx    # Call-to-action section
│   │   │   ├── AegisFooter.jsx     # Footer
│   │   │   ├── Dashboard.jsx       # Dashboard wrapper with live metrics
│   │   │   └── KanbanBoard.jsx     # Core kanban board with DnD
│   │   ├── AegisLanding.jsx        # Landing page assembly
│   │   ├── AegisLanding.css        # All landing page styles
│   │   └── tests/
│   │       ├── unit/               # Unit tests (Vitest)
│   │       ├── integration/        # Integration tests (Vitest)
│   │       └── e2e/                # E2E tests (Playwright)
│   ├── public/assets/              # Font files
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd websocket-kanban-vitest-playwright
```

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

### 2. Start the Backend

```bash
cd backend
npm start
```

The WebSocket server starts on **http://localhost:5000**.

### 3. Start the Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The app opens at **http://localhost:3000**.

### 4. Open the Board

Click **Open Board** in the navigation or scroll to the **Dashboard** section to start adding and managing tasks in real-time.

## Running Tests

```bash
cd frontend
```

**Unit & Integration Tests (Vitest):**

```bash
npm test
```

**End-to-End Tests (Playwright):**

```bash
npm run test:e2e
```

## Deployment

### Backend → Render

1. Push your repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New +** → **Web Service**.
3. Connect your repository.
4. Configure:

   | Setting | Value |
   |---------|-------|
   | **Root Directory** | `backend` |
   | **Build Command** | `npm install` |
   | **Start Command** | `node server.js` |
   | **Runtime** | Node |

5. Add environment variables:

   | Variable | Value |
   |----------|-------|
   | `PORT` | `10000` (Render sets this automatically) |
   | `CORS_ORIGIN` | `https://your-frontend.vercel.app` (your Vercel URL) |

6. Click **Deploy**. Copy the URL (e.g. `https://kanban-api.onrender.com`).

### Frontend → Vercel

1. Go to [Vercel Dashboard](https://vercel.com/) → **Add New** → **Project**.
2. Import your repository.
3. Configure:

   | Setting | Value |
   |---------|-------|
   | **Root Directory** | `frontend` |
   | **Framework Preset** | Vite |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |

4. Add environment variable:

   | Variable | Value |
   |----------|-------|
   | `VITE_WS_URL` | `https://kanban-api.onrender.com` (your Render URL) |

5. Click **Deploy**.

> Your KanbanFlow app is now live!

### Environment Variables Summary

| Variable | Where | Purpose |
|----------|-------|---------|
| `PORT` | Backend (Render) | Server port |
| `CORS_ORIGIN` | Backend (Render) | Allowed CORS origin |
| `VITE_WS_URL` | Frontend (Vercel) | WebSocket server URL |

## Preview Video

To add a preview video:

1. Record your screen showing the app (e.g., adding tasks, dragging between columns, real-time sync).
2. Upload the video to GitHub as an asset, or use a hosting service.
3. Replace the placeholder URL in this README with your video link:

```markdown
https://github.com/user-attachments/assets/your-video-file
```
