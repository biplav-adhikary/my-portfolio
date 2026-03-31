import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../../data/content";

/* ------------------------------------------------------------------ */
/*  Accent color mapping — maps project.accent token to Tailwind       */
/* ------------------------------------------------------------------ */
const accentMap: Record<string, { border: string; tag: string; dot: string }> =
  {
    sky: {
      border: "border-sky-200/60",
      tag: "bg-sky-100 text-earth-700",
      dot: "bg-sky-300",
    },
    grass: {
      border: "border-grass-200/60",
      tag: "bg-grass-100 text-earth-700",
      dot: "bg-grass-300",
    },
    sunset: {
      border: "border-sunset-200/60",
      tag: "bg-sunset-100 text-earth-700",
      dot: "bg-sunset-300",
    },
    cloud: {
      border: "border-cloud-200/60",
      tag: "bg-cloud-100 text-earth-700",
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

  // When expanding, gently scroll the card into comfortable view
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      // Only scroll if the card top is above the viewport or too close to the top
      if (rect.top < 80) {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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
      className={`
        group cursor-pointer scroll-mt-24
        rounded-2xl border bg-white/50 p-6 shadow-lg shadow-sky-100/50
        backdrop-blur-sm transition-shadow duration-300
        hover:shadow-xl hover:shadow-sky-200/40
        md:p-8
        ${accent.border}
        ${isExpanded ? "ring-1 ring-sky-100/40" : ""}
      `}
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
            <h3 className="font-display text-lg font-semibold text-earth-800 md:text-xl">
              {project.title}
            </h3>
          </div>

          {/* Tagline */}
          <p className="mt-2 pl-5 font-body text-sm leading-relaxed text-earth-600 md:text-base">
            {project.tagline}
          </p>
        </div>

        {/* Expand chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-1 flex-shrink-0 text-earth-400"
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
            className={`rounded-full px-3 py-1 text-xs font-medium ${accent.tag}`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* "Read the story" hint — only when collapsed */}
      {!isExpanded && (
        <div className="mt-5 flex items-center gap-2 pl-5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-accent text-base font-medium ${accent.tag} transition-all duration-200 group-hover:shadow-sm`}
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
            <div className="mt-6 space-y-5 border-t border-sky-100/50 pl-5 pt-6">
              {narrativeBlocks.map(({ key, label }) => (
                <div key={key}>
                  <span className="mb-1 block font-body text-xs font-semibold uppercase tracking-wider text-earth-700">
                    {label}
                  </span>
                  <p className="font-body text-sm leading-[1.75] text-earth-700 md:text-base">
                    {project[key]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
