# Responsive Design — PulseLoop Landing Page

**Date:** 2026-04-28  
**Status:** Approved  
**Scope:** Full mobile responsiveness across all 7 landing sections

---

## Overview

Migrate the PulseLoop landing page from custom CSS media queries to Tailwind responsive utilities, making the page fully responsive from 320px phones to wide desktops. Add a hamburger navigation menu for mobile. Work is done component-by-component so each section can be visually verified before moving on.

---

## Architecture Split

### Stays in App.css
- `:root` / `[data-theme]` CSS variable declarations (colors, spacing tokens)
- All `@keyframes` (`glow-border`, `float`, `scan`, `pulse-dot`, `up`, `lang-pop`, `scan`, etc.)
- Complex pseudo-elements that reference CSS vars (`.hc-badge::before`, `.pc-live::before`, `.trust-item::before`)
- `[data-theme="light"]` theme overrides (deeply tied to CSS var system)
- Canvas selectors (`#hero-canvas`, `#hero-canvas.ready`)
- Existing media queries that target animations or pseudo-elements only

### Moves to Tailwind in JSX
- All layout: `display`, `flex`, `grid`, `grid-template-columns`, `gap`, `padding`, `margin`
- Typography: `font-size`, `font-weight`, `line-height`, `text-align`, `letter-spacing`
- Colors via CSS var tokens: `text-[--green]`, `bg-[--bg]`, `border-[--bdr]`
- `border-radius`, `overflow`, `position`, `width`, `height`, `opacity`, `transition`
- All responsive variants using Tailwind breakpoint prefixes

Layout-only media queries in App.css (grid, flex, padding, gap changes) are removed once the Tailwind equivalents are in place.

---

## Breakpoints

Mobile-first throughout. Three primary tiers:

| Tier | Tailwind prefix | Min-width | Target devices |
|------|----------------|-----------|----------------|
| Mobile | (default) | 0px | 320px–639px phones |
| Tablet | `sm:` | 640px | Landscape phones, small tablets |
| Desktop | `lg:` | 1024px | Laptops and up |

`md:` (768px) used selectively where an intermediate step is needed (e.g. hero two-column layout).

---

## Component Designs

### 1. Nav — Hamburger Menu

**Mobile (< lg):**
- Nav links hidden, replaced by a `Menu` icon button (Lucide) in top-right
- Tapping toggles a dropdown panel anchored below the nav bar
- Panel: full-width, `position: absolute`, top 100% of nav, glassmorphic background (`bg-[--surface]` + `backdrop-blur`)
- Panel contains: 3 nav links stacked vertically + "Join Waitlist" CTA at bottom
- Close behaviour: clicking any link scrolls to section and closes menu; clicking outside closes menu (same pattern as `LanguageSwitcher`)
- Language switcher remains in nav-right at all screen sizes

**Desktop (`lg:`):**
- Hamburger hidden, nav links shown inline as today

**Animation:** `opacity` + `translateY` fade-in matching the existing `lang-pop` keyframe style, controlled via CSS class toggle.

**Implementation:** Add `useState` for `mobileOpen` to `Nav.jsx`. New `MobileMenu` block rendered conditionally. Use `useEffect` + document click listener for outside-click close (same pattern as `LanguageSwitcher`).

---

### 2. Hero

**Headline + subtext:**
- Replace fixed `px` font sizes with Tailwind fluid scale: `text-4xl sm:text-5xl lg:text-[68px]`
- Subtext and intro label stack naturally

**Hero actions (buttons):**
- `flex-col w-full` on mobile → `flex-row w-auto` on `sm:`
- Buttons full-width on mobile

**Email capture form:**
- Input + submit stacked (`flex-col`) on mobile → side-by-side (`flex-row`) on `sm:`
- Input full-width on mobile

**Hero visual (product card):**
- Container: `overflow-x-auto` on mobile, `overflow-visible` on `sm:`
- Card: `min-w-[320px]` so it doesn't collapse — horizontal swipe on mobile
- Sidebar (`.hc-sidebar`): hidden on mobile, visible on `md:`

**Canvas:** No changes needed — already scales dynamically by viewport area via the existing hook.

**Layout:** Text block above, card below, both full-width stacked on mobile. On `lg:` layout stays as-is.

---

### 3. Features (3 alternating grid sections)

- Desktop: 2-column grid (text + card side by side, alternating)
- Mobile: single column, stacked. Breakpoint pulled from 860px to `sm:` (640px)
- Alternating flip (`.feat-grid.flip`) becomes natural stacking on mobile — no CSS `order` manipulation needed
- Feature cards (product card, signal card, cert card) shrink to column width; internal layouts are already column-based

---

### 4. Audience

- 2-column card grid → 1-column on mobile (`grid-cols-1 sm:grid-cols-2`)
- Cards full-width on mobile
- Benefit lists and CTA buttons stack naturally — no special handling

---

### 5. TrustStrip

- 6 market badges: `flex-wrap` so they flow to 2 rows on mobile
- Label stays above badges on all sizes
- Gap tightens on mobile (`gap-3 sm:gap-5`)

---

### 6. FinalCTA

- Email input + submit: `flex-col` on mobile → `flex-row` on `sm:`
- Input full-width on mobile (`w-full`)
- Heading font size: Tailwind fluid scale (`text-3xl sm:text-4xl lg:text-5xl`)
- Light-mode panel (`[data-theme="light"] #final`) border-radius and margin overrides stay in App.css (theme-specific pseudo-element rules)

---

### 7. Footer

- 1-column on mobile → 2-column on `sm:` → 4-column on `lg:`
- Brand/logo block full-width on mobile, spanning the top row
- Link columns stack below

---

## Implementation Order

Work component-by-component, visually verify each before moving on:

1. `Nav.jsx` — hamburger menu + Tailwind migration
2. `Hero.jsx` — fluid text, stacked layout, scrollable card
3. `Features.jsx` — grid collapse at sm breakpoint
4. `Audience.jsx` — card grid responsive
5. `TrustStrip.jsx` — badge flex-wrap
6. `FinalCTA.jsx` — email form row
7. `Footer.jsx` — link grid responsive
8. `App.css` — remove layout-only media queries that were replaced

---

## Constraints

- Do not touch `@keyframes`, CSS variable declarations, or `[data-theme="light"]` overrides in App.css
- Do not change any functionality (waitlist form, i18n, canvas animation, scroll hooks)
- Tailwind config already maps CSS vars to tokens — use existing token names, do not add new ones
- Canvas particle node count already scales by viewport area — no changes needed
