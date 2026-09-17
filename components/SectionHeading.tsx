export default function SectionHeading({ title, en, intro }: { title: string; en: string; intro?: string }) {
  return <header className="section-heading"><p>{en}</p><h2>{title}</h2>{intro && <div>{intro}</div>}</header>;
}
