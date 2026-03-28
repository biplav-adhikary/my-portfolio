# Component System

## Philosophy

Components should be small, composable, and opinionated about their visual treatment but flexible about their content. They're building blocks for the Ghibli atmosphere — each one should feel like it belongs in the same world.

## Shared Components

### SectionWrapper

Every major section uses a consistent wrapper that provides:

- Max-width containment (6xl / ~1152px)
- Horizontal padding (responsive)
- Vertical rhythm (generous section spacing)
- Optional: background treatment (gradient, color, transparency)
- **Scene identity**: each section declares its own background tone (e.g., `scene="sky"`, `scene="warmNeutral"`, `scene="sunset"`). The wrapper smoothly blends into the next section's tone in the overlap zone between sections.
- **Section ID**: an `id` prop for scroll-to-section targeting and active section tracking

This is the `section-container` in CSS terms. It is also the anchor point for scene transitions and Intersection Observer registration.

### GhibliCard

The primary content container. Used for projects, experience cards, and any elevated content.

**Visual properties:**

- Rounded corners (2xl)
- Translucent white background with backdrop blur ("cloud glass")
- Soft border (white/60)
- Gentle shadow (sky-tinted)
- Hover: slight lift, deeper shadow

**Variants:**

- Default (as above)
- Compact (less padding, for smaller content blocks like skill groups)
- Featured (slightly larger, additional accent element)
- Expandable (for project cards — shows summary by default; expands to reveal full story on click/tap)

**Expandable behavior:**

- Default state shows title, tagline, and tech tags
- On click/tap, the card smoothly expands to reveal the full narrative (context → challenge → approach → outcome)
- The expand animation uses Framer Motion's `layout` prop or `animate={{ height: 'auto' }}` for smooth content reflow
- A subtle visual cue indicates expandability: a small chevron, a "Read the story" label in Caveat font, or a gentle pulse on first view
- Only one project card should be expanded at a time — opening one collapses the previous
- Collapsing returns focus to the card's summary position (no jarring scroll jump)

### SectionHeading

Consistent heading pattern for each section:

- Accent label above (Caveat font, sunset color) — e.g., "a few stories"
- Main heading (Playfair Display, earth-800)
- Optional subtitle (Inter, earth-500, lighter weight)

### AnimatedReveal

A wrapper component for scroll-triggered entrance animations. Uses Framer Motion's `useInView`.

- Default: fade up (translateY + opacity)
- Configurable: direction, delay, duration
- Respects reduced motion preferences

### ActiveSectionTracker

A non-visual component (or hook: `useActiveSection`) that tracks which section is currently centered in the viewport.

- Uses Intersection Observer on each `SectionWrapper`
- Exposes the current active section ID to the Navbar and any component that needs it
- State lives in a lightweight React context or a simple ref — no global state library needed
- Updates are throttled to avoid excessive re-renders during fast scrolling

### FloatingElement

A utility wrapper for ambient, slowly-moving decorative elements:

- Clouds, particles, botanical elements
- Uses CSS keyframe animations (not Framer Motion — these are always running)
- Configurable: amplitude, speed, direction

## Layout Components

### Navbar

Fixed top navigation that acts as the primary wayfinding element through the experience:

- Transparent on hero, gains frosted glass background on scroll
- Desktop: horizontal link list with **active section indicator** (subtle underline or color shift on the current section's link)
- Mobile: hamburger with animated slide-down
- Logo: stylized "B." with accent color
- **Scroll-to behavior**: clicking a nav link smoothly scrolls to that section (~600–800ms)
- **Active tracking**: consumes `ActiveSectionTracker` context to highlight the current section
- Optional: a **thin scroll progress bar** at the very top (2–3px, sky or grass tone) showing overall page progress

### Footer

Minimal:

- Small copyright line
- Optional: repeat of contact links
- Should not feel like a separate section — more like a quiet sign-off

## Naming Conventions

- PascalCase for component files and exports
- Components live in `/src/components/`
- Section components are named by section: `Hero.tsx`, `About.tsx`, etc.
- Shared components are named by purpose: `GhibliCard.tsx`, `SectionHeading.tsx`, etc.

## Composition Rules

- Sections compose shared components — they don't reimplement card styles
- Data flows from a central content file — components receive props, not hardcoded text
- Animation behavior lives in wrapper components, not inline in every section
