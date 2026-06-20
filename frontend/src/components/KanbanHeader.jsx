import React, { useState } from "react";

export default function KanbanHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <nav className="nav container">
        <a href="#top" className="brand" aria-label="KanbanFlow home">
          <span className="brand-chip" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2 4 5.5V11c0 5 3.6 8.4 8 10 4.4-1.6 8-5 8-10V5.5L12 2Z" stroke="#DCF986" strokeWidth="2" strokeLinejoin="round" />
              <path d="m8.5 12 2.4 2.4L15.5 9.6" stroke="#DCF986" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="brand-word">KanbanFlow</span>
        </a>

        <div className="nav-links" id="navLinks">
          <div className="nav-item has-menu">
            <button className="nav-link nav-trigger" aria-expanded="false">
              Platform
              <svg viewBox="0 0 24 24" fill="none" className="chev">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="mega">
              <a href="#features"><span className="mega-t">Drag & Drop</span><span className="mega-s">Move tasks between columns</span></a>
              <a href="#features"><span className="mega-t">Real-time Sync</span><span className="mega-s">WebSocket-powered updates</span></a>
              <a href="#features"><span className="mega-t">File Uploads</span><span className="mega-s">Attach images & PDFs to tasks</span></a>
            </div>
          </div>
          <a className="nav-link" href="#features">Features</a>
          <a className="nav-link" href="#dashboard">Dashboard</a>
          <a className="nav-link" href="#stack">Tech Stack</a>
          <a className="nav-link" href="#how">How it Works</a>
        </div>

        <div className="nav-right">
          <a href="#dashboard" className="pill pill-ink nav-cta">
            Open Board
            <span className="pill-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <button
            className={`hamburger${open ? " open" : ""}`}
            id="hamburger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-sheet${open ? " open" : ""}`} id="mobileSheet">
        <a href="#features" onClick={() => setOpen(false)}>Features</a>
        <a href="#dashboard" onClick={() => setOpen(false)}>Dashboard</a>
        <a href="#stack" onClick={() => setOpen(false)}>Tech Stack</a>
        <a href="#how" onClick={() => setOpen(false)}>How it Works</a>
        <a href="#dashboard" className="pill pill-ink sheet-cta" onClick={() => setOpen(false)}>Open Board</a>
      </div>
    </header>
  );
}
