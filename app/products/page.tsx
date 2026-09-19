"use client";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        en="Fertilizer & Materials"
        title={t.products.heroTitle}
        lead={t.products.heroLead}
        image="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=2200&q=85"
        imageAlt={t.products.heroImageAlt}
      />
      <section className="page-intro section shell">
        <SectionHeading en={t.products.introTag} title={t.products.introTitle} />
        <div>
          <p>{t.products.introP1}</p>
          <p>{t.products.introP2}</p>
        </div>
      </section>
      <section className="product-detail section shell">
        <SectionHeading en={t.products.productsTag} title={t.products.productsTitle} />
        <div className="product-detail__list">
          {t.products.items.map((p, i) => (
            <article key={p.en}>
              <header>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <small>{p.en}</small>
                <h2>{p.name}</h2>
              </header>
              <div className="product-detail__description">
                <p>{p.desc}</p>
                <dl>
                  <div>
                    <dt>{t.products.dtUse}</dt>
                    <dd>{p.use}</dd>
                  </div>
                  <div>
                    <dt>{t.products.dtSpec}</dt>
                    <dd>{t.products.ddSpec}</dd>
                  </div>
                  <div>
                    <dt>{t.products.dtPackage}</dt>
                    <dd>{p.package}</dd>
                  </div>
                  <div>
                    <dt>{t.products.dtTrade}</dt>
                    <dd>{t.products.ddTrade}</dd>
                  </div>
                  <div>
                    <dt>{t.products.dtRegion}</dt>
                    <dd>{p.region}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="notice-block shell">
        <strong>{t.products.noticeTitle}</strong>
        <p>{t.products.noticeBody}</p>
      </section>
      <ContactBand />
    </>
  );
}
