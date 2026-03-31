import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import SectionHeading from "../shared/SectionHeading";
import ProgressiveImage from "../shared/ProgressiveImage";
import { about } from "../../data/content";
import natureMotifSrc from "../../assets/optimized/about_section_nature_motif.webp";
import { lqip } from "../../assets/optimized/lqip";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: "easeOut" },
  }),
};

/**
 * About section — the human bridge between the atmospheric hero
 * and the concrete work below.
 *
 * Structure:
 *   1. Intro paragraph (statement of intent)
 *   2. "How I Think" values list
 *   3. "Beyond Code" personal note
 */
export default function About() {
  const valuesRef = useRef<HTMLUListElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  const beyondRef = useRef<HTMLDivElement>(null);
  const beyondInView = useInView(beyondRef, { once: true, amount: 0.3 });

  return (
    <SectionWrapper id="about" scene="warmNeutral">
      <SectionHeading accentLabel="a little context" heading="About Me" />

      <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        {/* ---- Left column: intro + values ---- */}
        <div>
          {/* Intro paragraph */}
          <motion.p
            className="max-w-prose font-body text-base leading-[1.8] text-earth-600 md:text-lg dark:text-earth-400"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {about.intro}
          </motion.p>

          {/* How I Think */}
          <div className="mt-14">
            <span className="mb-5 block font-accent text-lg text-sunset-400">
              how I think
            </span>

            <ul ref={valuesRef} className="space-y-4">
              {about.values.map((v, i) => (
                <motion.li
                  key={v.short}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={valuesInView ? "visible" : "hidden"}
                  className="flex items-start gap-3"
                >
                  {/* Small accent dot */}
                  <span
                    className="mt-[7px] block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-grass-300"
                    aria-hidden="true"
                  />
                  <p className="font-body text-sm leading-relaxed text-earth-600 md:text-base dark:text-earth-400">
                    <span className="font-medium text-earth-700 dark:text-cloud-100">
                      {v.short}
                    </span>{" "}
                    — {v.detail}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Right column: "Beyond Code" note ---- */}
        {about.beyondCode && (
          <motion.div
            ref={beyondRef}
            initial={{ opacity: 0, y: 20 }}
            animate={beyondInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative self-start lg:mt-8"
          >
            {/* Botanical nature motif — decorative background behind the card */}
            <ProgressiveImage
              src={natureMotifSrc}
              lqip={lqip.about_section_nature_motif}
              alt=""
              decorative
              className="pointer-events-none absolute -right-6 -top-16 hidden h-[480px] w-[320px] opacity-[0.72] dark:opacity-[0.35] lg:block"
              imgClassName="object-cover object-[center_30%]"
            />

            <div className="ghibli-card relative">
              {/* Decorative accent bar */}
              <span
                className="absolute -left-px top-6 h-12 w-[3px] rounded-full bg-sunset-200"
                aria-hidden="true"
              />

              <span className="mb-3 block font-accent text-lg text-[var(--text-accent)] dark:text-sunset-400">
                beyond code
              </span>
              <p className="font-body text-sm leading-[1.8] text-earth-700 md:text-base dark:text-earth-400">
                {about.beyondCode}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
