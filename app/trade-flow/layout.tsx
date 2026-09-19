import JsonLd from "@/components/JsonLd";
import { flow } from "@/data/site";
import { createPageJsonLd, createPageMetadata } from "@/lib/seo";

const title = "お取引の流れ｜肥料原料の調達から納品まで";
const description = "ご要望の確認、供給元選定、品質確認、見積り、契約、輸送・通関、納品、継続フォローまでの流れをご案内します。";

export const metadata = createPageMetadata(title, description, "/trade-flow");

const jsonLd = createPageJsonLd("/trade-flow", title, description, [
  {
    "@type": "HowTo",
    name: "肥料原料のお取引の流れ",
    description,
    step: flow.map(([name, text], i) => ({ "@type": "HowToStep", position: i + 1, name, text })),
  },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
