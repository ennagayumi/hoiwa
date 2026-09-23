import { contactEmail } from "../data/site";

export type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

const MAX = {
  company: 200,
  name: 120,
  country: 120,
  email: 200,
  phone: 40,
  product: 200,
  quantity: 120,
  spec: 400,
  port: 200,
  terms: 200,
  inquiryType: 200,
  message: 5000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldKey = keyof typeof MAX;

export type ContactPayload = Record<FieldKey, string> & { website?: string };

function clip(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

export function parseContactPayload(input: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "invalid_body" };
  const raw = input as Record<string, unknown>;

  // Honeypot: bots fill this hidden field.
  if (clip(raw.website, 200)) return { ok: false, error: "rejected" };

  const data = {
    company: clip(raw.company, MAX.company),
    name: clip(raw.name, MAX.name),
    country: clip(raw.country, MAX.country),
    email: clip(raw.email, MAX.email),
    phone: clip(raw.phone, MAX.phone),
    product: clip(raw.product, MAX.product),
    quantity: clip(raw.quantity, MAX.quantity),
    spec: clip(raw.spec, MAX.spec),
    port: clip(raw.port, MAX.port),
    terms: clip(raw.terms, MAX.terms),
    inquiryType: clip(raw.inquiryType, MAX.inquiryType),
    message: clip(raw.message, MAX.message),
  };

  if (!data.company || !data.name || !data.email || !data.inquiryType || !data.product) {
    return { ok: false, error: "missing_fields" };
  }
  if (!EMAIL_RE.test(data.email)) return { ok: false, error: "invalid_email" };

  return { ok: true, data };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildMessage(data: ContactPayload): { subject: string; text: string; html: string } {
  const rows: [string, string][] = [
    ["種別", data.inquiryType],
    ["貴社名", data.company],
    ["ご担当者様名", data.name],
    ["メール", data.email],
    ["電話", data.phone],
    ["ご希望の製品", data.product],
    ["希望数量（年間・トン）", data.quantity],
  ];

  const filled = rows.filter(([, value]) => value);
  const text = [...filled.map(([label, value]) => `${label}: ${value}`), ...(data.message ? ["", "その他特記事項", data.message] : [])].join("\n");
  const htmlRows = filled
    .map(([label, value]) => `<tr><th align="left" style="padding:6px 16px 6px 0;color:#555;white-space:nowrap">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`)
    .join("");

  return {
    subject: `【お問い合わせ】${data.inquiryType} / ${data.company}`,
    text,
    html: `<div style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#102840">
      <table>${htmlRows}</table>
      ${data.message ? `<p style="margin:24px 0 8px;font-weight:600">その他特記事項</p><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>` : ""}
    </div>`,
  };
}

export async function sendContactMail(data: ContactPayload, env: ContactEnv): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = env.RESEND_API_KEY?.trim();
  if (!apiKey) return { ok: false, error: "not_configured" };

  const to = env.CONTACT_TO_EMAIL?.trim() || contactEmail;
  const from = env.CONTACT_FROM_EMAIL?.trim() || `Hoiwa Website <${contactEmail}>`;
  const message = buildMessage(data);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Resend rejected contact mail", response.status, detail);
    return { ok: false, error: "send_failed" };
  }

  return { ok: true };
}

export async function handleContactRequest(request: Request, env: ContactEnv): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const parsed = parseContactPayload(body);
  if (!parsed.ok) {
    if (parsed.error === "rejected") return Response.json({ ok: true });
    return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const sent = await sendContactMail(parsed.data, env);
  if (!sent.ok) {
    return Response.json({ ok: false, error: sent.error }, { status: sent.error === "not_configured" ? 503 : 502 });
  }

  return Response.json({ ok: true });
}
