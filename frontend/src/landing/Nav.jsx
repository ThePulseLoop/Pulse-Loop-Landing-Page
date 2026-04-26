import React, { useRef } from "react";
import Logo from "./Logo";
import { LOGO_NAV_SIZE } from "./constants";
import { scrollToFinal, scrollToId, scrollToTop, useNavScrollState } from "./hooks";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "./i18n";

export default function Nav() {
  const navRef = useRef(null);
  useNavScrollState(navRef);
  const { t } = useT();

  return (
    <nav id="nav" ref={navRef}>
      <div className="nav-w">
        <a
          href="#"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          <span className="nav-logo-mark"><Logo size={LOGO_NAV_SIZE} /></span>
          PulseLoop
        </a>
        <div className="nav-links">
          <span className="nav-link" onClick={scrollToId("f1")}>{t("nav.hypothesis")}</span>
          <span className="nav-link" onClick={scrollToId("f2")}>{t("nav.intelligence")}</span>
          <span className="nav-link" onClick={scrollToId("f3")}>{t("nav.methodology")}</span>
        </div>
        <div className="nav-right">
          <button className="nav-cta" onClick={scrollToFinal}>{t("nav.join")}</button>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
