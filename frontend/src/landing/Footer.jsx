import React from "react";
import Logo from "./Logo";
import { LOGO_FOOTER_SIZE } from "./constants";
import { scrollToId } from "./hooks";

const PRODUCT_LINKS = [
  { id: "f1", label: "Hypothesis" },
  { id: "f2", label: "Intelligence" },
  { id: "f3", label: "Methodology" },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="section-wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand"><Logo size={LOGO_FOOTER_SIZE} />PulseLoop</div>
            <div className="foot-tagline">
              Verified EU market intelligence for growth consultants and boutique agencies.
            </div>
          </div>
          <div>
            <div className="foot-col-h">Product</div>
            <div className="foot-col-links">
              {PRODUCT_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(l.id)();
                  }}
                >
                  {l.label}
                </a>
              ))}
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
  );
}
