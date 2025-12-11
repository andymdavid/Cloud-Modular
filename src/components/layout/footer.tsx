import Link from "next/link";
import Image from "next/image";
import { contactDetails, footerLinks } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[#080a0a] text-white">
      <div className="w-[80%] mx-auto border-t border-white/5"></div>
      <div className="section-container grid gap-10 py-16 md:grid-cols-[40%_1fr_1fr_1fr]">
        {/* Logo and Tagline - 40% width */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Cloud Modular"
              width={160}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-white/70">
            Thoughtful design, precise manufacturing and dependable delivery.
          </p>
        </div>

        {/* Discover - Site Links */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
            Discover
          </p>
          <ul className="mt-4 space-y-3 text-white/70">
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
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
            Connect
          </p>
          <ul className="mt-4 space-y-3 text-white/70">
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
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
            Address
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-semibold text-white/60 mb-2">
                Perth, Australia
              </p>
              <p className="text-white/70">Loftus St, North Perth</p>
              <p className="text-white/70">Western Australia, 6006</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/60 mb-2">
                Foshan, China
              </p>
              <p className="text-white/70">3F, 48L, No.26 Lang Bao West Road</p>
              <p className="text-white/70">Foshan City, Guangdong Province</p>
              <p className="text-white/70">China</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Cloud Modular. All rights reserved.
      </div>
    </footer>
  );
}
