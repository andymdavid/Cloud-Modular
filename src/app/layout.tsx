import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default:
      "Cloud Modular - Precision-Engineered Modular Construction | Western Australia",
    template: "%s | Cloud Modular",
  },
  description:
    "Cloud Modular delivers high-quality modular spaces 50% faster, with 20% cost reduction and 70% less landfill.",
  openGraph: {
    title: "Cloud Modular - Precision-Engineered Modular Construction",
    description:
      "Build in weeks, not years. Precision-engineered modular construction for Western Australian developers.",
    type: "website",
    url: "https://cloudmodular.com.au",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Modular",
    description:
      "Precision-engineered modular construction for Western Australia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${inter.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
