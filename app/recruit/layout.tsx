import JsonLd from "@/components/JsonLd";
import {
  jobOpenings,
  officeBuilding,
  officeLocality,
  officePostalCode,
  officeRegion,
  officeStreet,
} from "@/data/site";
import { absoluteUrl, createPageJsonLd, createPageMetadata, organizationId } from "@/lib/seo";

const title = "採用情報";
const description =
  "帆岩（ほいわ）の採用情報です。現在の募集状況と、自由応募の受付についてご案内します。";

export const metadata = createPageMetadata(title, description, "/recruit");

const jobLocation = {
  "@type": "Place",
  address: {
    "@type": "PostalAddress",
    postalCode: officePostalCode,
    addressRegion: officeRegion,
    addressLocality: officeLocality,
    streetAddress: `${officeStreet} ${officeBuilding}`,
    addressCountry: "JP",
  },
};

// JobPosting is emitted only for live openings. Publishing a posting with no
// real vacancy behind it — or leaving one up past validThrough — is what
// triggers a Google manual action, so an empty jobOpenings means no node here.
const jobPostings = jobOpenings.map((job, i) => ({
  "@type": "JobPosting",
  "@id": `${absoluteUrl("/recruit")}#job-${i + 1}`,
  title: job.title,
  description: job.description,
  datePosted: job.postedOn,
  validThrough: job.validThrough,
  employmentType: job.employmentType,
  totalJobOpenings: job.openings,
  hiringOrganization: { "@id": organizationId },
  jobLocation,
  applicantLocationRequirements: { "@type": "Country", name: "Japan" },
  ...(job.salaryMin !== undefined && job.salaryMax !== undefined
    ? {
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "JPY",
          value: {
            "@type": "QuantitativeValue",
            minValue: job.salaryMin,
            maxValue: job.salaryMax,
            unitText: "MONTH",
          },
        },
      }
    : {}),
  inLanguage: "ja",
  url: absoluteUrl("/recruit"),
}));

const jsonLd = createPageJsonLd("/recruit", title, description, jobPostings);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
