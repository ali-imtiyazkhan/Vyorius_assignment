import React from "react";

export default function KanbanTrustStrip() {
  return (
    <section className="trust container">
      <p className="trust-eyebrow">Built with</p>
      <div className="logos">
        <span>React</span><span>Socket.IO</span><span>Vitest</span>
        <span>Playwright</span><span>Recharts</span><span>dnd-kit</span>
      </div>
    </section>
  );
}
