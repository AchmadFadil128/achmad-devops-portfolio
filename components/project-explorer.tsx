'use client';

import { useMemo, useState } from 'react';
import type { Project, ProjectStatus } from '@/lib/data';
import { ProjectCard } from '@/components/project-card';

const filters: Array<'All' | ProjectStatus> = [
  'All',
  'Completed',
  'In Progress',
  'Planned',
  'On Hold',
];

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>('All');
  const visible = useMemo(
    () => active === 'All' ? projects : projects.filter((project) => project.status === active),
    [active, projects],
  );

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter projects by status">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={active === filter ? 'filter-chip is-active' : 'filter-chip'}
            onClick={() => setActive(filter)}
          >
            {filter}
            <span>
              {filter === 'All' ? projects.length : projects.filter((project) => project.status === filter).length}
            </span>
          </button>
        ))}
      </div>
      <div className="project-grid project-grid--listing">
        {visible.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
    </>
  );
}
