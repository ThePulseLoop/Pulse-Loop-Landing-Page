import React from "react";
import { scrollToFinal } from "./hooks";
import { useT } from "./i18n";

export default function Audience() {
  const { t } = useT();
  const cards = [
    {
      id: "a1",
      pillClass: "ap-green",
      pillKey: "aud.solo.pill",
      nameKey: "aud.solo.name",
      tagKey: "aud.solo.tag",
      itemKeys: ["aud.solo.i1", "aud.solo.i2", "aud.solo.i3"],
    },
    {
      id: "a2",
      pillClass: "ap-yellow",
      pillKey: "aud.agency.pill",
      nameKey: "aud.agency.name",
      tagKey: "aud.agency.tag",
      itemKeys: ["aud.agency.i1", "aud.agency.i2", "aud.agency.i3"],
    },
  ];
  return (
    <section id="audience">
      <div className="section-wrap">
        <h2 className="aud-top-h">{t("aud.h")}</h2>
        <p className="aud-top-sub">{t("aud.sub")}</p>
        <div className="aud-grid">
          {cards.map((c) => (
            <div className="aud-card" id={c.id} key={c.id}>
              <span className={`aud-pill ${c.pillClass}`}>{t(c.pillKey)}</span>
              <div className="aud-name">{t(c.nameKey)}</div>
              <p className="aud-tagline">{t(c.tagKey)}</p>
              <ul className="aud-list">
                {c.itemKeys.map((k) => (<li key={k}>{t(k)}</li>))}
              </ul>
              <button className="aud-join" onClick={scrollToFinal}>{t("aud.join")}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
