"use client";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import { useLanguage } from "@/context/LanguageContext";
import { officeBuilding, officeLocality, officeMapEmbedUrl, officeMapUrl, officePostalCode, officeRegion, officeStreet, operatorName, representativeName } from "@/data/site";

export default function CompanyPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero en="Company" title={t.company.heroTitle} lead={t.company.heroLead} />
      <section className="message section shell">
        <SectionHeading en={t.company.messageTag} title={t.company.messageTitle} />
        <div>
          <p><strong>{t.company.messageHeadline}</strong></p>
          {t.company.messageParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="signature">
            {t.company.messageRole}
            <br />
            <strong>{representativeName}</strong>
          </p>
        </div>
      </section>
      <section className="philosophy-detail section">
        <div className="shell">
          <SectionHeading en={t.company.philosophyTag} title={t.company.philosophyTitle} />
          <blockquote>{t.company.philosophyQuote}</blockquote>
          <p>{t.company.philosophyBody}</p>
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
      <section id="history" className="history section shell">
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
          <div className="access__body">
            <address className="access__card">
              <strong>{operatorName}</strong>
              <span>〒{officePostalCode}</span>
              <span>{officeRegion}{officeLocality}{officeStreet}</span>
              <span>{officeBuilding}</span>
              <a href={officeMapUrl} target="_blank" rel="noopener noreferrer">{t.company.accessMap}</a>
            </address>
            <iframe
              className="access__map"
              src={officeMapEmbedUrl}
              title={`${t.company.accessTitle} ${operatorName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
