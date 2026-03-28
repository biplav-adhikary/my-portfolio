import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import SectionHeading from "../shared/SectionHeading";
import { experiences } from "../../data/content";

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
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`
        relative flex w-full items-start gap-6
        md:w-[calc(50%-1.5rem)]
        ${isEven ? "md:self-start md:text-right" : "md:self-end"}
      `}
    >
      {/* Animated card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30, y: 12 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: isEven ? -30 : 30, y: 12 }
        }
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full rounded-2xl border border-sky-100/50 bg-white/40 p-5 shadow-md shadow-sky-100/30 backdrop-blur-sm md:p-6"
      >
        {/* Period badge */}
        <span className="inline-block rounded-full bg-sunset-100 px-3 py-1 font-accent text-sm text-earth-700">
          {experience.period}
        </span>

        {/* Role & company */}
        <h3 className="mt-3 font-display text-lg font-semibold text-earth-800">
          {experience.role}
        </h3>
        <p className="font-body text-sm text-earth-600">{experience.company}</p>

        {/* Narrative */}
        <p className="mt-3 font-body text-sm leading-relaxed text-earth-600 md:text-base">
          {experience.narrative}
        </p>

        {/* Highlights */}
        <ul
          className={`
            mt-4 space-y-2
            ${isEven ? "md:ml-auto md:text-left" : ""}
          `}
        >
          {experience.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
              className="flex items-start gap-2 text-sm text-earth-500"
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

      {/* Timeline container — vertical line + entries */}
      <div className="relative mx-auto max-w-4xl">
        {/* Vertical thread — hidden on mobile, visible on md+ */}
        <div
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-sky-200/0 via-sky-200/60 to-sky-200/0 md:block"
          aria-hidden="true"
        />

        {/* Timeline dots at entry positions — md only */}
        {experiences.map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-sky-200 bg-white md:block"
            style={{
              top: `${(i / experiences.length) * 100 + 100 / (experiences.length * 2)}%`,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Entries */}
        <div className="flex flex-col gap-8 md:gap-12">
          {experiences.map((exp, index) => (
            <TimelineEntry key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
