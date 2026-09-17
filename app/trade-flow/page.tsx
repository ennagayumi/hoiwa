"use client";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import { useLanguage } from "@/context/LanguageContext";

export default function TradeFlowPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero en="Trade Flow" title={t.tradeFlow.heroTitle} lead={t.tradeFlow.heroLead} />
      <section className="trade-flow section shell">
        <SectionHeading en={t.tradeFlow.processTag} title={t.tradeFlow.processTitle} />
        <ol>
          {t.tradeFlow.items.map((item, i) => (
            <li key={item.title}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <div>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="notice-block shell">
        <strong>{t.tradeFlow.noticeTitle}</strong>
        <p>{t.tradeFlow.noticeBody}</p>
      </section>
      <ContactBand />
    </>
  );
}
