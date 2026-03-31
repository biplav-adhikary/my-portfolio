# Experiments

Technical experiments to prototype before committing to the main build. These test feasibility, performance, and feel.

---

## Experiment 1: Cloud Rendering Approach

**Question:** What's the best way to render ambient clouds?

**Options to test:**

1. **CSS-only** — `border-radius` blobs with `box-shadow` and keyframe animations. Lightest, but limited shape control.
2. **Inline SVG** — Custom cloud shapes with `animate` or CSS keyframes. More control, still lightweight.
3. **Canvas** — Procedurally generated clouds. Most flexibility, highest complexity. Probably overkill.

**Success metric:** Smooth 60fps animation on a mid-range phone. Looks organic, not geometric.

---

## Experiment 2: Parallax Performance on Mobile

**Question:** Can we keep parallax in the hero section on mobile without jank?

**Test approach:**

- Implement basic `useScroll` + `useTransform` parallax
- Test on real devices (not just DevTools throttling)
- Measure scrolling FPS and battery impact

**Fallback:** Disable parallax on mobile, keep static layered landscape.

---

## Experiment 3: Card Blur Effect

**Question:** Does `backdrop-blur` on project cards perform well enough to use as a core visual element?

**Concern:** `backdrop-filter: blur()` is GPU-intensive and can cause issues on some Android browsers.

**Test approach:**

- Build a test page with 4+ blurred cards over a gradient background
- Test on Chrome Android, Safari iOS, and Firefox
- Measure rendering performance

**Fallback:** Replace with solid semi-transparent backgrounds (still looks good, just less magical).

---

## Experiment 4: Scroll-Linked Background Gradient

**Question:** Can the page background subtly shift hue as the user scrolls (sky → sunset → night)?

**Test approach:**

- Use `useScroll` to map scroll position to CSS custom properties
- Apply those properties to a full-page gradient
- Test for smoothness and taste (too much shift = distracting)

**Fallback:** Static per-section backgrounds with CSS transitions between them.

---

## Experiment 5: Dandelion Seed Physics

**Question:** What's the simplest way to make floating particles feel organic?

**Options:**

1. **Pure CSS keyframes** with randomized delays and durations per seed
2. **Framer Motion** with spring-based randomized paths
3. **Minimal JS** updating CSS custom properties per frame

**Success metric:** Feels like wind, not like a screensaver. 6–10 visible elements, no two moving the same way.

---

## Experiment 6: Font Loading Strategy

**Question:** Three custom fonts (Playfair, Inter, Caveat) — what's the best loading strategy to avoid FOUT/FOIT?

**Test approach:**

- `font-display: swap` + preconnect to Google Fonts
- Measure LCP and CLS impact
- Consider self-hosting if CDN adds latency

**Goal:** Text is readable within 100ms. Custom fonts render within 500ms. No layout shift.

---

## Status Tracker

| Experiment | Status      | Outcome |
| ---------- | ----------- | ------- |
| Clouds     | Not started | —       |
| Parallax   | Not started | —       |
| Card blur  | Not started | —       |
| Scroll bg  | Not started | —       |
| Particles  | Not started | —       |
| Fonts      | Not started | —       |
