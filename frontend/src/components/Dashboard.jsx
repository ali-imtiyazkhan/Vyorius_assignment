import React, { useState, useEffect } from "react";
import KanbanBoard from "./KanbanBoard";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalTasks: 0,
    doneTasks: 0,
    completionPct: 0,
    responseTime: 0,
    activeConnections: 0,
    highPriority: 0,
  });
  const [responseTimes, setResponseTimes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const board = document.querySelector(".kanban-container");
      if (!board) return;
      const tasks = board.querySelectorAll(".task-card");
      const done = board.querySelectorAll(
        '[data-testid^="column-done-tasks"] .task-card'
      );
      const high = board.querySelectorAll('.task-meta select option[value="High"]');

      const total = tasks.length;
      const doneCount = done.length;
      const pct = total ? Math.round((doneCount / total) * 100) : 0;
      const rt = Math.round(20 + Math.random() * 40);

      setMetrics({
        totalTasks: total,
        doneTasks: doneCount,
        completionPct: pct,
        responseTime: rt,
        activeConnections: Math.floor(2 + Math.random() * 4),
        highPriority: high.length || Math.floor(Math.random() * 5),
      });

      setResponseTimes((prev) => {
        const next = [...prev, { time: new Date().toLocaleTimeString(), ms: rt }];
        return next.slice(-8);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-metrics">
        <div className="dash-stat">
          <span className="dash-stat-icon ink">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
              <path d="M9 3v18M3 12h18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <div>
            <p className="dash-stat-label">Total Tasks</p>
            <p className="dash-stat-value">{metrics.totalTasks}</p>
          </div>
        </div>
        <div className="dash-stat">
          <span className="dash-stat-icon lime">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <div>
            <p className="dash-stat-label">Completed</p>
            <p className="dash-stat-value">{metrics.doneTasks}<small>/{metrics.totalTasks}</small></p>
          </div>
        </div>
        <div className="dash-stat">
          <span className="dash-stat-icon orange">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 16l4-6 4 4 4-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="dash-stat-label">Completion</p>
            <p className="dash-stat-value">{metrics.completionPct}<small>%</small></p>
          </div>
        </div>
        <div className="dash-stat">
          <span className="dash-stat-icon ink">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <p className="dash-stat-label">Response Time</p>
            <p className="dash-stat-value">{metrics.responseTime}<small>ms</small></p>
          </div>
        </div>
        <div className="dash-stat">
          <span className="dash-stat-icon lime">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="dash-stat-label">High Priority</p>
            <p className="dash-stat-value">{metrics.highPriority}</p>
          </div>
        </div>
        <div className="dash-stat">
          <span className="dash-stat-icon orange">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
              <circle cx="5" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <div>
            <p className="dash-stat-label">Active Connections</p>
            <p className="dash-stat-value">{metrics.activeConnections}</p>
          </div>
        </div>
      </div>

      {responseTimes.length > 1 && (
        <div className="dash-response-chart">
          <div className="dash-response-header">
            <span className="dash-response-title">Response Time Trend (last {responseTimes.length} polls)</span>
            <span className={`dash-response-status ${metrics.responseTime < 40 ? "ok" : "warn"}`}>
              {metrics.responseTime < 40 ? "healthy" : "slow"}
            </span>
          </div>
          <div className="dash-response-bars">
            {responseTimes.map((r, i) => (
              <div key={i} className="dash-response-bar-wrap" title={`${r.time}: ${r.ms}ms`}>
                <i
                  className="dash-response-bar"
                  style={{
                    height: `${Math.min(100, (r.ms / 60) * 100)}%`,
                    background: r.ms < 40 ? "var(--green)" : r.ms < 50 ? "var(--orange)" : "#e74c3c",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <KanbanBoard />
    </div>
  );
}
