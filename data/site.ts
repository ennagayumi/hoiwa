export const contactEmail = "info@hoiwajapan.com";
export const representativeName = "居亦露";
export const establishedOn = "2026年9月30日";
export const capital = "600万円";

export const operatorName = "京古斎合同会社";
export const officePostalCode = "273-0035";
export const officeRegion = "千葉県";
export const officeLocality = "船橋市";
export const officeStreet = "本中山3丁目25番2号";
export const officeBuilding = "中山第二マンション208号室";
export const officeAddressLine = `〒${officePostalCode} ${officeRegion}${officeLocality}${officeStreet} ${officeBuilding}`;
const officeMapQuery = `${officeRegion}${officeLocality}${officeStreet} ${officeBuilding}`;
export const officeMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeMapQuery)}`;
export const officeMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(officeMapQuery)}&ll=35.7128493,139.9414012&z=16&hl=ja&output=embed`;

export const navItems = [
  { label: "事業案内", en: "Business", href: "/business" },
  { label: "肥料原料", en: "Fertilizer", href: "/products" },
  { label: "当社の強み", en: "Strengths", href: "/strengths" },
  { label: "企業情報", en: "Company", href: "/company" },
  { label: "ニュース", en: "News", href: "/news" },
] as const;

export const products = [
  {
    name: "硫酸アンモニウム",
    en: "Ammonium Sulfate",
    description: "窒素21%・硫黄24%を含む窒素質肥料。結晶、粒状など、粒径や窒素分に応じた規格を扱います。",
    use: "配合肥料・BB、化成肥料原料",
    package: "50 kg PP袋、1,250 kg ジャンボバッグ、バルク",
    region: "中国 → 日本",
    image: "/images/products/ammonium-sulfate-granule-scale.jpg",
  },
  {
    name: "硫酸マグネシウム",
    en: "Magnesium Sulfate",
    description: "主力品目。一水塩（全MgO 24%以上／26%以上）、無水（MgSO₄ 98/99%以上）、七水（MgO 16.06–16.27%）。",
    use: "配合肥料・BB、化成肥料原料",
    package: "25 kg / 50 kg PP袋、1 t ジャンボバッグ（20フィートで約20 t が目安）",
    region: "中国 → 日本",
  },
  {
    name: "尿素",
    en: "Urea",
    description: "農業用グレード。全窒素（乾基）46.4%以上、ビウレット0.9%以下。白色の球形粒。",
    use: "配合肥料原料、直接施用",
    package: "50 kg PP袋（内袋あり）、1,000 kg ジャンボバッグ",
    region: "中国 → 日本",
  },
  {
    name: "カリ肥料",
    en: "Potash Fertilizer",
    description: "塩化カリウム（MOP、K₂O 60%以上）と硫酸カリウム（SOP、K₂O 50%以上）。白色・赤色、粉状・粒状を選択可能。",
    use: "配合肥料原料、果樹・野菜",
    package: "50 kg PP袋、1 t ジャンボバッグ、バルク",
    region: "中国ほか → 日本",
  },
  {
    name: "りん酸系・複合肥料ほか",
    en: "Phosphates & NPK",
    description: "DAP、MAP、過リン酸石灰、重過リン酸石灰、NPK複合肥料。配合比率・粒度を指定した調達に対応。",
    use: "配合肥料原料、直接施用",
    package: "50 kg PP袋、1 t ジャンボバッグ、バルク",
    region: "中国ほか → 日本",
  },
  {
    name: "酸化マグネシウム・微量要素",
    en: "MgO & Micronutrients",
    description: "酸化マグネシウム、塩化マグネシウム、硫酸亜鉛、硫酸鉄、硫酸マンガン。粉・微粒・粒に対応。",
    use: "配合肥料原料、直接施用、土壌改良",
    package: "25 kg / 50 kg PP袋、ジャンボバッグ",
    region: "中国 → 日本",
  },
] as const;

export const strengths = [
  ["日本向けの供給", "天津の提携メーカーから、日本のお客様へ肥料原料を供給します。"],
  ["柔軟な調達対応", "商品、数量、時期、仕向地などの条件を整理し、案件ごとに調達方法をご提案します。"],
  ["仕様・品質の確認", "用途に必要な仕様、分析項目、品質条件を確認し、サプライヤーとの認識を丁寧に合わせます。"],
  ["貿易・物流の調整", "貿易条件、船積み、通関、国内配送まで、関係各社と連携しながら進行を管理します。"],
  ["長期的な取引関係", "単発の売買にとどまらず、継続的な情報交換と安定した取引関係の構築を重視します。"],
  ["市場変化への対応", "需給や物流環境の変化を捉え、代替調達や条件調整の可能性を速やかに検討します。"],
] as const;

export const flow = [
  ["ご要望の確認", "商品、用途、数量、納期、仕向地などを確認します。"],
  ["商品・供給元の選定", "国内外の候補から取引条件に合う商品と供給元を検討します。"],
  ["仕様・品質の確認", "規格、分析項目、見本、包装など必要事項を確認します。品質についてのご連絡は、京古斎合同会社が窓口となり、確認と対応を行います。"],
  ["お見積り・条件調整", "価格、数量、インコタームズ、決済条件などをご提示します。"],
  ["契約", "売買契約の相手方は京古斎合同会社です。合意した条件に基づき締結します。"],
  ["輸送・通関", "船積み、必要書類、通関、国内輸送を関係各社と調整します。"],
  ["納品", "進捗を共有し、合意した場所・条件で商品をお届けします。"],
  ["継続フォロー", "納品後の確認を行い、次回調達や継続取引につなげます。"],
] as const;

// 採用情報。jobOpenings が空のあいだ、/recruit は「現在、募集は行っておりません」
// と表示し、JobPosting の構造化データも出力しない。実際に募集を始めるときに
// ここへ 1 件追加すれば、ページ表示と構造化データの両方が有効になる。
//
// 追加するときの注意:
//  - 募集要項は職業安定法第5条の3が明示を求める事項（業務内容、契約期間、
//    就業場所、就業時間、賃金、加入保険）を必ず埋めること。表示用の文章は
//    data/translations.ts の recruit.jobs 側に、同じ件数ぶん用意する。
//  - validThrough を過ぎた求人を JobPosting として出し続けると Google の
//    手動対策の対象になるため、募集終了時はこの配列から削除する。
export type JobOpening = {
  title: string;
  en: string;
  /** schema.org employmentType: FULL_TIME / PART_TIME / CONTRACTOR など。 */
  employmentType: string;
  openings: number;
  description: string;
  /** 月額。賃金を公開しない場合は両方 undefined にすると baseSalary を省く。 */
  salaryMin?: number;
  salaryMax?: number;
  postedOn: string;
  validThrough: string;
};

export const jobOpenings: readonly JobOpening[] = [];
