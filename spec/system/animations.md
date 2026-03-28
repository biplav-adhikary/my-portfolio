# Animation System

## Guiding Principle

**Motion should feel like weather, not like UI.**

Animations in this portfolio mimic natural phenomena: drifting, floating, settling, breathing. Nothing snaps. Nothing bounces. Nothing draws attention to itself.

If a user doesn't consciously notice the animations but the site _feels_ alive — that's perfect.

## Categories

### 1. Ambient Motion (Always Running)

These run continuously and create the sense that the world is alive.

| Element             | Motion                                       | Implementation |
| ------------------- | -------------------------------------------- | -------------- |
| Clouds              | Slow horizontal drift + gentle opacity pulse | CSS keyframes  |
| Dandelion seeds     | Upward float with slight horizontal wander   | CSS keyframes  |
| Background gradient | Very subtle color shift over time (optional) | CSS keyframes  |

**Rules:**

- Use CSS keyframes, not Framer Motion (these shouldn't re-render React)
- Keep durations long: 6–25 seconds per cycle
- Use `ease-in-out` for organic feel
- Layer multiple elements at different speeds for depth

### 2. Scroll-Triggered Reveals

Content appears as the user scrolls into view.

| Pattern          | Duration   | Easing   | Trigger        |
| ---------------- | ---------- | -------- | -------------- |
| Fade up          | 600-800ms  | ease-out | 20% in view    |
| Fade in          | 500ms      | ease-out | 20% in view    |
| Stagger children | +80ms each | ease-out | Parent in view |

**Rules:**

- Use Framer Motion's `useInView` or `whileInView`
- Each element animates once — no re-triggering on scroll back
- Stagger siblings (e.g., project cards appear one after another, not all at once)
- Never delay more than 400ms for any single element — the page should feel responsive, not sluggish

### 2b. Scene Transitions (Section-to-Section)

Sections should feel like **scenes you move through**, not blocks you scroll past. The transition between one section and the next should carry a sense of environmental shift — a change in light, altitude, or atmosphere.

| Transition                 | Where                 | Effect                                                    |
| -------------------------- | --------------------- | --------------------------------------------------------- |
| Sky → warm neutral         | Hero → About          | Background gradient cross-fades as the hero scrolls away  |
| Warm neutral → cloud glass | About → Projects      | Subtle brightness lift; cards emerge from a soft mist     |
| Cloud glass → path tone    | Projects → Experience | Background warms slightly; depth flattens to ground level |
| Earth → open air           | Experience → Skills   | Lightens; feels like stepping into a clearing             |
| Open air → golden hour     | Skills → Contact      | Warm sunset gradient bleeds in from the bottom            |

**Rules:**

- Implement via Framer Motion's `useScroll` + `useTransform` mapped to background color/opacity
- Transitions happen in the **overlap zone** between sections (~100–200px of shared scroll range)
- Never a hard cut — always a blend. Think fog dissipating, not a page turn
- On mobile, simplify to a single soft background-color transition per boundary
- The user should feel a sense of _place changing_, not a visual effect firing

### 2c. Section Focus State

The section currently in the viewport center should feel **active** — subtly more present than the ones above and below it.

| Behavior                 | Implementation                                                      |
| ------------------------ | ------------------------------------------------------------------- |
| Active section detection | Intersection Observer with `threshold: 0.4` or scroll position math |
| Navbar highlight         | Active section's nav link gets accent underline or color shift      |
| Content emphasis         | Active section content at full opacity; adjacent sections at ~0.96  |
| Background response      | Active section's ambient elements (if any) run; others pause        |

**Rules:**

- The focus shift should be **imperceptible as an animation** — it's a state, not an event
- Opacity differences between active/inactive must be tiny (0.96–1.0 range). If a user notices the dimming, it's too much
- Navbar link highlighting is the most visible signal — keep it subtle (thin underline or weight shift, not a colored box)
- Only one section is active at a time
- On reduced motion: keep navbar highlighting, skip opacity shifts

### 3. Parallax Depth

Layered elements move at different speeds during scroll, creating a sense of depth.

| Layer               | Speed | Direction       |
| ------------------- | ----- | --------------- |
| Far clouds          | 0.3x  | Opposite scroll |
| Near hills          | 0.6x  | Same as scroll  |
| Text content        | 1.0x  | Normal scroll   |
| Foreground elements | 1.2x  | Same as scroll  |

**Rules:**

- Use Framer Motion's `useScroll` + `useTransform`
- Only apply in the Hero section (parallax elsewhere is distracting)
- Disable or reduce on mobile (performance and usability)
- Keep multipliers subtle — if it feels like a video game, it's too much

### 4. Interaction Feedback

Micro-animations on user actions.

| Trigger                | Response                                       | Duration |
| ---------------------- | ---------------------------------------------- | -------- |
| Card hover             | Slight lift (-4px Y) + shadow deepen           | 300ms    |
| Button hover           | Subtle scale (1.02) or background shift        | 200ms    |
| Link hover             | Color transition                               | 200ms    |
| Nav scroll             | Background fade in (transparent → frosted)     | 500ms    |
| Mobile menu            | Slide down with staggered link entries         | 300ms    |
| Project expand         | Card grows smoothly to reveal full story       | 400ms    |
| Project collapse       | Card settles back to summary height            | 300ms    |
| Skill pill tap/hover   | Pill gently lifts; context note fades in below | 250ms    |
| Nav link click         | Smooth scroll to section + brief focus pulse   | 600ms    |
| Experience entry enter | Entry slides into position along the path      | 500ms    |

**Rules:**

- Use CSS transitions where possible (lighter than Framer for simple hover states)
- Keep durations under 300ms for simple interactions — they should feel instant
- Content expansion (projects, skills) can be 300–500ms — these are intentional reveals, not micro-feedback
- Never animate layout properties (width, height) — use transforms, max-height, or Framer's `layout` animation
- Expansion animations should feel like unfolding, not popping open

### 5. Scroll-Linked Navigation

Navigation should feel like it's **part of the journey**, not a control panel floating above it.

| Behavior                   | Details                                                     |
| -------------------------- | ----------------------------------------------------------- |
| Smooth scroll on nav click | `scrollIntoView({ behavior: 'smooth' })` or Framer scroll   |
| Active section tracking    | Nav link updates as user scrolls through sections           |
| Scroll progress indicator  | Optional: a thin, subtle progress bar along the top or side |
| Hero → content transition  | Nav goes from invisible/transparent to frosted glass        |

**Rules:**

- Smooth scroll duration should feel natural (~600–800ms for full viewport jump)
- Do NOT snap-scroll or hijack scroll behavior — the user stays in control
- Active nav tracking uses the same Intersection Observer as section focus state
- Scroll progress indicator, if used, should be a single thin line (2–3px) in a grass or sky tone — never a chunky bar

## Performance Budget

- No animation should cause layout shift
- Ambient animations should use GPU-accelerated properties only (transform, opacity)
- Monitor with browser DevTools: aim for 60fps on mid-range devices
- Provide `prefers-reduced-motion` support: disable ambient and parallax, keep simple fades

## Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- Disable all ambient animations (clouds, particles)
- Disable parallax
- Replace scroll reveals with instant visibility
- Keep hover feedback (but simpler: color change only)

## What to Avoid

- Spring physics (too bouncy for this aesthetic)
- Elastic easing (same reason)
- Animations longer than 1s for content reveals
- Animate-on-scroll libraries that animate everything (looks like a template)
- Text animation (typing, letter-by-letter reveals) — feels gimmicky here
