import type { Metadata } from 'next';
import { getProjects } from '@/lib/data';
import { PageIntro } from '@/components/page-intro';
import { ProjectExplorer } from '@/components/project-explorer';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected cloud, infrastructure, backend, and platform engineering projects.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageIntro
        code={`ROUTE / PROJECTS / ${String(projects.length).padStart(2, '0')} RECORDS`}
        title="Deployment records and systems experiments."
        description="A working archive of infrastructure, backend, automation, and platform projects. Filter by operational state."
      />
      <section className="section container">
        <ProjectExplorer projects={projects} />
      </section>
    </>
  );
}
