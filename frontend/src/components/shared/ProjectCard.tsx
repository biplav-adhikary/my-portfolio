import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import type { Project } from "../../data/content";

/* ------------------------------------------------------------------ */
/*  Accent color mapping — maps project.accent token to Tailwind       */
/* ------------------------------------------------------------------ */
const accentMap: Record<
  string,
  { border: string; tag: string; dot: string; tagDark: string }
> = {
  sky: {
    border: "border-sky-200/60 dark:border-sky-400/20",
    tag: "bg-sky-100 text-earth-700",
    tagDark: "dark:bg-sky-400/15 dark:text-sky-300",
    dot: "bg-sky-300",
  },
  grass: {
    border: "border-grass-200/60 dark:border-grass-400/20",
    tag: "bg-grass-100 text-earth-700",
    tagDark: "dark:bg-grass-400/15 dark:text-grass-300",
    dot: "bg-grass-300",
  },
  sunset: {
    border: "border-sunset-200/60 dark:border-sunset-400/20",
    tag: "bg-sunset-100 text-earth-700",
    tagDark: "dark:bg-sunset-400/15 dark:text-sunset-300",
    dot: "bg-sunset-300",
  },
  cloud: {
    border: "border-cloud-200/60 dark:border-cloud-200/20",
    tag: "bg-cloud-100 text-earth-700",
    tagDark: "dark:bg-cloud-200/15 dark:text-cloud-200",
    dot: "bg-cloud-200",
  },
};

const fallbackAccent = accentMap.sky;

/* ------------------------------------------------------------------ */
/*  Narrative block labels                                             */
/* ------------------------------------------------------------------ */
const narrativeBlocks: {
  key: keyof Pick<Project, "context" | "challenge" | "approach" | "outcome">;
  label: string;
}[] = [
  { key: "context", label: "Context" },
  { key: "challenge", label: "Challenge" },
  { key: "approach", label: "Approach" },
  { key: "outcome", label: "Outcome" },
];

/* ------------------------------------------------------------------ */
/*  ProjectCard                                                        */
/* ------------------------------------------------------------------ */
interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
  /** Index for staggered entrance */
  index: number;
}

export default function ProjectCard({
  project,
  isExpanded,
  onToggle,
  index,
}: ProjectCardProps) {
  const accent = accentMap[project.accent] ?? fallbackAccent;
  const cardRef = useRef<HTMLDivElement>(null);

  // When expanding, scroll card into view only if it's not already comfortably visible
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Only scroll if card top is above the sticky nav or more than 60% down the viewport
      if (rect.top < 80 || rect.top > viewportHeight * 0.6) {
        cardRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [isExpanded]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        y: { duration: 0.5, delay: index * 0.1 },
      }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={clsx(
        "group cursor-pointer scroll-mt-24",
        "ghibli-card",
        accent.border,
        isExpanded && "ring-1 ring-sky-100/40 dark:ring-night-700/60",
      )}
    >
      {/* ---- Header: always visible ---- */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {/* Accent dot + title */}
          <div className="flex items-center gap-3">
            <span
              className={`mt-0.5 block h-2 w-2 flex-shrink-0 rounded-full ${accent.dot}`}
              aria-hidden="true"
            />
            <h3
              className="font-display text-lg font-semibold md:text-xl"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </h3>
          </div>

          {/* Tagline */}
          <p className="mt-2 pl-5 text-body">{project.tagline}</p>
        </div>

        {/* Expand chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-1 flex-shrink-0"
          style={{ color: "var(--text-muted)" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </div>

      {/* Tech tags — always visible */}
      <div className="mt-4 flex flex-wrap gap-2 pl-5">
        {project.tech.map((t) => (
          <span
            key={t}
            className={`rounded-full px-3 py-1 text-xs font-medium ${accent.tag} ${accent.tagDark}`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* "Read the story" hint — only when collapsed */}
      {!isExpanded && (
        <div className="mt-5 flex items-center gap-2 pl-5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-accent text-base font-medium ${accent.tag} ${accent.tagDark} transition-all duration-quick group-hover:shadow-sm`}
          >
            Read the story
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </span>
        </div>
      )}

      {/* ---- Expanded narrative ---- */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="narrative"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
              opacity: { duration: 0.25, delay: 0.08 },
            }}
            className="overflow-hidden"
          >
            <div
              className="mt-6 space-y-5 pl-5 pt-6"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              {narrativeBlocks.map(({ key, label }) => (
                <div key={key}>
                  <span
                    className="mb-1 block font-body text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {label}
                  </span>
                  <p className="text-body">{project[key]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
