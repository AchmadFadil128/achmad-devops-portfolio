export function PageIntro({
  code,
  title,
  description,
}: {
  code: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro container">
      <div className="page-intro__code">{code}</div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="page-intro__line" aria-hidden="true"><span /></div>
    </section>
  );
}
