"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import { useLanguage } from "@/context/LanguageContext";

type SpecRow = { item: string; spec: string; result?: string };
type Grade = {
  name: string;
  group?: string;
  groupId?: string;
  form: string;
  desc: string;
  resultNote?: string;
  specs: SpecRow[];
  photos?: { src: string; alt: string; caption: string }[];
};
type Gallery = {
  groupId?: string;
  title: string;
  items: (
    | { type: "video"; src: string; poster: string; alt: string; caption: string }
    | { src: string; alt: string; caption: string }
  )[];
};
type Spotlight = {
  tag: string;
  title: string;
  lead: string;
  inquiryProduct?: string;
  cta?: string;
  layout?: string;
  gradeLabel: string;
  itemLabel: string;
  specLabel: string;
  resultLabel: string;
  resultToggle?: string;
  tabHint?: string;
  chooseHint?: string;
  note: string;
  grades: Grade[];
  galleries?: Gallery[];
};

function gradeGroups(grades: readonly Grade[]) {
  const groups: { id: string; label: string; grades: Grade[] }[] = [];
  for (const grade of grades) {
    const id = grade.groupId ?? grade.name;
    const label = grade.group ?? grade.name;
    const found = groups.find((group) => group.id === id);
    if (found) found.grades.push(grade);
    else groups.push({ id, label, grades: [grade] });
  }
  return groups;
}

function GradeCard({
  grade,
  spotlight,
  compact,
}: {
  grade: Grade;
  spotlight: Spotlight;
  compact: boolean;
}) {
  const photos = grade.photos;
  const resultRows = grade.specs.filter((row) => row.result);
  const resultToggle = spotlight.resultToggle ?? spotlight.resultLabel;

  return (
    <article className={`spec-grade${compact ? " spec-grade--compact" : ""}`}>
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
              </tr>
            </thead>
            <tbody>
              {grade.specs.map((row) => (
                <tr key={row.item}>
                  <th scope="row">{row.item}</th>
                  <td>{row.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {resultRows.length > 0 && (
            <details className="spec-result">
              <summary>{resultToggle}</summary>
              <table className="spec-table spec-table--result">
                <thead>
                  <tr>
                    <th scope="col">{spotlight.itemLabel}</th>
                    <th scope="col">{spotlight.resultLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {resultRows.map((row) => (
                    <tr key={row.item}>
                      <th scope="row">{row.item}</th>
                      <td>{row.result ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {grade.resultNote ? <p className="spec-spotlight__note">{grade.resultNote}</p> : null}
            </details>
          )}
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
}

function GalleryBlock({ gallery }: { gallery: Gallery }) {
  return (
    <div className="spec-spotlight__gallery">
      <h3>{gallery.title}</h3>
      <div className={`spec-spotlight__photos${gallery.items.length === 1 ? " spec-spotlight__photos--single" : ""}`}>
        {gallery.items.map((item) =>
          "type" in item && item.type === "video" ? (
            <figure key={item.src}>
              <video className="spec-spotlight__clip" autoPlay muted loop playsInline preload="metadata" poster={item.poster} aria-label={item.alt}>
                <source src={item.src} type="video/mp4" />
              </video>
              <img className="spec-spotlight__poster" src={item.poster} alt="" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ) : (
            <figure key={item.src}>
              <Image src={item.src} alt={item.alt} width={768} height={1024} sizes="(max-width: 640px) 50vw, 280px" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ),
        )}
      </div>
    </div>
  );
}

function SpotlightBlock({ spotlight, alt }: { spotlight: Spotlight; alt: boolean }) {
  const isTabs = spotlight.layout === "tabs";
  const groups = useMemo(() => gradeGroups(spotlight.grades), [spotlight.grades]);
  const [active, setActive] = useState(0);
  const sectionId = spotlight.grades.some((grade) => grade.groupId?.startsWith("mg-"))
    ? "magnesium-sulfate"
    : spotlight.grades.some((grade) => grade.groupId?.startsWith("as-"))
      ? "ammonium-sulfate"
      : undefined;

  const current = groups[Math.min(active, groups.length - 1)] ?? groups[0];

  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      const index = groups.findIndex((group) => group.id === raw || `panel-${group.id}` === raw);
      if (index >= 0) setActive(index);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [groups]);

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw || (current?.id !== raw && `panel-${current?.id}` !== raw)) return;
    document.getElementById(current.id)?.scrollIntoView({ block: "start" });
  }, [current?.id]);
  const compact = current.grades.length > 1;
  const showChoose = Boolean(spotlight.chooseHint && current.id === "mg-monohydrate");
  const galleries = spotlight.galleries?.filter((gallery) => !gallery.groupId || gallery.groupId === current.id);
  const inquiryHref = spotlight.inquiryProduct
    ? `/contact?product=${encodeURIComponent(spotlight.inquiryProduct)}`
    : "/contact";

  return (
    <section id={sectionId} className={`spec-spotlight section${alt ? " spec-spotlight--grid" : ""}${isTabs ? " spec-spotlight--tabs" : ""}`}>
      <div className="shell">
        <SectionHeading en={spotlight.tag} title={spotlight.title} intro={spotlight.lead} />
        {isTabs && (
          <div className="spec-tabs-wrap">
            {spotlight.tabHint ? <p className="spec-tabs__hint">{spotlight.tabHint}</p> : null}
            <div className="spec-tabs" role="tablist" aria-label={spotlight.tabHint ?? spotlight.title}>
              {groups.map((group, index) => (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  id={`tab-${group.id}`}
                  aria-selected={active === index}
                  aria-controls={group.id}
                  onClick={() => setActive(index)}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div role={isTabs ? "tabpanel" : undefined} id={current?.id} aria-labelledby={isTabs ? `tab-${current.id}` : undefined}>
          {showChoose ? <p className="spec-choose">{spotlight.chooseHint}</p> : null}
          <div className={`spec-grades${compact ? " spec-grades--compact" : ""}`}>
            {current.grades.map((grade) => (
              <GradeCard key={grade.name} grade={grade} spotlight={spotlight} compact={compact} />
            ))}
          </div>
          {galleries?.map((gallery) => (
            <GalleryBlock key={gallery.title} gallery={gallery} />
          ))}
        </div>
        {spotlight.cta ? (
          <p className="spec-spotlight__cta">
            <Link className="text-link" href={inquiryHref}>
              {spotlight.cta}
              <span>›</span>
            </Link>
          </p>
        ) : null}
        <p className="spec-spotlight__note spec-spotlight__note--foot">{spotlight.note}</p>
      </div>
    </section>
  );
}

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
      <section className="page-intro page-intro--products section shell">
        <SectionHeading en={t.products.introTag} title={t.products.introTitle} />
        <div>
          <p>{t.products.introP1}</p>
          <p>{t.products.introP2}</p>
        </div>
      </section>

      {spotlights
        .slice()
        .sort((a, b) => {
          const rank = (title: string) => (/マグネシウム|Magnesium|硫酸镁/.test(title) ? 0 : 1);
          return rank(a.title) - rank(b.title);
        })
        .map((spotlight, index) => (
          <SpotlightBlock key={spotlight.title} spotlight={spotlight as Spotlight} alt={index === 1} />
        ))}

      <section id="other" className="lineup section">
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
          <p className="spec-spotlight__cta">
            <Link className="text-link" href={`/contact?product=${encodeURIComponent(t.products.otherInquiryProduct)}`}>
              {t.products.otherCta}
              <span>›</span>
            </Link>
          </p>
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
