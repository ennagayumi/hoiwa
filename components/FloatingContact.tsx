"use client";

import { useEffect, useRef, useState } from "react";
import { lineQrImage, salesEmail } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // 埋め込み表示などで権限が拒否された場合は、下の方法で再試行する。
    }
  }
  // http でのプレビューや古いブラウザでは Clipboard API が使えないため、選択してコピーする。
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  if (!ok) throw new Error("copy_failed");
}

export default function FloatingContact() {
  const { t } = useLanguage();
  const [lineOpen, setLineOpen] = useState(false);
  const [toast, setToast] = useState<"copied" | "failed" | null>(null);
  const [showTop, setShowTop] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!lineOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setLineOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLineOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [lineOpen]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const onCopy = async () => {
    setLineOpen(false);
    try {
      await copyText(salesEmail);
      setToast("copied");
    } catch {
      setToast("failed");
    }
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  };

  return (
    <div className="floating-contact" ref={rootRef}>
      <ul className="floating-contact__bar" aria-label={t.floating.aria}>
        <li>
          <button
            type="button"
            className="floating-contact__btn floating-contact__btn--line"
            aria-expanded={lineOpen}
            aria-controls="floating-line-panel"
            onClick={() => setLineOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3.2c-5 0-9 3.3-9 7.4 0 3.7 3.2 6.8 7.6 7.3.3.1.7.2.8.5.1.2.1.6 0 .9l-.1.8c0 .2-.2.9.8.5s5.4-3.2 7.4-5.4c1.4-1.5 2-3 2-4.6 0-4.1-4-7.4-9-7.4Z" fill="currentColor" />
              <path d="M7.2 8.7v3.9h2.3M10.8 8.7v3.9M12.5 12.6V8.7l2.6 3.9V8.7M18.3 8.7h-2v3.9h2M16.3 10.6h1.9" fill="none" stroke="#06c755" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{t.floating.line}</span>
          </button>
        </li>
        <li>
          <button type="button" className="floating-contact__btn" onClick={onCopy} title={t.floating.emailTitle}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.5 5.5h17v13h-17z" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="m4 6.5 8 6.5 8-6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span>{t.floating.email}</span>
          </button>
        </li>
        <li className={`floating-contact__top${showTop ? " is-visible" : ""}`}>
          <button type="button" className="floating-contact__btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={t.floating.top} tabIndex={showTop ? 0 : -1}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
            <span>TOP</span>
          </button>
        </li>
      </ul>

      <div id="floating-line-panel" className={`floating-contact__panel${lineOpen ? " is-open" : ""}`} role="dialog" aria-label={t.floating.lineTitle} hidden={!lineOpen}>
        <button type="button" className="floating-contact__close" onClick={() => setLineOpen(false)} aria-label={t.floating.close}>×</button>
        <strong>{t.floating.lineTitle}</strong>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lineQrImage} alt={t.floating.qrAlt} width={180} height={180} />
        <p>{t.floating.lineDesc}</p>
      </div>

      <p className={`floating-contact__toast${toast ? " is-visible" : ""}${toast === "failed" ? " is-error" : ""}`} role="status" aria-live="polite">
        {toast === "copied" ? (
          <>
            <b>{t.floating.copied}</b>
            <span>{salesEmail}</span>
          </>
        ) : toast === "failed" ? (
          <>
            <b>{t.floating.copyFailed}</b>
            <span>{salesEmail}</span>
          </>
        ) : null}
      </p>
    </div>
  );
}
