"use client";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero en="Contact" title={t.contact.heroTitle} lead={t.contact.heroLead} />
      <section className="contact-page section shell">
        <SectionHeading en={t.contact.formTag} title={t.contact.formTitle} intro={t.contact.formIntro} />
        <ContactForm />
      </section>
    </>
  );
}
