import React, { useRef } from "react";
import { HERO_FOCUS_DELAY_MS } from "./constants";
import { submitWaitlist, useHeroCanvas } from "./hooks";
import { useT } from "./i18n";

function HeroProductCard() {
  const { t } = useT();
  return (
    <div className="hero-visual">
      <div className="overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
        <div className="hero-card min-w-[300px]">
          <div className="hc-topbar">
            <div className="hc-dot" style={{ background: "#FF5F57" }} />
            <div className="hc-dot" style={{ background: "#FEBC2E" }} />
            <div className="hc-dot" style={{ background: "#28C840" }} />
            <div className="hc-title">{t("hero.card.brand")}</div>
            <div className="hc-badge">{t("hero.card.live")}</div>
          </div>
          <div className="hc-body grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-[260px]">
            <div className="hc-sidebar hidden md:block">
              <div className="hc-nav-item active">
                <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="5" height="5" />
                  <rect x="9" y="2" width="5" height="5" />
                  <rect x="2" y="9" width="5" height="5" />
                  <rect x="9" y="9" width="5" height="5" />
                </svg>
                {t("hero.card.nav.brief")}
              </div>
              <div className="hc-nav-item">
                <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 2" />
                </svg>
                {t("hero.card.nav.history")}
              </div>
              <div className="hc-nav-item">
                <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 12h12M2 8h8M2 4h6" />
                </svg>
                {t("hero.card.nav.reports")}
              </div>
              <div className="hc-nav-item">
                <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2v12M2 8l6 6 6-6" />
                </svg>
                {t("hero.card.nav.cert")}
              </div>
            </div>
            <div className="hc-main">
              <div className="hc-report-title">{t("hero.card.report.title")}</div>
              <div className="hc-report-sub">{t("hero.card.report.sub")}</div>
              <div className="hc-chips">
                <span className="hc-chip hc-chip-v">{t("hero.card.chip.verified")}</span>
                <span className="hc-chip hc-chip-v">{t("hero.card.chip.high")}</span>
                <span className="hc-chip hc-chip-d">{t("hero.card.chip.geo")}</span>
                <span className="hc-chip hc-chip-d">{t("hero.card.chip.sources")}</span>
              </div>
              <div className="hc-signal-rows">
                <div className="hc-sig">
                  <div className="hc-sig-bar" style={{ background: "var(--green)" }} />
                  <div className="hc-sig-txt">
                    <strong>{t("hero.card.sig1.title")}</strong>
                    {t("hero.card.sig1.body")}
                  </div>
                </div>
                <div className="hc-sig">
                  <div className="hc-sig-bar" style={{ background: "var(--yellow)" }} />
                  <div className="hc-sig-txt">
                    <strong>{t("hero.card.sig2.title")}</strong>
                    {t("hero.card.sig2.body")}
                  </div>
                </div>
                <div className="hc-sig">
                  <div className="hc-sig-bar" style={{ background: "#60A5FA" }} />
                  <div className="hc-sig-txt">
                    <strong>{t("hero.card.sig3.title")}</strong>
                    {t("hero.card.sig3.body")}
                  </div>
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
  const { t } = useT();

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
          {t("hero.intro")}
        </div>
        <h1 className="hero-h1">
          <span className="norm">{t("hero.h1.norm")}</span>
          <span className="ital">{t("hero.h1.ital")}</span>
        </h1>
        <p className="hero-sub">{t("hero.sub")}</p>

        <div className="hero-actions" id="hero-actions" ref={heroActionsRef}>
          <button className="btn-y" onClick={openForm}>✛ &nbsp;{t("hero.cta.primary")}</button>
        </div>
        <div className="hero-form-wrap" id="hero-form-wrap" ref={heroFormRef}>
          <div className="hero-form-row" ref={heroFormRowRef}>
            <input
              className="hf-input"
              type="email"
              placeholder={t("hero.email.placeholder")}
              ref={heroEmailRef}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            <button className="hf-submit" onClick={submit}>{t("hero.cta.access")}</button>
          </div>
          <div className="hf-success" ref={heroSuccessRef}>
            <div className="hf-s-icon">
              <svg viewBox="0 0 12 12" fill="none" stroke="#0A0A10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2,6 5,9 10,3" />
              </svg>
            </div>
            <span className="hf-s-txt">{t("hero.success")}</span>
          </div>
          <p className="hf-micro" ref={hfMicroRef}>{t("hero.micro")}</p>
        </div>
      </div>
      <HeroProductCard />
    </section>
  );
}
