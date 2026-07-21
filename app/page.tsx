import { ArrowDownRight, ArrowRight, ArrowUpRight, Award, CalendarClock, Cpu, FileText, Gauge, Network, ShieldCheck } from 'lucide-react';
import { getPeople, getProjects, getWritings, getCertifications } from '@/lib/data';
import { TransitionLink } from '@/components/route-transition';
import { NetworkScene } from '@/components/network-scene';
import { PortraitFrame } from '@/components/portrait-frame';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { ProjectCard } from '@/components/project-card';
import { externalLinkProps, formatDate, statusTone } from '@/lib/utils';

export default async function HomePage() {
  const [person, projects, writings, certifications] = await Promise.all([
    getPeople(), getProjects(), getWritings(), getCertifications(),
  ]);
  const featured = projects.slice(0, 3);
  const featuredWritings = writings.slice(0, 3);
  const featuredCerts = certifications.filter(c => c.status !== 'Expired').slice(0, 3);

  return (
    <>
      <section className="hero">
        <NetworkScene />
        <div className="hero__telemetry hero__telemetry--left" aria-hidden="true">
          <span>LAT 06.9175 S</span><span>LON 107.6191 E</span><span>ZONE / ID-DPK</span>
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

      {/* ── Writings Preview ──────────────────────────────────── */}
      <section className="section section--ruled container">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="TECHNICAL WRITINGS"
            title="Notes from inside the system."
          />
        </Reveal>
        <div className="writing-list home-writing-list">
          {featuredWritings.map((writing, index) => {
            const content = (
              <>
                <div className="writing-row__index">0{index + 1}</div>
                <div className="writing-row__main">
                  <div className="writing-row__meta">
                    <span className={statusTone(writing.status)}>{writing.status}</span>
                    <time dateTime={writing.dateCreate}>{formatDate(writing.dateCreate, { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                  </div>
                  <h3 className="writing-preview__title">{writing.name}</h3>
                  <p>{writing.shortDescription}</p>
                </div>
                <div className="writing-row__action">
                  {writing.urlFile ? <ArrowUpRight aria-hidden="true" /> : <FileText aria-hidden="true" />}
                  <span>{writing.urlFile ? 'Read article' : 'Draft record'}</span>
                </div>
              </>
            );
            return (
              <Reveal key={writing.id}>
                {writing.urlFile ? (
                  <a className="writing-row" href={writing.urlFile} {...externalLinkProps(writing.urlFile)}>{content}</a>
                ) : (
                  <article className="writing-row writing-row--disabled">{content}</article>
                )}
              </Reveal>
            );
          })}
        </div>
        <Reveal className="section-link-row">
          <TransitionLink href="/writings" className="text-link">Read all articles <ArrowRight size={16} /></TransitionLink>
        </Reveal>
      </section>

      {/* ── Certifications Preview ────────────────────────────── */}
      <section className="section section--ruled container">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="CREDENTIALS"
            title="Validated knowledge on the record."
          />
        </Reveal>
        <div className="cert-preview-grid">
          {featuredCerts.map((cert, index) => (
            <Reveal className="cert-card" key={cert.id}>
              <div className="cert-card__visual">
                <div
                  className="cert-card__image"
                  style={{ backgroundImage: `linear-gradient(135deg, rgba(8,11,13,.22), rgba(8,11,13,.76)), url(${cert.pictureUrl})` }}
                  role="img"
                  aria-label={`${cert.name} credential image`}
                />
                <span>0{index + 1}</span>
                <Award aria-hidden="true" />
              </div>
              <div className="cert-card__body">
                <span className={statusTone(cert.status)}>{cert.status}</span>
                <h3 className="cert-preview__title">{cert.name}</h3>
                <p>{cert.issuer}</p>
                <div><CalendarClock size={14} /> Expires {formatDate(cert.expirationDate, { month: 'long', year: 'numeric' })}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="section-link-row">
          <TransitionLink href="/certifications" className="text-link">View all credentials <ArrowRight size={16} /></TransitionLink>
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
