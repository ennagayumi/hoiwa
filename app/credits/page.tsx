"use client";

import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

export default function CreditsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero en="Media Credits" title={t.credits.heroTitle} />
      <article className="legal section shell">
        <p>{t.credits.intro}</p>
        <section>
          <h2>{t.credits.section2Title}</h2>
          <p style={{ whiteSpace: "pre-line" }}>{t.credits.section2Body}</p>
        </section>
      </article>
    </>
  );
}
