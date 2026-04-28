import React from "react";
import { useT } from "./i18n";

export default function TrustStrip() {
  const { t } = useT();
  const items = [
    "trust.f1",
    "trust.f2",
    "trust.f3",
    "trust.f4",
    "trust.f5",
    "trust.f6",
    "trust.f7",
    "trust.f8",
  ];
  return (
    <div id="trust">
      <div className="trust-inner max-w-[1200px] mx-auto px-5 sm:px-10 flex items-center gap-5 sm:gap-8 flex-wrap justify-between">
        <span className="trust-label">{t("trust.label")}</span>
        <div className="trust-items">
          {items.map((k) => (
            <span key={k} className="trust-item">{t(k)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
