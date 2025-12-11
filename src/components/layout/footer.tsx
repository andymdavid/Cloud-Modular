import Link from "next/link";
import Image from "next/image";
import { contactDetails, footerLinks } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[#080a0a] text-white">
      <div className="section-container grid gap-10 py-16 md:grid-cols-3">
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
            Precision-engineered modular construction for Western Australia.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
            Quick Links
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
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-white/70">
            <li>
              <span className="block text-xs uppercase tracking-[0.4em] text-white/40">
                Email
              </span>
              <a
                href={`mailto:${contactDetails.email}`}
                className="text-white transition-colors hover:text-warm-white"
              >
                {contactDetails.email}
              </a>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-[0.4em] text-white/40">
                Phone
              </span>
              <span className="text-white">
                {contactDetails.phone} (to be confirmed)
              </span>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-[0.4em] text-white/40">
                Location
              </span>
              <span>{contactDetails.location}</span>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-[0.4em] text-white/40">
                Business Hours
              </span>
              <span>{contactDetails.hours}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Cloud Modular. All rights reserved.
      </div>
    </footer>
  );
}
