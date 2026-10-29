"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ContactBand from "@/components/ContactBand";
import NetworkMap from "@/components/NetworkMap";
import { useLanguage } from "@/context/LanguageContext";

const agricultureHero = "https://images.unsplash.com/photo-1721454623235-d71577351010?auto=format&fit=crop&w=1800&q=88";

// スライドの写真はすべて生産基地で撮影したもの。原工場のロゴや看板が写らない範囲で切り出している。
// 文言（キャプション・alt）は translations の home.heroSlides に同じ順番で置く。
const heroSlides = [
  { key: "agriculture", layout: "video", images: [] },
  { key: "base", layout: "full", images: ["/images/base/production-base-aerial.jpg"] },
  {
    key: "warehouse",
    layout: "mosaic",
    images: ["/images/base/warehouse-jumbo-bags.jpg", "/images/base/warehouse-forklift.jpg", "/images/base/warehouse-bagged-stock.jpg", "/images/base/warehouse-floor.jpg"],
  },
  {
    key: "shipment",
    layout: "mosaic",
    images: ["/images/base/loading-truck.jpg", "/images/base/container-palletized.jpg", "/images/base/port-crane.jpg", "/images/base/vessel-hold.jpg"],
  },
  {
    key: "factory",
    layout: "mosaic",
    images: ["/images/base/workshop-line.jpg", "/images/base/workshop-dryer.jpg", "/images/base/workshop-packing.jpg", "/images/base/testing-lab.jpg"],
  },
] as const;

const slideInterval = 6500;

function PillarIcon({ name }: { name: string }) {
  if (name === "factory") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M5 41V21l10 6v-6l10 6v-6l10 6V9h8v32Z" />
        <path d="M11 34h4M21 34h4M31 34h4M5 41h38" />
      </svg>
    );
  }
  if (name === "quality") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5 39 11v11c0 10-6.4 17.4-15 21-8.6-3.6-15-11-15-21V11Z" />
        <path d="m17 24 5 5 10-11" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 12h32v20H22l-9 7v-7H8Z" />
      <path d="M15 20h18M15 25h11" />
    </svg>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const strengths = t.strengths.items;
  const newsItems = t.news.items;
  const slides = t.home.heroSlides;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((index: number) => setActive((index + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => go(active + 1), slideInterval);
    return () => window.clearTimeout(timer);
  }, [active, paused, go]);

  return (
    <>
      <section className="home-hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="home-hero__media">
          {heroSlides.map((slide, i) => (
            <figure
              key={slide.key}
              className={`home-hero__panel home-hero__panel--${slide.layout}${i === active ? " is-active" : ""}`}
              aria-hidden={i !== active}
            >
              {slide.layout === "video" ? (
                <>
                  <Image src={agricultureHero} alt={t.home.heroImageAlt} fill priority sizes="100vw" />
                  <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
                    <source src="/videos/agriculture-fertilizing.mp4" type="video/mp4" />
                  </video>
                </>
              ) : (
                slide.images.map((src, j) => (
                  <span key={src} className="home-hero__tile">
                    <Image src={src} alt={slides[i].alts[j] ?? ""} fill sizes={slide.layout === "full" ? "100vw" : "(max-width: 1080px) 50vw, 30vw"} />
                  </span>
                ))
              )}
            </figure>
          ))}
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
        <div className="home-hero__controls">
          <p className="home-hero__caption" aria-live="polite">
            <small>
              {String(active + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}　{slides[active].en}
            </small>
            <span>{slides[active].label}</span>
          </p>
          <div className="home-hero__nav">
            <button type="button" onClick={() => go(active - 1)} aria-label={t.home.heroPrev}>‹</button>
            <ol>
              {heroSlides.map((slide, i) => (
                <li key={slide.key}>
                  <button
                    type="button"
                    className={i === active ? "is-active" : ""}
                    aria-current={i === active}
                    aria-label={`${t.home.heroGoto} ${i + 1}: ${slides[i].label}`}
                    onClick={() => go(i)}
                  >
                    <i key={i === active ? `on-${active}` : "off"} style={{ animationPlayState: paused ? "paused" : "running" }} />
                  </button>
                </li>
              ))}
            </ol>
            <button type="button" onClick={() => go(active + 1)} aria-label={t.home.heroNext}>›</button>
          </div>
        </div>
        <div className="home-hero__rail">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      <section className="products-home section">
        <div className="shell">
          <div className="products-home__head">
            <SectionHeading en={t.home.productsTag} title={t.home.productsTitle} intro={t.home.productsIntro} />
            <Link className="text-link" href="/products">
              {t.home.allProductsCta}
              <span>›</span>
            </Link>
          </div>
          <ul className="products-home__grid">
            {t.home.productCategories.map((item) => (
              <li key={item.en}>
                <Link href={item.href} className="product-tile">
                  <span className="product-tile__visual">
                    <Image src={item.image} alt={item.imageAlt} width={480} height={480} sizes="(max-width: 640px) 50vw, (max-width: 1080px) 33vw, 280px" />
                    <em>{item.use}</em>
                  </span>
                  <span className="product-tile__body">
                    <small>{item.en}</small>
                    <strong>{item.name}</strong>
                    <b>{item.spec}</b>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="products-home__other">
            <strong>{t.home.productsOtherTitle}</strong>
            <ul>
              {t.home.productsOther.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <Link className="text-link" href="/products#other">
              {t.products.otherCta}
              <span>›</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="facts-home section">
        <div className="facts-home__media" aria-hidden="true">
          <Image src="/images/base/production-base-aerial.jpg" alt="" fill sizes="100vw" />
        </div>
        <div className="shell">
          <SectionHeading en={t.home.factsTag} title={t.home.factsTitle} intro={t.home.factsIntro} />
          <dl className="facts-home__numbers">
            {t.home.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>
                  {fact.value}
                  {fact.unit ? <small>{fact.unit}</small> : null}
                </dd>
              </div>
            ))}
          </dl>
          <div className="facts-home__pillars">
            {t.home.factPillars.map((pillar) => (
              <article key={pillar.en}>
                <PillarIcon name={pillar.icon} />
                <small>{pillar.en}</small>
                <h3>{pillar.title}</h3>
                <ul>
                  {pillar.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shipments-home section">
        <div className="shell">
          <SectionHeading en={t.home.shipmentsTag} title={t.home.shipmentsTitle} intro={t.home.shipmentsIntro} />
          <ol className="shipments-home__list">
            {t.home.shipments.map((item) => (
              <li key={item.date + item.quantity}>
                <time>{item.date}</time>
                <div className="shipments-home__head">
                  <b>{item.quantity}</b>
                  <strong>{item.product}</strong>
                </div>
                <dl>
                  <div>
                    <dt>{t.home.shipmentsLabels.destination}</dt>
                    <dd>{item.destination}</dd>
                  </div>
                  <div>
                    <dt>{t.home.shipmentsLabels.transport}</dt>
                    <dd>{item.transport}</dd>
                  </div>
                  {item.inspection ? (
                    <div>
                      <dt>{t.home.shipmentsLabels.inspection}</dt>
                      <dd>{item.inspection}</dd>
                    </div>
                  ) : null}
                </dl>
              </li>
            ))}
          </ol>
          <p className="shipments-home__source">{t.home.shipmentsSource}</p>
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
