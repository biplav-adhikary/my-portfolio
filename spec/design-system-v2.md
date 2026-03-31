# Design System v2

## Foundation

This portfolio is a **single continuous environment**, not a collection of sections. The user scrolls through a landscape that shifts in warmth, altitude, and light — from an open sky to a golden horizon. Every design token, animation, and component serves that metaphor.

The design system exists to ensure **cohesion without repetition**. Sections should feel like different places in the same world, never like different websites stitched together.

### Core Principles

1. **Environment, not interface.** Backgrounds evolve. Light changes. But the material language (cloud glass, soft edges, earth-toned text) stays constant. The user should never feel a "mode switch."
2. **Calm first, craft second.** If a visual choice requires explanation, it's too loud. The quality should be felt, not noticed.
3. **One palette, many temperatures.** The color system doesn't introduce new hues per section — it shifts the _warmth_ of the same base palette. Cool sky → warm earth → golden sunset. That's the entire arc.
4. **Readable before atmospheric.** If contrast, spacing, or typography must compromise to preserve the aesthetic, the aesthetic loses. Readability is non-negotiable.

---

## Color System

### Palette Tokens

The palette is unchanged from v1 — named by nature, organized by role.

| Token      | Range                 | Role                                        |
| ---------- | --------------------- | ------------------------------------------- |
| **Sky**    | `#f0f9ff` → `#38bdf8` | Primary backgrounds, ambient gradients      |
| **Cloud**  | `#fffbeb` → `#fef9c3` | Warm neutrals, card fills, highlights       |
| **Grass**  | `#dcfce7` → `#4ade80` | Accent (success, nature motifs, indicators) |
| **Sunset** | `#fef3c7` → `#fdba74` | Warm accents, labels, golden-hour tones     |
| **Earth**  | `#a8a29e` → `#292524` | Text, borders, grounded UI                  |
| **Night**  | `#0f172a` → `#334155` | Dark theme surfaces (v2)                    |

### Semantic Color Roles

Raw palette tokens should not be used directly in most component code. Instead, use semantic roles that adapt across themes.

| Semantic Role      | Light Value            | Dark Value (v2)        | Usage                                  |
| ------------------ | ---------------------- | ---------------------- | -------------------------------------- |
| `surface-primary`  | `white`                | `night-900` (#0f172a)  | Page base, card backgrounds            |
| `surface-elevated` | `white/50` + blur      | `night-800/60` + blur  | Cards, overlays (cloud glass)          |
| `surface-subtle`   | `sky-50`               | `night-800`            | Muted backgrounds, code blocks         |
| `text-primary`     | `earth-800` (#292524)  | `cloud-50` (#fffbeb)   | Headings, primary content              |
| `text-secondary`   | `earth-600` (#57534e)  | `earth-400` (#a8a29e)  | Body text, descriptions                |
| `text-muted`       | `earth-500` (#78716c)  | `earth-500` (#78716c)  | Captions, metadata, inactive           |
| `text-accent`      | `sunset-400` (#fdba74) | `sunset-300` (#fcd34d) | Accent labels (Caveat text)            |
| `border-default`   | `white/60`             | `night-700/40`         | Card borders, dividers                 |
| `border-subtle`    | `sky-100/50`           | `night-700/20`         | Separators, inactive states            |
| `accent-primary`   | `sunset-300`           | `sunset-300`           | Active indicators, CTA warmth          |
| `accent-secondary` | `grass-300`            | `grass-400`            | Bullet points, progress, nature motifs |
| `shadow-color`     | `sky-100/50`           | `black/20`             | Box shadow color                       |

### Contrast Requirements

| Combination                           | Minimum Ratio | Standard        |
| ------------------------------------- | ------------- | --------------- |
| `text-primary` on `surface-primary`   | 7:1           | WCAG AAA        |
| `text-secondary` on `surface-primary` | 4.5:1         | WCAG AA         |
| `text-accent` on `surface-primary`    | 3:1           | WCAG AA (large) |
| `text-muted` on `surface-primary`     | 3:1           | WCAG AA (large) |
| Interactive elements (links, buttons) | 4.5:1         | WCAG AA         |
| Focus ring against adjacent colors    | 3:1           | WCAG AA         |

**Current gap to audit:** `earth-500` (#78716c) on `white` yields ~5.0:1 — passes AA but not AAA. Acceptable for body text. `earth-400` (#a8a29e) on white is ~3.5:1 — limit to large text or decorative use only.

### Scene Temperature Arc

The background warmth shifts continuously as the user scrolls. This is the emotional backbone of the journey.

```
Hero        ─── cool, open, bright (sky-dominant)
  ↓  gradual warm-up
About       ─── neutral, soft landing (sky fading, cream arriving)
  ↓  slight lift
Projects    ─── light, misty (white + sky whisper)
  ↓  grounding
Experience  ─── warm, earthen (cream + amber hints)
  ↓  brightening
Skills      ─── fresh clearing (green undertone, open)
  ↓  golden shift
Contact     ─── warm golden hour (sunset dominant)
```

**Rule:** Transitions happen in the overlap zone between sections (80–120px). They are CSS gradient crossfades, never hard boundaries. On mobile, simplify transitions to single-step background-color blends.

---

## Typography

### Type Scale

| Role         | Font             | Size (mobile)      | Size (desktop)     | Weight  | Line Height | Max Width |
| ------------ | ---------------- | ------------------ | ------------------ | ------- | ----------- | --------- |
| Hero title   | Playfair Display | `text-4xl` (36px)  | `text-6xl` (60px)  | 700     | 1.1         | —         |
| Section head | Playfair Display | `text-3xl` (30px)  | `text-4xl` (36px)  | 600     | 1.2         | —         |
| Accent label | Caveat           | `text-lg` (18px)   | `text-2xl` (24px)  | 400     | 1.3         | —         |
| Body large   | Inter            | `text-base` (16px) | `text-lg` (18px)   | 300–400 | 1.8         | 65ch      |
| Body default | Inter            | `text-sm` (14px)   | `text-base` (16px) | 400     | 1.7         | 65ch      |
| Caption      | Inter            | `text-xs` (12px)   | `text-sm` (14px)   | 400–500 | 1.5         | —         |
| Tag / pill   | Inter            | `text-xs` (12px)   | `text-xs` (12px)   | 500     | 1.4         | —         |

### Font Loading

```
Strategy: font-display: swap + rel="preload" for primary fonts
Priority: Inter (body) loads first → Playfair Display → Caveat
Fallbacks: system-ui for body, Georgia for display, cursive for accent
```

**Performance target:** Text readable within 100ms (system fallback). Custom fonts render within 500ms. Zero layout shift (matching fallback metrics via `size-adjust` if needed).

### Typography Rules

- **Playfair Display** appears only in the hero title and section headings. Never in cards, body text, or UI elements.
- **Caveat** appears only as accent labels above section headings and in small interactive hints ("Read the story", "say hello"). Never for body text or critical information.
- **Inter** is everything else. It carries the weight of readability.
- Body text measure (line length) never exceeds 65ch. This is enforced via `max-w-prose` or explicit `max-w-xl`/`max-w-2xl` in content containers.
- No text smaller than 12px at any breakpoint.
- Letter-spacing: leave default for all fonts. Playfair and Caveat have sufficient character at natural spacing.

---

## Spacing & Layout

### Spacing Scale

Use Tailwind's default spacing scale but constrain to a deliberate subset for vertical rhythm and section pacing.

| Purpose                  | Token       | Value  | Notes                               |
| ------------------------ | ----------- | ------ | ----------------------------------- |
| Section vertical padding | `py-20`     | 80px   | Mobile                              |
| Section vertical padding | `md:py-28`  | 112px  | Desktop — generous, rooms not boxes |
| Content gap (large)      | `gap-16`    | 64px   | Between major content blocks        |
| Content gap (medium)     | `gap-8`     | 32px   | Between cards, entries              |
| Content gap (small)      | `gap-4`     | 16px   | Between related items, pills        |
| Inline spacing           | `gap-2.5`   | 10px   | Between text + icon, tag gaps       |
| Card padding             | `p-6`       | 24px   | Mobile                              |
| Card padding             | `md:p-8`    | 32px   | Desktop                             |
| Page max-width           | `max-w-6xl` | 1152px | Content containment                 |
| Content max-width        | `max-w-3xl` | 768px  | Prose and card stacks               |

### Layout Principles

- **Content containment**: All section content is held within `max-w-6xl` centered container. Backgrounds extend full-width.
- **Asymmetry as character**: The About section uses asymmetric grid (`1fr 0.85fr`). This pattern — not mirror-image balance, but weighted composition — should be the default instinct for two-column layouts.
- **Vertical rhythm**: The scroll from one section to the next should feel like walking at a steady pace. Equal section padding (80/112px) creates this cadence.
- **Card stacks over grids**: Projects and Experience present as vertical stacks within `max-w-3xl`, not multi-column grids. This gives each card breathing room and supports the narrative reading pattern.
- **Hero is a full scene**: `min-h-screen`, no section-container padding. It's an environment, not a content block.

---

## Elevation & Depth

### Shadow Scale

| Level       | Tailwind Class                 | Usage                             |
| ----------- | ------------------------------ | --------------------------------- |
| **Ambient** | `shadow-md shadow-sky-100/30`  | Resting cards, experience entries |
| **Default** | `shadow-lg shadow-sky-100/50`  | Project cards, primary cards      |
| **Lifted**  | `shadow-xl shadow-sky-200/40`  | Cards on hover, expanded state    |
| **Overlay** | `shadow-2xl shadow-sky-200/50` | Tooltips, floating context notes  |

**Dark theme shadows:** Replace `sky-100` with `black` at 15–25% opacity. Shadows in dark mode should be deeper and tighter, not colored.

### Cloud Glass Material

The core visual material for elevated surfaces. Consistent across all cards.

```
Background:  bg-white/50     (dark: bg-night-800/60)
Backdrop:    backdrop-blur-sm
Border:      border border-white/60  (dark: border-night-700/40)
Radius:      rounded-2xl
```

This is the only card material. There is no "flat" card variant, no outlined variant, no filled variant. Everything floats on glass. This consistency is what makes the world feel unified.

### Grain Texture

A global SVG noise overlay at 3% opacity creates a subtle organic texture across the entire page. This stays constant regardless of section or theme. It adds hand-made warmth without introducing color or visual noise.

```css
opacity: 0.03
position: fixed
z-index: 9999
pointer-events: none
```

**Dark theme:** Increase to 4% opacity (dark backgrounds expose less grain). Consider inverting the noise luminance if the light-on-dark grain feels wrong.

---

## Border & Radius

### Radius Scale

| Element                 | Radius         | Notes                           |
| ----------------------- | -------------- | ------------------------------- |
| Cards, major containers | `rounded-2xl`  | 16px — the signature roundness  |
| Tags, pills, badges     | `rounded-full` | Fully rounded capsules          |
| Input fields (future)   | `rounded-xl`   | 12px — slightly less than cards |
| Avatar / small elements | `rounded-full` | Circles                         |
| Navbar on scroll        | none           | Full-width, no radius           |

**Rule:** `rounded-2xl` is the only card radius. Don't mix `rounded-xl` and `rounded-2xl` on cards — that fractures the material language.

### Border Treatment

- Card borders: `border-white/60` — barely visible, just enough to separate glass from gradient
- Accent borders per project: `border-{accent}-200/60` — subtle identity without clashing
- Section dividers: avoid `<hr>` or explicit border lines. Section separation is handled by background transitions alone
- Focus rings: `ring-2 ring-sky-300 ring-offset-2` (light) / `ring-2 ring-sky-400 ring-offset-2 ring-offset-night-900` (dark)

---

## Motion System

### Philosophy (Unchanged)

**Motion should feel like weather, not like UI.** If a user doesn't consciously notice the animations but the site feels alive — that's the target.

### Animation Tokens

Formalize durations and easings into reusable tokens rather than ad-hoc values per component.

| Token           | Duration | Easing                       | Use                                 |
| --------------- | -------- | ---------------------------- | ----------------------------------- |
| `instant`       | 150ms    | `ease-out`                   | Color transitions, opacity on hover |
| `quick`         | 200ms    | `ease-out`                   | Button feedback, icon transitions   |
| `smooth`        | 300ms    | `ease-out`                   | Card hover lift, shadow transitions |
| `reveal`        | 500ms    | `ease-out`                   | Scroll-triggered content appearance |
| `unfold`        | 350ms    | `cubic-bezier(.25,.1,.25,1)` | Card expand/collapse                |
| `entrance`      | 600ms    | `ease-out`                   | Section entrance, stagger parent    |
| `ambient`       | 8–25s    | `ease-in-out`                | Clouds, seeds, floating elements    |
| `scroll-smooth` | 700ms    | native browser `smooth`      | Scroll-to-section on nav click      |

### CSS vs Framer Motion Boundary

This is a critical architectural decision. Mixing them inconsistently creates conflicting animation systems and performance issues.

| Use CSS transitions/keyframes for:      | Use Framer Motion for:                    |
| --------------------------------------- | ----------------------------------------- |
| Hover states (color, shadow, transform) | Scroll-triggered entry animations         |
| Ambient loops (clouds, seeds, float)    | Parallax (`useScroll` + `useTransform`)   |
| Navbar background transition            | Card expand/collapse (`AnimatePresence`)  |
| Tooltip appearance                      | Staggered children entrances              |
| Focus ring transitions                  | Layout animations (`layoutId` for nav)    |
|                                         | Exit animations (when elements leave DOM) |

**Reasoning:** CSS handles anything that's always-running or purely decorative (no React re-render needed). Framer Motion handles anything that responds to state changes, viewport position, or needs enter/exit orchestration.

### Spring Animation Policy

The existing spec says "avoid spring physics." This is too absolute. Amend to:

- **No springs for content animations** (scroll reveals, card entrances). These should feel like settling, not bouncing.
- **Springs are permitted for UI feedback** only: the navbar active indicator (`layoutId` with `stiffness: 300, damping: 30`) and small interactive cues. These springs should be _overdamped_ — fast and decisive, no visible oscillation.
- If a spring visibly bounces, it's wrong for this project. Test by recording and watching at 0.5x speed.

### Stagger Pattern

When multiple siblings enter the viewport together (cards, list items, skill groups):

```
Parent delay:   200–250ms after trigger
Child offset:   70–100ms between siblings
Max total:      don't stagger more than 6 items (after that, show remaining instantly)
```

**Rule:** Staggering more than ~6 items makes the page feel sluggish. For a list of 8 projects, stagger the first 5–6 and reveal the rest as a group.

### Scroll Invitation (Hero)

After the hero stagger completes (~1.5s), a subtle downward cue appears. Implementation options, in preference order:

1. A single dandelion seed that drifts slowly downward and fades — poetic, on-brand
2. A soft chevron with a gentle bounce animation (3s cycle, 4px amplitude)
3. A gradient pulse at the bottom edge of the hero

The cue fades out once `scrollY > 40px`. It must never reappear.

### Reduced Motion

When `prefers-reduced-motion: reduce`:

| Category                | Behavior                                    |
| ----------------------- | ------------------------------------------- |
| Ambient (clouds, seeds) | Stopped entirely                            |
| Parallax                | Disabled, static layered landscape          |
| Scroll reveals          | Elements visible immediately, no animation  |
| Card expand/collapse    | Instant height change, no transition        |
| Hover feedback          | Color change only, no transform             |
| Nav underline           | Instant position change, no spring          |
| Scene transitions       | Backgrounds fixed per section, no crossfade |

---

## Theme System

### Architecture

Two themes: **Light** (default) and **Dark**. System preference is respected on first visit. User choice persists in `localStorage`.

Implementation via CSS custom properties on `:root` and a `.dark` class on `<html>`:

```
:root {
  --surface-primary: #ffffff;
  --text-primary: #292524;
  ...
}

:root.dark {
  --surface-primary: #0f172a;
  --text-primary: #fffbeb;
  ...
}
```

Tailwind's `darkMode: 'class'` strategy integrates with this — allowing `dark:` variants in utility classes.

### Dark Theme — Visual Language

Dark mode is not "light mode with inverted colors." It's a different time of day in the same landscape.

| Aspect            | Light                   | Dark                                |
| ----------------- | ----------------------- | ----------------------------------- |
| Sky               | Bright blue gradient    | Deep navy, subtle star field        |
| Clouds            | White, soft, drifting   | Dark translucent, barely visible    |
| Cloud glass cards | White/50 + blur         | Night-800/60 + blur                 |
| Text              | Earth-800, earth-600    | Cloud-50, earth-400                 |
| Accent labels     | Sunset-400 (warm amber) | Sunset-300 (brighter amber)         |
| Grain overlay     | 3% opacity light noise  | 4% opacity light noise              |
| Shadows           | Sky-tinted, soft        | Black-tinted, deeper, tighter       |
| Decorative motifs | Low opacity botanical   | Lower opacity, slightly cooler hue  |
| Scene arc         | Sky → earth → sunset    | Night sky → deep forest → warm fire |

**Key constraint:** The Ghibli feeling must survive the theme switch. Dark mode should evoke nighttime Ghibli scenes (Spirited Away's bathhouse at dusk, Howl's moving castle at night) — warm pools of light against deep but not oppressive darkness.

**Backgrounds in dark:** Scene gradients shift from cool-dark at the top to warm-dark at the bottom. Use deep navy (#0f172a) as the base, with subtle warm radial glows (amber at 5–8% opacity) to prevent the page from feeling cold or clinical.

### Theme Toggle

- Position: inside the Navbar, right-aligned (desktop) or at the bottom of the mobile menu
- Icon: sun/moon, transitioning between states with a gentle rotation + fade (200ms)
- Not prominent — discoverable but quiet. This is a utility, not a feature
- On toggle: backgrounds crossfade over 300ms. No flash of white/dark

### Future Enhancement: Time-Based Hint

A future version could auto-select the theme based on the visitor's local time, with an override. The logic:

```
6am–5pm:   Light (default)
5pm–8pm:   Light with warmer scene temperatures (sunset arrives earlier in the scroll)
8pm–6am:   Dark
```

This is a v2/v3 enhancement. Do not implement for initial launch. The manual toggle with system preference detection is sufficient.

---

## Component Patterns

### Shared Material

All elevated containers use the same cloud glass recipe. Variants differ in padding and accent, never in material.

| Variant    | Padding      | Additional Treatment                                         |
| ---------- | ------------ | ------------------------------------------------------------ |
| Default    | `p-6 md:p-8` | Standard card                                                |
| Compact    | `p-4 md:p-5` | Skill tooltips, metadata cards                               |
| Expandable | `p-6 md:p-8` | Chevron, "Read the story" cue, `AnimatePresence` inner block |
| Experience | `p-6 md:p-8` | Lighter shadow (ambient not default), company logo watermark |

### Accent Identity

Each project card has an accent color from the palette (`sky`, `grass`, `sunset`, `cloud`). This tints:

- The left border or dot indicator
- The tech tag background
- The "Read the story" pill

It does NOT tint:

- The card background (always cloud glass)
- The card shadow
- The heading text color

This constraint prevents the accent system from fragmenting the visual unity.

### Section Heading Pattern

Every non-Hero section uses a consistent heading block:

```
[Accent label — Caveat, sunset, ~20px]
[Section heading — Playfair, earth-800, 30–36px]
[Optional subtitle — Inter, earth-500, 14–16px]
```

The accent label is always lowercase, handwritten in tone ("a few stories", "the path so far", "say hello"). This creates a personal, letter-like quality — as if the heading was annotated by hand.

### Interactive Affordance Cues

Elements that respond to interaction need subtle but clear affordances:

| Element               | Affordance Cue                        |
| --------------------- | ------------------------------------- |
| Project card (closed) | "Read the story →" pill + chevron     |
| Skill pill            | Cursor change + slight lift on hover  |
| Contact link          | Warm background glow + scale on hover |
| Navigation link       | Color shift + animated underline      |
| Mobile menu trigger   | Animated hamburger ↔ close morphing   |

**Mobile affordance rule:** On touch devices, assume the first interaction is blind — there's no hover preview. Interactive elements must be self-evident (visual cues, labels, or standard patterns like the chevron).

---

## Interaction Patterns

### Project Cards — Progressive Disclosure

The current expandable card pattern is the right one. Refinements:

1. **Only one card expanded at a time.** Opening a new card smoothly collapses the previous one. This prevents the page from becoming a wall of text.
2. **Collapsing scrolls to card if needed.** When a card collapses, if its top is above the viewport, gently scroll it into view so the user doesn't lose position.
3. **Keyboard accessible.** Cards are focusable (`tabIndex={0}`), toggle on `Enter`/`Space`, and `aria-expanded` reflects state. ✓ (Already implemented.)
4. **Content within expanded cards is not stagger-animated.** The unfold itself is the animation. Once open, all narrative content is immediately readable. No secondary entrance animation for text blocks inside the card.
5. **Deep-link consideration (future).** If a URL hash like `#projects/payment-system` is present on load, auto-expand that card and scroll to it. This enables sharing specific project stories.

### Skill Pills — Discoverable Context

Current pattern (hover/tap to reveal context) works but has a discoverability issue on mobile.

Refinement:

- On first scroll into the Skills section, auto-reveal the context for one skill briefly (2s), then fade it away. This teaches the interaction pattern without a tooltip or instruction text.
- On desktop, hover triggers the reveal. On mobile, tap toggles it.
- Context note appears below the pill as an inline label, not as a floating tooltip that might be clipped.
- Limit context note to one line (or two very short lines). Current context strings are the right length.

### Navigation — Scroll Progress

Add a thin scroll progress bar at the very top of the viewport (above the navbar):

```
Height:     2px
Color:      grass-300 (light) / grass-400 (dark)
Background: transparent
z-index:    above navbar
Width:      mapped to scrollYProgress (0% → 100% of viewport width)
```

This provides a subtle orientation cue for long-scroll pages. It should be thin enough that most users won't consciously notice it, but it grounds the experience spatially.

### Contact Links — Warm Interaction

Contact links should feel inviting, not transactional. Current implementation is good. One addition:

- On click of the email link, prefer **copy-to-clipboard with a brief toast notification** ("Copied!") over opening a mail client. The toast appears centered below the links, fades in and out over 2s, and uses sunset tones. Provide a fallback `mailto:` for right-click or if clipboard API is unavailable.

---

## Responsive Strategy

### Breakpoint Philosophy

Mobile is not a degraded desktop. It's a different medium with different affordances.

| Breakpoint | Width    | Approach                                                   |
| ---------- | -------- | ---------------------------------------------------------- |
| Base       | < 640px  | Single column. Full atmosphere preserved. Touch-optimized. |
| `sm`       | ≥ 640px  | Minor adjustments. Larger text, wider cards.               |
| `md`       | ≥ 768px  | Desktop nav appears. Two-column layouts where applicable.  |
| `lg`       | ≥ 1024px | Full layout expression. About section asymmetric grid.     |
| `xl`       | ≥ 1280px | Max-width containment takes effect. Generous side margins. |

### Mobile-Specific Rules

| Feature            | Mobile Treatment                                                 |
| ------------------ | ---------------------------------------------------------------- |
| Parallax (hero)    | Disabled. Static layered landscape.                              |
| Decorative motifs  | Hidden (`hidden lg:block`). Performance and readability.         |
| Cloud animations   | Reduce to 2–3 clouds, simpler paths.                             |
| Dandelion seeds    | Reduce to 2–3 seeds.                                             |
| Backdrop blur      | Keep, but test on Android Chrome. Fallback: solid `bg-white/70`. |
| Skill pill context | Tap to toggle (not hover). Dismiss on outside tap.               |
| Scene transitions  | Simplified to single-step background-color blends.               |
| Touch targets      | Minimum 44×44px for all interactive elements.                    |
| Card expansion     | Full-width, smooth unfold. Scroll into view on expand.           |

### Performance Budget (Mobile)

| Metric                | Target             |
| --------------------- | ------------------ |
| LCP                   | < 2.5s             |
| FID / INP             | < 100ms            |
| CLS                   | < 0.1              |
| Total JS bundle       | < 120KB gzipped    |
| Ambient animation FPS | 60fps on mid-range |

---

## Accessibility

### Requirements

WCAG 2.1 AA compliance as baseline. Not as a separate checklist — as a constraint integrated into every decision above.

### Focus Management

- All interactive elements have visible focus indicators: `ring-2 ring-sky-300 ring-offset-2`
- Focus order follows visual reading order (top → bottom, left → right)
- Expanding a project card does not move focus. The expanded content is reachable by continuing to Tab.
- Closing a project card returns focus to the card itself
- Smooth scroll on nav click is followed by focus moving to the target section heading (via `tabIndex={-1}` + `.focus()` on the section element). This ensures screen reader users land at the right place.

### Screen Reader Considerations

- All decorative images, SVGs, and background elements are `aria-hidden="true"` ✓
- Section headings use proper `<h2>` hierarchy ✓
- Project cards use `role="button"` with `aria-expanded` ✓
- The navbars active section indicator is visual only — don't add `aria-current` to nav links as it creates noise during scroll (the active state changes frequently)
- Skill pill context notes should use `aria-live="polite"` so screen readers announce them when revealed

### Motion Sensitivity

Full `prefers-reduced-motion` support as defined in the Motion System section. No animation is critical to understanding content.

### Color Independence

No information is conveyed by color alone:

- The accent dots on project cards and list items are decorative, not semantic
- Active nav link has both color change AND underline
- Skill group focus has both opacity change AND label color change

---

## Image & Asset Strategy

### Format Priority

```
1. SVG for UI icons, landscape silhouettes, simple illustrations
2. WebP for photographic/painted textures (hero clouds, landscape, motifs)
3. PNG as fallback only if WebP is unsupported (negligible concern in 2026)
```

### Progressive Loading

The `ProgressiveImage` component with LQIP (Low Quality Image Placeholder) is already implemented. Standardize:

- All non-SVG images use `ProgressiveImage`
- LQIP strings stored in `lqip.ts` as base64 data URIs
- Critical images (hero clouds, landscape) use `loading="eager"`
- Below-fold images use `loading="lazy"` (native lazy loading)
- Hero images are preloaded via `<link rel="preload">` in `index.html`

### Decorative Image Rules

- Max 1 decorative image per section (botanical motifs, textures)
- Opacity: 0.10–0.40 depending on purpose (texture vs. motif)
- Hidden on mobile (`hidden lg:block`)
- `aria-hidden="true"`, `pointer-events: none`
- Must pass the squint test: invisible when not looking for them

### Future: Image CDN

For v2, consider serving images through a CDN with automatic format negotiation and responsive sizing (`srcset`). Cloudflare Images or imgix are lightweight options. Not needed for v1 — the image set is small and the optimize-images.py script handles the initial pipeline.

---

## Recommended Libraries

### Currently Installed (Keep)

| Library       | Version | Role                            | Verdict         |
| ------------- | ------- | ------------------------------- | --------------- |
| React         | 18.x    | UI framework                    | Keep            |
| Framer Motion | 10.x    | Scroll, layout, enter/exit anim | Keep (see note) |
| Tailwind CSS  | 3.x     | Utility-based styling           | Keep (see note) |
| Vite          | 4.x     | Build tool                      | Keep            |

**Framer Motion note:** v10 is stable and works. v11+ (rebranded as "Motion") has a smaller bundle and includes the same APIs. Consider upgrading when convenient — it's a drop-in replacement for most usage. Estimated bundle savings: ~15–20KB gzipped.

### Recommended Additions

#### 1. `clsx` (~228B gzipped)

**Why:** The codebase already has multiple places with conditional class string concatenation via template literals. `clsx` is cleaner, handles falsy values, and is an industry standard.

```tsx
// Before
className={`text-sm ${isActive ? "text-earth-800" : "text-earth-500"} ${isExpanded ? "ring-1" : ""}`}

// After
className={clsx("text-sm", isActive ? "text-earth-800" : "text-earth-500", isExpanded && "ring-1")}
```

**Impact:** Readability and correctness. Near-zero bundle cost.

#### 2. `tailwind-merge` (~3.5KB gzipped)

**Why:** Shared components like `SectionWrapper` and `GhibliCard` accept `className` props. Without `tailwind-merge`, a passed class that conflicts with a default class creates unpredictable results (Tailwind doesn't guarantee specificity order). `tailwind-merge` resolves conflicts predictably.

**When to add:** Only when the component API starts supporting className overrides. Not urgent.

#### 3. Custom Theme Provider (~50 lines, no external library)

**Why:** `next-themes` is Next.js-specific in several features. For a Vite + React app, a custom `ThemeProvider` context that reads `prefers-color-scheme`, applies a `.dark` class to `<html>`, and persists to `localStorage` is simpler and more appropriate.

**Implementation scope:** ~50 lines. A context provider, a hook (`useTheme`), and a tiny script in `<head>` to apply the class before first paint (avoiding flash).

### Not Recommended

| Library                     | Reasoning                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| Radix UI                    | Overkill. No complex accessible widgets needed (no dialogs, selects, or menus beyond navbar) |
| Headless UI                 | Same reasoning as Radix                                                                      |
| GSAP                        | Framer Motion covers all animation needs. Adding GSAP creates two animation systems          |
| Three.js / R3F              | Explicitly rejected by vision. Wrong tone for this project                                   |
| Styled Components           | Tailwind is working well. Adding CSS-in-JS creates a second styling paradigm                 |
| Zustand / Jotai             | One context (active section) doesn't justify a state library. React context is sufficient    |
| react-intersection-observer | Framer Motion's `useInView` already handles this                                             |

---

## Implementation Priorities

Not all of this needs to happen at once. Ordered by impact:

### Phase 1: Strengthen Foundations (Current Sprint)

- [ ] Audit and fix contrast ratios for all text/background combinations
- [ ] Formalize animation tokens as CSS custom properties or Tailwind config entries
- [ ] Add `clsx` and clean up conditional classNames
- [ ] Add visible focus styles to all interactive elements
- [ ] Implement scroll progress bar
- [ ] Stagger cap: limit project card stagger to first 5, show rest immediately

### Phase 2: Theme System

- [ ] Define CSS custom properties for all semantic color roles
- [ ] Build custom `ThemeProvider` (system preference + localStorage + `.dark` class)
- [ ] Add theme toggle to Navbar
- [ ] Adapt scene backgrounds for dark mode
- [ ] Adapt cloud glass material for dark mode
- [ ] Adapt grain overlay for dark mode
- [ ] Test all sections in both themes for contrast and readability

### Phase 3: Refinement

- [ ] Upgrade Framer Motion to v11 (Motion) for bundle savings
- [ ] Auto-reveal one skill pill context on first Skills section entry
- [ ] Email copy-to-clipboard with toast in Contact
- [ ] Deep-link support for individual projects
- [ ] Evaluate Tailwind v4 migration (CSS-native theme variables)

---

## What This Spec Replaces

This design system consolidates and supersedes several decisions previously scattered across:

- `spec/design.md` — color, typography, spatial philosophy (now formalized here with semantic roles and explicit scales)
- `spec/system/animations.md` — motion philosophy (now includes animation tokens and CSS/Framer boundary)
- `spec/system/backgrounds.md` — scene system (unchanged in concept, referenced here for temperature arc)
- `spec/system/components.md` — component patterns (now includes material consistency rules)

Those files remain valid as detailed references. This spec is the **cohesive layer** that ties them together with concrete, implementable decisions.
