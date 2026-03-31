export interface Project {
  id: string;
  title: string;
  tagline: string;
  context: string;
  challenge: string;
  approach: string;
  outcome: string;
  tech: string[];
  accent: string; // tailwind color class
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
  narrative: string;
}

export const projects: Project[] = [
  {
    id: "platform-architecture",
    title: "Platform Architecture at Scale",
    tagline:
      "Designing a micro-frontend system where multiple teams ship independently without breaking each other's work.",
    context:
      "A growing platform connecting businesses across the accounting ecosystem needed to support parallel development by multiple squads — each with their own release cadence and feature scope.",
    challenge:
      "How do you let teams move fast without fragmenting the user experience? Shared components, independent deploys, and consistent design language all had to coexist.",
    approach:
      "Designed a micro-frontend architecture with an externalized shared library for common components and utilities. This meant teams could develop and deploy in isolation while the shared layer enforced consistency. The tradeoff was added complexity in the build pipeline — worth it at the scale we were operating at.",
    outcome:
      "Independent team delivery with a unified product surface. The shared library is now used across multiple repositories, and integration overhead dropped significantly.",
    tech: ["React", "TypeScript", "Nx", "Micro-frontends", "Shared Libraries"],
    accent: "sky",
  },
  {
    id: "payment-system",
    title: "Payment Portal",
    tagline:
      "Building a payment portal from scratch — owning the full delivery from orchestration to UI.",
    context:
      "The platform needed to facilitate financial transactions between connected businesses — a capability that didn't exist yet. Multiple teams and services had to come together to make it work.",
    challenge:
      "Payment flows are unforgiving. Security, accessibility, error handling, and integration with external processors all had to be right from day one. Beyond the UI, someone needed to connect the dots between teams — defining how the consumer app would use payment services, planning writeback flows, and designing the orchestration layer end-to-end.",
    approach:
      "Owned the full delivery — not just the frontend, but the cross-team coordination that made it work. Defined API contracts, devised the payment orchestration flow (how the consumer app calls into payment services and handles the lifecycle), facilitated plans for writeback, and built the entire portal UI from scratch with a focus on accessibility and clean error handling. Continued expanding the system after launch — onboarding new payment providers and building out support for credit notes, partial payments, and discounts, each requiring changes across the orchestration layer and UI.",
    outcome:
      "Launched to production without major issues and kept growing the feature set. Each new provider or payment requirement validated the architecture held up — the same orchestration layer accommodated new flows without rebuilding from scratch. Directly enabled a new revenue stream through payment processing fees.",
    tech: [
      "React",
      "TypeScript",
      "Payment APIs",
      "REST API Design",
      "Accessibility (WCAG 2.1 AA)",
    ],
    accent: "grass",
  },
  {
    id: "collections-automation",
    title: "Enterprise Collections Automation",
    tagline:
      "Turning a manual, spreadsheet-driven collections process into an intelligent workflow.",
    context:
      "Enterprise collectors were managing follow-ups across thousands of invoices — prioritizing manually, drafting emails by hand, searching through fragmented data.",
    challenge:
      "Automating a nuanced human workflow without removing the collector's sense of control. The system needed to be smarter than a spreadsheet but still feel like their tool.",
    approach:
      "Built end-to-end — React frontend for the workflow UI, Spring APIs for the business logic, and Elasticsearch integration for fast data retrieval. Automated routine communications through a custom email editor with dynamic templates and actionable message support. The work required understanding the full path from database to UI.",
    outcome:
      "Streamlined daily collection workflows. Collectors could focus on judgment calls instead of data wrangling.",
    tech: [
      "React",
      "Redux",
      "Java/Spring REST APIs",
      "Elasticsearch",
      "Dynamic Email Templates",
    ],
    accent: "sunset",
  },
  {
    id: "build-modernization",
    title: "Build System Modernization",
    tagline:
      "Migrating a large application's build tooling to cut load times and improve developer experience.",
    context:
      "The existing build setup was becoming a bottleneck — slow startup, long rebuilds, and developer frustration accumulating sprint over sprint.",
    challenge:
      "Migrating a production application's build system without disrupting ongoing feature work. Every team depends on the build pipeline; breaking it means blocking everyone.",
    approach:
      "Evaluated modern bundler alternatives and migrated incrementally, validating each step against the existing output. Prioritized developer experience metrics — cold start time, hot reload speed, build size — alongside production performance.",
    outcome:
      "Significant improvement in startup and load times. Developer workflow noticeably faster. The kind of infrastructure work that doesn't get celebrated but makes everything else possible.",
    tech: ["Rspack", "Webpack (legacy)", "Module Federation"],
    accent: "cloud",
  },
  {
    id: "autorelease-ai",
    title: "AutoRelease AI",
    tagline:
      "Automating release prep so teams ship faster with less manual overhead.",
    context:
      "Release preparation involved manually checking which components changed, linking build artifacts, writing release notes, and updating Confluence — repetitive work that slowed down every release cycle.",
    challenge:
      "Each release had multiple moving parts across micro-frontends. Tracking changes, linking the right builds, and writing accurate documentation was tedious and error-prone when done by hand.",
    approach:
      "Built a tool that detects changed components automatically, links corresponding builds, and auto-generates release documentation and Confluence updates. Integrated AI to draft release notes and flag potential risks based on the scope of changes.",
    outcome:
      "Reduced manual release effort significantly. Release notes became more consistent, traceability improved, and the team could focus on shipping instead of paperwork.",
    tech: ["TypeScript", "Python", "AI/LLM", "Confluence API", "CI/CD"],
    accent: "grass",
  },
  {
    id: "internal-dev-tools",
    title: "Internal Dev Tools",
    tagline:
      "A set of utilities built to solve recurring pain points in the team's daily workflow.",
    context:
      "Across sprints, several manual processes kept eating up developer time — simulating payment writebacks for testing, managing translations across locales, updating Confluence docs, and keeping the team notified about build/deploy events.",
    challenge:
      "Each of these was small enough to live without, but together they added up. The goal was to build lightweight, focused tools rather than over-engineering a single platform.",
    approach:
      "Built GUI tools to simulate payment writeback flows for local testing, automated i18n translation workflows, created MCP tools for Confluence page management, and developed an MS Teams notifier app for build and deploy events.",
    outcome:
      "Reduced friction across multiple workflows. The tools were adopted by the team and became part of the standard development setup.",
    tech: ["TypeScript", "React", "MCP", "MS Teams API", "i18n"],
    accent: "sky",
  },
  {
    id: "fintech-invoice-management",
    title: "AI-Enabled FinTech B2B Invoice Management",
    tagline:
      "A full-stack invoice management system built during an internship at HighRadius.",
    context:
      "Part of the Summer Internship Program at HighRadius. The goal was to build a working B2B invoice management application that could handle real-world invoice data and apply basic AI predictions.",
    challenge:
      "Building a complete application from frontend to backend within a constrained internship timeline, while learning enterprise patterns and financial domain concepts on the go.",
    approach:
      "Built the frontend in React with a focus on usability for invoice workflows — search, filtering, and status tracking. Connected to backend APIs for data management and integrated a basic AI model for invoice predictions.",
    outcome:
      "Delivered a working application by the end of the internship. It was a solid introduction to building software in a real product environment.",
    tech: ["React", "JavaScript", "REST APIs", "AI/ML", "HighRadius Platform"],
    accent: "sunset",
  },
  {
    id: "unfoldit-ml",
    title: "UnFoldit — Automated Machine Learning App",
    tagline:
      "A college project that lets users upload a dataset and automatically picks the best ML model for it.",
    context:
      "Built as a minor project in the 6th semester at KIIT University. The idea was to make machine learning more approachable for people who don't know which algorithm to pick.",
    challenge:
      "Supporting arbitrary supervised datasets meant handling different data shapes, feature types, and target variables — then selecting and training an appropriate model without manual configuration.",
    approach:
      "Built a pipeline that accepts a dataset, detects the problem type (classification or regression), evaluates multiple models, and picks the best-performing one. Wrapped it in a simple UI for uploading data and viewing results.",
    outcome:
      "A functional learning tool. Not production-grade, but a good exercise in understanding ML pipelines end-to-end and building something usable around them.",
    tech: ["Python", "Scikit-learn", "Flask", "Machine Learning"],
    accent: "cloud",
  },
];

export const experiences: Experience[] = [
  {
    id: "sage",
    role: "Engineer",
    company: "Sage",
    period: "Feb 2023 — Present",
    narrative:
      "Joined a platform trying to become the connective layer between businesses in the accounting ecosystem. Started by shipping frontend features — micro-frontends, ERP integrations, accessibility compliance. Over time, the scope expanded beyond the UI layer: owning end-to-end delivery across payment flows, coordinating API contracts, driving architecture decisions, and modernizing build infrastructure. The work went from \"build this feature\" to \"make this platform scale\" — and that meant going wherever the problem lived, not just the frontend.",
    highlights: [
      "Designed and maintained a micro-frontend architecture using Nx, with a shared library externalized for reuse across repositories — enabling independent team workflows while keeping components and design language consistent",
      "Built a payment portal from scratch — API contract design through frontend — and shipped to production with zero critical issues, directly enabling revenue through payment processing fees",
      "Migrated the application from Webpack to Rspack after evaluating against developer experience metrics (cold start, hot reload, bundle size), significantly improving build and load times",
      "Moved accessibility from ad-hoc audits to a standardized process — automated checks, navigation validation, screen reader testing, and WCAG 2.1AA compliance integrated into the development workflow",
      "Applied AI across two surfaces: a customer-facing chatbot for support interactions, and internal tooling for release automation, documentation generation, and JIRA story preparation",
      "Led cross-functional design discussions to align product direction across squads, and supported ERP integration enablement teams on payments workflows",
      "Drove ongoing technical debt reduction, established documentation practices for knowledge retention, and was promoted to Engineer (Jan 2025) with expanded end-to-end ownership",
    ],
  },
  {
    id: "highradius",
    role: "Associate Software Engineer II",
    company: "HighRadius",
    period: "Jul 2020 — Feb 2023",
    narrative:
      "This is where the foundations were set. Started as an intern on a collections platform serving Fortune 500 clients, then grew into a full-stack role — building React frontends, Java/Spring APIs, and data processing pipelines in the same sprint. Three promotions in 2.5 years. Learned that enterprise software isn't glamorous, but it teaches you to build things that hold up under real constraints — messy data, complex workflows, and users who have no patience for broken tools.",
    highlights: [
      "Built the autonomous collections workflow end-to-end — React frontend, Spring REST APIs, and data layer — streamlining how enterprise clients managed their receivables process",
      "Developed a custom email editor with dynamic templates, AMP support, and Microsoft Actionable Message integration — replacing a fully manual communication workflow",
      "Engineered Java-based ETL agents for scheduled data processing and integrated Elasticsearch to bring search latency under 100ms across large datasets",
      "Led a design system effort creating a modular React component library adopted across multiple product surfaces for UI consistency",
      "Filed a US patent for a timing-based recommendation engine — surfacing contextual suggestions based on temporal patterns in user behavior",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

export interface Skill {
  name: string;
  context: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "building",
    label: "Building",
    skills: [
      {
        name: "React",
        context:
          "Core tool for five years — from component libraries to micro-frontend architectures.",
      },
      {
        name: "TypeScript",
        context:
          "Not optional. It's how I think about data flow and contracts before writing implementation.",
      },
      {
        name: "Micro-frontends",
        context:
          "Designed and maintained a multi-team MFE architecture in production.",
      },
      {
        name: "HTML / CSS",
        context:
          "Semantic markup and accessible structure first. The foundation everything else sits on.",
      },
    ],
  },
  {
    id: "state-data",
    label: "State & Data",
    skills: [
      {
        name: "Redux / RTK",
        context:
          "Used extensively for complex application state — know when it's the right tool and when it's overhead.",
      },
      {
        name: "React Query",
        context:
          "For server state. Cleaner separation of concerns than putting everything in Redux.",
      },
      {
        name: "REST APIs",
        context:
          "Designed and consumed APIs across frontend-backend boundaries. Comfortable shaping contracts.",
      },
    ],
  },
  {
    id: "quality",
    label: "Quality & Accessibility",
    skills: [
      {
        name: "Accessibility (WCAG 2.1 AA)",
        context:
          "Not just audits — standardized the process: automated checks, navigation validation, screen reader testing.",
      },
      {
        name: "Jest / RTL",
        context:
          "Unit and integration testing as a development practice, not an afterthought.",
      },
      {
        name: "Code Review",
        context:
          "Use reviews as a design conversation, not a gatekeeping exercise.",
      },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure & Tooling",
    skills: [
      {
        name: "Build Systems",
        context:
          "Migrated production apps between bundlers (Rspack, Webpack, Vite). Understand the performance implications.",
      },
      {
        name: "Nx / Monorepos",
        context:
          "Managed shared libraries and micro-frontend workspaces in Nx.",
      },
      {
        name: "Git / CI-CD",
        context:
          "Standard workflow tooling. Comfortable with branching strategies and pipeline configuration.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend Exposure",
    skills: [
      {
        name: "Java / Spring",
        context:
          "Built ETL pipelines and REST APIs. Not my primary lane, but I can read, debug, and contribute.",
      },
      {
        name: "PostgreSQL / MySQL",
        context:
          "Comfortable with relational data modeling and query optimization.",
      },
      {
        name: "Elasticsearch",
        context:
          "Integrated and tuned search infrastructure for sub-100ms query performance.",
      },
    ],
  },
  {
    id: "emerging",
    label: "Emerging",
    skills: [
      {
        name: "AI-Assisted Dev",
        context:
          "Practical use — release automation, documentation generation, workflow acceleration. Not hype-driven.",
      },
      {
        name: "Python",
        context: "Used for tooling and automation scripts. Growing proficiency.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

export interface ContactLink {
  label: string;
  href: string;
  icon: "email" | "github" | "linkedin";
}

export const contact = {
  headline: "Let's build something together",
  subline:
    "Whether it's a role, a project, or just a thought — I'd be happy to hear from you.",
  links: [
    {
      label: "Email",
      href: "mailto:biplov@live.com",
      icon: "email" as const,
    },
    {
      label: "GitHub",
      href: "https://github.com/biplav-adhikary",
      icon: "github" as const,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/biplav-adhikary-3492061ab/",
      icon: "linkedin" as const,
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export interface AboutContent {
  intro: string;
  values: { short: string; detail: string }[];
  beyondCode?: string;
}

export const about: AboutContent = {
  intro:
    "I'm a software engineer with about five years of experience building platforms where businesses connect, transact, and manage their data. I work primarily on the frontend — React, TypeScript, micro-frontend architecture — but I've owned end-to-end delivery across payment systems, API contracts, build infrastructure, and cross-team coordination when the problem needed it. I care more about getting the structure right than making it look impressive.",
  values: [
    {
      short: "Architecture is a multiplier",
      detail:
        "The right structure makes every feature after it cheaper to build. I think about this before writing code.",
    },
    {
      short: "Own the problem, not just the layer",
      detail:
        "If the best solution crosses the stack boundary, I'd rather cross it than hand it off and hope for the best.",
    },
    {
      short: "Accessibility is a default",
      detail:
        "Not an audit you run before launch — a design constraint that makes the product better for everyone.",
    },
    {
      short: "Developer experience matters",
      detail:
        "Build tooling, documentation, shared libraries — if the team moves faster, everything ships faster.",
    },
    {
      short: "Ship, then refine",
      detail:
        "Get it working, get it out, then make it better. Pragmatic delivery over perfect plans.",
    },
  ],
  beyondCode:
    "Outside work, I watch a lot of anime and web series, read whatever catches my eye, and try to stay active — swimming and the gym keep things balanced.",
};
