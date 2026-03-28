# Section Background System

## Principle

Each section is a **scene** in a continuous journey. Backgrounds create atmosphere and depth without competing with content. The page should feel like scrolling through a Ghibli landscape — sky gives way to meadow, meadow to a warm clearing, clearing to golden hour.

## Scene Palette

| Section    | Scene Tone  | Primary Gradient                                | Character                                       |
| ---------- | ----------- | ----------------------------------------------- | ----------------------------------------------- |
| Hero       | sky         | `sky-100 → sky-50 → cloud-100` (handled inline) | Open sky, bright, airy                          |
| About      | warmNeutral | `sky-50 → cloud-50/80 → white`                  | Soft landing from sky, warm neutral plateau     |
| Projects   | cloudGlass  | `white → sky-50/50 → cloud-50`                  | Gentle mist, slight lift — cards float on glass |
| Experience | earth       | `cloud-50 → sunset-100/30 → grass-100/20`       | Grounded, warm path — earth and amber tones     |
| Skills     | openAir     | `grass-100/20 → sky-50 → white`                 | Open clearing, bright, breath of air            |
| Contact    | sunset      | `sky-50 → sunset-100/40 → sunset-200/30`        | Golden hour warmth, day wrapping up             |

## Layering Strategy

Each section background has up to 3 layers (bottom → top):

1. **Base gradient** — a 2–3 stop vertical gradient defining the scene tone
2. **Radial glow** (optional) — a soft, off-center radial gradient adding organic asymmetry and warmth
3. **Transition edges** — top/bottom fade bands that blend into adjacent sections

### Transition Edges

- Each section has a **top fade** (gradient from transparent → section's base) creating smooth overlap with the section above
- This eliminates hard color boundaries
- Height: `80–120px` depending on color delta between sections

## Decorative Elements

Subtle, nature-inspired decorative elements can appear in section backgrounds. Rules:

- **Never overlap with text** — position at edges, corners, or behind cards
- **Low opacity** (0.08–0.20) — atmospheric, not illustrative
- **Hidden on mobile** (`hidden lg:block`) to preserve performance and readability
- **No more than one per section** — restraint over decoration

### Placement Guide

| Element Type      | Position            | Opacity   | Purpose                 |
| ----------------- | ------------------- | --------- | ----------------------- |
| Botanical motif   | Right edge / corner | 0.10–0.20 | Nature presence         |
| Light ray / glow  | Off-center radial   | 0.08–0.15 | Warmth, depth           |
| Subtle silhouette | Bottom edge         | 0.06–0.12 | Ground line, transition |

## Implementation

Backgrounds are rendered via `SceneBackground` — an absolutely-positioned decorative layer inside `SectionWrapper`. This keeps section content code clean and the visual system centralized.

```
<section>
  <SceneBackground scene={tone} />  ← absolute, inset-0, z-0, pointer-events-none
  <div class="section-container relative z-10">
    {children}
  </div>
</section>
```

## Readability Rule

All background elements must pass a **squint test**: if you squint at the page, decorative elements should disappear and only content structure should be visible. If a background element is noticeable at a glance, reduce its opacity.
