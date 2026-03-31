import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useActiveSectionContext } from "../../context/ActiveSectionContext";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/*  Theme toggle — sun/moon icon with gentle rotation + fade           */
/* ------------------------------------------------------------------ */
function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-earth-200/70 bg-white/70 text-earth-600 shadow-sm backdrop-blur-sm transition-all duration-quick hover:border-earth-300 hover:bg-white hover:text-earth-800 hover:shadow-md dark:border-night-700/60 dark:bg-night-800/70 dark:text-cloud-100 dark:hover:border-night-700 dark:hover:bg-night-800 dark:hover:text-sunset-300"
    >
      {/* Sun icon */}
      <motion.svg
        key="sun"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          opacity: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : -90,
          scale: theme === "light" ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </motion.svg>

      {/* Moon icon */}
      <motion.svg
        key="moon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 90,
          scale: theme === "dark" ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </motion.svg>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeSection } = useActiveSectionContext();
  const { theme, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    [],
  );

  return (
    <motion.nav
      className={clsx(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-entrance",
        scrolled
          ? "bg-white/80 shadow-sm shadow-sky-100/50 backdrop-blur-md dark:bg-night-900/80 dark:shadow-night-900/50"
          : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="font-display text-xl font-semibold text-earth-800 transition-colors hover:text-earth-600 dark:text-cloud-50 dark:hover:text-cloud-200"
        >
          B<span className="font-accent text-sunset-400">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={clsx(
                    "relative text-sm font-medium transition-colors duration-instant",
                    isActive
                      ? "text-earth-800 dark:text-cloud-50"
                      : "text-earth-700 hover:text-earth-900 dark:text-earth-400 dark:hover:text-cloud-100",
                  )}
                >
                  {link.label}
                  {/* Active indicator — subtle underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-sunset-300"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </li>
            );
          })}

          {/* Theme toggle — desktop */}
          <li>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-0.5 w-6 bg-earth-600 dark:bg-cloud-200"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-earth-600 dark:bg-cloud-200"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-earth-600 dark:bg-cloud-200"
              animate={
                mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="border-t border-sky-100 bg-white/95 backdrop-blur-md md:hidden dark:border-night-700 dark:bg-night-900/95"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={clsx(
                        "block rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-instant hover:bg-sky-50 dark:hover:bg-night-800",
                        isActive
                          ? "text-earth-800 bg-sky-50/50 dark:text-cloud-50 dark:bg-night-800/50"
                          : "text-earth-700 hover:text-earth-900 dark:text-earth-400 dark:hover:text-cloud-100",
                      )}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
