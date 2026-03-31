# /spec — Project Specification

This directory is the single source of truth for what this portfolio is, how it should feel, and how it should be built.

## Structure

```
spec/
├── README.md          ← You are here
├── vision.md          ← Why this exists, who it's for, what it should communicate
├── design.md          ← Visual language, color, typography, spatial philosophy
├── content.md         ← Tone, narrative strategy, content structure
├── backend.md         ← Backend scope (currently: none)
│
├── sections/          ← Per-section intent and behavior
│   ├── hero.md
│   ├── about.md
│   ├── projects.md
│   ├── experience.md
│   ├── skills.md
│   └── contact.md
│
├── system/            ← Reusable patterns and motion strategy
│   ├── components.md
│   └── animations.md
│
└── explorations/      ← Ideas worth considering, not yet committed
    ├── ideas.md
    └── experiments.md
```

## How to Use These Specs

1. **Before building anything**, read `vision.md` and `design.md` — they set the tone for every decision.
2. **Before building a section**, read its spec in `sections/`.
3. **Before adding motion or building a reusable piece**, check `system/`.
4. **For creative experiments**, use `explorations/` to sketch before committing.

## Principles

- Specs describe _intent_, not pixel-perfect layouts. Leave room for craft.
- If a spec and the implementation diverge, update one of them — never let them quietly drift.
- These files are living documents. They grow with the project.
