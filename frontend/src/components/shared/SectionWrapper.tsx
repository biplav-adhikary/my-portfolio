import { type ReactNode } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import SceneBackground from "./SceneBackground";

export type SceneTone =
  | "sky"
  | "warmNeutral"
  | "cloudGlass"
  | "earth"
  | "openAir"
  | "sunset";

interface SectionWrapperProps {
  id: string;
  scene?: SceneTone;
  children: ReactNode;
  className?: string;
  /** If true, the section uses full viewport height instead of content-based height */
  fullHeight?: boolean;
}

/**
 * Consistent section container. Provides max-width containment, padding,
 * vertical rhythm, section ID for scroll-to targeting, and registers
 * with the active section observer.
 */
export default function SectionWrapper({
  id,
  scene = "sky",
  children,
  className = "",
  fullHeight = false,
}: SectionWrapperProps) {
  const ref = useActiveSection(id);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${fullHeight ? "min-h-screen" : ""} ${className}`}
    >
      <SceneBackground scene={scene} />
      <div className={`relative ${fullHeight ? "" : "section-container"}`}>
        {children}
      </div>
    </section>
  );
}
