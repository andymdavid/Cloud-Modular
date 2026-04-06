import Link from "next/link";
import Image from "next/image";
import { contactDetails, footerLinks } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[#000000] text-white">
      <div className="border-t border-white/5"></div>
      <div className="mx-auto w-full max-w-[1200px] px-8 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[40%_1fr_1fr_1fr]">
        {/* Logo and Tagline - 40% width */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/logo.webp"
              alt="Cloud Modular"
              width={160}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-sm font-sans text-[12px] leading-[18px] text-white/70 sm:text-[13px] sm:leading-[19px]">
            Thoughtful design, precise manufacturing and dependable delivery.
          </p>
        </div>

        {/* Discover - Site Links */}
        <div>
          <p className="font-cal-sans text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]">
            Discover
          </p>
          <ul className="mt-4 space-y-3 font-sans text-[12px] leading-[18px] text-white/70">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect - Contact and LinkedIn */}
        <div>
          <p className="font-cal-sans text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]">
            Connect
          </p>
          <ul className="mt-4 space-y-3 font-sans text-[12px] leading-[18px] text-white/70">
            <li>
              <Link
                href="/partner-with-us"
                className="transition-colors hover:text-white"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <p className="font-cal-sans text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]">
            Address
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="mb-2 font-host-grotesk text-[14px] font-medium leading-[16px] tracking-[-0.03em] text-white/70">
                Perth, Australia
              </p>
              <p className="font-sans text-[12px] leading-[18px] text-white/70">Loftus St, North Perth</p>
              <p className="font-sans text-[12px] leading-[18px] text-white/70">Western Australia, 6006</p>
            </div>
            <div>
              <p className="mb-2 font-host-grotesk text-[14px] font-medium leading-[16px] tracking-[-0.03em] text-white/70">
                Foshan, China
              </p>
              <p className="font-sans text-[12px] leading-[18px] text-white/70">3F, 48L, No.26 Lang Bao West Road</p>
              <p className="font-sans text-[12px] leading-[18px] text-white/70">Foshan City, Guangdong Province</p>
              <p className="font-sans text-[12px] leading-[18px] text-white/70">China</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="border-t border-white/5 py-3 text-center font-sans text-[12px] leading-[18px] text-white/40">
        © {new Date().getFullYear()} Cloud Modular. All rights reserved.
      </div>
    </footer>
  );
}
