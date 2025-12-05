import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { projectShowcase } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Work - Cloud Modular Projects Across Asia-Pacific",
  description:
    "Explore Cloud Modular&rsquo;s precision-engineered modular construction projects across Shenzhen, Hong Kong, Melbourne, Auckland, and beyond.",
};

export default function OurWorkPage() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[60vh] overflow-hidden text-white">
        <Image
          src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80"
          alt="Aerial view of modular development"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-4xl font-serif leading-tight md:text-5xl">
              Delivering excellence across the Asia-Pacific
            </h1>
            <p className="text-lg text-white/85">
              From Shenzhen to Melbourne, our precision-engineered modular spaces are transforming how developments are delivered.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="section-container-wide">
          <SectionHeading
            label="Portfolio"
            title="Featured work"
            description="Quality over quantity—each project demonstrates speed, precision, and the ability to scale."
            align="center"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {projectShowcase.map((project) => (
              <ProjectCard
                key={`${project.title}-${project.location}`}
                {...project}
                variant="stacked"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-20 text-center">
        <div className="section-container space-y-6">
          <h2 className="text-4xl text-charcoal">
            Ready to deliver your next project?
          </h2>
          <p className="text-lg text-mid-gray">
            See how Cloud Modular can transform your development with speed, quality, and scale.
          </p>
          <Link
            href="/partner-with-us"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Partner With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
