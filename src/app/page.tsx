import type { Metadata } from "next";
import HomeV2 from "./home-v2/page";
import { faqItems } from "@/content/site";

const siteUrl = "https://cloudmodular.com.au";

// FAQ Schema for rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

// WebPage schema for homepage
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/#webpage`,
  url: siteUrl,
  name: "Modular Construction Perth | Prefab Buildings WA | Cloud Modular",
  description:
    "Perth's leading modular construction company. Build 50% faster with 20% cost savings. Australian-certified prefabricated buildings for commercial, residential & healthcare projects.",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@id": `${siteUrl}/#organization`,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${siteUrl}/hero-background.webp`,
  },
};

export const metadata: Metadata = {
  title: "Modular Construction Perth | Prefab Buildings WA | Cloud Modular",
  description:
    "Perth's leading modular construction company. Build 50% faster with 20% cost savings. Australian-certified prefabricated buildings for commercial, residential & healthcare projects in Western Australia.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Modular Construction Perth | Prefab Buildings WA | Cloud Modular",
    description:
      "Build in weeks, not years. Perth's precision-engineered modular construction for developers. 50% faster, 20% cost savings, Australian certified.",
    url: siteUrl,
  },
};

export default function HomePage() {
  return (
    <>
      {/* FAQ Schema for rich snippets in search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {/* WebPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <HomeV2 />
    </>
  );
}
