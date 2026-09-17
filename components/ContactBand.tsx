"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactBand() {
  const { t } = useLanguage();

  return (
    <section className="contact-band">
      <div className="shell">
        <div>
          <p>{t.contactBand.tag}</p>
          <h2 style={{ whiteSpace: "pre-line" }}>{t.contactBand.title}</h2>
        </div>
        <Link href="/contact">
          <span>{t.contactBand.btn}</span>
          <i aria-hidden="true">›</i>
        </Link>
      </div>
    </section>
  );
}
