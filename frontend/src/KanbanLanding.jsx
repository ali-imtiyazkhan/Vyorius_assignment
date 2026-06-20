import React, { useEffect } from "react";
import KanbanHeader from "./components/KanbanHeader";
import KanbanHero from "./components/KanbanHero";
import KanbanTrustStrip from "./components/KanbanTrustStrip";
import KanbanFeatures from "./components/KanbanFeatures";
import KanbanMetricsBand from "./components/KanbanMetricsBand";
import KanbanHowItWorks from "./components/KanbanHowItWorks";
import KanbanPricing from "./components/KanbanPricing";
import KanbanCTABand from "./components/KanbanCTABand";
import KanbanFooter from "./components/KanbanFooter";
import "./KanbanLanding.css";

export default function KanbanLanding({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealEls = document.querySelectorAll(".kanban-landing .reveal, .kanban-landing .reveal-s");
    if (reduce) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }

    function animateCount(el) {
      const target = parseFloat(el.getAttribute("data-target"));
      const dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      if (reduce) {
        el.textContent = target.toFixed(dec) + suffix;
        return;
      }
      const dur = 1500;
      let start = null;
      function fmt(v) {
        const s = dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US");
        return s + suffix;
      }
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = fmt(target);
      }
      requestAnimationFrame(step);
    }

    const counters = document.querySelectorAll(".kanban-landing .counter");
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => cio.observe(c));

    const consoleEl = document.querySelector(".kanban-landing .console");
    if (consoleEl) {
      const conIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              consoleEl.classList.add("in");
              conIo.unobserve(consoleEl);
            }
          });
        },
        { threshold: 0.25 }
      );
      conIo.observe(consoleEl);
    }

    const header = document.querySelector(".kanban-landing .site-header");
    function onScroll() {
      header.style.borderBottomColor =
        window.scrollY > 8 ? "rgba(0,0,0,.07)" : "transparent";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="kanban-landing">
      <KanbanHeader />
      <main>
        <KanbanHero />
        <KanbanFeatures />
        {children && (
          <section className="dashboard-section container" id="dashboard">
            <div className="sec-head reveal-s">
              <span className="eyebrow">Dashboard</span>
              <h2>Real-time Kanban Board</h2>
              <p>Manage tasks across your team with live WebSocket updates and drag-and-drop.</p>
            </div>
            <KanbanTrustStrip />
            {children}
          </section>
        )}
        <KanbanHowItWorks />


        <KanbanPricing />
        <KanbanCTABand />
      </main>
      <KanbanFooter />
    </div>
  );
}
