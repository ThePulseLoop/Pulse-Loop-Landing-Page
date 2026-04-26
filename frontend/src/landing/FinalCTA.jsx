import React, { useRef, useState } from "react";
import { submitWaitlist } from "./hooks";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const fiFormAreaRef = useRef(null);
  const fiSuccessRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    const result = await submitWaitlist(email, "final");
    if (result === "error") return;
    if (fiFormAreaRef.current) fiFormAreaRef.current.style.display = "none";
    fiSuccessRef.current?.classList.add("show");
  };

  return (
    <section id="final">
      <div className="section-wrap">
        <div className="close-line" id="close-line">
          <span className="cl-1">A briefing room</span>
          <span className="cl-2">that never sleeps.</span>
        </div>
        <h2 className="final-h">Be among the first consultants in.</h2>
        <div className="final-wrap">
          <div ref={fiFormAreaRef} className="fi-row-wrap">
            <form className="final-row" onSubmit={handleSubmit}>
              <input
                className="fi-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="fi-submit" type="submit">✛ &nbsp;Get Early Access</button>
            </form>
          </div>
          <div className="fi-success" ref={fiSuccessRef}>
            <div className="fi-big-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4,12 10,18 20,6" />
              </svg>
            </div>
            <div className="fi-success-h">You're on the list.</div>
            <div className="fi-success-s">Early access · We'll be in touch</div>
          </div>
          <p className="fi-micro">Early access · EU-based · Built for the way you work</p>
        </div>
      </div>
    </section>
  );
}
