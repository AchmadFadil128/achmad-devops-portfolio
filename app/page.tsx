import { ArrowDownRight, ArrowRight, Cpu, Gauge, Network, ShieldCheck } from 'lucide-react';
import { getPeople, getProjects } from '@/lib/data';
import { TransitionLink } from '@/components/route-transition';
import { NetworkScene } from '@/components/network-scene';
import { PortraitFrame } from '@/components/portrait-frame';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { ProjectCard } from '@/components/project-card';

export default async function HomePage() {
  const [person, projects] = await Promise.all([getPeople(), getProjects()]);
  const featured = projects.slice(0, 3);

  return (
    <>
      <section className="hero">
        <NetworkScene />
        <div className="hero__telemetry hero__telemetry--left" aria-hidden="true">
          <span>LAT 06.9175 S</span><span>LON 107.6191 E</span><span>ZONE / ID-JB</span>
        </div>
        <div className="hero__telemetry hero__telemetry--right" aria-hidden="true">
          <span>K8S / READY</span><span>OBS / ACTIVE</span><span>AUTO / ENABLED</span>
        </div>

        <div className="container hero__grid">
          <div className="hero__content">
            <p className="eyebrow"><span className="live-dot" /> DEVOPS / CLOUD / PLATFORM</p>
            <h1>
              I engineer systems
              <span>that stay up.</span>
            </h1>
            <p className="hero__lede">{person.description} Currently working at {person.workingAt}.</p>
            <div className="hero__actions">
              <TransitionLink href="/projects" className="button button--primary">
                Explore deployments <ArrowRight size={17} />
              </TransitionLink>
              <a href={`mailto:${person.contact.email}`} className="button button--ghost">
                Open a channel
              </a>
            </div>
            <div className="hero__console" aria-label="Current engineering status">
              <span>$ systemctl status achmad.service</span>
              <b>● active (running)</b>
              <small>Cloud engineering intern · CKA preparation track</small>
            </div>
          </div>

          <div className="hero__portrait">
            <PortraitFrame />
          </div>
        </div>

        <a href="#capabilities" className="scroll-cue">
          Scroll to inspect <ArrowDownRight size={16} />
        </a>
      </section>

      <section className="signal-strip" aria-label="Technology stack">
        <div className="signal-strip__track">
          {[...person.skills, ...person.skills].map((skill, index) => (
            <span key={`${skill}-${index}`}><i />{skill}</span>
          ))}
        </div>
      </section>

      <section id="capabilities" className="section container">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="SYSTEMS I CARE ABOUT"
            title="Infrastructure with fewer surprises."
            copy="I work across orchestration, observability, networking, and automation. The goal is simple: make systems easier to understand, operate, and recover."
          />
        </Reveal>
        <div className="capability-grid">
          {[
            { icon: Network, code: '01 / ORCH', title: 'Platform orchestration', text: 'Kubernetes and Rancher environments designed around clear deployment paths and predictable operations.' },
            { icon: Gauge, code: '02 / OBS', title: 'Observability systems', text: 'Metrics, dashboards, and telemetry pipelines that surface the signals operators actually need.' },
            { icon: Cpu, code: '03 / AUTO', title: 'Automation layers', text: 'CI/CD, Bash, and infrastructure workflows that remove repetitive work and reduce configuration drift.' },
            { icon: ShieldCheck, code: '04 / REL', title: 'Reliability thinking', text: 'High-availability patterns, reverse proxies, and practical failure handling for services under change.' },
          ].map((item) => (
            <Reveal key={item.code} className="capability-card">
              <div className="capability-card__top"><span>{item.code}</span><item.icon aria-hidden="true" /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--ruled container">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="SELECTED DEPLOYMENTS"
            title="Projects built around systems thinking."
          />
        </Reveal>
        <div className="project-grid">
          {featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
        <Reveal className="section-link-row">
          <TransitionLink href="/projects" className="text-link">View all project records <ArrowRight size={16} /></TransitionLink>
        </Reveal>
      </section>

      <section className="manifesto">
        <div className="container manifesto__inner">
          <Reveal>
            <p className="eyebrow">OPERATING PRINCIPLE / 001</p>
            <blockquote>
              Reliable infrastructure is not invisible. It is observable, documented, and designed for the person on call.
            </blockquote>
          </Reveal>
          <div className="manifesto__metrics">
            <div><strong>{person.skills.length}</strong><span>tools and systems</span></div>
            <div><strong>{projects.length}</strong><span>project records</span></div>
            <div><strong>02</strong><span>internship chapters</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
