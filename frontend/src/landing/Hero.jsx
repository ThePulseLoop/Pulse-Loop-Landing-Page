import React, { useRef } from "react";
import { HERO_FOCUS_DELAY_MS } from "./constants";
import { submitWaitlist, useHeroCanvas } from "./hooks";

function HeroProductCard() {
  return (
    <div className="hero-visual">
      <div className="hero-card">
        <div className="hc-topbar">
          <div className="hc-dot" style={{ background: "#FF5F57" }} />
          <div className="hc-dot" style={{ background: "#FEBC2E" }} />
          <div className="hc-dot" style={{ background: "#28C840" }} />
          <div className="hc-title">PulseLoop Intelligence</div>
          <div className="hc-badge">Live</div>
        </div>
        <div className="hc-body">
          <div className="hc-sidebar">
            <div className="hc-nav-item active">
              <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="5" height="5" />
                <rect x="9" y="2" width="5" height="5" />
                <rect x="2" y="9" width="5" height="5" />
                <rect x="9" y="9" width="5" height="5" />
              </svg>
              Signal Brief
            </div>
            <div className="hc-nav-item">
              <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 5v3l2 2" />
              </svg>
              History
            </div>
            <div className="hc-nav-item">
              <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12h12M2 8h8M2 4h6" />
              </svg>
              Reports
            </div>
            <div className="hc-nav-item">
              <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 2v12M2 8l6 6 6-6" />
              </svg>
              Certificate
            </div>
          </div>
          <div className="hc-main">
            <div className="hc-report-title">French SaaS HR Tech — Q2 2026</div>
            <div className="hc-report-sub">DACH Market Brief · 847 signals · Generated 14 Apr 2026</div>
            <div className="hc-chips">
              <span className="hc-chip hc-chip-v">● Verified</span>
              <span className="hc-chip hc-chip-v">High Confidence</span>
              <span className="hc-chip hc-chip-d">FR · DACH · Nordics</span>
              <span className="hc-chip hc-chip-d">23 Sources</span>
            </div>
            <div className="hc-signal-rows">
              <div className="hc-sig">
                <div className="hc-sig-bar" style={{ background: "var(--green)" }} />
                <div className="hc-sig-txt">
                  <strong>Lucca raises €15M Series B to expand into DACH</strong>
                  Key competitor expanding into your primary market. Funding announced via BFM Business.
                </div>
              </div>
              <div className="hc-sig">
                <div className="hc-sig-bar" style={{ background: "var(--yellow)" }} />
                <div className="hc-sig-txt">
                  <strong>New EU AI Act obligations for HR software — March 2026</strong>
                  Regulatory signal affecting all SaaS HR vendors selling in EU. Source: Official EU Journal.
                </div>
              </div>
              <div className="hc-sig">
                <div className="hc-sig-bar" style={{ background: "#60A5FA" }} />
                <div className="hc-sig-txt">
                  <strong>Personio Q1 2026 product update: AI-powered workforce planning</strong>
                  Feature parity risk. Signal from Personio Engineering Blog.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);
  const heroFormRef = useRef(null);
  const heroActionsRef = useRef(null);
  const heroSuccessRef = useRef(null);
  const heroEmailRef = useRef(null);
  const heroFormRowRef = useRef(null);
  const hfMicroRef = useRef(null);

  useHeroCanvas(canvasRef);

  const openForm = () => {
    if (heroActionsRef.current) heroActionsRef.current.style.display = "none";
    heroFormRef.current?.classList.add("open");
    setTimeout(() => heroEmailRef.current?.focus(), HERO_FOCUS_DELAY_MS);
  };

  const submit = async () => {
    const value = heroEmailRef.current?.value.trim();
    if (!value || !value.includes("@")) {
      heroEmailRef.current?.focus();
      return;
    }
    const result = await submitWaitlist(value, "hero");
    if (result === "error") return;
    if (heroFormRowRef.current) heroFormRowRef.current.style.display = "none";
    if (hfMicroRef.current) hfMicroRef.current.style.display = "none";
    heroSuccessRef.current?.classList.add("show");
  };

  return (
    <section id="hero">
      <canvas id="hero-canvas" ref={canvasRef} />
      <div className="hero-top">
        <div className="hero-intro">
          <span className="hero-intro-dot" />
          Introducing PulseLoop
        </div>
        <h1 className="hero-h1">
          <span className="norm">The briefing room</span>
          <span className="ital">your competitors don't have.</span>
        </h1>
        <p className="hero-sub">
          Verified EU market intelligence for growth consultants. Every claim source-cited. Every report client-ready.
        </p>

        <div className="hero-actions" id="hero-actions" ref={heroActionsRef}>
          <button className="btn-y" onClick={openForm}>✛ &nbsp;Join the Waitlist</button>
        </div>
        <div className="hero-form-wrap" id="hero-form-wrap" ref={heroFormRef}>
          <div className="hero-form-row" ref={heroFormRowRef}>
            <input
              className="hf-input"
              type="email"
              placeholder="your@email.com"
              ref={heroEmailRef}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            <button className="hf-submit" onClick={submit}>Get Access</button>
          </div>
          <div className="hf-success" ref={heroSuccessRef}>
            <div className="hf-s-icon">
              <svg viewBox="0 0 12 12" fill="none" stroke="#0A0A10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2,6 5,9 10,3" />
              </svg>
            </div>
            <span className="hf-s-txt">You're on the list — we'll be in touch.</span>
          </div>
          <p className="hf-micro" ref={hfMicroRef}>Early access. No credit card. EU-based.</p>
        </div>
      </div>
      <HeroProductCard />
    </section>
  );
}
