import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { LOGO_NAV_SIZE } from "./constants";
import { scrollToFinal, scrollToId, scrollToTop, useNavScrollState } from "./hooks";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "./i18n";

export default function Nav() {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  useNavScrollState(navRef);
  const { t } = useT();

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMobileOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <nav id="nav" ref={navRef}>
      <div className="nav-w relative mx-3 sm:mx-4 lg:mx-6 gap-3 lg:gap-6" ref={menuRef}>
        <a
          href="#"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); scrollToTop(); }}
        >
          <span className="nav-logo-mark"><Logo size={LOGO_NAV_SIZE} /></span>
          PulseLoop
        </a>

        <div className="nav-links hidden lg:flex">
          <span className="nav-link" onClick={scrollToId("f1")}>{t("nav.hypothesis")}</span>
          <span className="nav-link" onClick={scrollToId("f2")}>{t("nav.intelligence")}</span>
          <span className="nav-link" onClick={scrollToId("f3")}>{t("nav.methodology")}</span>
        </div>

        <div className="nav-right">
          <button className="nav-cta hidden lg:inline-flex" onClick={scrollToFinal}>{t("nav.join")}</button>
          <LanguageSwitcher />
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md text-[var(--txt)] hover:bg-[var(--bg3)] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-menu">
            <span className="nav-link block" onClick={() => { scrollToId("f1")(); close(); }}>{t("nav.hypothesis")}</span>
            <span className="nav-link block" onClick={() => { scrollToId("f2")(); close(); }}>{t("nav.intelligence")}</span>
            <span className="nav-link block" onClick={() => { scrollToId("f3")(); close(); }}>{t("nav.methodology")}</span>
            <button className="nav-cta flex w-full mt-2" onClick={() => { scrollToFinal(); close(); }}>{t("nav.join")}</button>
          </div>
        )}
      </div>
    </nav>
  );
}
