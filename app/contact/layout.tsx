import JsonLd from "@/components/JsonLd";
import { brandTitle, createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "お問い合わせ";
const description = "肥料・肥料原料の調達、輸出入、仕様、数量、納期、仕向地に関するご相談は、帆岩へお問い合わせください。";

export const metadata = createPageMetadata(title, description, "/contact");

const jsonLd = createPageJsonLd("/contact", `${title}｜${brandTitle}`, description);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
