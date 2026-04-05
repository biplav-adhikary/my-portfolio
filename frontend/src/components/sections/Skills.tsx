import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import SectionWrapper from "../shared/SectionWrapper";
import SectionHeading from "../shared/SectionHeading";
import { skillGroups, type Skill } from "../../data/content";

/** True when the primary input is touch (no fine pointer). */
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

/* ------------------------------------------------------------------ */
/*  Skill pill — hover/tap reveals context                             */
/* ------------------------------------------------------------------ */
function SkillPill({
  skill,
  isGroupActive,
  onHoverIn,
  onHoverOut,
  onTap,
  isActive,
}: {
  skill: Skill;
  isGroupActive: boolean;
  onHoverIn: () => void;
  onHoverOut: () => void;
  onTap: () => void;
  isActive: boolean;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTap();
        }}
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
        className={clsx(
          "rounded-full border px-4 py-2 text-sm font-medium",
          "transition-all duration-smooth",
          "hover:shadow-sm hover:shadow-sky-200/40 dark:hover:shadow-sky-900/30",
          isActive
            ? "border-sunset-200 bg-sunset-100/80 text-earth-700 shadow-md shadow-sunset-100/40 dark:border-sunset-400/30 dark:bg-sunset-400/15 dark:text-sunset-300 dark:shadow-sunset-900/20"
            : isGroupActive
              ? "border-sky-200 bg-white/60 text-earth-700 hover:border-sky-300 hover:bg-white/80 hover:text-earth-800 backdrop-blur-sm dark:border-sky-400/20 dark:bg-white/[0.06] dark:text-earth-400 dark:hover:border-sky-400/30 dark:hover:bg-white/[0.1] dark:hover:text-earth-300"
              : "border-sky-100/60 bg-white/30 text-earth-600 hover:border-sky-200/80 hover:bg-white/50 hover:text-earth-800 backdrop-blur-sm dark:border-night-700/40 dark:bg-white/[0.03] dark:text-earth-400 dark:hover:border-night-600/60 dark:hover:bg-white/[0.08] dark:hover:text-earth-300",
        )}
      >
        {skill.name}
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full z-10 mt-2 w-max max-w-[16rem] rounded-lg bg-white/90 px-3 py-2 text-xs leading-relaxed text-earth-800 shadow-lg shadow-sky-100/30 backdrop-blur-md md:max-w-xs dark:bg-night-800/90 dark:text-earth-400 dark:shadow-black/30"
          >
            {skill.context}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Skill cluster — one group                                          */
/* ------------------------------------------------------------------ */
function SkillCluster({
  group,
  activeSkill,
  onSkillHoverIn,
  onSkillHoverOut,
  onSkillTap,
  isFocusedGroup,
  hasAnyFocus,
  index,
}: {
  group: (typeof skillGroups)[number];
  activeSkill: string | null;
  onSkillHoverIn: (skillName: string, groupId: string) => void;
  onSkillHoverOut: () => void;
  onSkillTap: (skillName: string, groupId: string) => void;
  isFocusedGroup: boolean;
  hasAnyFocus: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={clsx(
        "transition-opacity duration-smooth",
        hasAnyFocus && !isFocusedGroup ? "opacity-60" : "opacity-100",
      )}
    >
      {/* Group label */}
      <h3
        className={clsx(
          "mb-3 font-accent text-sm transition-colors duration-smooth",
          isFocusedGroup 
            ? "font-semibold text-earth-800 dark:font-semibold dark:text-sunset-300" 
            : "text-earth-600 dark:text-earth-400",
        )}
      >
        {group.label}
      </h3>

      {/* Pills */}
      <div className="flex flex-wrap gap-2.5">
        {group.skills.map((skill) => (
          <SkillPill
            key={skill.name}
            skill={skill}
            isGroupActive={!hasAnyFocus || isFocusedGroup}
            isActive={activeSkill === skill.name}
            onHoverIn={() => onSkillHoverIn(skill.name, group.id)}
            onHoverOut={onSkillHoverOut}
            onTap={() => onSkillTap(skill.name, group.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills section                                                     */
/* ------------------------------------------------------------------ */
export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    setActiveSkill(null);
    setActiveGroup(null);
  }, []);

  /* Desktop: hover-in opens, hover-out closes — skip on touch devices */
  const handleHoverIn = useCallback((skillName: string, groupId: string) => {
    if (isTouchDevice()) return;
    setActiveSkill(skillName);
    setActiveGroup(groupId);
  }, []);

  const handleHoverOut = useCallback(() => {
    if (isTouchDevice()) return;
    dismiss();
  }, [dismiss]);

  /* Mobile: tap toggles, tap-outside closes */
  const handleTap = useCallback(
    (skillName: string, groupId: string) => {
      if (activeSkill === skillName) {
        dismiss();
      } else {
        setActiveSkill(skillName);
        setActiveGroup(groupId);
      }
    },
    [activeSkill, dismiss],
  );

  // Close tooltip when tapping outside the skills section (mobile)
  useEffect(() => {
    if (!activeSkill) return;
    const handleTouchOutside = (e: TouchEvent) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(e.target as Node)
      ) {
        dismiss();
      }
    };
    document.addEventListener("touchstart", handleTouchOutside, {
      passive: true,
    });
    return () => document.removeEventListener("touchstart", handleTouchOutside);
  }, [activeSkill, dismiss]);

  return (
    <SectionWrapper id="skills" scene="openAir">
      <SectionHeading
        accentLabel="what I work with"
        heading="Skills"
        subtitle="Not a checklist, more like a toolkit."
      />

      {/* Clusters grid */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        ref={sectionRef}
        onClick={dismiss}
        className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group, index) => (
          <SkillCluster
            key={group.id}
            group={group}
            activeSkill={activeSkill}
            onSkillHoverIn={handleHoverIn}
            onSkillHoverOut={handleHoverOut}
            onSkillTap={handleTap}
            isFocusedGroup={activeGroup === group.id}
            hasAnyFocus={activeGroup !== null}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
