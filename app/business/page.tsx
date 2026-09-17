"use client";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import { useLanguage } from "@/context/LanguageContext";

export default function BusinessPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        en="Business"
        title={t.business.heroTitle}
        lead={t.business.heroLead}
        image="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=2200&q=85"
      />
      <section className="page-intro section shell">
        <SectionHeading en={t.business.introTag} title={t.business.introTitle} />
        <div>
          <p>{t.business.introP1}</p>
          <p>{t.business.introP2}</p>
        </div>
      </section>
      <section className="service-list section">
        <div className="shell">
          <SectionHeading en={t.business.servicesTag} title={t.business.servicesTitle} />
          {t.business.services.map((item, i) => (
            <article key={item.title}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <div>
                {item.en !== item.title && <small>{item.en}</small>}
                <h2>{item.title}</h2>
              </div>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="business-policy section shell">
        <SectionHeading en={t.business.policyTag} title={t.business.policyTitle} />
        <div className="policy-grid">
          {t.business.policyItems.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
