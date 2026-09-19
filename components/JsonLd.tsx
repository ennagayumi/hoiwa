// Server component: serialises structured data into a <script type="application/ld+json">.
// "<" is escaped so user-visible strings can never terminate the script tag.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
