import { useEffect, useRef } from "react";
import { useActiveSectionContext } from "../context/ActiveSectionContext";

/**
 * Registers a section element with the Intersection Observer for active section tracking.
 * Attach the returned ref to the section's root element (SectionWrapper).
 */
export function useActiveSection(sectionId: string) {
  const ref = useRef<HTMLElement>(null);
  const { setActiveSection } = useActiveSectionContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId, setActiveSection]);

  return ref;
}
