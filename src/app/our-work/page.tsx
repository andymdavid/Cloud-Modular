import type { Metadata } from "next";

const siteUrl = "https://cloudmodular.com.au";

export const metadata: Metadata = {
  title: "Projects | Modular Construction Case Studies Perth",
  description:
    "Explore Cloud Modular's prefabricated building projects across Western Australia. Commercial, residential, healthcare, and education modular construction case studies coming soon.",
  alternates: {
    canonical: `${siteUrl}/our-work/`,
  },
  openGraph: {
    title: "Our Work | Modular Construction Projects Perth WA",
    description:
      "See how Cloud Modular delivers precision-engineered modular buildings for developers across Western Australia.",
    url: `${siteUrl}/our-work/`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: `${siteUrl}/our-work/`,
    },
  ],
};

export default function OurWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <div className="bg-[#080a0a] min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-serif mb-4">Projects</h1>
          <p className="text-white/70">Coming soon</p>
        </div>
      </div>
    </>
  );
}
