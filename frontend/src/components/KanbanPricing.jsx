import React from "react";

export default function KanbanPricing() {
  return (
    <section className="pricing container" id="stack">
      <div className="sec-head reveal-s">
        <span className="eyebrow">Tech Stack</span>
        <h2>Modern tools for modern teams</h2>
        <p>Built with industry-standard libraries and frameworks for real-time collaboration.</p>
      </div>
      <div className="plans">
        <article className="plan reveal-s">
          <p className="plan-name">Frontend</p>
          <p className="plan-price">React</p>
          <p className="plan-desc">Component-based UI with hooks, context, and reactive state management.</p>
          <ul className="ticks"><li>Vite build tooling</li><li>ESLint + Prettier</li><li>Functional components</li><li>Custom hooks</li></ul>
        </article>
        <article className="plan featured reveal-s">
          <span className="pop">Core</span>
          <p className="plan-name">Backend</p>
          <p className="plan-price">Node.js</p>
          <p className="plan-desc">Lightweight WebSocket server handling real-time events and in-memory state.</p>
          <ul className="ticks"><li>Express + Socket.IO</li><li>Event-driven architecture</li><li>In-memory task storage</li><li>Cross-origin support</li></ul>
        </article>
        <article className="plan reveal-s">
          <p className="plan-name">Testing</p>
          <p className="plan-price">Vitest</p>
          <p className="plan-desc">Comprehensive testing suite across unit, integration, and E2E levels.</p>
          <ul className="ticks"><li>React Testing Library</li><li>WebSocket mock testing</li><li>Playwright E2E tests</li><li>CI-ready configuration</li></ul>
        </article>
      </div>
    </section>
  );
}
