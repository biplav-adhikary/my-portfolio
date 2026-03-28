# Projects Section

## Purpose

The core of the portfolio. This is where thinking becomes visible.

Each project should read like a short story, not a feature list. A hiring manager should finish reading one and think: "This person actually reasons about their work."

## Philosophy

**Story over showcase.** The goal isn't to impress with screenshots — it's to demonstrate how you think through real problems. The narrative arc matters more than the tech stack.

## Narrative Structure

Each project follows a loose arc:

```
Context     → What was the world before? What problem existed?
Challenge   → What made this interesting or hard?
Approach    → How did you think through it? What tradeoffs came up?
Outcome     → What changed? What did you learn?
```

Not every project needs all four in equal measure. Some might emphasize approach. Others might lead with the challenge. Let the story dictate the shape.

## Presentation

### Cards, Not a Grid

Projects should be presented as **narrative cards** — each one a self-contained story. They should have visual weight and breathing room.

The primary pattern is **expandable cards in a stacked vertical layout**:

- **Default state**: each card shows the title, tagline, and tech tags — enough to spark interest
- **Expanded state**: on click/tap, the card smoothly unfolds to reveal the full narrative (context → challenge → approach → outcome)
- Only one card expanded at a time — opening a new one gently collapses the previous
- The expansion should feel like unfolding a letter, not opening a modal
- A subtle cue signals interactivity: a chevron, a "Read the story" line in Caveat, or a soft pulse on first scroll-into-view

This gives the user **control over pacing** — they can skim the summaries quickly or dive into any story that catches their eye. It makes the section feel interactive rather than like a wall of text.

Do NOT use a 3-column grid of thumbnail + title + link. That's a directory, not a portfolio.

### Card Anatomy

Each card should have:

- **Title** — clear, not clever
- **Tagline** — one line that captures the essence
- **Story** — the narrative blocks (context/challenge/approach/outcome)
- **Tech tags** — small, understated, at the bottom
- **Accent color** — each project gets a subtle color identity from the palette

### Visual Treatment

- Soft shadows, rounded corners, translucent backgrounds (the "cloud glass" feel from `design.md`)
- Gentle hover: slight lift, shadow deepens
- Consider a subtle visual motif per project (a small SVG element that hints at the project's nature)

## Content Notes

- Projects are stored in the data layer as structured objects
- 3–4 projects is ideal. Enough to show range, not so many that nothing stands out.
- Real projects preferred, but well-crafted fictional ones are acceptable if they demonstrate real thinking

## What to Avoid

- GitHub links as the primary CTA (code is not the story)
- "Built with React, TypeScript, and..." as the opening line
- Generic project descriptions that could apply to anyone
- Screenshots of dashboards with no context

## Derived Content

### Project 1: Platform Architecture at Scale

**Tagline**: Designing a micro-frontend system where multiple teams ship independently without breaking each other's work.

**Context**: A growing platform connecting businesses across the accounting ecosystem needed to support parallel development by multiple squads — each with their own release cadence and feature scope.  
**Challenge**: How do you let teams move fast without fragmenting the user experience? Shared components, independent deploys, and consistent design language all had to coexist.  
**Approach**: Designed a micro-frontend architecture with an externalized shared library for common components and utilities. This meant teams could develop and deploy in isolation while the shared layer enforced consistency. The tradeoff was added complexity in the build pipeline — worth it at the scale we were operating at.  
**Outcome**: Independent team delivery with a unified product surface. The shared library is now used across multiple repositories, and integration overhead dropped significantly.

**Tech**: React, TypeScript, Nx, Micro-frontends, Shared Libraries

---

### Project 2: Greenfield Payment System

**Tagline**: Building a payment portal from scratch that directly generates revenue.

**Context**: The platform needed to facilitate financial transactions between connected businesses — a capability that didn't exist yet.  
**Challenge**: Payment flows are unforgiving. Security, accessibility, error handling, and integration with external payment processors all had to be right from day one. There was no existing codebase to build on.  
**Approach**: Owned end-to-end delivery — from defining API contracts with the backend team to building the entire frontend from scratch. Focused on clean architecture, accessible forms, and graceful error states. Worked across the stack to ensure the payment flow was smooth across different ERP connections and external payment processors.  
**Outcome**: Launched to production without major issues. The feature directly enabled a new revenue stream through payment processing fees.

**Tech**: React, TypeScript, Payment APIs, REST API Design, Accessibility (WCAG 2.1 AA)

---

### Project 3: Enterprise Collections Automation

**Tagline**: Turning a manual, spreadsheet-driven collections process into an intelligent workflow.

**Context**: Enterprise collectors were managing follow-ups across thousands of invoices — prioritizing manually, drafting emails by hand, searching through fragmented data.  
**Challenge**: Automating a nuanced human workflow without removing the collector's sense of control. The system needed to be smarter than a spreadsheet but still feel like _their_ tool.  
**Approach**: Built end-to-end — React frontend for the workflow UI, Spring APIs for the business logic, and Elasticsearch integration for fast data retrieval. Automated routine communications through a custom email editor with dynamic templates and actionable message support. The work required understanding the full path from database to UI.  
**Outcome**: Streamlined daily collection workflows. Collectors could focus on judgment calls instead of data wrangling.

**Tech**: React, Redux, Java/Spring REST APIs, Elasticsearch, Dynamic Email Templates

---

### Project 4: Build System Modernization

**Tagline**: Migrating a large application's build tooling to cut load times and improve developer experience.

**Context**: The existing build setup was becoming a bottleneck — slow startup, long rebuilds, and developer frustration accumulating sprint over sprint.  
**Challenge**: Migrating a production application's build system without disrupting ongoing feature work. Every team depends on the build pipeline; breaking it means blocking everyone.  
**Approach**: Evaluated modern bundler alternatives and migrated incrementally, validating each step against the existing output. Prioritized developer experience metrics — cold start time, hot reload speed, build size — alongside production performance.  
**Outcome**: Significant improvement in startup and load times. Developer workflow noticeably faster. The kind of infrastructure work that doesn't get celebrated but makes everything else possible.

**Tech**: Rspack, Webpack (legacy), Module Federation

## Open Questions

- ~~Should projects have a "read more" expansion, or show the full story inline?~~ **Decided: expandable cards.** Summary visible by default, full story on demand. See `system/components.md` for GhibliCard expandable variant.
- Is there value in a subtle transition animation between projects (e.g., a scenic element shifting)?
- ~~Should one project be "featured" with a larger presentation?~~ **Decided: not for v1.** Keep all cards equal to avoid arbitrary hierarchy. Revisit after real content is in place.
- Consider featuring Project 1 or 2 as the lead project — they have the strongest narrative arcs.
