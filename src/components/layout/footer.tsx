import Link from "next/link";
import { contactDetails, footerLinks } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="section-container grid gap-10 py-16 md:grid-cols-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-mid-gray">
            Cloud Modular
          </p>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-white/80">
            Precision-engineered modular construction for Western Australia.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mid-gray">
            Quick Links
          </p>
          <ul className="mt-4 space-y-3 text-white/80">
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mid-gray">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-white/80">
            <li>
              <span className="block text-xs uppercase tracking-[0.2em] text-mid-gray">
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
              <span className="block text-xs uppercase tracking-[0.2em] text-mid-gray">
                Phone
              </span>
              <span className="text-white">
                {contactDetails.phone} (to be confirmed)
              </span>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-[0.2em] text-mid-gray">
                Location
              </span>
              <span>{contactDetails.location}</span>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-[0.2em] text-mid-gray">
                Business Hours
              </span>
              <span>{contactDetails.hours}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Cloud Modular. All rights reserved.
      </div>
    </footer>
  );
}
