import type { Metadata } from "next";
import { Cal_Sans, Host_Grotesk, Instrument_Serif, Inter } from "next/font/google";
import { ConditionalNavigation } from "@/components/layout/conditional-navigation";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const siteUrl = "https://cloudmodular.com.au";

// Organization JSON-LD Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Cloud Modular",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Precision-engineered modular construction company delivering prefabricated buildings certified to Australian standards for Perth, Western Australia and nationally.",
  email: "info@cloudmodular.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Loftus St",
    addressLocality: "North Perth",
    addressRegion: "WA",
    postalCode: "6006",
    addressCountry: "AU",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Perth",
      containedInPlace: {
        "@type": "State",
        name: "Western Australia",
      },
    },
    {
      "@type": "State",
      name: "Western Australia",
    },
    {
      "@type": "Country",
      name: "Australia",
    },
  ],
  sameAs: ["https://www.linkedin.com/company/cloudmodular"],
  knowsAbout: [
    "Modular Construction",
    "Prefabricated Buildings",
    "Offsite Construction",
    "Commercial Modular Buildings",
    "Residential Modular Construction",
    "Healthcare Modular Facilities",
  ],
};

// LocalBusiness JSON-LD Schema for Perth office
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#local-business`,
  name: "Cloud Modular",
  image: `${siteUrl}/logo.png`,
  url: siteUrl,
  telephone: "",
  email: "info@cloudmodular.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Loftus St",
    addressLocality: "North Perth",
    addressRegion: "WA",
    postalCode: "6006",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -31.9285,
    longitude: 115.8605,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  priceRange: "$$$",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: -31.9285,
      longitude: 115.8605,
    },
    geoRadius: "500000",
  },
};

// Service Schema for all service categories
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteUrl}/#services`,
  name: "Modular Construction Services",
  description: "Cloud Modular's prefabricated building services for Perth and Western Australia",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "Commercial Modular Buildings",
      description: "Office buildings, retail spaces, and mixed-use commercial developments built with precision-engineered modular construction.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Western Australia",
      serviceType: "Modular Construction",
    },
    {
      "@type": "Service",
      position: 2,
      name: "Multi-Residential Modular Construction",
      description: "Apartments, townhouses, and residential developments delivered faster with factory-built modular construction.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Western Australia",
      serviceType: "Modular Construction",
    },
    {
      "@type": "Service",
      position: 3,
      name: "Healthcare & Aged Care Modular Facilities",
      description: "Medical facilities and aged care residences built to Australian healthcare standards with modular construction methods.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Western Australia",
      serviceType: "Modular Construction",
    },
    {
      "@type": "Service",
      position: 4,
      name: "Education & Community Modular Buildings",
      description: "Schools, libraries, and community centres delivered with precision-engineered modular construction.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Western Australia",
      serviceType: "Modular Construction",
    },
    {
      "@type": "Service",
      position: 5,
      name: "Infrastructure Modular Construction",
      description: "Transit facilities and public infrastructure projects built with offsite modular construction methods.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Western Australia",
      serviceType: "Modular Construction",
    },
    {
      "@type": "Service",
      position: 6,
      name: "Hotels & Accommodation Modular Buildings",
      description: "Hotels, resorts, and short-term accommodation built faster with factory-controlled modular construction.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "Western Australia",
      serviceType: "Modular Construction",
    },
  ],
};

// WebSite Schema for sitelinks search
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Cloud Modular",
  description: "Precision-engineered modular construction for Perth and Western Australia",
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-AU",
};

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const hostGrotesk = Host_Grotesk({
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-host-grotesk",
});

const calSans = Cal_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cal-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Modular Construction Perth | Prefab Buildings WA | Cloud Modular",
    template: "%s | Cloud Modular",
  },
  description:
    "Perth's leading modular construction company. Build 50% faster with 20% cost savings. Australian-certified prefabricated buildings for commercial, residential & healthcare projects in Western Australia.",
  keywords: [
    "modular construction Perth",
    "prefab buildings WA",
    "modular homes Western Australia",
    "prefabricated construction Australia",
    "modular buildings Perth",
    "offsite construction WA",
    "commercial modular buildings",
    "residential modular construction",
    "healthcare modular facilities",
    "aged care modular buildings",
  ],
  authors: [{ name: "Cloud Modular" }],
  creator: "Cloud Modular",
  publisher: "Cloud Modular",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    title: "Modular Construction Perth | Prefab Buildings WA | Cloud Modular",
    description:
      "Build in weeks, not years. Perth's precision-engineered modular construction for developers. 50% faster, 20% cost savings, Australian certified.",
    type: "website",
    url: siteUrl,
    siteName: "Cloud Modular",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cloud Modular - Precision-Engineered Modular Construction Perth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modular Construction Perth | Cloud Modular",
    description:
      "Precision-engineered modular construction for Western Australia. Build 50% faster with Australian-certified prefab buildings.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have the verification codes
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  other: {
    "geo.region": "AU-WA",
    "geo.placename": "Perth",
    "geo.position": "-31.9285;115.8605",
    ICBM: "-31.9285, 115.8605",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <head>
        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#010101" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
      </head>
      <body className={`${instrumentSerif.variable} ${inter.variable} ${hostGrotesk.variable} ${calSans.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        <ConditionalNavigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
