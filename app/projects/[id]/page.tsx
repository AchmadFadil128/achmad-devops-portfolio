import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CalendarDays } from 'lucide-react';
import { getProjectById, getProjects } from '@/lib/data';
import { formatDate, externalLinkProps, statusTone } from '@/lib/utils';
import { TransitionLink } from '@/components/route-transition';
import { Reveal } from '@/components/reveal';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.name,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <article className="project-detail">
      <header className="project-detail__hero container">
        <TransitionLink href="/projects" className="back-link"><ArrowLeft size={15} /> Project index</TransitionLink>
        <div className="project-detail__meta">
          <span className={statusTone(project.status)}>{project.status}</span>
          <span><CalendarDays size={14} /> {formatDate(project.dateCreate, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <h1>{project.name}</h1>
        <p>{project.shortDescription}</p>
        <div className="tag-list tag-list--large">
          {project.techStack.map((tech) => <span key={tech}>{tech}</span>)}
        </div>
      </header>

      <div className="container project-detail__cover">
        <div
          className="project-detail__image"
          style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(5,9,11,.62)), url(${project.pictureUrl})` }}
          role="img"
          aria-label={`${project.name} cover image`}
        />
        <span>PROJECT / {project.id.toUpperCase()}</span>
      </div>

      <section className="section container project-detail__body">
        <aside>
          <span>RECORD ID</span><b>{project.id}</b>
          <span>CREATED</span><b>{formatDate(project.dateCreate, { month: 'long', day: 'numeric', year: 'numeric' })}</b>
          <span>STATE</span><b>{project.status}</b>
          {project.exturlproject ? (
            <a className="button button--primary" href={project.exturlproject} {...externalLinkProps(project.exturlproject)}>
              Open project <ArrowUpRight size={16} />
            </a>
          ) : <small>External deployment not published.</small>}
        </aside>
        <Reveal className="prose">
          {project.longDescription.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
      </section>

      {project.otherPictures.length ? (
        <section className="section container project-gallery">
          <p className="eyebrow">SUPPORTING VISUALS / {String(project.otherPictures.length).padStart(2, '0')}</p>
          {project.otherPictures.map((picture, index) => (
            <Reveal className="project-gallery__item" key={picture}>
              <div
                style={{ backgroundImage: `linear-gradient(135deg, rgba(5,9,11,.04), rgba(5,9,11,.45)), url(${picture})` }}
                role="img"
                aria-label={`${project.name} supporting image ${index + 1}`}
              />
              <span>FRAME / 0{index + 1}</span>
            </Reveal>
          ))}
        </section>
      ) : null}
    </article>
  );
}
