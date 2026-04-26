import React from "react";

export default function TrustStrip() {
  return (
    <div id="trust">
      <div className="trust-inner">
        <span className="trust-label">Trusted by consultants across</span>
        <div className="trust-items">
          {["France", "Germany", "Netherlands", "Sweden", "Austria", "Belgium"].map((c) => (
            <span key={c} className="trust-item">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
