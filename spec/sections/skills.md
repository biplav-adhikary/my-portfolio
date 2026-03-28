# Skills Section

## Purpose

Show what you work with — but frame it as _tools for thinking_, not a tech checklist.

This section exists because recruiters scan for keywords and engineers want to know your toolkit. The challenge is satisfying that need without making it a boring list.

## Philosophy

Skills are not personality traits. They're tools. The way you talk about them should reflect _how_ you use them and _why_ you prefer them — not just that they exist on your resume.

## Content Structure

### Grouping

Organize by _role in the craft_, not by category:

| Group        | What it covers                         |
| ------------ | -------------------------------------- |
| **Building** | React, TypeScript, HTML/CSS, Vite      |
| **Styling**  | Tailwind, CSS architecture, responsive |
| **Motion**   | Framer Motion, CSS animations          |
| **Thinking** | Architecture, testing, code review     |
| **Tools**    | Git, CI/CD, dev workflows              |

### Presentation

Each skill or group should have:

- A **name** (the technology or practice)
- A **context note** — one sentence about your relationship with it

> Example: "TypeScript — not just for type safety. It's how I think about data flow before writing a single component."

Do NOT use:

- Progress bars or percentage fills (meaningless and presumptuous)
- Star ratings
- "Expert / Intermediate / Beginner" labels

## Layout Intent

- Something more interesting than a grid of logos
- Consider: a **scattered/organic layout** — skills as floating elements, like objects on a workbench or leaves in a stream
- Or: **grouped clusters** with a brief label per group and skills as soft tags beneath
- The section should feel lighter than Projects or Experience — a pause in the journey, not a heavy stop

## Interaction

- **Hover/tap to reveal context**: each skill pill is interactive. On hover (desktop) or tap (mobile), the pill gently lifts and the one-sentence context note fades in directly below it or in a soft tooltip. This turns a scannable list into a discoverable experience.
- **Group focus**: when a user interacts with a skill in a group, the group label subtly highlights and the other groups dim slightly (opacity ~0.7). This draws attention to the cluster without hiding anything.
- **No modals, no popups**: context notes appear inline or as floating labels — never as something that blocks the page
- On mobile, the first tap reveals context; a second tap (or tapping elsewhere) dismisses it

## Visual Treatment

- Soft tag/pill shapes with palette-appropriate colors
- Subtle hover: show the context note on interaction or in a tooltip
- Consider a nature metaphor: skills as scattered seeds, stones in a garden, stars in a sky

## What to Avoid

- Technology logo walls (they age badly and add visual noise)
- Self-assessment scales of any kind
- Listing every tool ever touched — curate ruthlessly
- Making this section the same size as Projects

## Derived Content

### Building

| Skill           | Context                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| React           | Core tool for five years — from component libraries to micro-frontend architectures. Comfortable at every level of abstraction.    |
| TypeScript      | Not optional. It's how I think about data flow and contracts before writing implementation.                                        |
| Micro-frontends | Designed and maintained a multi-team MFE architecture in production. Understand the real tradeoffs, not just the conference talks. |
| HTML / CSS      | Semantic markup and accessible structure first. The foundation everything else sits on.                                            |

### State & Data

| Skill       | Context                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| Redux / RTK | Used extensively for complex application state — know when it's the right tool and when it's overhead. |
| React Query | For server state. Cleaner separation of concerns than putting everything in Redux.                     |
| REST APIs   | Designed and consumed APIs across frontend-backend boundaries. Comfortable shaping contracts.          |

### Quality & Accessibility

| Skill                        | Context                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Accessibility (WCAG 2.1 AA)  | Not just audits — standardized the process: automated checks, navigation validation, screen reader testing. |
| Jest / React Testing Library | Unit and integration testing as a development practice, not an afterthought.                                |
| Code Review                  | Use reviews as a design conversation, not a gatekeeping exercise.                                           |

### Infrastructure & Tooling

| Skill                                 | Context                                                                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Build Systems (Rspack, Webpack, Vite) | Migrated production apps between bundlers. Understand the performance implications at each layer. |
| Nx / Monorepos                        | Managed shared libraries and micro-frontend workspaces in Nx.                                     |
| Git / CI-CD                           | Standard workflow tooling. Comfortable with branching strategies and pipeline configuration.      |

### Backend Exposure

| Skill              | Context                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Java / Spring      | Built ETL pipelines and REST APIs in a previous role. Not my primary lane, but I can read, debug, and contribute. |
| PostgreSQL / MySQL | Comfortable with relational data modeling and query optimization.                                                 |
| Elasticsearch      | Integrated and tuned search infrastructure for sub-100ms query performance.                                       |

### Emerging

| Skill                   | Context                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| AI-Assisted Development | Practical use — release automation, documentation generation, workflow acceleration. Not hype-driven. |
| Python                  | Used for tooling and automation scripts. Growing proficiency.                                         |

## Open Questions

- Should skills be interactive (hover for context) or all visible at once?
- Is there a way to show _relationships_ between skills (e.g., React + TypeScript + Testing as a connected practice)?
- Should this section be optional in v1 if the projects already demonstrate the skills?
- The "Backend Exposure" group signals full-stack awareness without overclaiming — keep or merge into "Building"?
