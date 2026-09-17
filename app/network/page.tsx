"use client";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import NetworkMap from "@/components/NetworkMap";
import { useLanguage } from "@/context/LanguageContext";

export default function NetworkPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero en="Global Network" title={t.network.heroTitle} lead={t.network.heroLead} />
      <section className="network-page section shell">
        <SectionHeading en={t.network.introTag} title={t.network.introTitle} />
        <NetworkMap />
        <div className="network-regions">
          {t.network.regions.map((reg) => (
            <article key={reg.title}>
              <h2>{reg.title}</h2>
              <p>{reg.desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="network-note section">
        <div className="shell">
          <SectionHeading en={t.network.noteTag} title={t.network.noteTitle} />
          <p>{t.network.noteBody}</p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
