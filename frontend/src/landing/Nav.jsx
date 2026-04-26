import React, { useRef } from "react";
import Logo from "./Logo";
import { LOGO_NAV_SIZE } from "./constants";
import { scrollToFinal, scrollToId, scrollToTop, useNavScrollState } from "./hooks";

export default function Nav() {
  const navRef = useRef(null);
  useNavScrollState(navRef);

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
          <span className="nav-link" onClick={scrollToId("f1")}>Hypothesis</span>
          <span className="nav-link" onClick={scrollToId("f2")}>Intelligence</span>
          <span className="nav-link" onClick={scrollToId("f3")}>Methodology</span>
        </div>
        <div className="nav-right">
          <button className="nav-cta" onClick={scrollToFinal}>Join Waitlist</button>
        </div>
      </div>
    </nav>
  );
}
