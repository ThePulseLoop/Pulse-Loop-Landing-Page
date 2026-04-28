import React from "react";
import Logo from "./Logo";
import { LOGO_FOOTER_SIZE } from "./constants";
import { scrollToId } from "./hooks";
import { useT } from "./i18n";

const PRODUCT_LINKS = [
  { id: "f1", labelKey: "nav.hypothesis" },
  { id: "f2", labelKey: "nav.intelligence" },
  { id: "f3", labelKey: "nav.methodology" },
];

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="foot">
      <div className="section-wrap">
        <div className="foot-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="foot-brand"><Logo size={LOGO_FOOTER_SIZE} />PulseLoop</div>
            <div className="foot-tagline">{t("foot.tagline")}</div>
          </div>
          <div>
            <div className="foot-col-h">{t("foot.product")}</div>
            <div className="foot-col-links">
              {PRODUCT_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToId(l.id)(); }}
                >
                  {t(l.labelKey)}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="foot-col-h">{t("foot.company")}</div>
            <div className="foot-col-links">
              <a href="#">{t("foot.about")}</a>
              <a href="#">{t("foot.contact")}</a>
              <a href="#">{t("foot.privacy")}</a>
            </div>
          </div>
          <div>
            <div className="foot-col-h">{t("foot.markets")}</div>
            <div className="foot-col-links">
              <a href="#">{t("foot.france")}</a>
              <a href="#">{t("foot.dach")}</a>
              <a href="#">{t("foot.nordics")}</a>
              <a href="#">{t("foot.benelux")}</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <div className="foot-copy">{t("foot.copy")}</div>
          <div className="foot-links">
            <a href="#">{t("foot.l.privacy")}</a>
            <a href="#">{t("foot.l.terms")}</a>
            <a href="#">{t("foot.l.status")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
