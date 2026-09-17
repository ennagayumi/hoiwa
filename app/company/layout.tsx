import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("企業情報", "肥料・肥料原料を中核に、日本とアジア・アフリカをつなぐ国際貿易会社、株式会社帆岩の企業情報と理念をご紹介します。", "/company");

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
