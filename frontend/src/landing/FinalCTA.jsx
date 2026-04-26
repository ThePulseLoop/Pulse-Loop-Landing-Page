import React, { useRef, useState } from "react";
import { submitWaitlist } from "./hooks";
import { useT } from "./i18n";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const fiFormAreaRef = useRef(null);
  const fiSuccessRef = useRef(null);
  const { t } = useT();

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
          <span className="cl-1">{t("final.cl1")}</span>
          <span className="cl-2">{t("final.cl2")}</span>
        </div>
        <h2 className="final-h">{t("final.h")}</h2>
        <div className="final-wrap">
          <div ref={fiFormAreaRef} className="fi-row-wrap">
            <form className="final-row" onSubmit={handleSubmit}>
              <input
                className="fi-input"
                type="email"
                placeholder={t("hero.email.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="fi-submit" type="submit">{t("final.cta")}</button>
            </form>
          </div>
          <div className="fi-success" ref={fiSuccessRef}>
            <div className="fi-big-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4,12 10,18 20,6" />
              </svg>
            </div>
            <div className="fi-success-h">{t("final.success.h")}</div>
            <div className="fi-success-s">{t("final.success.s")}</div>
          </div>
          <p className="fi-micro">{t("final.micro")}</p>
        </div>
      </div>
    </section>
  );
}
