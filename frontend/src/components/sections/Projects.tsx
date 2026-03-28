import SectionWrapper from "../shared/SectionWrapper";
import SectionHeading from "../shared/SectionHeading";
import ProjectCard from "../shared/ProjectCard";
import { projects } from "../../data/content";
import { useExpandable } from "../../hooks/useExpandable";

/**
 * Projects section — expandable narrative story cards.
 * "Story over showcase" — each project unfolds like opening a letter.
 */
export default function Projects() {
  const { toggle, isExpanded } = useExpandable();

  return (
    <SectionWrapper id="projects" scene="cloudGlass">
      <SectionHeading
        accentLabel="a few stories"
        heading="Projects"
        subtitle="Things I've built and the problems behind them."
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isExpanded={isExpanded(project.id)}
            onToggle={() => toggle(project.id)}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
