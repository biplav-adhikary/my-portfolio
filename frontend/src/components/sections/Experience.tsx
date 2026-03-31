import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import SectionHeading from "../shared/SectionHeading";
import { experiences } from "../../data/content";
import { useTheme } from "../../context/ThemeContext";
import SageLogo from "../../assets/svg/sage-logo.svg";
import HighRadiusLogo from "../../assets/svg/highradius-logo.svg";

const companyLogos: Record<string, string> = {
  Sage: SageLogo,
  HighRadius: HighRadiusLogo,
};

/** Dark-mode logo overrides per company */
const darkLogoStyle: Record<string, React.CSSProperties> = {
  Sage: { opacity: 1 },
  HighRadius: { filter: "brightness(2.5) saturate(4.5)", opacity: 1 },
};

const lightLogoOpacity = 0.8;

/* ------------------------------------------------------------------ */
/*  Single timeline entry                                              */
/* ------------------------------------------------------------------ */
function TimelineEntry({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const logo = companyLogos[experience.company];
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const darkStyle = darkLogoStyle[experience.company] ?? { opacity: 0.7 };
  const logoAnimateOpacity = isDark
    ? (darkStyle.opacity as number)
    : lightLogoOpacity;

  return (
    <div ref={ref} className="relative">
      {/* Animated card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{
          duration: 0.6,
          delay: index * 0.12,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="relative overflow-hidden rounded-2xl border border-sky-100/50 bg-white/40 p-6 shadow-md shadow-sky-100/30 backdrop-blur-sm md:p-8 dark:border-night-700/40 dark:bg-white/[0.04] dark:shadow-black/20"
      >
        {/* Glass sheen — top-edge highlight simulating frosted glass depth */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/25 via-transparent to-transparent dark:from-white/[0.03]"
          aria-hidden="true"
        />

        {/* Header row: logo + role info + period */}
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Visible logo */}
            {logo && (
              <motion.img
                src={logo}
                alt={`${experience.company} logo`}
                initial={{ opacity: 0 }}
                animate={
                  isInView ? { opacity: logoAnimateOpacity } : { opacity: 0 }
                }
                transition={{ duration: 0.6, delay: 0.2 }}
                style={
                  isDark
                    ? { filter: darkStyle.filter as string | undefined }
                    : undefined
                }
                className="mt-1 hidden h-7 flex-shrink-0 select-none md:block"
              />
            )}
            <div>
              <h3 className="font-display text-lg font-semibold text-earth-800 md:text-xl dark:text-cloud-50">
                {experience.role}
              </h3>
              <p className="font-body text-sm text-earth-700 dark:text-earth-400">
                {experience.company}
              </p>
            </div>
          </div>

          {/* Period badge */}
          <span className="flex-shrink-0 rounded-full bg-sunset-100 px-3 py-1 font-accent text-sm text-earth-700 dark:bg-sunset-400/15 dark:text-sunset-300">
            {experience.period}
          </span>
        </div>

        {/* Mobile logo — between header and narrative */}
        {logo && (
          <div className="mt-3 md:hidden">
            <img
              src={logo}
              alt={`${experience.company} logo`}
              style={isDark ? darkStyle : { opacity: 0.4 }}
              className="h-5"
            />
          </div>
        )}

        {/* Narrative */}
        <p className="mt-4 font-body text-sm leading-relaxed text-earth-800 md:text-base dark:text-earth-400">
          {experience.narrative}
        </p>

        {/* Highlights */}
        <ul className="mt-5 space-y-2.5">
          {experience.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-earth-700 dark:text-earth-400"
            >
              <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-grass-300" />
              <span>{h}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience section                                                 */
/* ------------------------------------------------------------------ */
export default function Experience() {
  return (
    <SectionWrapper id="experience" scene="earth">
      <SectionHeading
        accentLabel="the path so far"
        heading="Experience"
        subtitle="Chapters, not just job titles."
      />

      {/* Stacked cards with a subtle connecting thread */}
      <div className="relative mx-auto max-w-3xl">
        {/* Vertical thread — connecting the cards */}
        <div
          className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-sky-200/0 via-sky-200/50 to-sky-200/0 md:left-8 md:block dark:via-night-700/40"
          aria-hidden="true"
        />

        {/* Entries */}
        <div className="flex flex-col gap-8 md:gap-10">
          {experiences.map((exp, index) => (
            <TimelineEntry key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
