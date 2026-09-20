"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { contactEmail } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "sending" | "sent" | "error";
type FieldId = "company" | "name" | "country" | "email" | "phone" | "product" | "quantity" | "spec" | "port" | "terms";
type Field = { id: FieldId; type: string; required?: boolean; autoComplete?: string };

const contactFields: Field[] = [
  { id: "company", type: "text", required: true, autoComplete: "organization" },
  { id: "name", type: "text", required: true, autoComplete: "name" },
  { id: "country", type: "text", required: true, autoComplete: "country-name" },
  { id: "email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", type: "tel", autoComplete: "tel" },
];

const detailFields: Field[] = [
  { id: "product", type: "text" },
  { id: "quantity", type: "text" },
  { id: "spec", type: "text" },
  { id: "port", type: "text" },
  { id: "terms", type: "text" },
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
    for (const { id, required } of contactFields) {
      if (required && !value(id)) found[id] = t.contact.invalidRequired;
    }
    if (!found.email && value("email") && !EMAIL_RE.test(value("email"))) found.email = t.contact.invalidEmail;
    if (!value("message")) found.message = t.contact.invalidRequired;
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
          defaultValue={id === "product" ? presetProduct : undefined}
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

      <fieldset className="form-block">
        <legend>
          <b>01</b>
          {t.contact.step1}
          <em className="is-required">{t.contact.required}</em>
        </legend>
        <div className="option-grid">
          {t.contact.inquiryOptions.map((option) => (
            <label key={option.label} className="option-card">
              <input type="radio" name="inquiryType" value={option.label} onChange={() => clearError("inquiryType")} />
              <span className="option-card__body">
                <strong>{option.label}</strong>
                <small>{option.desc}</small>
              </span>
            </label>
          ))}
        </div>
        {errors.inquiryType && <strong className="field-error">{errors.inquiryType}</strong>}
      </fieldset>

      <fieldset className="form-block">
        <legend>
          <b>02</b>
          {t.contact.step2}
        </legend>
        <div className="form-grid">{contactFields.map(renderField)}</div>
      </fieldset>

      <fieldset className="form-block">
        <legend>
          <b>03</b>
          {t.contact.step3}
        </legend>
        <label className="form-field">
          <span>
            {t.contact.messageLabel}
            <em className="is-required">{t.contact.required}</em>
          </span>
          <textarea
            name="message"
            rows={7}
            placeholder={t.contact.messagePlaceholder}
            aria-invalid={errors.message ? true : undefined}
            onInput={() => clearError("message")}
          />
          {errors.message && <strong className="field-error">{errors.message}</strong>}
        </label>

        <details className="form-details" open={Boolean(presetProduct) || undefined}>
          <summary>{t.contact.detailsToggle}</summary>
          <div className="form-details__body">
            <p>{t.contact.detailsHint}</p>
            <div className="form-grid">{detailFields.map(renderField)}</div>
          </div>
        </details>
      </fieldset>

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
