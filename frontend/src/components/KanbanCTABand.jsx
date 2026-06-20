import React from "react";

export default function KanbanCTABand() {
  return (
    <section className="cta-band">
      <div className="container cta-inner reveal-s">
        <div className="hero-grid sm" aria-hidden="true" />
        <h2>Start managing tasks in real-time</h2>
        <p>Open the Kanban board and experience live WebSocket-powered collaboration. Add, move, and track tasks instantly.</p>
        <a href="#dashboard" className="pill pill-lime pill-lg btn-icon">
          Go to Dashboard
          <span className="pill-arrow">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#1d1d1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
