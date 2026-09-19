"use client";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import { useLanguage } from "@/context/LanguageContext";

export default function CompanyPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero en="Company" title={t.company.heroTitle} lead={t.company.heroLead} />
      <section className="philosophy-detail section">
        <div className="shell">
          <SectionHeading en={t.company.philosophyTag} title={t.company.philosophyTitle} />
          <blockquote style={{ whiteSpace: "pre-line" }}>{t.company.philosophyQuote}</blockquote>
          <div className="values">
            {t.company.values.map((v) => (
              <article key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="history section shell">
        <SectionHeading en={t.company.historyTag} title={t.company.historyTitle} />
        <ol className="history__list">
          {t.company.history.map((item) => (
            <li key={item.year}>
              <time dateTime={item.year}>{item.year}</time>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="company-outline section shell">
        <SectionHeading en={t.company.outlineTag} title={t.company.outlineTitle} />
        <dl>
          {t.company.outline.map((row) => (
            <div key={row.dt}>
              <dt>{row.dt}</dt>
              <dd>{row.dd}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="access section">
        <div className="shell">
          <SectionHeading en={t.company.accessTag} title={t.company.accessTitle} />
          <div className="access__placeholder">
            <span>{t.company.accessSpan}</span>
            <strong>{t.company.accessStrong}</strong>
            <p>{t.company.accessP}</p>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
