import type { Metadata } from 'next';
import { Award, CalendarClock } from 'lucide-react';
import { getCertifications } from '@/lib/data';
import { PageIntro } from '@/components/page-intro';
import { Reveal } from '@/components/reveal';
import { formatDate, statusTone } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Cloud, Kubernetes, infrastructure, and software engineering certifications.',
};

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <>
      <PageIntro
        code={`ROUTE / CREDENTIALS / ${String(certifications.length).padStart(2, '0')} RECORDS`}
        title="Credentials that validate the operating knowledge."
        description="A structured view of active, near-expiry, and historical certifications across cloud and platform engineering."
      />
      <section className="section container certification-grid">
        {certifications.map((certification, index) => (
          <Reveal className="cert-card" key={certification.id}>
            <div className="cert-card__visual">
              <div
                className="cert-card__image"
                style={{ backgroundImage: `linear-gradient(135deg, rgba(8,11,13,.22), rgba(8,11,13,.76)), url(${certification.pictureUrl})` }}
                role="img"
                aria-label={`${certification.name} credential image`}
              />
              <span>0{index + 1}</span>
              <Award aria-hidden="true" />
            </div>
            <div className="cert-card__body">
              <span className={statusTone(certification.status)}>{certification.status}</span>
              <h2>{certification.name}</h2>
              <p>{certification.issuer}</p>
              <div><CalendarClock size={14} /> Expires {formatDate(certification.expirationDate, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
