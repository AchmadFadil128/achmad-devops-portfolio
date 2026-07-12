export function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
}: {
  index: string;
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-heading__label">
        <span>{index}</span>
        <p>{eyebrow}</p>
      </div>
      <h2>{title}</h2>
      {copy ? <p className="section-heading__copy">{copy}</p> : null}
    </div>
  );
}
