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
    title: "Greenfield Payment System",
    tagline:
      "Building a payment portal from scratch that directly generates revenue.",
    context:
      "The platform needed to facilitate financial transactions between connected businesses — a capability that didn't exist yet.",
    challenge:
      "Payment flows are unforgiving. Security, accessibility, error handling, and integration with external payment processors all had to be right from day one. There was no existing codebase to build on.",
    approach:
      "Owned end-to-end delivery — from defining API contracts with the backend team to building the entire frontend from scratch. Focused on clean architecture, accessible forms, and graceful error states. Worked across the stack to ensure the payment flow was smooth across different ERP connections and external payment processors.",
    outcome:
      "Launched to production without major issues. The feature directly enabled a new revenue stream through payment processing fees.",
    tech: [
      "React",
      "TypeScript",
      "Payment APIs",
      "REST API Design",
      "Accessibility",
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
      "Java/Spring",
      "Elasticsearch",
      "Email Templates",
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
    tech: ["Rspack", "Webpack", "Module Federation"],
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
      "Joined a platform trying to become the connective layer between businesses in the accounting ecosystem. Started by shipping frontend features — micro-frontends, ERP integrations, accessibility compliance. Over time, the scope expanded beyond the UI layer: owning end-to-end delivery across payment flows, coordinating API contracts, driving architecture decisions, and modernizing build infrastructure. The work went from \"build this feature\" to \"make this platform scale.\"",
    highlights: [
      "Designed and maintained a micro-frontend architecture allowing independent team development and deployment with a shared component library",
      "Built a greenfield payment portal end-to-end — API contracts through frontend — shipped to production with zero critical issues",
      "Migrated the build system to a modern bundler, cutting startup and load times and improving daily developer workflow",
      "Standardized accessibility practices across the product — automated checks, navigation validation, and screen reader testing baked into development",
      "Filed a US patent for a timing-based recommendation engine",
      "Introduced AI tooling for release automation, documentation generation, and development acceleration",
    ],
  },
  {
    id: "highradius",
    role: "Associate Software Engineer II",
    company: "HighRadius",
    period: "Jul 2020 — Feb 2023",
    narrative:
      "This is where the foundations were set. Started as an intern on a collections platform serving Fortune 500 clients, then grew into a full-stack role — building React frontends, Java/Spring APIs, and data processing pipelines in the same sprint. Learned that enterprise software isn't glamorous, but it teaches you to build things that hold up under real constraints.",
    highlights: [
      "Built a workflow automation tool end-to-end — React frontend, Spring REST APIs, and data layer — streamlining collections for enterprise clients",
      "Engineered Java-based ETL agents for scheduled data processing, improving system reliability and data accessibility",
      "Developed a custom email editor with dynamic templates and actionable message integration",
      "Optimized Elasticsearch to sub-100ms latency, enabling advanced filtering across large datasets",
      "Mentored junior engineers on technical solutioning and aligning implementation with business requirements",
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
    "Whether it's a role, a project, or just a thought — I'm always glad to hear from people who care about good work.",
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
    "I'm a software engineer who's spent the last several years building platforms where businesses connect, transact, and make sense of their data. My strongest instinct is on the frontend — architecture, interaction, the feel of an interface — but I've built APIs, data pipelines, and search infrastructure when the problem required it. I think a lot about the layer between system design and user experience. Most of my best work has been the kind that's invisible when it's done right.",
  values: [
    {
      short: "Architecture is a multiplier",
      detail:
        "The right structure makes every feature after it cheaper to build.",
    },
    {
      short: "Own the problem end-to-end",
      detail:
        "If the best solution crosses the stack boundary, cross it.",
    },
    {
      short: "Accessibility is a design constraint",
      detail:
        "It makes products better for everyone — not a compliance checkbox.",
    },
    {
      short: "Developer experience is a product too",
      detail:
        "Tooling, documentation, and shared libraries deserve the same care as user-facing features.",
    },
    {
      short: "Question the requirement first",
      detail:
        "Alignment with long-term product direction matters more than speed of delivery.",
    },
    {
      short: "Ship, then refine",
      detail:
        "Pragmatic delivery first, elegance as you go.",
    },
    {
      short: "Explain it simply",
      detail:
        "The best technical decisions are the ones you can explain to someone outside your team.",
    },
  ],
  beyondCode:
    "When I'm not coding, I'm usually noticing systems — how a city intersection manages traffic, how a game teaches mechanics without tutorials, how a conversation shifts when someone asks the right question. I think that instinct is what drew me to engineering in the first place.",
};
