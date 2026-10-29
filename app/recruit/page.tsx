"use client";

import Image from "next/image";
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
      <section className="recruit-primer section">
        <div className="shell">
          <SectionHeading en={t.recruit.primerTag} title={t.recruit.primerTitle} intro={t.recruit.primerIntro} />
          <h3 className="recruit-primer__subhead">{t.recruit.cropsTitle}</h3>
          <div className="crop-grid">
            {t.recruit.crops.map((item) => (
              <article key={item.cropEn + item.marketLabel} className="crop-card">
                <div className="crop-card__visual">
                  <Image src={item.image} alt={item.imageAlt} width={960} height={640} sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 380px" />
                  <span className="crop-card__market">{item.marketLabel}</span>
                </div>
                <div className="crop-card__body">
                  <small>{item.cropEn}</small>
                  <h3>{item.crop}</h3>
                  <p>{item.desc}</p>
                  <dl>
                    <dt>{t.recruit.cropsProductsLabel}</dt>
                    <dd>
                      {item.products.map((name) => (
                        <span key={name}>{name}</span>
                      ))}
                    </dd>
                  </dl>
                </div>
              </article>
            ))}
          </div>
          <p className="recruit-primer__note">{t.recruit.cropsNote}</p>
          <div className="recruit-primer__grid">
            {t.recruit.knowledge.map((block) => (
              <article key={block.title}>
                <h3>{block.title}</h3>
                <ul>
                  {block.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <h3 className="recruit-primer__subhead">{t.recruit.roleTitle}</h3>
          <table className="recruit-primer__table">
            <thead>
              <tr>
                <th scope="col">{t.recruit.roleHead[0]}</th>
                <th scope="col">{t.recruit.roleHead[1]}</th>
              </tr>
            </thead>
            <tbody>
              {t.recruit.roles.map(([process, nutrients]) => (
                <tr key={process}>
                  <th scope="row">{process}</th>
                  <td>{nutrients.split("Mg").flatMap((part, i) => (i === 0 ? [part] : [<b key={i}>Mg</b>, part]))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="recruit-primer__note">{t.recruit.primerSource}</p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
