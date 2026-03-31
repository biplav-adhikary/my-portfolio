# Experience Section

## Purpose

Show the professional journey — not as a résumé timeline, but as a path of growth and increasing impact.

A recruiter should see trajectory, not just job titles.

## Metaphor

**A winding path.** Not a straight line. The layout should evoke a sense of journey — stepping stones across a stream, a trail through hills, markers along a road. The exact visual is open to interpretation, but it should feel _traveled_, not _listed_.

## Content Structure

Each experience entry has:

- **Role** — title, company (or a useful stand-in), period
- **Narrative** — 2–3 sentences about what this chapter was about. Not what you did — what you _learned_, how you _grew_.
- **Highlights** — 3–4 impact-focused bullet points. Concrete where possible.

### Tone

```
❌ "Responsible for maintaining frontend codebase"
✅ "Drove adoption of TypeScript strict mode across the codebase — the kind of
   unsexy work that makes everything else faster."
```

The highlights should sound like something you'd say with quiet pride, not corporate filler.

## Layout Intent

- A **vertical path** that the user scrolls through, with entries alternating sides or stepping down
- Each entry appears as a "stopping point" along the path
- Consider connecting entries with a subtle visual thread — a line, a trail, stepping stones
- The path can start from "now" and go backwards, or the reverse — whichever reads better
- **Scroll-triggered entrance**: each entry animates into position as the user reaches it — sliding in from the alternating side with a fade. The visual thread (line/trail) draws itself progressively as entries appear, giving a sense of the path being _walked_ in real time
- **Active entry emphasis**: the entry closest to viewport center gets full opacity and a subtle shadow lift; others settle back slightly (opacity ~0.85). This keeps the user's attention anchored on one chapter at a time

## Visual Treatment

- Cards or contained blocks for each entry, but lighter than project cards — these shouldn't compete
- Soft backgrounds, minimal borders
- A small timeline indicator or date badge
- Optional: a tiny nature element at each milestone (a leaf, a stone, a flower)

## What to Avoid

- A dense vertical timeline with circle markers (seen it a thousand times)
- Listing every responsibility from the job description
- Company logos (they clutter and date)
- More than 3–4 entries — this isn't LinkedIn

## Derived Content

### Entry 1: Sage — Frontend → Platform Engineer (2023–Present)

**Role**: Engineer (previously Product Engineer II)  
**Period**: Feb 2023 – Present (~3 years)

**Narrative**:  
Joined a platform trying to become the connective layer between businesses in the accounting ecosystem. Started by shipping frontend features — micro-frontends, ERP integrations, accessibility compliance. Over time, the scope expanded beyond the UI layer: owning end-to-end delivery across payment flows, coordinating API contracts, driving architecture decisions, and modernizing build infrastructure. The work went from "build this feature" to "make this platform scale" — and that meant going wherever the problem lived, not just the frontend.

**Highlights**:

- Designed and maintained a micro-frontend architecture using Nx, with a shared publishable library externalized for reuse across repositories — enabling independent team workflows while keeping components and design language consistent across the product
- Built the Intacct Payment Portal from scratch in collaboration with integration teams — from API contract design through frontend — and shipped Online Payments to production with zero critical issues, directly enabling revenue through payment processing fees
- Migrated the self-service application from Webpack to Rspack after evaluating alternatives against developer experience metrics (cold start, hot reload, bundle size). Significantly improved build and load times for both development and production environments
- Moved accessibility from ad-hoc audits to a standardized process — automated checks, navigation validation, screen reader testing, and WCAG 2.1AA compliance integrated into the team's development workflow
- Applied AI across two surfaces: built a customer-facing chatbot for support and feedback interactions, and introduced AI-driven tooling for release automation, documentation generation, and JIRA story preparation — reducing manual overhead across the team
- Led cross-functional design discussions to align product direction across squads — identifying conflicts early and ensuring a unified design vision before code was written
- Supported ERP integration enablement teams on payments workflows, bridging the gap between platform capabilities and implementation teams to ensure smoother rollouts for connected businesses
- Drove ongoing technical debt reduction and architectural enhancements — refactoring unstructured code paths encountered during feature work rather than letting them accumulate
- Established documentation practices for delivered features, ensuring knowledge retention and onboarding clarity beyond the shipping team
- Promoted to Engineer (Jan 2025) with expanded ownership over end-to-end delivery and high-level architectural direction across the platform

---

### Entry 2: HighRadius — Intern → Full-Stack Engineer (2020–2023)

**Role**: Associate Software Engineer II (previously ASE I, Intern)  
**Period**: Jul 2020 – Feb 2023 (~2.5 years)

**Narrative**:  
This is where the foundations were set. Started as an intern on a collections platform serving Fortune 500 clients, then grew into a full-stack role — building React frontends, Java/Spring APIs, and data processing pipelines in the same sprint. Three promotions in 2.5 years. Owning receivables workflow automation meant understanding the entire path from database to UI. Learned that enterprise software isn't glamorous, but it teaches you to build things that hold up under real constraints — messy data, complex workflows, and users who have no patience for broken tools.

**Highlights**:

- Built the autonomous collections workflow end-to-end — React frontend, Spring REST APIs, and data layer — streamlining how enterprise clients managed their receivables process and improving collector productivity
- Developed a custom email editor with dynamic templates, AMP support, and Microsoft Actionable Message integration — automating email generation from receivables data and replacing a fully manual communication workflow
- Engineered Java-based ETL agents for scheduled data processing and storage, and integrated Elasticsearch to bring search latency under 100ms — enabling advanced filtering across large datasets that were previously slow to query
- Led a design system effort creating a modular React component library adopted across multiple product surfaces for UI consistency. Mentored junior engineers on aligning technical decisions with business requirements. Recognized with two peer awards for delivery quality
- Filed a US patent for a timing-based recommendation engine — an original approach to surfacing contextual suggestions based on temporal patterns in user behavior

## Open Questions

- Should the path metaphor be literal (illustrated) or abstract (layout-based)?
- Is there value in showing a "looking ahead" element at the end — a brief note about what you want next?
