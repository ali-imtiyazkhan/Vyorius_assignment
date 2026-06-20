import React from "react";

export default function KanbanMetricsBand() {
  return (
    <section className="metrics-band">
      <div className="container metrics-grid">
        <div className="metric">
          <span className="m-num"><span className="counter" data-target="99.99" data-dec="2">0</span>%</span>
          <span className="m-lab">WebSocket uptime</span>
        </div>
        <div className="metric">
          <span className="m-num"><span className="counter" data-target="1.2" data-dec="1">0</span>K</span>
          <span className="m-lab">Tasks processed daily</span>
        </div>
        <div className="metric">
          <span className="m-num">&lt;<span className="counter" data-target="40">0</span>ms</span>
          <span className="m-lab">Sync latency</span>
        </div>
        <div className="metric">
          <span className="m-num"><span className="counter" data-target="100">0</span>%</span>
          <span className="m-lab">Test coverage target</span>
        </div>
      </div>
    </section>
  );
}
