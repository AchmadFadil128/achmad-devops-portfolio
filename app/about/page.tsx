import type { Metadata } from 'next';
import { ArrowUpRight, BookOpen, BriefcaseBusiness, MapPin } from 'lucide-react';
import { getPeople } from '@/lib/data';
import { PageIntro } from '@/components/page-intro';
import { PortraitFrame } from '@/components/portrait-frame';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Background, experience, education, and engineering skills of Achmad Fadil.',
};

export default async function AboutPage() {
  const person = await getPeople();

  return (
    <>
      <PageIntro
        code="ROUTE / PROFILE"
        title="Engineer in progress. Operator by mindset."
        description="A closer look at the person behind the clusters, dashboards, deployment pipelines, and late-night terminal sessions."
      />

      <section className="section container profile-grid">
        <Reveal className="profile-grid__portrait"><PortraitFrame compact /></Reveal>
        <Reveal className="profile-grid__copy">
          <p className="eyebrow">ABOUT / {person.name.toUpperCase()}</p>
          <h2>Building a strong foundation in cloud infrastructure.</h2>
          <p>{person.description}</p>
          <p>
            I am developing hands-on experience with enterprise cloud operations, Kubernetes, monitoring, virtualization, and high-availability systems. I focus on understanding how infrastructure behaves in real environments, not only how it looks in diagrams.
          </p>
          <div className="profile-facts">
            <div><MapPin aria-hidden="true" /><span>Based in Indonesia</span></div>
            <div><BriefcaseBusiness aria-hidden="true" /><span>{person.workingAt}</span></div>
            <div><BookOpen aria-hidden="true" /><span>Preparing for CKA</span></div>
          </div>
          <a className="text-link" href={person.contact.linkedin} target="_blank" rel="noreferrer">
            Open LinkedIn profile <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </section>

      <section className="section section--ruled container">
        <Reveal><SectionHeading index="01" eyebrow="CAREER PATH" title="Learning through production environments." /></Reveal>
        <div className="timeline">
          {person.carrierPath.map((entry, index) => (
            <Reveal className="timeline__item" key={`${entry.company}-${entry.period}`}>
              <span className="timeline__index">0{index + 1}</span>
              <div className="timeline__period">{entry.period}</div>
              <div className="timeline__main">
                <h3>{entry.role}</h3>
                <b>{entry.company}</b>
                <p>{entry.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container skill-section">
        <Reveal><SectionHeading index="02" eyebrow="CAPABILITY MATRIX" title="Tools I use to reason about infrastructure." /></Reveal>
        <div className="skill-cloud">
          {person.skills.map((skill, index) => (
            <span key={skill}><i>{String(index + 1).padStart(2, '0')}</i>{skill}</span>
          ))}
        </div>
      </section>

      <section className="section section--ruled container two-column-info">
        <Reveal>
          <p className="eyebrow">EDUCATION</p>
          {person.education.map((item) => (
            <article className="info-card" key={item.institution}>
              <span>{item.year}</span>
              <h3>{item.degree}</h3>
              <p>{item.field}</p>
              <b>{item.institution}</b>
            </article>
          ))}
        </Reveal>
        <Reveal>
          <p className="eyebrow">OFF-SCREEN SIGNALS</p>
          <div className="hobby-list">
            {person.hobbies.map((hobby, index) => <div key={hobby}><span>0{index + 1}</span>{hobby}</div>)}
          </div>
        </Reveal>
      </section>
    </>
  );
}
