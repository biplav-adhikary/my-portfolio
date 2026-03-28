# Design Language

## Mood

Calm. Considered. Slightly magical. The design should feel handmade but precise — like a Ghibli background painting that's actually a carefully engineered composition.

The visual language draws from nature: sky, wind, open fields, gentle light shifts. But it stays clean and modern underneath — this is a professional portfolio, not a fan site.

## Color Palette

Colors are named by their natural associations to keep the system intuitive.

| Token      | Hex Range             | Usage                                       |
| ---------- | --------------------- | ------------------------------------------- |
| **Sky**    | `#e0f2fe` → `#7dd3fc` | Primary backgrounds, ambient gradients      |
| **Cloud**  | `#fefce8` / `#fffbeb` | Warm neutrals, card backgrounds, highlights |
| **Grass**  | `#bbf7d0` → `#86efac` | Accent color, success states, nature motifs |
| **Sunset** | `#fde68a` → `#fdba74` | Warm accents, labels, whimsical elements    |
| **Earth**  | `#78716c` / `#57534e` | Body text, grounded UI elements             |
| **Night**  | `#1e293b`             | Deep sections, contrast moments             |

### Rules

- Background gradients should be subtle — never a hard color boundary.
- Text always lives on Earth tones for readability.
- Sunset is for _accents only_ — overuse kills the warmth.
- White/cream with blur = the "cloud glass" effect used on cards and overlays.

## Typography

| Role    | Font             | Weight        | Character                       |
| ------- | ---------------- | ------------- | ------------------------------- |
| Display | Playfair Display | 600, 700      | Editorial, confident, serif     |
| Body    | Inter            | 300, 400, 500 | Clean, readable, modern sans    |
| Accent  | Caveat           | 400, 600      | Hand-drawn, personal, whimsical |

### Rules

- Caveat is for small labels, annotations, and signature-like touches — never for body text.
- Playfair is for section headings and hero text only.
- Body copy should feel spacious: generous line height (1.6–1.8), comfortable measure (max ~65ch).

## Spatial Philosophy

- **Generous whitespace** — let content breathe. Sections should feel like open fields, not packed rooms.
- **Vertical rhythm** — consistent spacing between sections. The scroll should feel like a continuous journey, not a series of jumps.
- **Depth through layering** — subtle parallax, overlapping silhouettes, cards that float above backgrounds. The page has _altitude_.
- **Asymmetry over grids** — content doesn't need to be perfectly centered or evenly distributed. Allow visual weight to shift.
- **Sections as scenes** — each section should feel like a distinct _place_ in the journey, not just a content block with a heading. The background, lighting, and atmosphere should subtly shift between sections, creating a sense of movement through an environment. Think: walking through a Ghibli landscape where the meadow gives way to a forest path, then opens onto a hilltop at sunset.
- **User-paced discovery** — interactive elements (expandable cards, hover reveals, scroll-to targets) let the visitor control the depth of their experience. Skimmers see the surface; curious visitors can unfold the details. The architecture supports both without forcing either.

## Responsive Intent

- **Mobile-first** in implementation, but the design should feel intentional at all sizes — not just "stacked."
- On small screens, atmosphere should be preserved: the sky gradient, the whitespace, the pacing.
- Navigation collapses thoughtfully — not just a hamburger dump.
- Touch targets are generous. Scroll interactions degrade gracefully (no parallax on mobile if it hurts performance).

## What to Avoid

- Heavy drop shadows (prefer soft, diffused shadows)
- Pure black text (use Earth tones)
- Neon or saturated accent colors
- Dense card grids that feel like a dashboard
- Stock photography or generic illustrations
- UI patterns that feel like a SaaS landing page
