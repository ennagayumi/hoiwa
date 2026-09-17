import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("お問い合わせ", "肥料・肥料原料の調達、輸出入、仕様、数量、納期、仕向地に関するご相談は株式会社帆岩へお問い合わせください。", "/contact");

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
