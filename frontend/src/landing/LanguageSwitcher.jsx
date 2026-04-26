import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { LANGUAGES, useT } from "./i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div className="lang-switch" ref={wrapRef}>
      <button
        type="button"
        className="lang-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={current.label}
      >
        <Globe size={14} strokeWidth={2.2} />
        <span className="lang-code">{current.short}</span>
        <ChevronDown size={13} strokeWidth={2.2} className={`lang-chev ${open ? "open" : ""}`} />
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                className={`lang-item ${l.code === lang ? "active" : ""}`}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
              >
                <span className="lang-item-code">{l.short}</span>
                <span className="lang-item-label">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
