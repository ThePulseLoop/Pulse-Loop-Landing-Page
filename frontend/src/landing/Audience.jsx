import React from "react";
import { scrollToFinal } from "./hooks";

const CARDS = [
  {
    id: "a1",
    pillClass: "ap-green",
    pillText: "Most Popular",
    name: "The Solo Consultant",
    tagline: "You are your own research team. You need to sound like you have five.",
    items: [
      "Cited reports your clients trust",
      "20 minutes of research, not 6 hours",
      "Intelligence that compounds with every client",
    ],
  },
  {
    id: "a2",
    pillClass: "ap-yellow",
    pillText: "Agencies Welcome",
    name: "The Boutique Agency",
    tagline: "You manage 6 client accounts. Each one deserves its own briefing room.",
    items: [
      "Separate intelligence workspace per client",
      "White-label report sharing",
      "One subscription, multiple clients covered",
    ],
  },
];

export default function Audience() {
  return (
    <section id="audience">
      <div className="section-wrap">
        <h2 className="aud-top-h">Built for the consultant who can't afford to be wrong.</h2>
        <p className="aud-top-sub">
          Whether you work alone or run a small agency, PulseLoop gives you the research infrastructure that was only available to enterprise teams.
        </p>
        <div className="aud-grid">
          {CARDS.map((c) => (
            <div className="aud-card" id={c.id} key={c.id}>
              <span className={`aud-pill ${c.pillClass}`}>{c.pillText}</span>
              <div className="aud-name">{c.name}</div>
              <p className="aud-tagline">{c.tagline}</p>
              <ul className="aud-list">
                {c.items.map((it) => (<li key={it}>{it}</li>))}
              </ul>
              <button className="aud-join" onClick={scrollToFinal}>Join waitlist →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
