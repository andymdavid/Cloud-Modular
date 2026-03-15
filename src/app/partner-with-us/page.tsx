import type { Metadata } from "next";
import Link from "next/link";
import { contactDetails, partnerWithUsMailto } from "@/content/site";
import { cn } from "@/lib/utils";

const siteUrl = "https://cloudmodular.com.au";

export const metadata: Metadata = {
  title: "Get a Quote | Modular Construction Perth | Contact Us",
  description:
    "Get a quote for your modular construction project in Perth and Western Australia. Contact Cloud Modular for commercial, residential, healthcare, and education prefab building solutions.",
  alternates: {
    canonical: `${siteUrl}/partner-with-us/`,
  },
  openGraph: {
    title: "Partner With Cloud Modular | Get a Modular Construction Quote",
    description:
      "Discuss your next modular construction project with Perth's precision-engineered prefab building experts. Free consultation available.",
    url: `${siteUrl}/partner-with-us/`,
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
      name: "Partner With Us",
      item: `${siteUrl}/partner-with-us/`,
    },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${siteUrl}/partner-with-us/#contactpage`,
  url: `${siteUrl}/partner-with-us/`,
  name: "Contact Cloud Modular",
  description: "Get in touch with Cloud Modular to discuss your modular construction project in Perth and Western Australia.",
  mainEntity: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Cloud Modular",
    email: "info@cloudmodular.com.au",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Loftus St",
      addressLocality: "North Perth",
      addressRegion: "WA",
      postalCode: "6006",
      addressCountry: "AU",
    },
  },
};

export default function PartnerWithUsPage() {
  const bg = "bg-[#010101]";
  const text = "text-white";
  const textSubtle = "text-white";
  const textMuted = "text-white";
  const borderDivider = "border-white/5";
  const sectionLabelClass = "font-cal-sans text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]";
  const sectionSubcopyClass = "font-sans text-[14px] leading-[20px] text-white sm:text-[12px] sm:leading-[18px]";
  const sectionH3Class = "font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]";
  const sectionLabelIcon = (
    <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
      <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
      <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
      <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
    </svg>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      <div className={cn(bg, text)}>
        <section className="min-h-[45vh] grid grid-rows-[1fr_auto]">
          <div className="flex items-center">
            <div className="section-container w-full py-20">
              <div className="mx-auto max-w-4xl text-center">
                <div className={cn("inline-flex items-center gap-2", sectionLabelClass)}>
                  {sectionLabelIcon}
                  <span>Get In Touch</span>
                </div>
                <h1 className={cn("mt-6 font-host-grotesk text-[32px] font-bold leading-[34px] tracking-[-0.03em] sm:text-[48px] sm:leading-[50px] lg:text-[60px] lg:leading-[62px]", text)}>
                  Partner With Us.
                </h1>
                <p className={cn("mx-auto mt-3 max-w-[440px]", sectionSubcopyClass, textSubtle)}>
                  Let&apos;s discuss how Cloud Modular can deliver your project with precision and confidence.
                </p>
              </div>
            </div>
          </div>
          <div className={cn("relative left-1/2 w-screen -translate-x-1/2 border-b", borderDivider)}></div>
        </section>

        <section className="min-h-[55vh]">
          <div className="section-container py-20">
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className={cn("inline-flex items-center gap-2", sectionLabelClass)}>
                  {sectionLabelIcon}
                  <span>Address</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <h2 className={cn(sectionH3Class, text)}>Perth, Australia</h2>
                    <div className={cn("mt-3 space-y-1", sectionSubcopyClass)} style={{ color: "#ffffff" }}>
                      <p>Loftus St, North Perth</p>
                      <p>Western Australia, 6006</p>
                    </div>
                  </div>
                  <div>
                    <h2 className={cn(sectionH3Class, text)}>Foshan, China</h2>
                    <div className={cn("mt-3 space-y-1", sectionSubcopyClass)} style={{ color: "#ffffff" }}>
                      <p>3F, 48L, No.26 Lang Bao West Road</p>
                      <p>Foshan City, Guangdong Province</p>
                      <p>China</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className={cn("inline-flex items-center gap-2", sectionLabelClass)}>
                  {sectionLabelIcon}
                  <span>Connect</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <h2 className={cn(sectionH3Class, text)}>Email</h2>
                    <Link
                      href={partnerWithUsMailto}
                      className={cn("mt-3 inline-block font-sans text-[14px] leading-[20px] text-white transition hover:text-white/70 sm:text-[12px] sm:leading-[18px]")}
                    >
                      kannan@cloudmodular.com.au
                    </Link>
                  </div>
                  <div>
                    <h2 className={cn(sectionH3Class, text)}>General Enquiries</h2>
                    <p className={cn("mt-3", sectionSubcopyClass)} style={{ color: "#ffffff" }}>{contactDetails.hours}</p>
                  </div>
                  <div>
                    <h2 className={cn(sectionH3Class, text)}>LinkedIn</h2>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("mt-3 inline-block font-sans text-[14px] leading-[20px] text-white transition hover:text-white/70 sm:text-[12px] sm:leading-[18px]")}
                    >
                      Visit LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
