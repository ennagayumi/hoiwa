import Image from "next/image";

type Props = { title: string; en: string; lead?: string; image?: string; imageAlt?: string };
export default function PageHero({ title, en, lead, image, imageAlt = "" }: Props) {
  return (
    <section className={`page-hero${image ? " page-hero--image" : ""}`}>
      {image && <Image src={image} alt={imageAlt} fill priority sizes="100vw" />}
      <div className="page-hero__overlay" />
      <div className="shell page-hero__inner"><p>{en}</p><h1>{title}</h1>{lead && <div>{lead}</div>}</div>
    </section>
  );
}
