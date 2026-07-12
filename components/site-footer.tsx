import { ArrowUpRight } from 'lucide-react';
import { getPeople } from '@/lib/data';
import { TransitionLink } from '@/components/route-transition';

export async function SiteFooter() {
  const person = await getPeople();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <p className="eyebrow">READY FOR THE NEXT DEPLOYMENT</p>
        <a className="footer-cta" href={`mailto:${person.contact.email}`}>
          Let&apos;s build reliable systems
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="site-footer__bottom">
        <span>© {year} {person.name}</span>
        <div>
          <a href={person.contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={person.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={person.contact.twitter} target="_blank" rel="noreferrer">X / Twitter</a>
        </div>
        <TransitionLink href="/">Back to index ↑</TransitionLink>
      </div>
    </footer>
  );
}
