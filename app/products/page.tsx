"use client";

import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductsPage() {
  const { t } = useLanguage();
  const { spotlights } = t.products;

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

      {spotlights.map((spotlight) => {
        const isGrid = "layout" in spotlight && spotlight.layout === "grid";
        return (
          <section key={spotlight.title} className={`spec-spotlight section${isGrid ? " spec-spotlight--grid" : ""}`}>
            <div className="shell">
              <SectionHeading en={spotlight.tag} title={spotlight.title} intro={spotlight.lead} />
              <div className={`spec-grades${isGrid ? " spec-grades--compact" : ""}`}>
                {spotlight.grades.map((grade) => {
                  const photos = "photos" in grade ? grade.photos : undefined;
                  const hasResult = grade.specs.some((row) => "result" in row && row.result);
                  return (
                    <article key={grade.name} className={`spec-grade${isGrid ? " spec-grade--compact" : ""}`}>
                      <header className="spec-grade__head">
                        <small>{spotlight.gradeLabel}</small>
                        <h3>{grade.name}</h3>
                        <b>{grade.form}</b>
                        <p>{grade.desc}</p>
                      </header>
                      <div className={`spec-grade__body${photos?.length ? "" : " spec-grade__body--table"}`}>
                        <div className="spec-grade__data">
                          <table className="spec-table">
                            <thead>
                              <tr>
                                <th scope="col">{spotlight.itemLabel}</th>
                                <th scope="col">{spotlight.specLabel}</th>
                                {hasResult && <th scope="col">{spotlight.resultLabel}</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {grade.specs.map((row) => (
                                <tr key={row.item}>
                                  <th scope="row">{row.item}</th>
                                  <td>{row.spec}</td>
                                  {hasResult && <td>{"result" in row && row.result ? row.result : "—"}</td>}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {"resultNote" in grade && grade.resultNote && <p className="spec-spotlight__note">{grade.resultNote}</p>}
                        </div>
                        {photos && photos.length > 0 && (
                          <div className="spec-spotlight__photos">
                            {photos.map((photo) => (
                              <figure key={photo.src}>
                                <Image src={photo.src} alt={photo.alt} width={774} height={1024} sizes="(max-width: 640px) 50vw, 260px" />
                                <figcaption>{photo.caption}</figcaption>
                              </figure>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              <p className="spec-spotlight__note spec-spotlight__note--foot">{spotlight.note}</p>
            </div>
          </section>
        );
      })}

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
                    <dt>{t.products.dtSpec}</dt>
                    <dd>{p.spec}</dd>
                  </div>
                  <div>
                    <dt>{t.products.dtUse}</dt>
                    <dd>{p.use}</dd>
                  </div>
                  <div>
                    <dt>{t.products.dtPackage}</dt>
                    <dd>{p.package}</dd>
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

      <section className="lineup section">
        <div className="shell">
          <SectionHeading en={t.products.lineupTag} title={t.products.lineupTitle} intro={t.products.lineupIntro} />
          <ul className="lineup__list">
            {t.products.lineup.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <small>{item.en}</small>
              </li>
            ))}
          </ul>
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
