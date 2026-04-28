# Design System: PulseLoop Landing Page

**Project:** Pulse-Loop-Landing-Page
**Active Theme:** Light (forced via `useForceLightTheme()` hook — dark token definitions exist but are not exposed to the user)

---

## 1. Visual Theme & Atmosphere

Crisp, intelligence-grade minimalism. The page reads like a premium SaaS dashboard company — clinical white surfaces, a warm off-white dot-grid body, and two electric accent colors (emerald green + electric lime) used sparingly but with authority. Product mock-ups float visually, cards breathe with slow vertical oscillation, and green scanning lines suggest live data. The mood is: *a trading terminal crossed with a boutique consultancy letterhead.* Dense with information but never cluttered — every section breathes with 100px of vertical space.

The particle canvas background in the hero (animated floating green/yellow nodes connected by faint green lines) establishes the "intelligence network" metaphor before a word is read.

---

## 2. Color Palette & Roles

All values are from the `[data-theme="light"]` block — the sole active theme.

| Descriptive Name | Hex / Value | Functional Role |
|---|---|---|
| **Emerald Signal Green** | `#00A36C` | Accent color for badges, active states, signal indicators, verified chips, CTA outline buttons, icon strokes, bullet dots, scan lines |
| **Electric Lime** | `#D1D501` | Logo color, primary CTA button background (`btn-y`, `fi-submit`), final-CTA section submit button |
| **Deep Ink** | `#0A0A10` | Body text primary, nav CTA button background, final dark panel background, CTA text on lime buttons |
| **Warm Off-White** | `#F5F5F0` | Page body background (also carries the dot grid pattern) |
| **Pure White** | `#FFFFFF` | Card backgrounds, nav bar, trust strip, language menu, footer |
| **Faint Cream** | `#FAFAF5` | Card header/topbar backgrounds (`bg3`), form input backgrounds |
| **Subtle Warm Gray** | `#EFEFE8` | Signal source pill backgrounds (`bg4`) |
| **Near-Black Text** | `#0A0A10` | Primary headings and body text on white |
| **Slate Secondary Text** | `#4A4A52` | Subtitles, card values, feature body copy |
| **Muted Pewter** | `#6E6E76` | Labels, captions, timestamps, trust strip items, footer column headers |
| **Whisper Border** | `rgba(0,0,0,0.07)` | Divider lines between sections, card interior row separators |
| **Soft Border** | `rgba(0,0,0,0.12)` | Card outer borders, input borders, nav bar border |
| **Blue Regulatory** | `#60A5FA` | "Regulatory" category chip only (in light: `#2563EB` text) |
| **macOS Red / Yellow / Green** | `#FF5F57` / `#FEBC2E` / `#28C840` | Hero product card window chrome dots only |

### Special Background Treatments

- **Body dot grid:** `radial-gradient(circle, rgba(10,10,16,0.07) 1px, transparent 1px)` tiled at 22×22px — creates a faint graph-paper feel
- **Final CTA dark panel (light mode):** `#0A0A10` solid with the same white dot grid (`rgba(255,255,255,0.07)`) + `radial-gradient(ellipse at 50% 30%, rgba(209,213,1,0.06), transparent 60%)` — subtle lime glow emanating from behind the headline
- **Hero canvas:** Particle nodes rendered at 85% opacity in light mode; green nodes use `rgba(0,162,108)`, yellow use `rgba(163,166,0)` with radial glow halos

---

## 3. Typography Rules

### Font Families

| Variable | Family | Character |
|---|---|---|
| `--font-d` | **Plus Jakarta Sans** | Display / editorial — headlines, card titles. Used at 800 weight with tight letter-spacing and compressed line-heights for impact. Italic variant used for hero emphasis line. |
| `--font-m` | **Barlow** | Monospaced-feeling labels — badges, section tags, timestamps, uppercase UI metadata. Always uppercase with wide tracking (0.08–0.14em). |
| `--font-b` | **Inter** | Body and reading copy — subtitles, feature paragraphs, card values, footer links. 15px base, 1.6 line-height on body. |
| `--font-f` | **Barlow + Inter fallback** | Functional UI — buttons, nav links, language switcher. Uppercase, small, high tracking. |

### Sizing Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Hero H1 Normal | `clamp(52px, 8vw, 108px)` | 800 | 0.96 | -0.03em |
| Hero H1 Italic | `clamp(40px, 6.4vw, 86px)` | 700 | 0.96 | -0.03em |
| Section headings (Features, Audience) | `clamp(28px, 4vw, 52px)` | 800 | 1.1 | -0.02em |
| Feature card headings | `clamp(26px, 3vw, 40px)` | 800 | 1.1 | -0.02em |
| Final CTA closing line (light) | `clamp(40px, 6vw, 84px)` | 800 | 1.0 | -0.035em |
| Hero subtitle | `clamp(15px, 1.8vw, 19px)` | 400 | 1.7 | normal |
| Feature body copy | 16px | 400 | 1.75 | normal |
| Card report title | 18px | 700 | normal | normal |
| Section tags / badges | 10–11px | 600 | 1 | 0.08–0.14em (uppercase) |
| Button labels | 11–13px | 700 | 1 | 0.08–0.09em (uppercase) |
| Nav links | 11px | 700 | 1 | 0.09em (uppercase) |
| Caption / micro text | 9–11px | 500–600 | 1 | 0.06–0.12em (uppercase) |

### Typography Rules of Note

- Headlines (Plus Jakarta Sans) always use negative letter-spacing — they hug together like editorial display type
- All labels, badges, and button text are ALL-CAPS Barlow with wide tracking — creates a "data readout" feel
- The hero italic line (`hero-h1.ital`) uses a darker deep green (`#00875A`) — one tone darker than the main accent green — to stay legible on the white body
- Body Inter at 15px base with `antialiased` rendering — smooth and screen-optimized

---

## 4. Component Stylings

### Navigation Bar

Floating, pill-shaped glass bar that detaches from the viewport edges with a 24px margin (14px on mobile). Always sits 16px from the top, shifting to 10px after 40px of scroll.

- **Container:** `height: 56px`, `border-radius: 14px`, `background: rgba(255,255,255,0.92)`, `backdrop-filter: blur(16px)`, `border: 1px solid rgba(10,10,16,0.08)`, shadow `0 4px 18px rgba(10,10,16,0.06)`. On scroll: opacity increases to 0.98, shadow deepens.
- **Logo:** SVG mark (lime `#D1D501`) + "PULSELOOP" wordmark in Barlow 15px, 700 weight, 0.1em uppercase tracking.
- **Nav links:** Barlow 11px uppercase, Slate Secondary (#4A4A52). Hover: background `rgba(10,10,16,0.05)` + text darkens to near-black. Pill-shaped hover area (999px radius).
- **Join Waitlist CTA:** Dark rounded rect (`border-radius: 10px`, `height: 44px`, `background: #0A0A10`). Prefixed with `✛` glyph in lime. Cream text `#F0F0EC`. Hover: lifts `translateY(-1px) scale(1.04)` + dark ring glow `0 0 0 4px rgba(10,10,16,0.10)`.
- **Language Switcher:** Transparent pill button with globe icon + language code + chevron. Opens a white dropdown menu (`border-radius: 12px`, shadow `0 12px 32px rgba(10,10,16,0.12)`) with `lang-pop` animation (fade + 4px lift). Active language item has light green tint background.

### Hero Section

Full-viewport height section with particle canvas as the background layer.

- **Intro badge:** Small inline flex with a pulsing 6px green circle + Barlow uppercase caption in muted pewter. Breathing animation on dot (50% opacity dip, 2s loop).
- **H1 normal span:** Plus Jakarta Sans 800, near-black, `white-space: nowrap`.
- **H1 italic span:** Plus Jakarta Sans italic 700, deep green `#00875A`, slightly smaller size step.
- **Subtitle paragraph:** Inter, secondary text color, `max-width: 58ch`, centered.
- **Primary hero CTA button (`btn-y`):** `height: 54px`, `border-radius: 12px` (light mode), lime `#D1D501` background, near-black text, Barlow 13px bold uppercase. Hover: `scale(1.04) translateY(-2px)` + yellow ring `0 0 0 6px rgba(209,213,1,0.18)` + deep yellow shadow `0 12px 32px rgba(209,213,1,0.4)`. Active: `scale(0.98)`.
- **Inline email form (revealed on CTA click):** Input (`border-radius: 12px 0 0 12px` light) + submit button (`border-radius: 0 12px 12px 0`). Input background warm cream `#FAFAF5`, green focus border ring. Submit button green `#00A36C`. Hover on submit: scale + green ring glow.
- **Success state:** Small green circular icon (22px, filled, white checkmark SVG) + "You're on the list" text in green Barlow uppercase.
- **Hero product card:** Described in detail under "Product Card Components" below.

All hero text elements animate in sequentially via `@keyframes up` (slide up 16px + fade): intro at 100ms, H1 at 220ms, subtitle at 340ms, actions at 460ms, card at 600ms.

### Hero Product Card (`.hero-card`)

A simulated browser/app window demonstrating the product interface.

- **Shell:** `border-radius: 12px`, white background, soft border, hero shadow (`0 24px 60px rgba(10,10,16,0.08)`).
- **Topbar:** Cream/faint background (`#FAFAF5`), macOS-style traffic dots (10px circles: red `#FF5F57`, amber `#FEBC2E`, green `#28C840`), centered title in Barlow 11px muted, right-side "Live" badge (green pill, `border-radius: 999px`, pulsing green dot prefix).
- **Body layout:** CSS grid — 260px left sidebar + flexible main area. Sidebar has a right border. Main area has 24px padding.
- **Sidebar nav items:** Barlow Inter 12px, muted gray, 5px border-radius. Active item: light green tint `rgba(0,163,108,0.10)`, emerald text. Each item has a small inline SVG icon (14px, 1.5 stroke-width).
- **Report title:** Plus Jakarta Sans 18px bold.
- **Report subtitle:** Barlow 10px uppercase muted.
- **Status chips:** 10px Barlow uppercase, 3px border-radius. Two variants: verified (green tint + green border + green text) and neutral (cream bg + subtle border + muted text).
- **Signal rows:** Each row has a 3px-wide × 36px-tall colored left bar (green, yellow, or blue `#60A5FA`), followed by bold header + normal body text. Rows separated by bottom border.

### Trust Strip

Horizontal band spanning full width, sitting between hero and features.

- Background white, 32px top/bottom padding, thin top+bottom borders.
- **Label:** Barlow 10px, 0.14em tracking, uppercase, pewter muted text, `white-space: nowrap`.
- **Country items:** Barlow 11px, uppercase, pewter. Each item prefixed by a 5px × 5px circle dot (same color, 40% opacity).
- Items flex-wrap on narrow viewports.

### Feature Sections (×3)

Each is a `<section>` with 100px vertical padding and a bottom border divider. Scroll-revealed: starts `opacity: 0, translateY(28px)`, transitions to visible on IntersectionObserver fire (threshold 0.18).

- **Layout:** 2-column CSS grid, 80px gap, `align-items: center`. Feature 2 uses `direction: rtl` to flip the visual to the right (text stays readable via `direction: ltr` on children). Collapses to single column ≤860px.
- **Section tag:** Barlow 10px, 0.14em uppercase tracking, emerald green. 14px bottom margin.
- **Heading:** Plus Jakarta Sans 800, `-0.02em` tracking, tight leading. 16px bottom margin.
- **Body copy:** Inter 16px, 1.75 line-height, secondary slate text, `max-width: 46ch`. 28px bottom margin.
- **"Join waitlist" text-link button:** Barlow 12px bold uppercase, emerald green, no border/background. Arrow gap (6px) expands to 10px on hover via CSS `transition: gap`.

### Hypothesis Card (`.prod-card.glow`)

Feature section 1 visual. Animated product card.

- **Shell:** `border-radius: 12px`, white bg, subtle border. Two simultaneous animations: `float` (vertical 6px oscillation, 7s ease-in-out infinite) + `glow-border-light` (pulsing green outer ring glow — alternates between `rgba(0,163,108,0.18)` and `rgba(0,163,108,0.4)` border shadow, 3.5s infinite).
- **Header:** Cream topbar, Barlow label + green "Live" pulsing indicator.
- **Body rows (`.pc-row`):** Label column (Barlow 9px, 0.12em tracking, uppercase, `min-width: 76px`) + value column (Inter 13px, near-black). Rows separated by bottom border.
- **Footer button:** Full-width, 38px tall, ghost green button — `background: rgba(0,163,108,0.08)`, `border: 1px solid rgba(0,163,108,0.30)`, `border-radius: 4px`, green text. Hover: background deepens to 16% opacity.

### Signal Feed Card (`.sig-card`)

Feature section 2 visual. Floating at 8s + 1s delay offset.

- **Scan line:** Absolutely positioned 1px horizontal bar with `background: linear-gradient(90deg, transparent, #00A36C, transparent)`. Animates from top to bottom on a 3s linear infinite loop (`@keyframes scan`), z-index 2.
- **Topbar:** Cream bg, feed title + right-aligned "3 new" badge (green pill, `border-radius: 999px`).
- **Signal entries:** Each has a source badge (Barlow 9px, `bg4` warm gray background, 3px border-radius) + relative timestamp (Barlow 9px, pewter) at top. Signal text in Inter 12px truncated with ellipsis. Category chip at bottom (3px border-radius):
  - Launch: green tint (#00A36C)
  - Regulatory: blue tint (#2563EB)
  - Funding: yellow tint (#7A7E00 text on yellow bg in light)
- Entries separated by bottom borders; last entry has none.

### Certificate Card (`.cert-card2`)

Feature section 3 visual. Floating at 9s + 2s delay offset. Scroll-triggered line reveal animation.

- **Header:** Cream topbar with document tag (Barlow 9px uppercase, pewter), report name (Plus Jakarta Sans 15px, 700), and "● Verified" pill (green, `border-radius: 999px`).
- **Data rows:** Each `cert2-line` starts `opacity: 0, translateX(-8px)` and transitions to visible with 110ms stagger between lines on scroll enter. Key column: Barlow 9px, `min-width: 110px`. Value column: Barlow 11px. Values with `g` modifier: emerald green (`#00A36C`).
- **Footer:** Barlow 9px, right-aligned, pewter. Attribution line.

### Audience Cards (`.aud-card`)

2-column grid with 24px gap. Scroll-triggered reveal, second card has 100ms delay.

- **Shell:** `border-radius: 10px`, white bg, soft border, `padding: 40px`. Starts `opacity: 0, translateY(20px)`.
- **Persona pill:** Barlow 9px, 0.12em uppercase, `border-radius: 999px`. Two styles:
  - Most Popular / Solo: emerald green tint (`rgba(0,163,108,0.10)`, green border, green text)
  - Agencies: yellow-olive tint (`rgba(209,213,1,0.20)`, yellow-olive border, `#7A7E00` dark olive text)
- **Card heading:** Plus Jakarta Sans 24px, 700, near-black.
- **Card tagline:** Inter 14px, 1.65 line-height, secondary text, `max-width: 40ch`.
- **Feature list:** Unordered, no bullet. Each `<li>` flex row with a 5px green filled circle as the visual bullet (`margin-top: 6px` for alignment), Inter 14px secondary text, bottom border separator except last item.
- **"Join waitlist" CTA:** Same arrow text-button pattern as feature sections.

### Final CTA Section (`#final`)

In light mode: inverted dark panel isolated from the page flow.

- **Container:** `background: #0A0A10`, `border-radius: 24px`, `margin: 60px 24px` (floats as an island), `padding: 140px 0 120px`. Dot grid overlay: `rgba(255,255,255,0.07)`, 22px. Subtle lime radial glow via `::before` pseudo (`radial-gradient(ellipse at 50% 30%, rgba(209,213,1,0.06), transparent 60%)`).
- **Closing headline:** Two `<span>` blocks, Plus Jakarta Sans 800, `clamp(40px, 6vw, 84px)`, `-0.035em` tracking, `line-height: 1`. First span: bright cream `#F0F0EC`. Second span: `rgba(240,240,236,0.32)` — ghosted, 32% opacity, reads like a fading echo.
- **Subtitle (`final-h`):** Inter normal weight, `rgba(240,240,236,0.75)`, 15–19px — deliberately plain against the display headline.
- **Email form input:** `height: 54px`, glass background `rgba(255,255,255,0.06)`, white border `rgba(255,255,255,0.14)`, `border-radius: 12px 0 0 12px`, cream text, centered placeholder at 45% opacity. Focus: yellow border `rgba(209,213,1,0.5)`.
- **Submit button:** `height: 54px`, lime `#D1D501`, near-black text, `border-radius: 0 12px 12px 0`. Hover: `scale(1.04)` + yellow ring shadow `0 0 0 6px rgba(209,213,1,0.22)`.
- **Secondary outline button (`fi-secondary`):** Pill shape (`border-radius: 999px`), `height: 54px`, transparent background, `border: 1px solid rgba(255,255,255,0.22)`, cream text. Hover: border brightens to full white, faint white tint.
- **Micro text:** Barlow 11px, `rgba(240,240,236,0.45)` — barely visible.
- **Success state:** 52px circular lime-green `#D1D501` checkmark disc, "You're on the list." heading in Plus Jakarta Sans 26px cream, green subtitle.

### Footer

Standard 4-column grid layout.

- **Background:** Pure white (`var(--bg2)` in light). Top border divider. `padding: 60px 0 40px`.
- **Grid:** `grid-template-columns: 200px 1fr 1fr 1fr`, `gap: 40px`. Collapses to 2-col ≤760px, 1-col ≤480px.
- **Brand column:** Logo SVG (lime) + "PULSELOOP" in Barlow 13px bold uppercase + tagline in Inter 13px pewter.
- **Column headers:** Barlow 10px, 0.14em tracking, uppercase, pewter. 16px bottom margin.
- **Column links:** Inter 13px, secondary slate text. Hover: text darkens to near-black. Transition 150ms.
- **Bottom bar:** Flex row, space-between. Copyright: Barlow 11px pewter. Legal links: Barlow 11px, 0.06em uppercase, pewter, hover lightens.

### Toast Notifications (Sonner)

- Position: top-center, `theme: "light"`, `richColors`, `closeButton`.
- Standard / success toasts: default Sonner light styling.
- Error toasts: `toast.error()` — red accent variant.

---

## 5. Animations & Motion

### Custom Easing

`--ease: cubic-bezier(0.16, 1, 0.3, 1)` — an exponential spring curve. Fast deceleration with an overshoot-free snap. Used for all primary transitions (nav, buttons, modals, scroll reveals).

### Keyframe Definitions

| Name | Behavior | Duration / Usage |
|---|---|---|
| `up` | `opacity:0 + translateY(16px)` → `opacity:1 + translateY(0)` | 600–900ms, hero stagger |
| `float` | `translateY(0)` → `translateY(-6px)` → back | 7–9s ease-in-out infinite, product cards |
| `glow-border` | Outer box-shadow pulses between low and high green opacity | 3.5s ease-in-out infinite, hypothesis card |
| `glow-border-light` | Light-mode variant — green border + lime secondary glow at 50% peak | 3.5s ease-in-out infinite |
| `scan` | `translateY(-100%)` → `translateY(500%)` | 3s linear infinite, signal feed scan line |
| `pulse-dot` | `opacity: 1` → `0.3` → `1` | 1.8–2s ease-in-out infinite, all green status dots |
| `lang-pop` | `opacity:0 + translateY(-4px)` → full | 180ms, language menu open |

### Scroll-Triggered Reveals

Uses `IntersectionObserver` (threshold 0.18). Triggered elements: all three feature sections, testimonial cards, both audience cards, social heading, close-line in final CTA. Each starts invisible with `translateY(20–28px)` and transitions with 600–800ms at `--ease`. Audience card 2 has 100ms delay.

### Certificate Line Reveal

Separate `IntersectionObserver` (threshold 0.3) on the certificate card. On enter: each `cert2-line` receives `.on` class with 110ms stagger. Each line: `opacity:0 + translateX(-8px)` → full, 400ms at `--ease`.

### Button Micro-Interactions

All CTA buttons (`nav-cta`, `btn-y`, `fi-submit`, `hf-submit`) share:
- `will-change: transform, box-shadow`
- `transition: transform 280ms --ease, box-shadow 280ms --ease, background 200ms ease, opacity 150ms ease`
- Hover: `scale(1.04)` + colored ring shadow (yellow for btn-y/fi-submit, dark for nav-cta, green for hf-submit)
- Active: `scale(0.98)` — tactile press feel

### Reduced Motion

`@media (prefers-reduced-motion: reduce)` collapses all animation durations to `0.01ms` — complete accessibility opt-out.

---

## 6. Layout Principles

### Spacing System

- **Section vertical rhythm:** 100px top+bottom padding for all feature and audience sections.
- **Hero top padding:** 90px (clears the fixed nav bar).
- **Final CTA:** 120px top / 100px bottom (140px / 120px in light variant).
- **Container max-width:** 1200px for all sections, 1400px for the hero text block.
- **Container horizontal padding:** 40px sides (20px on ≤640px viewports).
- **Component internal padding:** Cards 40px, product card sidebar 20px, product card main 20–24px.
- **Gap values:** Feature grid 80px, audience grid 24px, testi-grid 1px (seamless border), nav items 6px, footer grid 40px.

### Grid Strategy

- **Feature sections:** `1fr 1fr`, items centered. Feature 2 flipped via `direction: rtl` on the grid; child elements restore `direction: ltr`.
- **Audience:** `1fr 1fr`, 24px gap, collapses to `1fr` at 680px.
- **Hero product card body:** `260px 1fr` — fixed sidebar, flexible main.
- **Footer:** `200px 1fr 1fr 1fr`.

### Z-Index Architecture

| Layer | z-index | Element |
|---|---|---|
| Particle canvas | 0 (absolute, behind) | `#hero-canvas` |
| Hero content | 2 | `.hero-top`, `.hero-visual` |
| Language menu | 400 | `.lang-menu` |
| Navigation | 300 | `#nav` |
| Scan line overlay | 2 | `.sig-card-scan` |

### Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| ≤860px | Feature grids collapse to 1 column, flip direction removed |
| ≤760px | Nav links hidden, testimonial cards collapse to 1 column, footer → 2-column |
| ≤680px | Audience grid → 1 column |
| ≤640px | Container padding → 20px, hero visual padding → 20px, final CTA border-radius → 18px |
| ≤520px | Close-line text allows wrapping |
| ≤480px | Footer → 1 column |

---

## 7. Border Radius Reference

| Shape Name | Value | Elements |
|---|---|---|
| Sharp squared | `3–4px` | Chips, category badges, source pills, confirm button, form row join, signal entry chips |
| Softly rounded | `5px` | Sidebar nav items, audience list bullets N/A |
| Noticeably rounded | `10px` | Audience cards |
| Generously rounded | `12px` | Product cards, hero card, language menu, nav CTA button (dark), final form inputs (light) |
| Prominently rounded | `14px` | Nav bar container |
| Boldly rounded | `18–24px` | Final CTA panel (mobile 18px, desktop 24px) |
| Pill / infinite | `999px` | Status badges, "Most Popular" pills, theme toggle, language switcher button, new-signal badge, audience pills |
| Circular | `50%` | Success checkmark icon, intro pulse dot, list item bullets, nav-item dot, particle nodes |

---

## 8. Shadow & Elevation System

| Name | Value | Used on |
|---|---|---|
| Nav resting | `0 4px 18px rgba(10,10,16,0.06), 0 1px 0 rgba(10,10,16,0.04)` | Nav bar |
| Nav scrolled | `0 8px 28px rgba(10,10,16,0.10), 0 1px 0 rgba(10,10,16,0.05)` | Nav bar after scroll |
| Card shadow (light) | `0 8px 24px rgba(10,10,16,0.06), 0 1px 0 rgba(10,10,16,0.04)` | Product cards |
| Hero card shadow (light) | `0 24px 60px rgba(10,10,16,0.08), 0 0 0 1px rgba(10,10,16,0.05)` | Hero product card |
| Language menu | `0 12px 32px rgba(10,10,16,0.12), 0 1px 0 rgba(10,10,16,0.04)` | Language dropdown |
| Yellow button glow | `0 0 0 6px rgba(209,213,1,0.18), 0 12px 32px rgba(209,213,1,0.40)` | `.btn-y:hover`, `.fi-submit:hover` |
| Green form glow | `0 0 0 5px rgba(0,163,108,0.18), 0 10px 28px rgba(0,163,108,0.35)` | `.hf-submit:hover` |
| Nav CTA dark glow | `0 0 0 4px rgba(10,10,16,0.10), 0 8px 22px rgba(10,10,16,0.25)` | `.nav-cta:hover` |

Elevation is whisper-soft throughout — no harsh hard shadows. The system communicates depth through warm-toned, diffused box-shadows with a 1px base layer for crispness.

---

## 9. Icon & Visual System

- **Logo:** Custom SVG monogram (two arc paths forming a pulse/wave shape), always rendered in lime `#D1D501`. Nav size: 30px. Footer size: 20px.
- **Nav icons (feature card sidebar):** Simple geometric SVGs, 14×14px, 1.5 stroke-width, no fill. Grids, clock, lines, arrow-down motifs.
- **Button prefix:** `✛` Unicode character (heavy plus) used in nav CTA and final submit button, rendered in lime on the dark CTA.
- **Lucide icons:** `Globe` (14px, 2.2 stroke) + `ChevronDown` (13px, 2.2 stroke) in language switcher only.
- **Checkmark SVG (success states):** Polyline, white or near-black stroke, 2–2.5 stroke-width, round linecap/linejoin.
- **No decorative imagery:** Zero photos, illustrations, or icons beyond the above — the product cards themselves are the visual proof.

---

## 10. Internationalization Design Notes

The page supports 8 languages (EN, FR, DE, NL, PT, ES, SV, RO) with persistence in `localStorage`. The language switcher is designed to never break the nav layout — the button shows only a 2-letter code and globe icon. All uppercase button labels and badges are locale-aware (e.g., "Join Waitlist" → "Rejoindre"). Long translated strings in headings are handled with `clamp()` font sizes, so layout integrity is maintained across languages without hardcoded breakpoints.
