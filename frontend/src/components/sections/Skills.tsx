import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import SectionHeading from "../shared/SectionHeading";
import { skillGroups, type Skill } from "../../data/content";

/* ------------------------------------------------------------------ */
/*  Skill pill — hover/tap reveals context                             */
/* ------------------------------------------------------------------ */
function SkillPill({
  skill,
  isGroupActive,
  onInteract,
  isActive,
}: {
  skill: Skill;
  isGroupActive: boolean;
  onInteract: () => void;
  isActive: boolean;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onInteract}
        onMouseEnter={onInteract}
        className={`
          rounded-full border px-4 py-2 text-sm font-medium
          transition-all duration-300
          ${
            isActive
              ? "border-sunset-200 bg-sunset-100/80 text-sunset-400 shadow-md shadow-sunset-100/40"
              : isGroupActive
                ? "border-sky-200 bg-white/60 text-earth-600 backdrop-blur-sm"
                : "border-sky-100/60 bg-white/30 text-earth-400 backdrop-blur-sm"
          }
        `}
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
            className="absolute left-0 right-0 top-full z-10 mt-2 w-max max-w-[16rem] rounded-lg bg-white/90 px-3 py-2 text-xs leading-relaxed text-earth-600 shadow-lg shadow-sky-100/30 backdrop-blur-md md:max-w-xs"
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
  onSkillInteract,
  isFocusedGroup,
  hasAnyFocus,
  index,
}: {
  group: (typeof skillGroups)[number];
  activeSkill: string | null;
  onSkillInteract: (skillName: string, groupId: string) => void;
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
      className={`
        transition-opacity duration-300
        ${hasAnyFocus && !isFocusedGroup ? "opacity-60" : "opacity-100"}
      `}
    >
      {/* Group label */}
      <h3
        className={`
          mb-3 font-accent text-sm transition-colors duration-300
          ${isFocusedGroup ? "text-sunset-400" : "text-earth-400"}
        `}
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
            onInteract={() => onSkillInteract(skill.name, group.id)}
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

  const handleSkillInteract = (skillName: string, groupId: string) => {
    if (activeSkill === skillName) {
      // Second tap dismisses
      setActiveSkill(null);
      setActiveGroup(null);
    } else {
      setActiveSkill(skillName);
      setActiveGroup(groupId);
    }
  };

  const handleBackgroundClick = () => {
    setActiveSkill(null);
    setActiveGroup(null);
  };

  return (
    <SectionWrapper id="skills" scene="openAir">
      <SectionHeading
        accentLabel="what I work with"
        heading="Skills"
        subtitle="Not a checklist — more like a toolkit."
      />

      {/* Clusters grid */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        onClick={handleBackgroundClick}
        className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group, index) => (
          <SkillCluster
            key={group.id}
            group={group}
            activeSkill={activeSkill}
            onSkillInteract={handleSkillInteract}
            isFocusedGroup={activeGroup === group.id}
            hasAnyFocus={activeGroup !== null}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
