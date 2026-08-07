# Monsoon Watch

MASTER PROMPT — "ManholeGuard" Unified 3D UI/UX

Copy everything below the line into your AI website builder (Claude, v0, Lovable, Cursor, etc.) as a single prompt.

THE PROMPT

You are the lead product designer + frontend engineer for ManholeGuard — a crowdsourced, AI-verified early-warning platform that lets citizens report displaced, missing, or overflowing manhole/drain covers during monsoons, and lets municipal staff track and resolve them in real time.

Design and build a single cohesive product with two merged experiences:

A public marketing/citizen landing page (hero, live map preview, report flow, how-it-works)

A full admin/operations dashboard (sidebar nav, live map, analytics, report queue, alerts)

Both must share one design system — same colors, type, corner radii, card style, iconography, and signature 3D motif — so the product feels like one app, not two stitched-together screens.

1. Brand & Mood

A rain-slick, nighttime city seen from a control room — equal parts civic-safety utility and near-future ops center. It should feel calm, trustworthy, and precise (this is safety infrastructure, not a game), while still feeling alive with real-time motion (rain, pulsing markers, live counters).

2. Design Token System

Color palette (dark-first):

--bg-void: #0A0E14 — base background, near-black navy (not pure black)

--bg-surface: #121826 — card/panel background

--bg-surface-raised: #1A2333 — elevated cards, modals, hover states

--accent-teal: #2DD4BF — primary signature accent (glow rings, active states, verified badges)

--accent-amber: #F59E0B — hazard/warning markers, CTA buttons ("Report a Hazard")

--accent-crimson: #EF4444 — critical/open alerts, emergency banner

--accent-violet: #8B7FF6 — "missing cover" marker category, secondary data viz

--text-primary: #F1F5F9, --text-muted: #8896A6

Typography:

Display/headline face: a geometric grotesk with slightly tightened tracking (e.g., Space Grotesk or General Sans) — used for hero statements and big numbers, weight 600–700 only.

Body/UI face: a clean humanist sans (e.g., Inter or IBM Plex Sans) for all UI text, tables, labels — weight 400–500.

Data/mono face: a monospace (e.g., JetBrains Mono) for report IDs, coordinates, timestamps — reinforces the "systems/ops" feel.

Shape language:

Cards: 16px radius, 1px hairline border in rgba(255,255,255,0.06), subtle inner glow on hover.

Buttons: pill-shaped primary CTA (amber, glowing shadow), rectangular 10px-radius secondary buttons.

Map pins: teardrop pins with a soft outer glow matching their category color, pulsing ring animation on new/unresolved hazards.

Signature element (the one thing this design is remembered by): A photoreal 3D manhole cover, wet asphalt beneath it, with a thin teal energy ring pulsing around its rim like sonar — used as the hero centerpiece on the landing page, and as a recurring micro-motif (a tiny animated version spins subtly in the loading state, favicon, and empty-states). It visually answers "what is this product about" in one glance, and the pulsing ring doubles as a metaphor for the alert radius.

3. Page 1 — Public Landing / Citizen Entry

Hero section

Left: bold headline "See a hazard. Report it in 15 seconds." with a one-line subhead about AI-verified, real-time monsoon safety.

Three live stat chips inline under the headline: Reports Today, Resolved, Active Alerts — animate counting up on scroll into view.

Primary CTA: pill button "Report a Hazard" (amber, glowing) + secondary ghost button "View Live Map."

Right/background: the signature 3D manhole cover with rain and the pulsing teal ring, rendered with a soft parallax tilt that responds to mouse movement (desktop) or device tilt (mobile) — subtle, not gimmicky.

Ambient rain particles falling in the background at low opacity, GPU-cheap (CSS/canvas, not heavy WebGL).

Live 3D Map preview section

An isometric/3D-tilted city map block (can be a stylized illustrated 3D map, not literal satellite data) with glowing category pins scattered across it, each with a soft bloom halo.

Overlay mini-cards floating on the map: live counters (Reports, Resolved Today, Active Uptime gauge), styled as frosted-glass panels.

Pins gently bob/pulse; hovering one expands a small popover with a thumbnail + status.

"Report a Hazard" flow preview

A horizontal 3-step visual: Snap a photo → Confirm location → AI verifies & alerts nearby users — shown as connected cards with a subtle animated dotted line/progress connector between them (order is meaningful here, so numbering is appropriate).

Include a live "Recent Reports" ticker strip (auto-scrolling marquee of last 5 reports with thumbnail + status pill).

How It Works (from Image 2's 4-step panel)

4 steps: Report → Verify → Act → Update, each with a small icon, one-line description. Reveal on scroll with a staggered fade/slide.

Footer / trust band

Emergency helpline banner (red accent, always visible or sticky on mobile): "Emergency? Call 1800-123-4567" — this stays persistent, not just decorative.

Partner/municipal trust logos row (placeholder), community stats.

4. Page 2 — Admin / Operations Dashboard

Merge Image 2's full layout as the base, with Image 1's live-3D-map treatment applied to its map widget, and Image 1's data-panel styling applied to its charts.

Left sidebar (fixed, collapsible): Dashboard, Live Map, Report Hazard, My Reports, Alerts, Analytics, Community, Notifications, Settings, Help Center, About Us, Logout — plus the persistent red Emergency Call banner pinned at the bottom of the sidebar.

Top bar: Global search (Search reports, locations, IDs... with Ctrl+K hint), notification bell with live badge count, messages icon, admin profile with role label, date-range picker, Export button.

Row 1 — Live KPI strip: 5 stat cards: Total Reports, Open, In Progress, Resolved, Active Alerts — each with a week-over-week % delta arrow (green up = good for "Resolved", red up = bad for "Open"). Animate numbers counting up on first load.

Row 2 — Live City Overview (hero widget of the dashboard): Large 3D-tilted map, "Real-time" pulsing badge in the corner, category-filter chips above it (All / Open Manhole / Overflowing Drain / Missing Cover / Water Logging / In Progress), zoom controls, and a legend along the bottom matching pin colors to categories. This reuses the landing page's glowing-pin visual language exactly, so it reads as the same product.

Row 3 — Right rail: Recent Alerts feed (icon thumbnail + location + relative time, newest at top, subtle slide-in animation when a new one arrives) and a Quick Actions panel (Report Hazard / Live Map / My Reports / Alerts as 2x2 icon buttons).

Row 4 — Analytics strip: 3 cards — Reports Over Time (line chart, tooltip on hover), Top Affected Areas (donut chart), Severity Distribution (donut chart with center total). Use the accent palette consistently: crimson=High, amber=Medium, teal=Low/Resolved-adjacent, violet=Very Low.

Row 5 — Data tables: All Reports (filterable, searchable, status pill badges color-coded), Recent Reports (compact card list with thumbnails), Notifications feed. Status pills: Open (crimson), Pending (amber), In Progress (violet/blue), Resolved (teal).

Support Center block: FAQs / Report an Issue / Contact Support / User Guide as a small 2x2 icon grid, low visual weight — utility, not decoration.

5. 3D, Animation & "Wow" Layer

Be deliberate — spend the 3D/motion budget on a few orchestrated moments, not scattered effects everywhere (nothing should feel like decoration for its own sake):

Hero manhole cover — real 3D render (Three.js/Spline) or high-quality looping video/WebM with alpha, rain particles, and the pulsing teal sonar ring. This is the one "wow" the whole page is built around.

Live map pins — soft glow + gentle pulse loop on unresolved/high-severity hazards only (resolved ones sit static and dim) — the animation itself communicates urgency, so use it purposefully.

Page-load sequence — stat numbers count up, cards fade/slide in with a short stagger (~60–80ms between cards), map pins drop in with a soft bounce.

Scroll-triggered reveals on the landing page sections (How It Works, testimonials/trust band).

Micro-interactions — hover glow on cards/buttons, a satisfying "report submitted" success animation (a small radar-ping burst from the map pin), status pill color-morphs when an admin changes a report's status.

Rain ambience — a subtle, continuous, low-opacity rain layer on dark sections only (hero, live map), never on data-dense table sections where it would hurt readability.

Respect prefers-reduced-motion — all of the above degrade gracefully to static/fade-only.

6. Feature List To Implement (pulled from both reference designs)

Live stats: reports today, resolved count, active alerts, % week-over-week deltas

One-tap "Report a Hazard" flow: photo capture → auto GPS pin → hazard type → submit

AI verification badge on reports (✓ Verified / Pending review)

Real-time live map with category-coded, severity-pulsing pins + filters + legend

Recent Alerts live feed with relative timestamps

Reports Over Time chart, Top Affected Areas breakdown, Severity Distribution breakdown

Full report table: ID, type, location, reporter, status, timestamp, action

Status lifecycle: Open → Pending/Verified → In Progress → Resolved (color-coded throughout)

Notifications center with per-report status updates

Quick Actions panel + persistent Emergency Call banner

Global search (Ctrl+K), date range filter, CSV export

Community section (placeholder for corroboration/"I see this too" social proof)

Role-aware UI: citizen view (report + track own reports) vs admin view (full ops dashboard)

7. Technical Notes For The Builder

Build as a responsive React app (Tailwind CSS for styling); charts via Recharts; map via Leaflet/Mapbox GL for real geodata, with the 3D-tilt/glow styling layered via custom CSS/canvas on top — do not fake real map data with a static illustration in production, only in early mockups.

3D hero element: Spline (fastest to produce a polished result) or a pre-rendered looping WebM/MP4 with transparency as a lighter-weight fallback.

Keep the rain/particle layers canvas-based and capped in particle count for mobile performance.

All colors/spacing should reference the token system above — no ad hoc hex values.

Build to a quality floor: fully responsive down to mobile (sidebar collapses to a bottom nav or drawer), visible keyboard focus states, reduced-motion support.

8. What Makes This Distinct (don't lose these on execution)

The pulsing teal sonar ring on the manhole cover is the signature visual — keep it as the throughline from hero to map pins to loading states.

Motion is purposeful: pulses = urgency, count-ups = liveness, slides = hierarchy — not just "add animation everywhere."

One unified dark, rain-lit "ops center" mood across marketing and dashboard — a visitor should immediately recognize the dashboard as the same product as the landing page, not a different app.

End of master prompt. Paste the section under "THE PROMPT" directly into your builder of choice.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://manhole-watch-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/39ecc7e7-7597-4e40-904e-6f5ab5bcecaa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
