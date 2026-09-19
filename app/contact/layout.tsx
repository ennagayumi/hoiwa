import JsonLd from "@/components/JsonLd";
import { createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "お問い合わせ";
const description = "肥料・肥料原料の調達、輸出入、仕様、数量、納期、仕向地に関するご相談は株式会社帆岩へお問い合わせください。";

export const metadata = createPageMetadata(title, description, "/contact");

const jsonLd = createPageJsonLd("/contact", `${title}｜株式会社帆岩`, description);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
