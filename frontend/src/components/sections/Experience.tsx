import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import SectionHeading from "../shared/SectionHeading";
import { experiences } from "../../data/content";
import SageLogo from "../../assets/svg/sage-logo.svg";
import HighRadiusLogo from "../../assets/svg/highradius-logo.svg";

const companyLogos: Record<string, string> = {
  Sage: SageLogo,
  HighRadius: HighRadiusLogo,
};

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
        className="relative overflow-hidden rounded-2xl border border-sky-100/50 bg-white/40 p-6 shadow-md shadow-sky-100/30 backdrop-blur-sm md:p-8"
      >
        {/* Background watermark logo — positioned top-right */}
        {logo && (
          <img
            src={logo}
            alt=""
            className="pointer-events-none absolute -right-4 -top-2 w-32 select-none opacity-[0.06] md:w-48"
            aria-hidden="true"
          />
        )}

        {/* Header row: logo + role info + period */}
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Visible logo */}
            {logo && (
              <motion.img
                src={logo}
                alt={`${experience.company} logo`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.55 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-1 hidden h-7 flex-shrink-0 select-none md:block"
              />
            )}
            <div>
              <h3 className="font-display text-lg font-semibold text-earth-800 md:text-xl">
                {experience.role}
              </h3>
              <p className="font-body text-sm text-earth-500">
                {experience.company}
              </p>
            </div>
          </div>

          {/* Period badge */}
          <span className="flex-shrink-0 rounded-full bg-sunset-100 px-3 py-1 font-accent text-sm text-earth-700">
            {experience.period}
          </span>
        </div>

        {/* Mobile logo — between header and narrative */}
        {logo && (
          <div className="mt-3 md:hidden">
            <img
              src={logo}
              alt={`${experience.company} logo`}
              className="h-5 opacity-40"
            />
          </div>
        )}

        {/* Narrative */}
        <p className="mt-4 font-body text-sm leading-relaxed text-earth-600 md:text-base">
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
              className="flex items-start gap-2.5 text-sm leading-relaxed text-earth-500"
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
          className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-sky-200/0 via-sky-200/50 to-sky-200/0 md:left-8 md:block"
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
