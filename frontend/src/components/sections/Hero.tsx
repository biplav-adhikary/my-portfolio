import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useTheme } from "../../context/ThemeContext";
import Cloud from "./hero/Cloud";
import DandelionSeed from "./hero/DandelionSeed";
import { FarHills, MidHills, NearGround } from "./hero/Landscape";
import ProgressiveImage from "../shared/ProgressiveImage";
import heroCloudsSrc from "../../assets/optimized/hero_cloud_shapes.webp";
import heroCloudsDarkSrc from "../../assets/optimized/hero_cloud_shapes_dark.webp";
import heroLandscapeSrc from "../../assets/optimized/hero_landscape.webp";
import heroLandscapeDarkSrc from "../../assets/optimized/hero_landscape_dark.webp";
import heroDividerSrc from "../../assets/optimized/hero_to_about_transition_divider.webp";
import heroDividerDarkSrc from "../../assets/optimized/hero_to_about_transition_divider_dark.webp";
import { lqip } from "../../assets/optimized/lqip";

/* ------------------------------------------------------------------ */
/*  Scroll-to helper (smooth, ~700ms feel via native behavior)        */
/* ------------------------------------------------------------------ */
function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ------------------------------------------------------------------ */
/*  Stagger variants                                                  */
/* ------------------------------------------------------------------ */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.22 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const sectionRef = useActiveSection("hero");
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /* --- scroll-linked transforms ----------------------------------- */
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"],
  });

  // Parallax speeds per spec: far 0.3x opposite, near 0.6x same, text 1x
  const farHillY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const midHillY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const nearGroundY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const cloudLayerY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  /* --- scroll indicator: fade out once user scrolls --------------- */
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Show scroll indicator after load stagger completes (~1.4s)
  useEffect(() => {
    const t = setTimeout(() => setShowScrollHint(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 40) setScrolled(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      ref={(node) => {
        // Merge refs: one for IO (useActiveSection), one for parallax
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current =
          node;
        (parallaxRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node as HTMLDivElement | null;
      }}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ---- Sky gradient background ---- */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-50 to-cloud-100 dark:from-[#0c1222] dark:via-[#0f172a] dark:to-[#131c31]"
        aria-hidden="true"
      />

      {/* ---- Cloud layer (parallax: drifts up on scroll) ---- */}
      <motion.div
        className="absolute inset-0"
        style={{ y: cloudLayerY }}
        aria-hidden="true"
      >
        {/* Painted cloud texture — atmospheric depth behind CSS clouds */}
        <div
          className="absolute inset-x-0 top-[2%] h-[70%]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 55%, transparent 100%)",
          }}
        >
          <ProgressiveImage
            src={isDark ? heroCloudsDarkSrc : heroCloudsSrc}
            lqip={isDark ? lqip.hero_cloud_shapes_dark : lqip.hero_cloud_shapes}
            alt=""
            decorative
            loading="eager"
            className={`h-full w-full ${isDark ? "opacity-35" : "opacity-50"}`}
            imgClassName="object-cover object-center"
          />
        </div>

        {/* CSS clouds at different positions & sizes with ambient animation */}
        <Cloud className="left-[4%] top-[12%] animate-float-slow" size="lg" />
        <Cloud className="right-[8%] top-[8%] animate-float-slower" size="md" />
        <Cloud className="left-[38%] top-[6%] animate-float-slow" size="sm" />
        <Cloud
          className="right-[28%] top-[18%] animate-float-slower"
          size="lg"
        />
        <Cloud className="left-[18%] top-[22%] animate-float-slow" size="sm" />
        <Cloud
          className="right-[55%] top-[4%] animate-float-slower"
          size="md"
        />
      </motion.div>

      {/* ---- Dandelion seeds (ambient float, CSS keyframes) ---- */}
      <div className="absolute inset-0" aria-hidden="true">
        <DandelionSeed className="left-[22%] top-[55%] animate-seed-1" />
        <DandelionSeed className="left-[45%] top-[60%] animate-seed-2" />
        <DandelionSeed className="left-[68%] top-[52%] animate-seed-3" />
        <DandelionSeed className="left-[35%] top-[65%] animate-seed-4" />
        <DandelionSeed className="left-[80%] top-[58%] animate-seed-5" />
      </div>

      {/* ---- Landscape layers (parallax: move at different speeds) ---- */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        {/* Painted landscape texture — depth behind SVG silhouettes */}
        <motion.div
          className="absolute bottom-0 w-full"
          style={{ y: farHillY }}
        >
          <div
            className="h-[55vh] w-full"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)",
            }}
          >
            <ProgressiveImage
              src={isDark ? heroLandscapeDarkSrc : heroLandscapeSrc}
              lqip={isDark ? lqip.hero_landscape_dark : lqip.hero_landscape}
              alt=""
              decorative
              loading="eager"
              className="h-full w-full opacity-40"
              imgClassName="object-cover object-bottom"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-16 w-full"
          style={{ y: farHillY }}
        >
          <FarHills />
        </motion.div>
        <motion.div
          className="absolute bottom-0 w-full"
          style={{ y: midHillY }}
        >
          <MidHills />
        </motion.div>
        <motion.div
          className="absolute -bottom-1 w-full"
          style={{ y: nearGroundY }}
        >
          <NearGround />
        </motion.div>
      </div>

      {/* ---- Main content (staggered entrance, fades on scroll) ---- */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        style={{
          y: textY,
          opacity: textOpacity,
          textShadow: isDark
            ? "0 1px 8px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0,0.4)"
            : undefined,
        }}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.span className="text-accent-label mb-3 block" variants={fadeUp}>
          hello, I'm
        </motion.span>

        <motion.h1 className="heading-primary mb-5" variants={fadeUp}>
          Biplav
        </motion.h1>

        <motion.p
          className="text-body-lg mx-auto max-w-xl md:text-xl"
          variants={fadeUp}
        >
          Software engineer who thinks in systems.{" "}
          <span className="text-earth-500 dark:text-cloud-200">
            Frontend is home.
          </span>
        </motion.p>

        <motion.p
          className="mt-2 font-body text-base font-light text-earth-500 dark:text-cloud-200/80"
          variants={fadeUp}
        >
          Building things that connect — platforms, people, ideas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          variants={fadeUp}
        >
          <a
            href="#projects"
            onClick={(e) => scrollTo(e, "#projects")}
            className="rounded-full bg-earth-700 px-7 py-3 text-sm font-medium text-white shadow-md shadow-earth-700/20 transition-all duration-quick hover:bg-earth-800 hover:shadow-lg hover:shadow-earth-800/25 dark:bg-sunset-400 dark:text-night-900 dark:shadow-sunset-400/20 dark:hover:bg-sunset-300 dark:hover:shadow-sunset-300/25"
          >
            See my work
          </a>
          <a
            href="#about"
            onClick={(e) => scrollTo(e, "#about")}
            className="rounded-full border border-earth-400/30 bg-white/60 px-7 py-3 text-sm font-medium text-earth-600 backdrop-blur-sm transition-all duration-quick hover:border-earth-400/50 hover:bg-white/80 hover:shadow-md dark:border-cloud-100/20 dark:bg-white/5 dark:text-cloud-200 dark:hover:border-cloud-100/40 dark:hover:bg-white/10"
          >
            About me
          </a>
        </motion.div>
      </motion.div>

      {/* ---- Scroll invitation (appears after stagger, fades on scroll) ---- */}
      {showScrollHint && !scrolled && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-earth-400/70 dark:text-cloud-200/40"
              aria-hidden="true"
            >
              <path d="M7 10l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* ---- Hero → About transition divider ---- */}
      <div
        className="absolute -bottom-2 left-0 right-0 z-20 h-[160px] md:h-[220px]"
        aria-hidden="true"
      >
        {/* Painted grass texture — theme-specific */}
        <ProgressiveImage
          src={isDark ? heroDividerDarkSrc : heroDividerSrc}
          lqip={isDark ? lqip.hero_to_about_transition_divider_dark : lqip.hero_to_about_transition_divider}
          alt=""
          decorative
          className="h-full w-full opacity-50"
          imgClassName="object-cover object-[center_65%]"
        />
        {/* Light: gradient fades over painted image */}
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-cloud-100 via-cloud-100/40 to-transparent dark:from-transparent dark:via-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent via-sky-50/60 to-sky-50 dark:via-transparent dark:to-transparent" />
        {/* Dark: top edge fades into hero sky */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#131c31] to-transparent hidden dark:block" />
        {/* Dark: bottom edge fades into about section */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#0f172a] hidden dark:block" />
      </div>
    </section>
  );
}
