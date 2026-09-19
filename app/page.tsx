"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import NetworkMap from "@/components/NetworkMap";
import { useLanguage } from "@/context/LanguageContext";

const agricultureHero = "https://images.unsplash.com/photo-1721454623235-d71577351010?auto=format&fit=crop&w=1800&q=88";
const materialImage = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=85";

export default function Home() {
  const { t } = useLanguage();

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
          <p>{t.home.introP2}</p>
          <Link className="text-link" href="/company">
            {t.home.introLink}
            <span>›</span>
          </Link>
        </div>
      </section>

      <section className="nutrient-story section">
        <div className="shell">
          <SectionHeading en={t.home.nutritionTag} title={t.home.nutritionTitle} intro={t.home.nutritionIntro} />
          <div className="nutrient-story__grid">
            {t.home.nutritionItems.map((item) => (
              <article key={item.symbol}>
                <span>{item.symbol}</span>
                <div>
                  <small>{item.en}</small>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="nutrient-story__note">{t.home.nutritionNote}</p>
        </div>
      </section>

      <section className="business-feature section">
        <div className="shell">
          <SectionHeading en={t.home.businessTag} title={t.home.businessTitle} intro={t.home.businessIntro} />
          <div className="business-feature__grid">
            {t.home.businessCards.map((card) => (
              <article key={card.num}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
          <Link className="button-link" href="/business">
            {t.home.businessBtn}
          </Link>
        </div>
      </section>

      <section className="products-home section shell">
        <div className="products-home__visual">
          <Image src={materialImage} alt={t.home.materialImageAlt} fill sizes="(max-width: 800px) 100vw, 50vw" />
        </div>
        <div className="products-home__content">
          <SectionHeading en={t.home.productsTag} title={t.home.productsTitle} intro={t.home.productsIntro} />
          <ul>
            {t.products.items.map((p) => (
              <li key={p.en}>
                <Link href="/products">
                  <span>
                    <small>{p.en}</small>
                    {p.name}
                  </span>
                  <i>›</i>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="strengths-home section">
        <div className="shell">
          <SectionHeading en={t.home.strengthsTag} title={t.home.strengthsTitle} />
          <div className="strengths-home__grid">
            {t.strengths.items.map((item, i) => (
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

      <section className="philosophy section">
        <div className="shell">
          <p className="philosophy__en">{t.home.purposeTag}</p>
          <blockquote style={{ whiteSpace: "pre-line" }}>{t.home.purposeQuote}</blockquote>
          <p>{t.home.purposeBody}</p>
        </div>
      </section>

      <section className="news-home section shell">
        <SectionHeading en={t.home.newsTag} title={t.home.newsTitle} />
        <div>
          {t.news.items.map((item) => (
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
