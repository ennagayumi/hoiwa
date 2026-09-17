"use client";

import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero en="Privacy Policy" title={t.privacy.heroTitle} />
      <article className="legal section shell">
        <p>{t.privacy.intro}</p>
        {t.privacy.sections.map((sec) => (
          <section key={sec.title}>
            <h2>{sec.title}</h2>
            <p>{sec.body}</p>
          </section>
        ))}
        <p className="legal__date">{t.privacy.date}</p>
      </article>
    </>
  );
}
