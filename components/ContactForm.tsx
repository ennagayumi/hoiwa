"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  const fieldList = [
    { id: "company" as const, type: "text", required: true },
    { id: "name" as const, type: "text", required: true },
    { id: "country" as const, type: "text", required: true },
    { id: "email" as const, type: "email", required: true },
    { id: "phone" as const, type: "tel", required: false },
    { id: "product" as const, type: "text", required: false },
    { id: "quantity" as const, type: "text", required: false },
    { id: "spec" as const, type: "text", required: false },
    { id: "port" as const, type: "text", required: false },
    { id: "terms" as const, type: "text", required: false },
  ];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSent(true);
    form.reset();
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {sent && (
        <div className="form-success" role="status">
          {t.contact.successMsg}
        </div>
      )}
      <div className="form-grid">
        {fieldList.map(({ id, type, required }) => (
          <label key={id}>
            <span>
              {t.contact.fields[id]}
              {required && <em>{t.contact.required}</em>}
            </span>
            <input
              id={id}
              name={id}
              type={type}
              required={required}
              autoComplete={id === "email" ? "email" : id === "phone" ? "tel" : undefined}
            />
          </label>
        ))}
      </div>
      <label>
        <span>
          {t.contact.inquiryTypeLabel}
          <em>{t.contact.required}</em>
        </span>
        <select name="inquiryType" required defaultValue="">
          <option value="" disabled>
            {t.contact.inquiryTypeDefault}
          </option>
          {t.contact.inquiryOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>
          {t.contact.messageLabel}
          <em>{t.contact.required}</em>
        </span>
        <textarea name="message" rows={8} required />
      </label>
      <label className="form-consent">
        <input type="checkbox" required />
        <span>
          {t.contact.consentPre}
          <a href="/privacy" target="_blank">
            {t.contact.consentLink}
          </a>
          {t.contact.consentPost}
        </span>
      </label>
      <button type="submit">
        {t.contact.submitBtn}
        <span>›</span>
      </button>
      <p className="form-note">{t.contact.demoNote}</p>
    </form>
  );
}
