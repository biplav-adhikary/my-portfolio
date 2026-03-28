import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useActiveSection } from "../../hooks/useActiveSection";
import Cloud from "./hero/Cloud";
import DandelionSeed from "./hero/DandelionSeed";
import { FarHills, MidHills, NearGround } from "./hero/Landscape";
import ProgressiveImage from "../shared/ProgressiveImage";
import heroCloudsSrc from "../../assets/optimized/hero_cloud_shapes.webp";
import heroLandscapeSrc from "../../assets/optimized/hero_landscape.webp";
import heroDividerSrc from "../../assets/optimized/hero_to_about_transition_divider.webp";
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
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const sectionRef = useActiveSection("hero");
  const parallaxRef = useRef<HTMLDivElement>(null);

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
        className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-50 to-cloud-100"
        aria-hidden="true"
      />

      {/* ---- Cloud layer (parallax: drifts up on scroll) ---- */}
      <motion.div
        className="absolute inset-0"
        style={{ y: cloudLayerY }}
        aria-hidden="true"
      >
        {/* Painted cloud texture — atmospheric depth behind CSS clouds */}
        <ProgressiveImage
          src={heroCloudsSrc}
          lqip={lqip.hero_cloud_shapes}
          alt=""
          decorative
          loading="eager"
          className="absolute inset-x-0 top-[5%] h-[70%] opacity-50"
          imgClassName="object-cover object-center"
        />

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
          <ProgressiveImage
            src={heroLandscapeSrc}
            lqip={lqip.hero_landscape}
            alt=""
            decorative
            loading="eager"
            className="h-[50vh] w-full opacity-40"
            imgClassName="object-cover object-bottom"
          />
          {/* Gradient mask: gently fade the top edge into the sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-transparent to-transparent" />
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
        style={{ y: textY, opacity: textOpacity }}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.span
          className="mb-3 block font-accent text-xl text-sunset-400 md:text-2xl"
          variants={fadeUp}
        >
          hello, I'm
        </motion.span>

        <motion.h1 className="heading-primary mb-5" variants={fadeUp}>
          Biplav
        </motion.h1>

        <motion.p
          className="mx-auto max-w-xl font-body text-lg font-light leading-relaxed text-earth-600 md:text-xl"
          variants={fadeUp}
        >
          Software engineer who thinks in systems.{" "}
          <span className="text-earth-500">Frontend is home.</span>
        </motion.p>

        <motion.p
          className="mt-2 font-body text-base font-light text-earth-500"
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
            className="rounded-full bg-earth-700 px-7 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-earth-800 hover:shadow-lg"
          >
            See my work
          </a>
          <a
            href="#about"
            onClick={(e) => scrollTo(e, "#about")}
            className="rounded-full border border-earth-300 bg-white/60 px-7 py-3 text-sm font-medium text-earth-600 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md"
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
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2.2,
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
              className="text-earth-400/70"
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
        <ProgressiveImage
          src={heroDividerSrc}
          lqip={lqip.hero_to_about_transition_divider}
          alt=""
          decorative
          className="h-full w-full opacity-70"
          imgClassName="object-cover object-[center_65%]"
        />
        {/* Top fade into the Hero section */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-cloud-100/60 to-transparent" />
        {/* Bottom fade into the About section's background */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-sky-50" />
      </div>
    </section>
  );
}
