import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/data';
import { formatDate, statusTone } from '@/lib/utils';
import { TransitionLink } from '@/components/route-transition';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <TransitionLink href={`/projects/${project.id}`} className="project-card">
      <div className="project-card__visual">
        <div
          className="project-card__image"
          style={{ backgroundImage: `linear-gradient(135deg, rgba(5,10,12,.08), rgba(5,10,12,.72)), url(${project.pictureUrl})` }}
          aria-label={`${project.name} project preview`}
          role="img"
        />
        <span className="project-card__number">0{index + 1}</span>
        <ArrowUpRight className="project-card__arrow" aria-hidden="true" />
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className={statusTone(project.status)}>{project.status}</span>
          <time dateTime={project.dateCreate}>{formatDate(project.dateCreate)}</time>
        </div>
        <h3>{project.name}</h3>
        <p>{project.shortDescription}</p>
        <div className="tag-list">
          {project.techStack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
        </div>
      </div>
    </TransitionLink>
  );
}
