"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import NetworkMap from "@/components/NetworkMap";
import { useLanguage } from "@/context/LanguageContext";

const agricultureHero = "https://images.unsplash.com/photo-1721454623235-d71577351010?auto=format&fit=crop&w=1800&q=88";

export default function Home() {
  const { t } = useLanguage();
  const strengths = t.strengths.items.filter((item) => !/源流|Origins|渊源/.test(item.title));
  const newsItems = t.news.items.filter((item) => item.date !== "1991");

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__media">
          <figure className="home-hero__panel home-hero__panel--agriculture">
            <Image src={agricultureHero} alt={t.home.heroImageAlt} fill priority sizes="100vw" />
            <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
              <source src="/videos/agriculture-fertilizing.mp4" type="video/mp4" />
            </video>
            <figcaption>
              <small>Agriculture</small>
            </figcaption>
          </figure>
        </div>
        <div className="home-hero__shade" />
        <div className="home-hero__content shell">
          <p>{t.home.heroSub}</p>
          <h1 style={{ whiteSpace: "pre-line" }}>{t.home.heroTitle}</h1>
          {t.home.heroDesc ? <div style={{ whiteSpace: "pre-line" }}>{t.home.heroDesc}</div> : null}
          <dl className="home-hero__functions">
            {t.home.heroFunctions.map((fn) => (
              <div key={fn.num}>
                <dt>{fn.num}</dt>
                <dd>
                  <strong>{fn.title}</strong>
                  <span>{fn.desc}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="home-hero__rail">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      <section className="intro section shell">
        <SectionHeading en={t.home.introTag} title={t.home.introTitle} />
        <div className="intro__body">
          <p>{t.home.introP1}</p>
          <Link className="text-link" href="/company#history">
            {t.home.introLink}
            <span>›</span>
          </Link>
        </div>
      </section>

      <section className="featured-home section">
        <div className="shell">
          <SectionHeading en={t.home.featuredTag} title={t.home.featuredTitle} />
          <div className="featured-home__grid">
            {t.home.featured.map((item) => (
              <Link key={item.href} href={item.href} className="featured-card">
                {"image" in item && item.image ? (
                  <span className="featured-card__visual">
                    <Image src={item.image} alt={item.imageAlt} width={960} height={640} sizes="(max-width: 800px) 100vw, 560px" />
                  </span>
                ) : null}
                <span className="featured-card__body">
                  <small>{item.en}</small>
                  <h3>{item.name}</h3>
                  <p>{item.use}</p>
                  <b>{item.spec}</b>
                </span>
              </Link>
            ))}
          </div>
          <Link className="button-link" href="/products">
            {t.home.allProductsCta}
          </Link>
        </div>
      </section>

      <section className="strengths-home section">
        <div className="shell">
          <SectionHeading en={t.home.strengthsTag} title={t.home.strengthsTitle} />
          <div className="strengths-home__grid">
            {strengths.map((item, i) => (
              <article key={item.title}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
          <Link className="button-link button-link--light" href="/strengths">
            {t.home.strengthsBtn}
          </Link>
        </div>
      </section>

      <section className="network-home section shell">
        <div>
          <SectionHeading en={t.home.networkTag} title={t.home.networkTitle} intro={t.home.networkIntro} />
          <Link className="text-link" href="/network">
            {t.home.networkLink}
            <span>›</span>
          </Link>
        </div>
        <NetworkMap />
      </section>

      <section className="news-home section shell">
        <SectionHeading en={t.home.newsTag} title={t.home.newsTitle} />
        <div>
          {newsItems.map((item) => (
            <Link href="/news" key={item.title}>
              <time>{item.date}</time>
              <em>{item.category}</em>
              <span>{item.title}</span>
              <i>›</i>
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/news">
          {t.home.newsLink}
          <span>›</span>
        </Link>
      </section>

      <ContactBand />
    </>
  );
}
