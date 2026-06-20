import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { time: "00:00", tasks: 12 },
  { time: "04:00", tasks: 18 },
  { time: "08:00", tasks: 35 },
  { time: "12:00", tasks: 48 },
  { time: "16:00", tasks: 42 },
  { time: "20:00", tasks: 28 },
  { time: "Now", tasks: 38 },
];

export default function KanbanHero() {
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-content container">
        <span className="eyebrow reveal" data-d="0">// WebSocket-Powered Kanban</span>
        <h1 className="reveal" data-d="1">Manage tasks in real-time with drag-and-drop precision</h1>
        <p className="hero-sub reveal" data-d="2">A fully interactive Kanban board with live WebSocket sync, priority & category assignment, file attachments, and progress charts — all from a single interface.</p>

        <div className="hero-actions reveal" data-d="3">
          <a href="#dashboard" className="pill pill-ink pill-lg btn-icon">
            Open Board
            <span className="pill-arrow lime">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#1d1d1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <a href="#features" className="pill pill-ghost pill-lg btn-icon">
            Explore features
            <span className="pill-arrow gray">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#1d1d1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <div className="console-wrap container reveal" data-d="4">
        <div className="glow glow-lime" aria-hidden="true" />
        <div className="glow glow-ink" aria-hidden="true" />

        <div className="console">
          <div className="console-head">
            <div className="console-id">
              <span className="id-chip"><span className="id-dot" /></span>
              <div>
                <p className="id-eyebrow">Kanban Dashboard</p>
                <h3>Board Status: Active</h3>
              </div>
            </div>
            <div className="console-tools">
              <span className="tool wide">Last 24h</span>
              <span className="tool sq" />
            </div>
          </div>

          <div className="console-grid">
            <aside className="stat-col">
              <div className="stat-card ink">
                <p className="sc-label">Tasks Completed</p>
                <h4 className="counter" data-target="12842">0</h4>
                <div className="bar"><i style={{ "--w": "78%" }} /></div>
              </div>
              <div className="stat-card bone">
                <p className="sc-label dark">Board Usage</p>
                <div className="sc-row">
                  <span className="big counter" data-target="94" data-suffix="%">0</span>
                  <span className="delta">+2.4%</span>
                </div>
              </div>
              <div className="stat-card bone">
                <p className="sc-label dark">Response Time</p>
                <div className="sc-row">
                  <span className="big">38<small>ms</small></span>
                  <span className="delta">-6ms</span>
                </div>
              </div>
            </aside>

            <div className="chart-panel">
              <div className="chart-top">
                <span className="chart-title">Task Activity (24h)</span>
                <div className="legend">
                  <span className="dot lime" />
                  <span className="dot blue" />
                </div>
              </div>
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dcf986" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#dcf986" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid rgba(0,0,0,.08)", fontSize: 12 }} />
                    <Area type="monotone" dataKey="tasks" stroke="#dcf986" strokeWidth={3} fill="url(#heroArea)" dot={{ fill: "#1d1d1d", stroke: "#dcf986", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: "#dcf986", stroke: "#1d1d1d", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="console-status">
            <span className="node"><i className="ndot live" />WebSocket Connected</span>
            <span className="node"><i className="ndot live" />Real-time Sync Active</span>
            <span className="node"><i className="ndot lime" />Drag & Drop Enabled</span>
            <span className="node"><i className="ndot gray" />99.9% Uptime</span>
          </div>
        </div>

        <div className="float-pill" aria-hidden="true">
          <i className="ndot live" /><span>Real-time updates active</span>
        </div>
      </div>
    </section>
  );
}
