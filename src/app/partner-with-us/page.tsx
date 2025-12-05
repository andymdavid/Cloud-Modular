import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import {
  contactDetails,
  detailedProcess,
  expectList,
  inclusions,
  partnerBenefits,
  projectTypes,
} from "@/content/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partner With Us - Cloud Modular | Precision-Engineered Construction",
  description:
    "Partner with Cloud Modular for faster, more cost-effective modular construction in Western Australia. Contact us to discuss your next development.",
};

export default function PartnerWithUsPage() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[60vh] overflow-hidden text-white">
        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
          alt="Executive handshake over architectural plans"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-forest/80" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-4xl font-serif leading-tight md:text-5xl">
              Partner with precision, deliver with confidence
            </h1>
            <p className="text-lg text-white/85">
              From initial concept to final installation, we&rsquo;re with you every step of the way.
            </p>
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="py-24 md:py-32">
        <div className="section-container">
          <SectionHeading
            label="Why choose us"
            title="A partner built for scale"
            align="center"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {partnerBenefits.map((benefit) => (
              <div key={benefit.title} className="rounded-sm border border-light-gray p-8">
                <h3 className="text-2xl text-forest">{benefit.title}</h3>
                <p className="mt-4 text-base text-mid-gray">{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-warm-white py-24 md:py-32">
        <div className="section-container space-y-16">
          <SectionHeading
            label="Our process"
            title="From brief to installation"
            align="center"
          />
          <div className="space-y-24">
            {detailedProcess.map((step, index) => (
              <div
                key={step.title}
                className="grid gap-10 lg:grid-cols-2 lg:items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-last" : undefined}>
                  <p className="section-label text-forest">{step.step}</p>
                  <h3 className="mt-4 text-3xl text-charcoal">
                    {step.title}
                  </h3>
                  <ul className="mt-6 space-y-3 text-mid-gray">
                    {step.description.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-forest">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 inline-block rounded-sm bg-white px-4 py-2 text-sm font-medium text-forest">
                    {step.duration}
                  </p>
                </div>
                <div className="relative h-[420px] w-full overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="section-container">
          <SectionHeading
            label="What's included"
            title="Everything you need, fully integrated"
            align="center"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {inclusions.map((item) => (
              <div key={item.title} className="rounded-sm border border-light-gray p-8">
                <h3 className="text-2xl text-charcoal">{item.title}</h3>
                <p className="mt-4 text-base text-mid-gray">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-24 md:py-32">
        <div className="section-container">
          <SectionHeading
            label="Who we work with"
            title="Ideal for a wide range of developments"
            align="center"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {projectTypes.map((type) => (
              <div key={type.title} className="rounded-sm bg-white p-8 shadow-subtle">
                <h3 className="text-2xl text-forest">{type.title}</h3>
                <p className="mt-4 text-base text-mid-gray">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 md:py-32">
        <div className="section-container grid gap-12 lg:grid-cols-[3fr_2fr]">
          <div>
            <SectionHeading
              title="Let&rsquo;s start the conversation"
              description="Tell us about your project and we&rsquo;ll get back to you within 24 hours."
            />
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
          <div className="rounded-sm border border-light-gray p-8">
            <h3 className="text-2xl text-charcoal">Get in Touch</h3>
            <ul className="mt-6 space-y-4 text-mid-gray">
              <li>
                <span className="block text-xs uppercase tracking-[0.3em] text-mid-gray">
                  Email
                </span>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-charcoal"
                >
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-[0.3em] text-mid-gray">
                  Phone
                </span>
                <span>{contactDetails.phone} (to be confirmed)</span>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-[0.3em] text-mid-gray">
                  Location
                </span>
                <span>{contactDetails.location}</span>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-[0.3em] text-mid-gray">
                  Business Hours
                </span>
                <span>{contactDetails.hours}</span>
              </li>
            </ul>
            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-mid-gray">
                What to expect
              </p>
              <ul className="mt-4 space-y-2 text-mid-gray">
                {expectList.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-forest">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-white">
        <div className="section-container space-y-6 text-center">
          <h2 className="text-4xl">
            Join the builders and developers transforming WA&rsquo;s construction landscape
          </h2>
          <Link
            href="/partner-with-us"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
