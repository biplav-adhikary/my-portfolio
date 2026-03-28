# Content Strategy

## Voice & Tone

**First person. Conversational but not casual. Confident but not boastful.**

The writing should sound like someone explaining their work to a smart colleague over coffee — clear, honest, and occasionally showing genuine enthusiasm.

### Do

- Write like you're talking to someone, not filling in a template
- Show reasoning: _why_ you did something, not just _what_
- Acknowledge tradeoffs and constraints honestly
- Let personality peek through — a dry observation, a genuine interest

### Don't

- Use buzzwords ("leveraged", "synergized", "cutting-edge")
- Write in third person ("Biplav is a developer who…")
- List technologies without context
- Oversell or exaggerate impact

## Content Structure

The portfolio follows a narrative arc, not a list of sections:

1. **Arrival** (Hero) — Set the mood. Communicate identity in one breath.
2. **Who** (About) — A brief, genuine introduction. Philosophy over biography.
3. **Work** (Projects) — Stories, not thumbnails. Each project is a small narrative.
4. **Journey** (Experience) — The path so far, told through milestones and growth.
5. **Craft** (Skills) — What I work with, framed as tools for thinking, not a checklist.
6. **Connection** (Contact) — A warm, low-pressure invitation.

## Project Narratives

Each project should follow this structure (not rigidly, but as a guide):

```
Context    → What was the situation? What existed before?
Challenge  → What made this hard or interesting?
Approach   → How did I think through it? What tradeoffs did I navigate?
Outcome    → What changed? What did I learn?
```

The emphasis is on **approach and thinking**, not just results. A recruiter should finish reading and think: "This person thinks carefully about their work."

## Content Sources

Content is derived from:

- Resume (facts, timeline, role titles)
- LinkedIn profile (current positioning, patent, project summaries)
- Performance reviews — FY24, FY25, FY26 (impact language, growth narrative, delivery evidence)
- Personal reflection (philosophy, approach to craft)

These are **transformed** — not copied. Raw resume bullets become narratives. Performance praise becomes evidence for a larger story.

### Derivation Notes

The raw content reveals two distinct professional chapters:

1. **HighRadius (2020–2023)**: Foundational growth from intern to full-stack contributor on an enterprise receivables platform. Built workflow automation, search infrastructure, component libraries, and a custom email editor. Recognized with peer awards for engineering excellence. This chapter is about learning to build real products under real constraints.

2. **Sage (2023–Present)**: Ownership and architectural thinking at scale. Micro-frontend architecture, greenfield payment systems (end-to-end, including API contract design), build tooling modernization, accessibility standardization, customer-facing AI features, and AI-driven workflow innovation. Promoted to Engineer (Jan 2025) with expanded scope over end-to-end delivery and high-level architecture. Growth from frontend feature delivery to cross-stack platform ownership.

**Promotion trajectory**: Intern → ASE I → ASE II → Product Engineer II → Engineer — five title progressions in ~5 years. This velocity is a signal of consistent, recognized growth and should be felt in the experience narratives even if not stated explicitly.

**Education**: B.Tech in Information Technology, KIIT (2017–2021), CGPA 9.24. Relevant as background context but not a primary narrative element for a ~5-year experience profile.

**Cross-cutting themes** extracted for narrative use:

- Architecture as a multiplier (MFE systems, shared libraries, reusable components)
- End-to-end ownership — frontend-led but crossing into APIs, data pipelines, and infrastructure when the problem required it
- Developer experience as a product (build tooling, documentation, dev acceleration)
- Accessibility as a default, not a checkbox
- Revenue-connected delivery (payment integrations shipped to production)
- AI applied in two modes: customer-facing product features (chatbot) and internal engineering acceleration (release automation, documentation)
- Product thinking — evaluating requirements against long-term vision, not just executing what's asked
- Mentorship and cross-team enablement as the scope widened

**Privacy treatment applied:**

- Internal product names generalized (e.g., "a connected accounting platform")
- Internal team names removed
- No specific revenue figures, user counts, or business metrics
- Patent referenced abstractly (publicly filed, so the existence is safe to mention)
- Emphasis on problem → approach → outcome, never on proprietary implementation details

## Placeholder Content

Until real content is finalized, use thoughtful placeholder text that:

- Matches the intended tone and length
- Demonstrates the narrative structure
- Can be swapped with real content without restructuring

Avoid `Lorem ipsum`. Use realistic, tone-appropriate placeholders.

## Content Maintenance

- All display content should live in a single data file (`/src/data/content.ts`)
- Content is static for v1 — no CMS, no API
- Structured as typed objects so layout changes don't require content changes
