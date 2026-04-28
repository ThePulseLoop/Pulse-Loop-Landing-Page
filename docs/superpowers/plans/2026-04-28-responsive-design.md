# Responsive Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the PulseLoop landing page fully responsive from 320px phones to wide desktops, migrating layout to Tailwind utilities and adding a mobile hamburger nav menu.

**Architecture:** Keep all decorative CSS (animations, CSS variables, colors, backdrop-blur, box-shadows, typography) in App.css. Move layout, spacing, and responsive grid/flex behaviour to Tailwind utilities in JSX. Work component-by-component; verify each in a mobile viewport (375px) before moving to the next.

**Tech Stack:** React, Tailwind CSS 3, custom CSS in App.css (748 lines), Lucide React (already installed for LanguageSwitcher)

---

## File Map

| File | Change |
|------|--------|
| `frontend/src/landing/Nav.jsx` | Add hamburger menu, Tailwind responsive layout |
| `frontend/src/landing/Hero.jsx` | Scrollable card container, responsive form |
| `frontend/src/landing/Features.jsx` | Tailwind grid replaces feat-grid layout CSS |
| `frontend/src/landing/Audience.jsx` | Tailwind grid replaces aud-grid layout CSS |
| `frontend/src/landing/TrustStrip.jsx` | Tailwind flex replaces trust-inner layout CSS |
| `frontend/src/landing/FinalCTA.jsx` | Tailwind flex-col→row for email form |
| `frontend/src/landing/Footer.jsx` | Tailwind grid replaces foot-grid layout CSS |
| `frontend/src/App.css` | Remove layout-only media queries replaced by Tailwind; add .mobile-menu |

Files NOT touched: `hooks.js`, `i18n.jsx`, `Logo.jsx`, `LanguageSwitcher.jsx`, `App.js`, `tailwind.config.js`, `constants.js`

---

## Task 1: Nav.jsx — Hamburger menu

**Files:**
- Modify: `frontend/src/landing/Nav.jsx`
- Modify: `frontend/src/App.css` (add `.mobile-menu` styles, remove nav media queries)

### What changes
- Add `mobileOpen` state; hamburger button (Lucide `Menu`/`X`) visible below `lg:` (1024px)
- Desktop nav links get `hidden lg:flex` so they hide on mobile without CSS media queries
- Mobile dropdown panel renders below the nav pill when `mobileOpen` is true
- Outside-click closes the menu (same `useEffect` pattern as `LanguageSwitcher`)
- Remove the two `nav-w` layout media queries and the `nav-links display:none` media query from App.css
- Remove `display:flex` from `.nav-links` CSS (Tailwind handles it)
- Add responsive margin/gap to `.nav-w` via Tailwind; keep its decoration CSS

- [ ] **Step 1: Replace Nav.jsx with the responsive version**

Full file content to write:

```jsx
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
            <button className="nav-cta w-full mt-2" onClick={() => { scrollToFinal(); close(); }}>{t("nav.join")}</button>
          </div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Update App.css — nav section**

In App.css, make these exact changes:

**Remove** these 3 lines (lines ~95–101):
```css
@media(max-width:760px){.nav-w{padding:5px 5px 5px 16px;gap:12px;margin:0 14px;}}
@media(max-width:640px){.nav-w{margin:0 12px;}}
```
```css
@media(max-width:760px){.nav-links{display:none;}}
```

**Remove** `display:flex;align-items:center;justify-content:space-between;gap:24px;margin:0 24px;` from `.nav-w` rule (keep pointer-events, width, flex, padding, background, backdrop-filter, border, border-radius, box-shadow, height, transition).

So `.nav-w` becomes:
```css
.nav-w{
  pointer-events:auto;
  width:auto;
  flex:1;
  padding:6px 6px 6px 22px;
  display:flex;align-items:center;justify-content:space-between;
  background:rgba(255,255,255,0.92);
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(10,10,16,0.08);
  border-radius:14px;
  box-shadow:0 4px 18px rgba(10,10,16,0.06), 0 1px 0 rgba(10,10,16,0.04);
  height:56px;
  transition:box-shadow 250ms var(--ease),background 250ms ease;
}
```

**Remove** `display:flex;` from `.nav-links` rule. It becomes:
```css
.nav-links{align-items:center;gap:6px;flex:0 1 auto;justify-content:center;}
```

**Add** after the `.nav-right` rule (around line 111), the mobile menu styles:
```css
.mobile-menu{
  position:absolute;top:calc(100% + 8px);left:0;right:0;z-index:10;
  background:rgba(10,10,16,0.97);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:10px;padding:10px;
  display:flex;flex-direction:column;gap:2px;
  animation:lang-pop 150ms var(--ease) both;
}
[data-theme="light"] .mobile-menu{
  background:rgba(255,255,255,0.98);
  border-color:rgba(10,10,16,0.08);
}
.mobile-menu .nav-link{display:block;width:100%;padding:10px 14px;border-radius:6px;}
```

- [ ] **Step 3: Start dev server and verify**

```bash
cd frontend && npm start
```

Open browser at `http://localhost:3000`. Use DevTools → device toolbar → set to iPhone SE (375px).

Expected:
- Hamburger icon appears in top-right of nav pill
- Tapping it shows dropdown with 3 links + "Join Waitlist" button
- Tapping a link scrolls to section and closes menu
- Tapping outside closes menu
- At 1024px+ width, hamburger disappears, nav links and "Join Waitlist" appear inline

- [ ] **Step 4: Commit**

```bash
git add frontend/src/landing/Nav.jsx frontend/src/App.css
git commit -m "feat: add mobile hamburger nav menu with Tailwind responsive layout"
```

---

## Task 2: Hero.jsx — Scrollable card + responsive form

**Files:**
- Modify: `frontend/src/landing/Hero.jsx`
- Modify: `frontend/src/App.css` (remove hero-visual and hc-body mobile overrides)

### What changes
- Wrap `.hero-visual` in a `div` with `overflow-x-auto sm:overflow-x-visible` so the card can scroll horizontally on mobile
- Give `.hero-card` a `min-w-[300px]` so it doesn't collapse below 300px
- Replace `.hc-body` CSS grid (`grid-template-columns: 260px 1fr`) with Tailwind responsive grid
- Hide `.hc-sidebar` on mobile with `hidden md:block`
- Hero form stays as-is (already handles open/close via JS, works on mobile)

- [ ] **Step 1: Update HeroProductCard in Hero.jsx**

Replace the `HeroProductCard` function (lines 6–86) with:

```jsx
function HeroProductCard() {
  const { t } = useT();
  return (
    <div className="hero-visual">
      <div className="overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
        <div className="hero-card min-w-[300px]">
          <div className="hc-topbar">
            <div className="hc-dot" style={{ background: "#FF5F57" }} />
            <div className="hc-dot" style={{ background: "#FEBC2E" }} />
            <div className="hc-dot" style={{ background: "#28C840" }} />
            <div className="hc-title">{t("hero.card.brand")}</div>
            <div className="hc-badge">{t("hero.card.live")}</div>
          </div>
          <div className="hc-body grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-[260px]">
            <div className="hc-sidebar hidden md:block">
              <div className="hc-nav-item active">
                <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="5" height="5" />
                  <rect x="9" y="2" width="5" height="5" />
                  <rect x="2" y="9" width="5" height="5" />
                  <rect x="9" y="9" width="5" height="5" />
                </svg>
                {t("hero.card.nav.brief")}
              </div>
              <div className="hc-nav-item">
                <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 2" />
                </svg>
                {t("hero.card.nav.history")}
              </div>
              <div className="hc-nav-item">
                <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 12h12M2 8h8M2 4h6" />
                </svg>
                {t("hero.card.nav.reports")}
              </div>
              <div className="hc-nav-item">
                <svg className="hc-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2v12M2 8l6 6 6-6" />
                </svg>
                {t("hero.card.nav.cert")}
              </div>
            </div>
            <div className="hc-main">
              <div className="hc-report-title">{t("hero.card.report.title")}</div>
              <div className="hc-report-sub">{t("hero.card.report.sub")}</div>
              <div className="hc-chips">
                <span className="hc-chip hc-chip-v">{t("hero.card.chip.verified")}</span>
                <span className="hc-chip hc-chip-v">{t("hero.card.chip.high")}</span>
                <span className="hc-chip hc-chip-d">{t("hero.card.chip.geo")}</span>
                <span className="hc-chip hc-chip-d">{t("hero.card.chip.sources")}</span>
              </div>
              <div className="hc-signal-rows">
                <div className="hc-sig">
                  <div className="hc-sig-bar" style={{ background: "var(--green)" }} />
                  <div className="hc-sig-txt">
                    <strong>{t("hero.card.sig1.title")}</strong>
                    {t("hero.card.sig1.body")}
                  </div>
                </div>
                <div className="hc-sig">
                  <div className="hc-sig-bar" style={{ background: "var(--yellow)" }} />
                  <div className="hc-sig-txt">
                    <strong>{t("hero.card.sig2.title")}</strong>
                    {t("hero.card.sig2.body")}
                  </div>
                </div>
                <div className="hc-sig">
                  <div className="hc-sig-bar" style={{ background: "#60A5FA" }} />
                  <div className="hc-sig-txt">
                    <strong>{t("hero.card.sig3.title")}</strong>
                    {t("hero.card.sig3.body")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update App.css — remove hero overrides now in Tailwind**

**Remove** these lines from App.css:
```css
@media(max-width:640px){.hero-visual{padding:0 20px;}}
```
```css
@media(max-width:640px){.hc-body{grid-template-columns:1fr;}}
```

**Remove** `display:grid;grid-template-columns:260px 1fr;min-height:260px;` from `.hc-body` rule. The `.hc-body` CSS rule can be deleted entirely (all its layout is now Tailwind).

- [ ] **Step 3: Verify on mobile**

With dev server running, check iPhone SE (375px):
- Product card is horizontally scrollable — swipe to see full card
- Signal rows are visible without horizontal clipping
- At `md:` (768px+), sidebar reappears and card fills full width

- [ ] **Step 4: Commit**

```bash
git add frontend/src/landing/Hero.jsx frontend/src/App.css
git commit -m "feat: make hero product card scrollable on mobile"
```

---

## Task 3: Features.jsx — Responsive grid

**Files:**
- Modify: `frontend/src/landing/Features.jsx`
- Modify: `frontend/src/App.css` (remove feat-grid layout CSS + 860px media query)

### What changes
- Replace `.feat-grid` layout CSS with Tailwind `grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-20 items-center`
- Keep `.feat-grid.flip` CSS only for `direction:rtl` (column ordering on desktop)
- The 860px media query that reset grid to 1-col is replaced by `sm:grid-cols-2` (640px breakpoint)

- [ ] **Step 1: Update FeatureSection in Features.jsx**

Replace the `FeatureSection` function (lines 87–104):

```jsx
function FeatureSection({ id, flip, tagKey, headingKey, bodyKey, ctaKey, visual }) {
  const { t } = useT();
  return (
    <section className="feat-section" id={id}>
      <div className="section-wrap">
        <div className={`feat-grid grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-20 items-center${flip ? " flip" : ""}`}>
          <div className="feat-copy">
            <div className="feat-tag">{t(tagKey)}</div>
            <h2 className="feat-h">{t(headingKey)}</h2>
            <p className="feat-body">{t(bodyKey)}</p>
            <button className="feat-link" onClick={scrollToFinal}>{t(ctaKey)}</button>
          </div>
          <div>{visual}</div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update App.css — remove feat-grid layout rules**

**Remove** from `.feat-grid` rule: `display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;`

`.feat-grid` becomes:
```css
.feat-grid{}
.feat-grid.flip{direction:rtl;}
.feat-grid.flip > *{direction:ltr;}
```

**Remove** the entire `@media(max-width:860px)` block:
```css
@media(max-width:860px){
  .feat-grid{grid-template-columns:1fr;gap:48px;}
  .feat-grid.flip{direction:ltr;}
}
```

- [ ] **Step 3: Verify on mobile**

Check 375px: all 3 feature sections stack text above card. Check 640px+: text and card side-by-side. Check flip sections: on desktop columns are reversed; on mobile they stack naturally.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/landing/Features.jsx frontend/src/App.css
git commit -m "feat: responsive feature grid via Tailwind (sm:grid-cols-2)"
```

---

## Task 4: Audience.jsx — Responsive card grid

**Files:**
- Modify: `frontend/src/landing/Audience.jsx`
- Modify: `frontend/src/App.css` (remove aud-grid layout CSS + 680px media query)

- [ ] **Step 1: Update Audience.jsx**

Replace the `<div className="aud-grid">` line:

```jsx
<div className="aud-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
```

Full updated return (the only change is adding Tailwind to `aud-grid`):

```jsx
return (
  <section id="audience">
    <div className="section-wrap">
      <h2 className="aud-top-h">{t("aud.h")}</h2>
      <p className="aud-top-sub">{t("aud.sub")}</p>
      <div className="aud-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((c) => (
          <div className="aud-card" id={c.id} key={c.id}>
            <span className={`aud-pill ${c.pillClass}`}>{t(c.pillKey)}</span>
            <div className="aud-name">{t(c.nameKey)}</div>
            <p className="aud-tagline">{t(c.tagKey)}</p>
            <ul className="aud-list">
              {c.itemKeys.map((k) => (<li key={k}>{t(k)}</li>))}
            </ul>
            <button className="aud-join" onClick={scrollToFinal}>{t("aud.join")}</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
```

- [ ] **Step 2: Update App.css — remove aud-grid layout rules**

**Remove** `display:grid;grid-template-columns:1fr 1fr;gap:24px;` from `.aud-grid` rule.

`.aud-grid` becomes:
```css
.aud-grid{}
```

**Remove**:
```css
@media(max-width:680px){.aud-grid{grid-template-columns:1fr;}}
```

- [ ] **Step 3: Verify on mobile**

Check 375px: two audience cards stack vertically, each full-width. Check 640px+: side-by-side.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/landing/Audience.jsx frontend/src/App.css
git commit -m "feat: responsive audience card grid via Tailwind"
```

---

## Task 5: TrustStrip.jsx — Flex-wrap badges

**Files:**
- Modify: `frontend/src/landing/TrustStrip.jsx`
- Modify: `frontend/src/App.css` (remove trust-inner layout CSS + 640px media query)

- [ ] **Step 1: Update TrustStrip.jsx**

Replace `<div className="trust-inner">`:

```jsx
<div className="trust-inner max-w-[1200px] mx-auto px-5 sm:px-10 flex items-center gap-5 sm:gap-8 flex-wrap justify-between">
```

Full updated return:

```jsx
return (
  <div id="trust">
    <div className="trust-inner max-w-[1200px] mx-auto px-5 sm:px-10 flex items-center gap-5 sm:gap-8 flex-wrap justify-between">
      <span className="trust-label">{t("trust.label")}</span>
      <div className="trust-items">
        {items.map((k) => (
          <span key={k} className="trust-item">{t(k)}</span>
        ))}
      </div>
    </div>
  </div>
);
```

- [ ] **Step 2: Update App.css — remove trust-inner layout rules**

**Remove** `max-width:1200px;margin:0 auto;padding:0 40px;display:flex;align-items:center;gap:32px;flex-wrap:wrap;justify-content:space-between;` from `.trust-inner` rule.

`.trust-inner` becomes:
```css
.trust-inner{}
```

**Remove**:
```css
@media(max-width:640px){.trust-inner{padding:0 20px;gap:20px;}}
```

- [ ] **Step 3: Verify on mobile**

Check 375px: "Trusted across Europe" label and the 6 market badges wrap naturally. No horizontal overflow.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/landing/TrustStrip.jsx frontend/src/App.css
git commit -m "feat: responsive trust strip flex-wrap via Tailwind"
```

---

## Task 6: FinalCTA.jsx — Responsive form container

**Files:**
- Modify: `frontend/src/landing/FinalCTA.jsx`
- Modify: `frontend/src/App.css` (remove final-row layout CSS + light-theme fi-row-wrap media query)

### What changes
- `.final-row` already has `max-width:460px;width:100%` in CSS — the form is already full-width on mobile, which is correct (input+button side-by-side fits at 375px: ~295px input, ~100px button)
- Move `.final-row` layout from CSS to Tailwind (`flex items-stretch w-full max-w-[460px]`) — do NOT touch `.fi-input` or `.fi-submit` border-radius CSS (specificity conflict)
- Remove the `[data-theme="light"] .fi-row-wrap` `min-width:640px` media query — replace its `flex-direction:row` with Tailwind on the `fi-row-wrap` div

- [ ] **Step 1: Update FinalCTA.jsx**

Replace the `fi-row-wrap` and `final-row` elements only:

```jsx
return (
  <section id="final">
    <div className="section-wrap">
      <div className="close-line" id="close-line">
        <span className="cl-1">{t("final.cl1")}</span>
        <span className="cl-2">{t("final.cl2")}</span>
      </div>
      <h2 className="final-h">{t("final.h")}</h2>
      <div className="final-wrap">
        <div ref={fiFormAreaRef} className="fi-row-wrap flex flex-col items-center gap-3 w-full">
          <form
            className="final-row flex items-stretch w-full max-w-[460px]"
            onSubmit={handleSubmit}
          >
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
```

- [ ] **Step 2: Update App.css — remove final-row layout and light-theme media query**

**Remove** `display:flex;align-items:stretch;max-width:460px;width:100%;` from `.final-row` rule.

`.final-row` becomes:
```css
.final-row{}
```

**Remove** the light-theme `fi-row-wrap` media query (around line 678):
```css
@media(min-width:640px){[data-theme="light"] .fi-row-wrap{flex-direction:row;justify-content:center;gap:14px;}}
```

Do NOT modify `.fi-input` or `.fi-submit` — their border-radius stays in CSS.

- [ ] **Step 3: Verify on mobile**

Check 375px: email input + submit button sit side-by-side, form is full-width of the container (~295px on 375px screen). No overflow. Check light theme — form renders correctly without the old media query.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/landing/FinalCTA.jsx frontend/src/App.css
git commit -m "feat: responsive final CTA form container via Tailwind"
```

---

## Task 7: Footer.jsx — Responsive link grid

**Files:**
- Modify: `frontend/src/landing/Footer.jsx`
- Modify: `frontend/src/App.css` (remove foot-grid layout CSS + two media queries)

- [ ] **Step 1: Update Footer.jsx**

Replace `<div className="foot-grid">`:

```jsx
<div className="foot-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
```

Full updated return (only the `foot-grid` div changes):

```jsx
return (
  <footer className="foot">
    <div className="section-wrap">
      <div className="foot-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
```

- [ ] **Step 2: Update App.css — remove foot-grid layout rules**

**Remove** `display:grid;grid-template-columns:200px 1fr 1fr 1fr;gap:40px;margin-bottom:48px;` from `.foot-grid` rule.

`.foot-grid` becomes:
```css
.foot-grid{}
```

**Remove** both media queries:
```css
@media(max-width:760px){.foot-grid{grid-template-columns:1fr 1fr;}}
@media(max-width:480px){.foot-grid{grid-template-columns:1fr;}}
```

- [ ] **Step 3: Verify on mobile**

Check 375px: all 4 footer columns stack vertically. Check 640px+: 2-column layout. Check 1024px+: 4-column layout.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/landing/Footer.jsx frontend/src/App.css
git commit -m "feat: responsive footer grid via Tailwind (1→2→4 columns)"
```

---

## Task 8: App.css final cleanup

**Files:**
- Modify: `frontend/src/App.css`

Remove any remaining layout-only media queries that are now redundant. Also remove empty CSS rules left behind.

- [ ] **Step 1: Remove empty rules and redundant media queries**

Search App.css for these patterns and remove them:

1. Empty rules: `.feat-grid{}`, `.aud-grid{}`, `.foot-grid{}`, `.trust-inner{}`, `.final-row{}` — delete the entire rule if body is empty.

2. Remove `.section-wrap` 640px media query only if the padding is handled elsewhere. **Leave it in** — `.section-wrap` is used by 6 components and its responsive padding is still needed:
   ```css
   @media(max-width:640px){.section-wrap{padding:0 20px;}}
   ```
   This stays.

3. Verify no other layout media queries remain for classes that have been migrated.

Run a quick audit:
```bash
grep -n "@media" frontend/src/App.css
```

Expected remaining media queries after cleanup:
- `@media(max-width:640px){.section-wrap{...}}` — keep
- `@media(max-width:760px){.close-line .cl-1, .close-line .cl-2{...}}` — keep (line break in closing quote, not layout)
- `@media(max-width:640px){[data-theme="light"] #final{...}}` — keep (light theme border-radius)
- `@media(max-width:520px){[data-theme="light"] .close-line{...}}` — keep (font-size, not grid)
- `@media(prefers-reduced-motion:reduce){...}` — keep

- [ ] **Step 2: Verify full-page mobile layout**

Open DevTools. Test at these widths in order:
- 320px (smallest Android): no horizontal scroll on body, all sections readable
- 375px (iPhone SE): standard mobile check
- 768px (tablet): two-column features and audience visible
- 1024px (desktop threshold): nav links visible, hamburger hidden

- [ ] **Step 3: Final commit**

```bash
git add frontend/src/App.css
git commit -m "chore: remove empty CSS rules after Tailwind migration"
```

---

## Verification Checklist

After all tasks complete, verify these specific behaviours:

| Check | Expected |
|-------|----------|
| Nav at 375px | Hamburger icon, no nav links visible |
| Nav dropdown | 3 links + CTA, outside-click closes |
| Nav at 1024px | Links visible, hamburger hidden |
| Hero card at 375px | Horizontally scrollable, min 300px wide |
| Feature grids at 375px | All stack single-column |
| Audience cards at 375px | Stack vertically |
| Trust badges at 375px | Wrap to multiple rows, no body overflow |
| Final CTA form at 375px | Input stacks above button, both full-width |
| Footer at 375px | All 4 link columns stacked vertically |
| Footer at 640px | 2-column layout |
| Footer at 1024px | 4-column layout |
| No horizontal body scroll | At any width ≥ 320px |
