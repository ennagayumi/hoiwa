"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import { useLanguage } from "@/context/LanguageContext";
import { contactEmail } from "@/data/site";

export default function RecruitPage() {
  const { t } = useLanguage();
  const jobs = t.recruit.jobs;

  return (
    <>
      <PageHero en="Recruit" title={t.recruit.heroTitle} lead={t.recruit.heroLead} />
      <section className="recruit-status section shell">
        <SectionHeading en={t.recruit.statusTag} title={t.recruit.statusTitle} />
        {jobs.length === 0 ? (
          <div className="recruit-status__none">
            <p className="recruit-status__headline">{t.recruit.statusNone}</p>
            <p>{t.recruit.statusNoneNote}</p>
          </div>
        ) : (
          <>
            <p className="recruit-status__note">{t.recruit.openingsNote}</p>
            {jobs.map((job) => (
              <article key={job.title} className="job-card">
                <header>
                  <small>{job.en}</small>
                  <h2>{job.title}</h2>
                  <p>{job.summary}</p>
                </header>
                <dl>
                  {job.rows.map((row) => (
                    <div key={row.dt}>
                      <dt>{row.dt}</dt>
                      <dd style={{ whiteSpace: "pre-line" }}>{row.dd}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </>
        )}
      </section>
      <section className="trade-flow section shell">
        <SectionHeading en={t.recruit.processTag} title={t.recruit.processTitle} />
        <ol>
          {t.recruit.process.map((step, i) => (
            <li key={step.title}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <div>
                <h2>{step.title}</h2>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="recruit-apply section">
        <div className="shell">
          <SectionHeading en={t.recruit.applyTag} title={t.recruit.applyTitle} />
          <div className="recruit-apply__body">
            <p>{t.recruit.applyBody}</p>
            <dl className="recruit-apply__mail">
              <div>
                <dt>E-mail</dt>
                <dd><a href={`mailto:${contactEmail}`}>{contactEmail}</a></dd>
              </div>
              <div>
                <dt>{t.recruit.applyMailSubjectLabel}</dt>
                <dd>{t.recruit.applyMailSubject}</dd>
              </div>
            </dl>
            <p className="recruit-apply__note">
              {t.recruit.applyNote}{" "}
              <Link href="/privacy">{t.recruit.applyPrivacyLink}</Link>
            </p>
            <p className="recruit-apply__note">
              {t.recruit.contactAlt}{" "}
              <Link href="/contact">{t.recruit.contactAltLink}</Link>
            </p>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
