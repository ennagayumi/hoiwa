"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "@/data/translations";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navList = [
    { href: "/", key: "home" as const },
    { href: "/business", key: "business" as const },
    { href: "/products", key: "products" as const },
    { href: "/strengths", key: "strengths" as const },
    { href: "/company", key: "company" as const },
    { href: "/news", key: "news" as const },
  ];

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}${open ? " header--open" : ""}`}>
      <Logo light={!scrolled && !open} />
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="global-nav">
        <span /><span /><span /><b>{t.header.menu}</b>
      </button>
      <nav id="global-nav" aria-label={t.header.navAria}>
        {navList.map(({ href, key }) => {
          const item = t.nav[key];
          return (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <span>{item.en}</span>
              {item.en !== item.label && <small>{item.label}</small>}
            </Link>
          );
        })}
        <Link className="header__contact" href="/contact" onClick={() => setOpen(false)}>
          {t.nav.contact}
        </Link>
        <div className="lang-switcher" aria-label="Language Selector">
          {(["ja", "en"] as Locale[]).map((lang) => (
            <button
              key={lang}
              type="button"
              className={locale === lang ? "active" : ""}
              onClick={() => setLocale(lang)}
            >
              {lang === "ja" ? "日本語" : "EN"}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
