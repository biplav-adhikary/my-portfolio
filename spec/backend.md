# Backend

## Current Status: Out of Scope

The portfolio is a fully static frontend application. There is no backend, no API, no database.

## Why

- The portfolio serves static, author-controlled content. There's nothing dynamic enough to justify a server.
- Keeping it static means it can be deployed anywhere (Vercel, Netlify, GitHub Pages) with zero infrastructure.
- Simplicity is a feature. One fewer thing to break, monitor, or pay for.

## Future Considerations

If a backend is ever introduced, it would likely be for:

| Feature               | Trigger                                          | Complexity |
| --------------------- | ------------------------------------------------ | ---------- |
| Contact form handling | Want to receive messages without exposing email  | Low        |
| Blog / writing        | Want dynamic, CMS-managed content                | Medium     |
| Analytics             | Want self-hosted visitor insights                | Medium     |
| Project CMS           | Want to edit project content without redeploying | Medium     |

## Guardrails

- **Do not** design frontend components around APIs that don't exist yet
- **Do not** add backend dependencies to the frontend build
- **Do not** introduce authentication, user accounts, or session management unless explicitly scoped
- If a backend is added, prefer lightweight options: serverless functions, edge handlers, or a simple REST API
- The frontend must always be able to run independently as a static site
