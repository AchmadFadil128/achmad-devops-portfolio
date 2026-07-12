import type { Metadata } from 'next';
import { ArrowUpRight, FileText } from 'lucide-react';
import { getWritings } from '@/lib/data';
import { PageIntro } from '@/components/page-intro';
import { Reveal } from '@/components/reveal';
import { externalLinkProps, formatDate, statusTone } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Writings',
  description: 'Technical notes and practical articles about backend, cloud, and software systems.',
};

export default async function WritingsPage() {
  const writings = await getWritings();

  return (
    <>
      <PageIntro
        code={`ROUTE / WRITINGS / ${String(writings.length).padStart(2, '0')} RECORDS`}
        title="Notes from inside the system."
        description="Practical writing about architecture, backend engineering, infrastructure, and the decisions behind reliable software."
      />
      <section className="section container writing-list">
        {writings.map((writing, index) => {
          const content = (
            <>
              <div className="writing-row__index">0{index + 1}</div>
              <div className="writing-row__main">
                <div className="writing-row__meta">
                  <span className={statusTone(writing.status)}>{writing.status}</span>
                  <time dateTime={writing.dateCreate}>{formatDate(writing.dateCreate, { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                </div>
                <h2>{writing.name}</h2>
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
      </section>
    </>
  );
}
