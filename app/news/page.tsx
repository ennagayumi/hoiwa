"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "notice" | "business">("all");

  // "2026" / "2026.09" / "2026.09.18" -> machine-readable ISO date; placeholders such as "2026.XX.XX" get no dateTime.
  const toDateTime = (label: string) => {
    const iso = label.replace(/\./g, "-");
    return /^\d{4}(-\d{2}){0,2}$/.test(iso) ? iso : undefined;
  };

  const filteredItems = t.news.items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "notice") return item.category === t.news.filterNotice;
    if (filter === "business") return item.category === t.news.filterBusiness;
    return true;
  });

  return (
    <>
      <PageHero en="News" title={t.news.heroTitle} lead={t.news.heroLead} />
      <section className="news-list section shell">
        <div className="news-filter">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
            {t.news.filterAll}
          </button>
          <button className={filter === "notice" ? "active" : ""} onClick={() => setFilter("notice")}>
            {t.news.filterNotice}
          </button>
          <button className={filter === "business" ? "active" : ""} onClick={() => setFilter("business")}>
            {t.news.filterBusiness}
          </button>
        </div>
        <div>
          {filteredItems.map((item) => (
            <article key={item.title}>
              <time dateTime={toDateTime(item.date)}>{item.date}</time>
              <em>{item.category}</em>
              <h2>{item.title}</h2>
            </article>
          ))}
        </div>
        <p className="news-note">{t.news.newsNote}</p>
      </section>
    </>
  );
}
