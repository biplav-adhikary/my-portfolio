## Execution Strategy (Sub-agent Style)

To keep responses concise and efficient, follow a staged approach:

### 1. Planner

- Read relevant files from `/spec`
- Summarize intent in 2–4 bullet points
- Define a minimal implementation approach
- Do NOT generate code in this step unless explicitly asked

### 2. Builder

- Implement only what is required for the current task
- Avoid over-engineering or adding speculative features
- Keep code minimal, clean, and production-ready

### 3. Reviewer

- Check alignment with `/spec`
- Remove unnecessary complexity
- Ensure consistency with existing components and styles

---

## Token Efficiency Rules

- Prefer short summaries over long explanations
- Avoid repeating spec content verbatim
- Do not generate multiple alternative implementations unless requested
- Focus only on the requested scope

---

## Prompt Handling

When a task is given:

1. Identify relevant `/spec` files
2. Briefly plan (concise)
3. Implement directly

If the task is ambiguous:

- Ask a short clarification instead of guessing

## Backend Awareness

- A `/backend` folder exists for future use but is currently out of scope
- Do not introduce backend dependencies unless explicitly requested
- Prefer static or mock data for now

## Decision Records

Important architectural and product decisions must be documented.

### Location

- Store all decision records in `/.github/decisions/`

### When to Record a Decision

Create or update a decision record when:

- A non-trivial technical choice is made (e.g., library, architecture, state management)
- A design direction significantly affects UI/UX
- A tradeoff is considered (e.g., simplicity vs flexibility)
- A pattern is introduced that others should follow

### Format

Each decision should be stored as a separate markdown file:

```bash
/.github/decisions/DECISION_NAME.md
```

## Visual Assets & Image Generation

When implementing UI or suggesting enhancements:

- Identify where images, illustrations, or visual assets would improve the experience
- Clearly state:
  - where the asset will be used
  - what purpose it serves

When an asset is needed, generate a high-quality image prompt.

### Prompt Requirements

- Must describe an original illustration (no copyrighted characters)
- Follow a Ghibli-inspired aesthetic:
  - soft, calm, minimal
  - nature-inspired (sky, clouds, light, subtle landscapes)
- Match the portfolio’s tone (professional, not flashy)
- Include details about lighting, colors, and composition
- Be directly usable in tools like DALL·E or Midjourney

### Output Format

When suggesting an asset:

Asset Needed:

- Location: [e.g., Hero background]
- Purpose: [what it enhances]

Image Prompt:
[prompt text]

### Constraints

- Do not assume assets already exist
- Do not skip suggesting visuals where they add value
- Avoid excessive or distracting use of images

### Principle

Use visuals to enhance the experience, not dominate it.
