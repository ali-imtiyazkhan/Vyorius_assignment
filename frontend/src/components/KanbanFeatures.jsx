import React from "react";

export default function KanbanFeatures() {
  return (
    <section className="features container" id="features">
      <div className="sec-head reveal-s">
        <span className="eyebrow">Capabilities</span>
        <h2>A complete task management surface, engineered for teams</h2>
        <p>Every feature you need — drag-and-drop, real-time sync, file uploads, and progress visualization — all in one board.</p>
      </div>
      <div className="feature-grid">
        <article className="feat reveal-s">
          <span className="feat-ic">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="#1d1d1d" strokeWidth="1.8" />
              <path d="M3 9h18M9 3v18" stroke="#1d1d1d" strokeWidth="1.8" />
            </svg>
          </span>
          <h3>Drag & Drop Columns</h3>
          <p>Move tasks between To Do, In Progress, and Done with intuitive drag-and-drop powered by dnd-kit.</p>
        </article>
        <article className="feat reveal-s">
          <span className="feat-ic">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#1d1d1d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="19" cy="6" r="2" stroke="#1d1d1d" strokeWidth="1.8" />
              <circle cx="5" cy="18" r="2" stroke="#1d1d1d" strokeWidth="1.8" />
            </svg>
          </span>
          <h3>Real-time WebSocket Sync</h3>
          <p>All board changes are synchronized instantly across connected clients using Socket.IO.</p>
        </article>
        <article className="feat reveal-s">
          <span className="feat-ic">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16v16H4V4Z" stroke="#1d1d1d" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M8 8h8v8H8V8Z" stroke="#1d1d1d" strokeWidth="1.8" />
              <path d="M16 8l4 4-4 4" stroke="#1d1d1d" strokeWidth="1.8" />
            </svg>
          </span>
          <h3>File Upload & Previews</h3>
          <p>Attach images and PDFs to tasks with instant preview and URL-based storage simulation.</p>
        </article>
        <article className="feat reveal-s">
          <span className="feat-ic">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 3v18h18" stroke="#1d1d1d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 16l4-6 4 4 4-8" stroke="#1d1d1d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3>Progress Charts</h3>
          <p>Visualize task distribution with bar and pie charts that update in real-time as tasks move.</p>
        </article>
        <article className="feat reveal-s">
          <span className="feat-ic">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" stroke="#1d1d1d" strokeWidth="1.8" />
              <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z" stroke="#1d1d1d" strokeWidth="1.8" />
            </svg>
          </span>
          <h3>Priority & Categories</h3>
          <p>Assign Low, Medium, or High priority and categorize tasks as Bug, Feature, or Enhancement.</p>
        </article>
        <article className="feat reveal-s">
          <span className="feat-ic">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5Z" stroke="#1d1d1d" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5" stroke="#1d1d1d" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" stroke="#1d1d1d" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </span>
          <h3>Comprehensive Testing</h3>
          <p>Unit tests with Vitest, integration tests for WebSocket sync, and E2E tests with Playwright.</p>
        </article>
      </div>
    </section>
  );
}
