"use client";

import PageHero from "@/components/PageHero";
import { contactEmail } from "@/data/site";
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
            <p>
              {sec.body.includes(contactEmail)
                ? sec.body.split(contactEmail).flatMap((part, i, parts) =>
                    i < parts.length - 1
                      ? [part, <a key={contactEmail} href={`mailto:${contactEmail}`}>{contactEmail}</a>]
                      : [part],
                  )
                : sec.body}
            </p>
          </section>
        ))}
        <p className="legal__date">{t.privacy.date}</p>
      </article>
    </>
  );
}
