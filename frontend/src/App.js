import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const Logo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="#2EE8A0" strokeWidth="2" />
    <path d="M3 12h4l2 -5 3 10 2 -7 2 4h5" stroke="#E7EC0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

function App() {
  const canvasRef = useRef(null);
  const navRef = useRef(null);
  const heroFormRef = useRef(null);
  const heroActionsRef = useRef(null);
  const heroSuccessRef = useRef(null);
  const heroEmailRef = useRef(null);
  const heroFormRowRef = useRef(null);
  const hfMicroRef = useRef(null);
  const fiFormAreaRef = useRef(null);
  const fiSuccessRef = useRef(null);
  const certCardRef = useRef(null);

  const [finalEmail, setFinalEmail] = useState("");

  // Nav scroll
  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero canvas particle network
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    let W, H, nodes;
    let raf;

    const build = () => {
      nodes = [];
      const N = Math.min(30, Math.floor((W * H) / 25000));
      for (let i = 0; i < N; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: 1.5 + Math.random() * 2.5,
          phase: Math.random() * Math.PI * 2,
          sp: 0.008 + Math.random() * 0.012,
          yellow: Math.random() < 0.1,
        });
      }
    };

    const resize = () => {
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
      build();
    };

    const tick = () => {
      cx.clearRect(0, 0, W, H);
      const LINK = W * 0.22;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            cx.beginPath();
            cx.moveTo(a.x, a.y);
            cx.lineTo(b.x, b.y);
            cx.strokeStyle = `rgba(46,232,160,${(1 - d / LINK) * 0.1})`;
            cx.lineWidth = 0.6;
            cx.stroke();
          }
        }
      }
      for (const n of nodes) {
        n.phase += n.sp;
        const r = n.r + Math.sin(n.phase) * 1.2;
        const col = n.yellow ? "231,236,12" : "46,232,160";
        const g = cx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
        g.addColorStop(0, `rgba(${col},0.2)`);
        g.addColorStop(1, `rgba(${col},0)`);
        cx.beginPath();
        cx.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
        cx.fillStyle = g;
        cx.fill();
        cx.beginPath();
        cx.arc(n.x, n.y, r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${col},0.75)`;
        cx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", resize);
    resize();
    cv.classList.add("ready");
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Intersection observer for fade-ins
  useEffect(() => {
    const ids = ["f1", "f2", "f3", "t1", "t2", "a1", "a2", "social-h", "close-line"];
    const io = new IntersectionObserver(
      (en) => {
        en.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("visible");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.18 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Cert line-by-line reveal
  useEffect(() => {
    if (!certCardRef.current) return;
    const certIO = new IntersectionObserver(
      (en) => {
        if (!en[0].isIntersecting) return;
        document.querySelectorAll(".cert2-line").forEach((l, i) => {
          setTimeout(() => l.classList.add("on"), i * 110);
        });
        certIO.disconnect();
      },
      { threshold: 0.3 }
    );
    certIO.observe(certCardRef.current);
    return () => certIO.disconnect();
  }, []);

  const scrollToFinal = () => {
    document.getElementById("final")?.scrollIntoView({ behavior: "smooth" });
  };

  const openHeroForm = () => {
    if (heroActionsRef.current) heroActionsRef.current.style.display = "none";
    heroFormRef.current?.classList.add("open");
    setTimeout(() => heroEmailRef.current?.focus(), 60);
  };

  const submitHero = () => {
    const v = heroEmailRef.current?.value.trim();
    if (!v || !v.includes("@")) {
      heroEmailRef.current?.focus();
      return;
    }
    if (heroFormRowRef.current) heroFormRowRef.current.style.display = "none";
    if (hfMicroRef.current) hfMicroRef.current.style.display = "none";
    heroSuccessRef.current?.classList.add("show");
  };

  const submitFinal = (e) => {
    e.preventDefault();
    if (!finalEmail || !finalEmail.includes("@")) return;
    if (fiFormAreaRef.current) fiFormAreaRef.current.style.display = "none";
    fiSuccessRef.current?.classList.add("show");
  };

  return (
    <div className="App">
      {/* NAV */}
      <nav id="nav" ref={navRef}>
        <div className="nav-w">
          <a href="#" className="nav-logo">
            <span className="nav-logo-mark"><Logo size={20} /></span>
            PulseLoop
          </a>
          <div className="nav-links">
            <span className="nav-link">Intelligence</span>
            <span className="nav-link">Methodology</span>
            <span className="nav-link">Pricing</span>
          </div>
          <div className="nav-right">
            <button className="nav-ghost">Sign in</button>
            <button className="nav-cta" onClick={scrollToFinal}>Join Waitlist</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <canvas id="hero-canvas" ref={canvasRef}></canvas>
        <div className="hero-top">
          <div className="hero-intro">
            <span className="hero-intro-dot"></span>
            Introducing PulseLoop
          </div>
          <h1 className="hero-h1">
            <span className="norm">The briefing room</span>
            <span className="ital">your competitors don't have.</span>
          </h1>
          <p className="hero-sub">
            Verified EU market intelligence for growth consultants. Every claim
            source-cited. Every report client-ready.
          </p>

          <div className="hero-actions" id="hero-actions" ref={heroActionsRef}>
            <button className="btn-y" onClick={openHeroForm}>✛ &nbsp;Join the Waitlist</button>
            <button className="btn-g">See how it works</button>
          </div>
          <div className="hero-form-wrap" id="hero-form-wrap" ref={heroFormRef}>
            <div className="hero-form-row" ref={heroFormRowRef}>
              <input
                className="hf-input"
                type="email"
                placeholder="your@email.com"
                ref={heroEmailRef}
                onKeyDown={(e) => e.key === "Enter" && submitHero()}
              />
              <button className="hf-submit" onClick={submitHero}>Get Access</button>
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

        {/* big hero product card */}
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hc-topbar">
              <div className="hc-dot" style={{ background: "#FF5F57" }}></div>
              <div className="hc-dot" style={{ background: "#FEBC2E" }}></div>
              <div className="hc-dot" style={{ background: "#28C840" }}></div>
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
                    <div className="hc-sig-bar" style={{ background: "var(--green)" }}></div>
                    <div className="hc-sig-txt">
                      <strong>Lucca raises €15M Series B to expand into DACH</strong>
                      Key competitor expanding into your primary market. Funding announced via BFM Business.
                    </div>
                  </div>
                  <div className="hc-sig">
                    <div className="hc-sig-bar" style={{ background: "var(--yellow)" }}></div>
                    <div className="hc-sig-txt">
                      <strong>New EU AI Act obligations for HR software — March 2026</strong>
                      Regulatory signal affecting all SaaS HR vendors selling in EU. Source: Official EU Journal.
                    </div>
                  </div>
                  <div className="hc-sig">
                    <div className="hc-sig-bar" style={{ background: "#60A5FA" }}></div>
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
      </section>

      {/* TRUST STRIP */}
      <div id="trust">
        <div className="trust-inner">
          <span className="trust-label">Trusted by consultants across</span>
          <div className="trust-items">
            <span className="trust-item">France</span>
            <span className="trust-item">Germany</span>
            <span className="trust-item">Netherlands</span>
            <span className="trust-item">Sweden</span>
            <span className="trust-item">Austria</span>
            <span className="trust-item">Belgium</span>
          </div>
        </div>
      </div>

      {/* FEATURE SECTION 1 */}
      <section className="feat-section" id="f1">
        <div className="section-wrap">
          <div className="feat-grid">
            <div className="feat-copy">
              <div className="feat-tag">The Hypothesis</div>
              <h2 className="feat-h">You paste the brief. We build the research plan.</h2>
              <p className="feat-body">
                Paste your client brief — or answer 3 questions. PulseLoop reads it,
                identifies what to track, and confirms a research hypothesis with you
                before running a single search.
              </p>
              <button className="feat-link" onClick={scrollToFinal}>Join the waitlist →</button>
            </div>
            <div>
              <div className="prod-card glow">
                <div className="pc-header">
                  <span className="pc-h-title">Research Hypothesis</span>
                  <span className="pc-live">Live</span>
                </div>
                <div className="pc-body">
                  <div className="pc-row"><span className="pc-key">Market</span><span className="pc-val">French pharmacy skincare — indie & challenger brands</span></div>
                  <div className="pc-row"><span className="pc-key">Question</span><span className="pc-val">How are indie brands gaining shelf space and building social presence?</span></div>
                  <div className="pc-row"><span className="pc-key">Tracking</span><span className="pc-val">Typology · Novexpert · La Roche-Posay · Caudalie</span></div>
                  <div className="pc-row"><span className="pc-key">Geography</span><span className="pc-val">France · French-speaking Belgium</span></div>
                </div>
                <div className="pc-footer">
                  <button className="pc-confirm">Confirm hypothesis &nbsp;→</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION 2 (flipped) */}
      <section className="feat-section" id="f2">
        <div className="section-wrap">
          <div className="feat-grid flip">
            <div className="feat-copy">
              <div className="feat-tag">The Intelligence</div>
              <h2 className="feat-h">Signals from 100+ EU sources. Not generic web results.</h2>
              <p className="feat-body">
                PulseLoop monitors curated FR, DACH, and Nordic sources that EU-focused
                consultants actually need not US-first data repurposed for your market.
                Continuously, not just when you ask.
              </p>
              <button className="feat-link" onClick={scrollToFinal}>Join the waitlist →</button>
            </div>
            <div>
              <div className="sig-card">
                <div className="sig-card-scan"></div>
                <div className="sig-top-bar">
                  <span className="pc-h-title">Live Signal Feed</span>
                  <span className="sig-new-badge">3 new</span>
                </div>
                <div className="sig-entry">
                  <div className="sig-e-top">
                    <span className="sig-src">Maddyness</span>
                    <span className="sig-time">2 hours ago</span>
                  </div>
                  <div className="sig-txt">Typology lance une gamme professionnelle en exclusivité pharmacie...</div>
                  <span className="sig-chip c-launch">Product Launch</span>
                </div>
                <div className="sig-entry">
                  <div className="sig-e-top">
                    <span className="sig-src">EU Parliament</span>
                    <span className="sig-time">6 hours ago</span>
                  </div>
                  <div className="sig-txt">New cosmetic ingredient regulation enters enforcement phase across member states...</div>
                  <span className="sig-chip c-reg">Regulatory</span>
                </div>
                <div className="sig-entry">
                  <div className="sig-e-top">
                    <span className="sig-src">FrenchWeb</span>
                    <span className="sig-time">1 day ago</span>
                  </div>
                  <div className="sig-txt">Novexpert lève 4M€ en Serie A pour accélérer son déploiement retail...</div>
                  <span className="sig-chip c-fund">Funding</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION 3 */}
      <section className="feat-section" id="f3">
        <div className="section-wrap">
          <div className="feat-grid">
            <div className="feat-copy">
              <div className="feat-tag">The Certificate</div>
              <h2 className="feat-h">A methodology section your clients can't question.</h2>
              <p className="feat-body">
                Every report ships with an auto-generated Methodology Certificate —
                sources used, signals collected, confidence thresholds, deduplication
                method. Attach it. Present it. Never be challenged on your sources again.
              </p>
              <button className="feat-link" onClick={scrollToFinal}>Join the waitlist →</button>
            </div>
            <div>
              <div className="cert-card2" id="cert-card2" ref={certCardRef}>
                <div className="cert2-hd">
                  <div>
                    <div className="cert2-tag">Methodology Certificate</div>
                    <div className="cert2-name">French Skincare Indie<br />Market Brief — Q1 2026</div>
                  </div>
                  <span className="cert2-badge">● Verified</span>
                </div>
                <div className="cert2-lines" id="cert2-lines">
                  <div className="cert2-line"><span className="cert2-k">Sources</span><span className="cert2-v g">23 distinct sources</span></div>
                  <div className="cert2-line"><span className="cert2-k">Date range</span><span className="cert2-v">01 Mar – 31 Mar 2026</span></div>
                  <div className="cert2-line"><span className="cert2-k">Total signals</span><span className="cert2-v g">847 retrieved</span></div>
                  <div className="cert2-line"><span className="cert2-k">Deduplication</span><span className="cert2-v">Cosine similarity &gt; 0.92</span></div>
                  <div className="cert2-line"><span className="cert2-k">High confidence</span><span className="cert2-v">10+ signals, 5+ sources</span></div>
                  <div className="cert2-line"><span className="cert2-k">Low confidence</span><span className="cert2-v">&lt;3 signals — flagged</span></div>
                  <div className="cert2-line"><span className="cert2-k">Language</span><span className="cert2-v">French</span></div>
                </div>
                <div className="cert2-foot">Generated by PulseLoop · pulseloop.io</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section id="social">
        <div className="section-wrap">
          <h2 className="social-h" id="social-h">
            The consultants who tried it early stopped hesitating before hitting send.
          </h2>
          <div className="testi-grid">
            <div className="testi-card" id="t1">
              <div className="testi-stats">
                <div>
                  <div className="testi-stat-num">−6h</div>
                  <div className="testi-stat-lbl">per client per week</div>
                </div>
                <div>
                  <div className="testi-stat-num">3×</div>
                  <div className="testi-stat-lbl">more clients served</div>
                </div>
              </div>
              <div>
                <p className="testi-quote">
                  "Finally something built for the way I actually work. I used to spend
                  half my Sunday verifying AI outputs before client calls. Now I attach
                  the certificate and no one questions it."
                </p>
                <div className="testi-attr">
                  <strong>Sarah Engel</strong>
                  <span>Fractional CMO · Amsterdam</span>
                </div>
              </div>
            </div>
            <div className="testi-card" id="t2">
              <div className="testi-stats">
                <div>
                  <div className="testi-stat-num">28%</div>
                  <div className="testi-stat-lbl">higher client confidence</div>
                </div>
                <div>
                  <div className="testi-stat-num">60+</div>
                  <div className="testi-stat-lbl">EU sources covered</div>
                </div>
              </div>
              <div>
                <p className="testi-quote">
                  "The EU-specific sourcing is what sold me. Every other tool pulled US
                  data and relabelled it. PulseLoop understands that DACH and Nordic
                  markets need their own signals."
                </p>
                <div className="testi-attr">
                  <strong>Marcus Holst</strong>
                  <span>GTM Advisor · Berlin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="audience">
        <div className="section-wrap">
          <h2 className="aud-top-h">Built for the consultant who can't afford to be wrong.</h2>
          <p className="aud-top-sub">
            Whether you work alone or run a small agency, PulseLoop gives you the
            research infrastructure that was only available to enterprise teams.
          </p>
          <div className="aud-grid">
            <div className="aud-card" id="a1">
              <span className="aud-pill ap-green">Most Popular</span>
              <div className="aud-name">The Solo Consultant</div>
              <p className="aud-tagline">You are your own research team. You need to sound like you have five.</p>
              <ul className="aud-list">
                <li>Cited reports your clients trust</li>
                <li>20 minutes of research, not 6 hours</li>
                <li>Intelligence that compounds with every client</li>
              </ul>
              <button className="aud-join" onClick={scrollToFinal}>Join waitlist →</button>
            </div>
            <div className="aud-card" id="a2">
              <span className="aud-pill ap-yellow">Agencies Welcome</span>
              <div className="aud-name">The Boutique Agency</div>
              <p className="aud-tagline">You manage 6 client accounts. Each one deserves its own briefing room.</p>
              <ul className="aud-list">
                <li>Separate intelligence workspace per client</li>
                <li>White-label report sharing</li>
                <li>One subscription, multiple clients covered</li>
              </ul>
              <button className="aud-join" onClick={scrollToFinal}>Join waitlist →</button>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + FINAL CTA */}
      <section id="final">
        <div className="section-wrap">
          <div className="close-line" id="close-line">Verified. EU-specific. Yours.</div>
          <h2 className="final-h">Be among the first consultants in.</h2>
          <div className="final-wrap">
            <div ref={fiFormAreaRef}>
              <form className="final-row" onSubmit={submitFinal}>
                <input
                  className="fi-input"
                  type="email"
                  placeholder="your@email.com"
                  value={finalEmail}
                  onChange={(e) => setFinalEmail(e.target.value)}
                  required
                />
                <button className="fi-submit" type="submit">✛ &nbsp;Get Early Access</button>
              </form>
            </div>
            <div className="fi-success" ref={fiSuccessRef}>
              <div className="fi-big-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4,12 10,18 20,6" />
                </svg>
              </div>
              <div className="fi-success-h">You're on the list.</div>
              <div className="fi-success-s">Early access · We'll be in touch</div>
            </div>
            <p className="fi-micro">Early access · EU-based · Built for the way you work</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="section-wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand"><Logo size={18} />PulseLoop</div>
              <div className="foot-tagline">
                Verified EU market intelligence for growth consultants and boutique agencies.
              </div>
            </div>
            <div>
              <div className="foot-col-h">Product</div>
              <div className="foot-col-links">
                <a href="#">Intelligence</a>
                <a href="#">Methodology Certificate</a>
                <a href="#">EU Signal Sources</a>
                <a href="#">Pricing</a>
              </div>
            </div>
            <div>
              <div className="foot-col-h">Company</div>
              <div className="foot-col-links">
                <a href="#">About</a>
                <a href="#">Contact</a>
                <a href="#">Privacy</a>
              </div>
            </div>
            <div>
              <div className="foot-col-h">Markets</div>
              <div className="foot-col-links">
                <a href="#">France</a>
                <a href="#">DACH</a>
                <a href="#">Nordics</a>
                <a href="#">Benelux</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <div className="foot-copy">© 2026 PulseLoop · EU-hosted · GDPR compliant</div>
            <div className="foot-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Status</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
