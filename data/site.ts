export const contactEmail = "takeda@hoiwajapan.com";

export const navItems = [
  { label: "事業案内", en: "Business", href: "/business" },
  { label: "肥料原料", en: "Fertilizer", href: "/products" },
  { label: "機械・設備", en: "Machinery", href: "/machinery" },
  { label: "当社の強み", en: "Strengths", href: "/strengths" },
  { label: "企業情報", en: "Company", href: "/company" },
  { label: "ニュース", en: "News", href: "/news" },
] as const;

export const products = [
  {
    name: "硫酸マグネシウム",
    en: "Magnesium Sulfate",
    description: "主力品目。一水塩（全MgO 24%以上／26%以上）、無水（MgSO₄ 98/99%以上）、七水（MgO 16.06–16.27%）。天津の提携メーカーが製造し、帆岩が日本側の窓口です。",
    use: "配合肥料・BB、化成肥料原料",
    package: "25 kg / 50 kg PP袋、1 t ジャンボバッグ（20フィートで約20 t が目安）",
    region: "中国 → 日本、東南アジア、アフリカ",
  },
  {
    name: "硫酸アンモニウム",
    en: "Ammonium Sulfate",
    description: "窒素21%・硫黄24%を含む窒素質肥料。結晶、粒状など、粒径や窒素分に応じた規格を扱います。",
    use: "配合肥料・BB、化成肥料原料",
    package: "50 kg PP袋、1,250 kg ジャンボバッグ、バルク",
    region: "中国 → 日本、東南アジア、アフリカ",
    image: "/images/products/ammonium-sulfate-granule-scale.jpg",
  },
  {
    name: "尿素",
    en: "Urea",
    description: "窒素46%を含む代表的な窒素質肥料。粒状（グラニュラー）とプリルに対応。",
    use: "直接施用、配合肥料原料、工業用",
    package: "50 kg PP袋、1 t ジャンボバッグ、バルク",
    region: "中国ほか → 日本、東南アジア、アフリカ",
  },
  {
    name: "カリ肥料",
    en: "Potash Fertilizer",
    description: "塩化カリウム（MOP、K₂O 60%以上）と硫酸カリウム（SOP、K₂O 50%以上）。白色・赤色、粉状・粒状を選択可能。",
    use: "配合肥料原料、果樹・野菜",
    package: "50 kg PP袋、1 t ジャンボバッグ、バルク",
    region: "中国ほか → 日本、東南アジア、アフリカ",
  },
  {
    name: "りん酸系・複合肥料ほか",
    en: "Phosphates & NPK",
    description: "DAP、MAP、過リン酸石灰、重過リン酸石灰、NPK複合肥料。配合比率・粒度を指定した調達に対応。",
    use: "配合肥料原料、直接施用",
    package: "50 kg PP袋、1 t ジャンボバッグ、バルク",
    region: "中国ほか → 日本、東南アジア、アフリカ",
  },
  {
    name: "酸化マグネシウム・微量要素",
    en: "MgO & Micronutrients",
    description: "酸化マグネシウム、塩化マグネシウム、硫酸亜鉛、硫酸鉄、硫酸マンガン。粉・微粒・粒に対応。",
    use: "配合肥料原料、直接施用、土壌改良",
    package: "25 kg / 50 kg PP袋、ジャンボバッグ",
    region: "中国 → 日本、東南アジア、アフリカ",
  },
] as const;

export const strengths = [
  ["アジア・アフリカの取引ネットワーク", "日本・東南アジア・アフリカを対象に、肥料生産者、商社、物流事業者との接点を活かして取引を検討します。"],
  ["柔軟な調達対応", "商品、数量、時期、仕向地などの条件を整理し、案件ごとに適切な調達方法を組み立てます。"],
  ["仕様・品質の確認", "用途に必要な仕様、分析項目、品質条件を確認し、サプライヤーとの認識を丁寧に合わせます。"],
  ["貿易・物流の調整", "貿易条件、船積み、通関、国内配送まで、関係各社と連携しながら進行を管理します。"],
  ["長期的な取引関係", "単発の売買にとどまらず、継続的な情報交換と安定した取引関係の構築を重視します。"],
  ["市場変化への対応", "需給や物流環境の変化を捉え、代替調達や条件調整の可能性を速やかに検討します。"],
] as const;

export const flow = [
  ["ご要望の確認", "商品、用途、数量、納期、仕向地などを確認します。"],
  ["商品・供給元の選定", "国内外の候補から取引条件に合う商品と供給元を検討します。"],
  ["仕様・品質の確認", "規格、分析項目、見本、包装など必要事項を確認します。"],
  ["お見積り・条件調整", "価格、数量、インコタームズ、決済条件などをご提示します。"],
  ["契約", "合意した条件に基づき売買契約を締結します。"],
  ["輸送・通関", "船積み、必要書類、通関、国内輸送を関係各社と調整します。"],
  ["納品", "進捗を共有し、合意した場所・条件で商品をお届けします。"],
  ["継続フォロー", "納品後の確認を行い、次回調達や継続取引につなげます。"],
] as const;

export const newsItems = [
  { date: "2026.XX.XX", category: "お知らせ", title: "コーポレートサイトを公開しました。" },
  { date: "2026.XX.XX", category: "事業情報", title: "肥料原料の輸出入事業を開始しました。" },
  { date: "2026.XX.XX", category: "事業情報", title: "機械・設備の国際調達事業を開始しました。" },
] as const;
