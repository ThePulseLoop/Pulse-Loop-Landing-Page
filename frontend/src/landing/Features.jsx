import React, { useRef } from "react";
import { scrollToFinal, useCertReveal } from "./hooks";
import { useT } from "./i18n";

function HypothesisCard() {
  const { t } = useT();
  return (
    <div className="prod-card glow">
      <div className="pc-header">
        <span className="pc-h-title">{t("f1.card.title")}</span>
        <span className="pc-live">{t("f1.card.live")}</span>
      </div>
      <div className="pc-body">
        <div className="pc-row"><span className="pc-key">{t("f1.card.market.k")}</span><span className="pc-val">{t("f1.card.market.v")}</span></div>
        <div className="pc-row"><span className="pc-key">{t("f1.card.question.k")}</span><span className="pc-val">{t("f1.card.question.v")}</span></div>
        <div className="pc-row"><span className="pc-key">{t("f1.card.tracking.k")}</span><span className="pc-val">{t("f1.card.tracking.v")}</span></div>
        <div className="pc-row"><span className="pc-key">{t("f1.card.geo.k")}</span><span className="pc-val">{t("f1.card.geo.v")}</span></div>
      </div>
      <div className="pc-footer">
        <button className="pc-confirm">{t("f1.card.confirm")}</button>
      </div>
    </div>
  );
}

function SignalFeedCard() {
  const { t } = useT();
  const entries = [
    { key: "s1", src: "Maddyness", time: t("f2.feed.t1"), text: t("f2.feed.s1.text"), chip: t("f2.feed.s1.chip"), chipClass: "c-launch" },
    { key: "s2", src: "EU Parliament", time: t("f2.feed.t2"), text: t("f2.feed.s2.text"), chip: t("f2.feed.s2.chip"), chipClass: "c-reg" },
    { key: "s3", src: "FrenchWeb", time: t("f2.feed.t3"), text: t("f2.feed.s3.text"), chip: t("f2.feed.s3.chip"), chipClass: "c-fund" },
  ];
  return (
    <div className="sig-card">
      <div className="sig-card-scan" />
      <div className="sig-top-bar">
        <span className="pc-h-title">{t("f2.feed.title")}</span>
        <span className="sig-new-badge">{t("f2.feed.new")}</span>
      </div>
      {entries.map((e) => (
        <div className="sig-entry" key={e.key}>
          <div className="sig-e-top">
            <span className="sig-src">{e.src}</span>
            <span className="sig-time">{e.time}</span>
          </div>
          <div className="sig-txt">{e.text}</div>
          <span className={`sig-chip ${e.chipClass}`}>{e.chip}</span>
        </div>
      ))}
    </div>
  );
}

function CertificateCard({ certCardRef }) {
  const { t } = useT();
  const lines = [
    { id: "l1", k: t("f3.cert.l1.k"), v: t("f3.cert.l1.v"), green: true },
    { id: "l2", k: t("f3.cert.l2.k"), v: t("f3.cert.l2.v"), green: false },
    { id: "l3", k: t("f3.cert.l3.k"), v: t("f3.cert.l3.v"), green: true },
    { id: "l4", k: t("f3.cert.l4.k"), v: t("f3.cert.l4.v"), green: false },
    { id: "l5", k: t("f3.cert.l5.k"), v: t("f3.cert.l5.v"), green: false },
    { id: "l6", k: t("f3.cert.l6.k"), v: t("f3.cert.l6.v"), green: false },
    { id: "l7", k: t("f3.cert.l7.k"), v: t("f3.cert.l7.v"), green: false },
  ];
  return (
    <div className="cert-card2" id="cert-card2" ref={certCardRef}>
      <div className="cert2-hd">
        <div>
          <div className="cert2-tag">{t("f3.cert.tag")}</div>
          <div className="cert2-name">{t("f3.cert.name1")}<br />{t("f3.cert.name2")}</div>
        </div>
        <span className="cert2-badge">{t("f3.cert.badge")}</span>
      </div>
      <div className="cert2-lines" id="cert2-lines">
        {lines.map((l) => (
          <div className="cert2-line" key={l.id}>
            <span className="cert2-k">{l.k}</span>
            <span className={`cert2-v ${l.green ? "g" : ""}`}>{l.v}</span>
          </div>
        ))}
      </div>
      <div className="cert2-foot">{t("f3.cert.foot")}</div>
    </div>
  );
}

function FeatureSection({ id, flip, tagKey, headingKey, bodyKey, ctaKey, visual }) {
  const { t } = useT();
  return (
    <section className="feat-section" id={id}>
      <div className="section-wrap">
        <div className={`feat-grid grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-20 items-center${flip ? " flip" : ""}`}>
          <div className="feat-copy">
            <div className="feat-tag">{t(tagKey)}</div>
            <h2 className="feat-h">{t(headingKey)}</h2>
            <p className="feat-body">{t(bodyKey)}</p>
            <button className="feat-link" onClick={scrollToFinal}>{t(ctaKey)}</button>
          </div>
          <div>{visual}</div>
        </div>
      </div>
    </section>
  );
}

export default function Features() {
  const certCardRef = useRef(null);
  useCertReveal(certCardRef);

  return (
    <>
      <FeatureSection
        id="f1"
        tagKey="f1.tag"
        headingKey="f1.h"
        bodyKey="f1.body"
        ctaKey="f1.cta"
        visual={<HypothesisCard />}
      />
      <FeatureSection
        id="f2"
        flip
        tagKey="f2.tag"
        headingKey="f2.h"
        bodyKey="f2.body"
        ctaKey="f2.cta"
        visual={<SignalFeedCard />}
      />
      <FeatureSection
        id="f3"
        tagKey="f3.tag"
        headingKey="f3.h"
        bodyKey="f3.body"
        ctaKey="f3.cta"
        visual={<CertificateCard certCardRef={certCardRef} />}
      />
    </>
  );
}
