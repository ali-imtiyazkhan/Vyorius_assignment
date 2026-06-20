import React from "react";

export default function KanbanFooter() {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div className="foot-brand">
          <a href="#top" className="brand">
            <span className="brand-chip">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2 4 5.5V11c0 5 3.6 8.4 8 10 4.4-1.6 8-5 8-10V5.5L12 2Z" stroke="#DCF986" strokeWidth="2" strokeLinejoin="round" />
                <path d="m8.5 12 2.4 2.4L15.5 9.6" stroke="#DCF986" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="brand-word light">KanbanFlow</span>
          </a>
          <p>A real-time WebSocket-powered Kanban board for modern teams.</p>
          <p className="status-line"><i className="ndot live" />All systems operational</p>
        </div>
        <div className="foot-col">
          <h4>Product</h4>
          <a href="#features">Features</a><a href="#dashboard">Dashboard</a>
          <a href="#how">How it works</a><a href="#">Changelog</a>
        </div>
        <div className="foot-col">
          <h4>Stack</h4>
          <a href="#stack">React</a><a href="#stack">Socket.IO</a>
          <a href="#stack">Vitest</a><a href="#stack">Playwright</a>
        </div>
        <div className="foot-col">
          <h4>Resources</h4>
          <a href="#">Docs</a><a href="#">API</a>
          <a href="#">Status</a><a href="#">GitHub</a>
        </div>
      </div>
      <div className="container foot-base">
        <span>© 2026 KanbanFlow</span>
        <span>MIT License</span>
      </div>
    </footer>
  );
}
