import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import { contact } from "../../data/content";

/* ------------------------------------------------------------------ */
/*  Simple inline SVG icons                                            */
/* ------------------------------------------------------------------ */
const icons: Record<string, React.ReactNode> = {
  email: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Contact section                                                    */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <SectionWrapper id="contact" scene="sunset">
      <div ref={ref} className="mx-auto max-w-2xl text-center">
        {/* Accent label */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent-label mb-4 inline-block"
        >
          say hello
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="heading-primary text-earth-800 dark:text-cloud-50"
        >
          {contact.headline}
        </motion.h2>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-body text-base leading-relaxed text-earth-600 md:text-lg dark:text-earth-400"
        >
          {contact.subline}
        </motion.p>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.icon === "email" ? undefined : "_blank"}
              rel={link.icon === "email" ? undefined : "noopener noreferrer"}
              className="
                group flex items-center gap-2.5
                rounded-full border border-sunset-200/60 bg-white/40
                px-6 py-3 text-sm font-medium text-earth-600
                shadow-sm shadow-sunset-100/30 backdrop-blur-sm
                transition-all duration-smooth
                hover:border-sunset-300 hover:bg-sunset-100/50
                hover:text-sunset-400 hover:shadow-md hover:shadow-sunset-100/50
                active:scale-[0.97]
                dark:border-sunset-400/20 dark:bg-white/[0.04] dark:text-earth-400
                dark:shadow-black/10
                dark:hover:border-sunset-400/40 dark:hover:bg-sunset-400/10
                dark:hover:text-sunset-300 dark:hover:shadow-sunset-900/20
              "
            >
              <span className="text-earth-400 transition-colors duration-smooth group-hover:text-sunset-400 dark:text-earth-500 dark:group-hover:text-sunset-300">
                {icons[link.icon]}
              </span>
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
