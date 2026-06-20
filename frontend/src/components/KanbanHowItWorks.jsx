import React from "react";

export default function KanbanHowItWorks() {
  return (
    <section className="how container" id="how">
      <div className="sec-head reveal-s">
        <span className="eyebrow">How it works</span>
        <h2>From task creation to completion in three simple steps</h2>
      </div>

      <div className="how-rows">
        <div className="how-row reveal-s">
          <div className="how-copy">
            <span className="step-no">01</span>
            <h3>Create & organize tasks</h3>
            <p>Add tasks with a title, priority level, and category. Each task appears in the To Do column, ready to be assigned and tracked.</p>
            <ul className="ticks"><li>Instant task creation</li><li>Priority assignment (Low/Medium/High)</li><li>Category tagging (Bug/Feature/Enhancement)</li></ul>
          </div>
          <div className="how-card">
            <div className="feed-head"><span>Task Activity</span><span className="feed-tag">live</span></div>
            <div className="feed-item"><i className="ndot live" /><div><b>New feature request created</b><small>feature · high priority · 0.4s ago</small></div></div>
            <div className="feed-item"><i className="ndot lime" /><div><b>Bug fix moved to In Progress</b><small>bug · medium · assigned</small></div></div>
            <div className="feed-item warn"><i className="ndot warn" /><div><b>Critical bug reported</b><small>bug · high · auto-tagged</small></div></div>
            <div className="feed-item"><i className="ndot live" /><div><b>Documentation task completed</b><small>enhancement · closed</small></div></div>
          </div>
        </div>

        <div className="how-row rev reveal-s">
          <div className="how-copy">
            <span className="step-no">02</span>
            <h3>Drag, update & collaborate</h3>
            <p>Drag tasks between columns as work progresses. Update priority or category on the fly. Changes sync instantly via WebSockets.</p>
            <ul className="ticks"><li>Drag-and-drop between columns</li><li>Inline priority & category editing</li><li>Real-time multi-user sync</li></ul>
          </div>
          <div className="how-card">
            <div className="feed-head"><span>Column Distribution</span><span className="feed-tag">realtime</span></div>
            <div className="risk-bars">
              <div className="rb"><span>To Do</span><i style={{ "--w": "45%", "--c": "#FF8C42" }} /><b>12</b></div>
              <div className="rb"><span>In Progress</span><i style={{ "--w": "32%", "--c": "#1d1d1d" }} /><b>8</b></div>
              <div className="rb"><span>Done</span><i style={{ "--w": "58%", "--c": "#DCF986" }} /><b>18</b></div>
            </div>
          </div>
        </div>

        <div className="how-row reveal-s">
          <div className="how-copy">
            <span className="step-no">03</span>
            <h3>Track progress & test</h3>
            <p>Monitor task completion with built-in charts. The entire board is backed by comprehensive unit, integration, and E2E tests.</p>
            <ul className="ticks"><li>Real-time progress visualization</li><li>Bar & pie chart dashboards</li><li>Vitest unit + Playwright E2E tests</li></ul>
          </div>
          <div className="how-card">
            <div className="feed-head"><span>Test Suite</span><span className="feed-tag ok">passing</span></div>
            <ol className="run">
              <li className="done">Unit: task CRUD operations</li>
              <li className="done">Integration: WebSocket sync</li>
              <li className="done">Integration: drag-and-drop flow</li>
              <li className="done">E2E: full user workflows</li>
            </ol>
            <div className="run-foot"><i className="ndot lime" />All tests passing in 2.3s</div>
          </div>
        </div>
      </div>
    </section>
  );
}
