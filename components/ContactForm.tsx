"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { contactEmail } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "sending" | "sent" | "error";
type FieldId = "company" | "name" | "email" | "phone" | "quantity";
type Field = { id: FieldId; type: string; required?: boolean; autoComplete?: string };

const contactFields: Field[] = [
  { id: "company", type: "text", required: true, autoComplete: "organization" },
  { id: "name", type: "text", required: true, autoComplete: "name" },
  { id: "email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", type: "tel", autoComplete: "tel" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const presetProduct = searchParams.get("product")?.trim() ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent" || status === "error") {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  function clearError(key: string) {
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function validate(data: FormData) {
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const found: Partial<Record<string, string>> = {};

    if (!value("inquiryType")) found.inquiryType = t.contact.invalidSelect;
    if (!value("product")) found.product = t.contact.invalidProduct;
    for (const { id, required } of contactFields) {
      if (required && !value(id)) found[id] = t.contact.invalidRequired;
    }
    if (!found.email && value("email") && !EMAIL_RE.test(value("email"))) found.email = t.contact.invalidEmail;
    if (!data.get("consent")) found.consent = t.contact.invalidConsent;

    return found;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      const field = form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      field?.scrollIntoView({ behavior: "smooth", block: "center" });
      field?.focus({ preventScroll: true });
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (!response.ok || !result?.ok) {
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function renderField({ id, type, required, autoComplete }: Field) {
    const message = errors[id];
    return (
      <label key={id} className="form-field">
        <span>
          {t.contact.fields[id]}
          <em className={required ? "is-required" : "is-optional"}>{required ? t.contact.required : t.contact.optional}</em>
        </span>
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          defaultValue={undefined}
          aria-invalid={message ? true : undefined}
          aria-describedby={message ? `${id}-error` : undefined}
          onInput={() => clearError(id)}
        />
        {message && (
          <strong className="field-error" id={`${id}-error`}>
            {message}
          </strong>
        )}
      </label>
    );
  }

  if (status === "sent") {
    return (
      <div className="form-result" ref={resultRef} role="status" aria-live="polite">
        <span className="form-result__icon" aria-hidden="true">
          <svg viewBox="0 0 40 40">
            <path d="M12 20.8 17.4 26.2 28.4 14.6" />
          </svg>
        </span>
        <h3>{t.contact.successTitle}</h3>
        <p>{t.contact.successBody}</p>
        <button type="button" className="form-result__again" onClick={() => setStatus("idle")}>
          {t.contact.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div ref={resultRef}>
        {status === "error" && (
          <div className="form-alert" role="alert">
            <strong>{t.contact.errorTitle}</strong>
            <p>{t.contact.errorBody}</p>
          </div>
        )}
      </div>

      <div className="form-stack">
        {contactFields.map(renderField)}

        <label className="form-field">
          <span>
            {t.contact.inquiryLabel}
            <em className="is-required">{t.contact.required}</em>
          </span>
          <select
            name="inquiryType"
            defaultValue=""
            aria-invalid={errors.inquiryType ? true : undefined}
            onChange={() => clearError("inquiryType")}
          >
            <option value="">{t.contact.inquiryPlaceholder}</option>
            {t.contact.inquiryOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.inquiryType && <strong className="field-error">{errors.inquiryType}</strong>}
        </label>

        <label className="form-field">
          <span>
            {t.contact.fields.product}
            <em className="is-required">{t.contact.required}</em>
          </span>
          <select
            name="product"
            defaultValue={t.contact.productOptions.includes(presetProduct) ? presetProduct : ""}
            aria-invalid={errors.product ? true : undefined}
            onChange={() => clearError("product")}
          >
            <option value="">{t.contact.productPlaceholder}</option>
            {t.contact.productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.product && <strong className="field-error">{errors.product}</strong>}
        </label>

        {renderField({ id: "quantity", type: "text" })}

        <label className="form-field">
          <span>
            {t.contact.messageLabel}
            <em className="is-optional">{t.contact.optional}</em>
          </span>
          <textarea name="message" rows={6} placeholder={t.contact.messagePlaceholder} />
        </label>
      </div>

      <label className="form-honeypot" aria-hidden="true">
        <span>Website</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="form-consent">
        <input type="checkbox" name="consent" onChange={() => clearError("consent")} />
        <span>
          {t.contact.consentPre}
          <a href="/privacy" target="_blank" rel="noopener">
            {t.contact.consentLink}
          </a>
          {t.contact.consentPost}
        </span>
      </label>
      {errors.consent && <strong className="field-error field-error--center">{errors.consent}</strong>}

      <div className="form-actions">
        <button type="submit" className="form-submit" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              {t.contact.sendingBtn}
              <i className="form-submit__spinner" aria-hidden="true" />
            </>
          ) : (
            <>
              {t.contact.submitBtn}
              <i aria-hidden="true">›</i>
            </>
          )}
        </button>
        <p className="form-fallback">
          {t.contact.fallbackPre}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          {t.contact.fallbackPost}
        </p>
      </div>
    </form>
  );
}
