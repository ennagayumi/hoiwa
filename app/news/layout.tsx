import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("ニュース・お知らせ", "株式会社帆岩からのお知らせ、肥料・肥料原料の輸出入事業に関する最新情報をご案内します。", "/news");

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
