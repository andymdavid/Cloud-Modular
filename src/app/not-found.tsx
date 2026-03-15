import type { Metadata } from "next";
import Link from "next/link";
import { partnerWithUsMailto } from "@/content/site";

export const metadata: Metadata = {
  title: "Page Not Found | Cloud Modular",
  description:
    "The page you're looking for doesn't exist. Return to Cloud Modular's homepage to explore our modular construction services in Perth and Western Australia.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#010101] px-6 text-white">
      <div className="mx-auto max-w-md text-center">
        <p className="font-cal-sans text-[11px] uppercase tracking-[0.01em] text-white/40">
          Error 404
        </p>
        <h1 className="mt-4 font-host-grotesk text-[32px] font-medium leading-[34px] tracking-[-0.03em]">
          Page not found
        </h1>
        <p className="mt-4 text-[14px] leading-[20px] text-white/70">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-[30px] min-w-[138px] items-center justify-center rounded-[2px] bg-white px-[16px] py-[6px] text-[11px] font-semibold text-[#010101] transition hover:bg-[#d9d4ce]"
          >
            Back to Home
          </Link>
          <Link
            href={partnerWithUsMailto}
            className="inline-flex h-[30px] min-w-[138px] items-center justify-center rounded-[2px] border border-white/20 px-[16px] py-[6px] text-[11px] font-semibold text-white transition hover:border-white/40"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
