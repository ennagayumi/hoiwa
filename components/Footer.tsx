"use client";

import Link from "next/link";
import Logo from "./Logo";
import { contactEmail } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__main shell">
        <div>
          <Logo light />
          <p style={{ whiteSpace: "pre-line" }}>{t.footer.slogan}</p>
          <a className="footer__email" href={`mailto:${contactEmail}`}>
            <small>{t.footer.emailLabel}</small>
            {contactEmail}
          </a>
        </div>
        <nav aria-label={t.footer.navAria}>
          <div>
            <Link href="/business">{t.nav.business.label}</Link>
            <Link href="/products">{t.nav.products.label}</Link>
          </div>
          <div>
            <Link href="/strengths">{t.nav.strengths.label}</Link>
            <Link href="/company">{t.nav.company.label}</Link>
            <Link href="/news">{t.nav.news.label}</Link>
            <Link href="/network">{t.footer.network}</Link>
          </div>
          <div>
            <Link href="/trade-flow">{t.footer.tradeFlow}</Link>
            <Link href="/contact">{t.footer.contact}</Link>
            <Link href="/privacy">{t.footer.privacy}</Link>
            <Link href="/credits">{t.footer.credits}</Link>
          </div>
        </nav>
      </div>
      <div className="footer__bottom shell">
        <span>{t.footer.companyName}</span>
        <small>{t.footer.copyright}</small>
      </div>
    </footer>
  );
}
