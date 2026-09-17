"use client";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import { useLanguage } from "@/context/LanguageContext";

export default function StrengthsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero en="Our Strengths" title={t.strengths.heroTitle} lead={t.strengths.heroLead} />
      <section className="page-intro section shell">
        <SectionHeading en={t.strengths.introTag} title={t.strengths.introTitle} />
        <div>
          <p>{t.strengths.introP1}</p>
          <p>{t.strengths.introP2}</p>
        </div>
      </section>
      <section className="strength-detail section shell">
        {t.strengths.items.map((item, i) => (
          <article key={item.title}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <div>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
          </article>
        ))}
      </section>
      <ContactBand />
    </>
  );
}
