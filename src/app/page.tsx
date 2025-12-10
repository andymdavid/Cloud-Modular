import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { FAQ } from "@/components/faq";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import {
  audienceSegments,
  credibilityStats,
  faqItems,
  featureHighlights,
  heroMetrics,
  homeProjects,
  processOverview,
  valuePropositions,
} from "@/content/site";
import { CapabilitiesSection } from "@/components/capabilities";
import { AdvantageCard } from "@/components/advantage-card";

const heroHighlights = [
  {
    title: "Design governance",
    body: "Coordinated architecture, engineering, and compliance reviews keep every module on brief before production starts.",
  },
  {
    title: "Factory telemetry",
    body: "Live manufacturing data keeps developers informed on QA status, delivery windows, and install sequencing.",
  },
  {
    title: "Site readiness",
    body: "Sequenced logistics and install playbooks reduce crane time and on-site disruption for faster turnovers.",
  },
  {
    title: "Lifecycle insight",
    body: "Post-install reviews capture lessons for the next project, making each delivery smarter than the last.",
  },
];

const advantageCards = [
  {
    image: "/Card1.png",
    label: "Compliance",
    title: "Certified to Australian standards",
    content: [
      "Every module meets Australian Building Codes and state regulations before leaving the factory.",
      "Pre-certified structural engineering reduces approvals risk and speeds consent timelines.",
      "Third-party inspections during production ensure quality control at every stage."
    ],
  },
  {
    image: "/Card2.png",
    label: "Speed",
    title: "Offsite manufacturing is faster",
    content: [
      "Concurrent site prep and factory production cut total project time by months.",
      "Weather-independent assembly keeps schedules predictable year-round.",
      "Rapid on-site installation minimises disruption and accelerates handover."
    ],
  },
  {
    image: "/Card3.png",
    label: "Quality",
    title: "Precision and consistency",
    content: [
      "Controlled factory environments eliminate variability and reduce defects.",
      "Standardised processes ensure consistent quality across every module.",
      "Built-in quality checkpoints catch issues before they reach site."
    ],
  },
  {
    image: "/Card4.png",
    label: "Flexibility",
    title: "Tailored to specifications",
    content: [
      "Modular design adapts to unique site constraints and spatial requirements.",
      "Configurable layouts suit residential, commercial, and mixed-use needs.",
      "Scalable solutions grow with your project demands and budget."
    ],
  },
  {
    image: "/Card5.png",
    label: "Cost Effectiveness",
    title: "Significant cost savings",
    content: [
      "Factory efficiency reduces labour costs and material waste by up to 20%.",
      "Shorter timelines mean lower financing costs and faster revenue generation.",
      "Predictable pricing with fewer on-site surprises protects your margins."
    ],
  },
  {
    image: "/Card6.png",
    label: "Sustainability",
    title: "Reduced environmental impact",
    content: [
      "Offsite construction generates 70% less landfill than traditional builds.",
      "Optimised material usage and recycling programs minimise waste.",
      "Energy-efficient manufacturing processes reduce the carbon footprint of every module."
    ],
  },
];

const pillarCardOverlay = {
  backgroundImage: [
    "linear-gradient(to top, rgba(8,10,10,1) 0%, rgba(8,10,10,0.95) 22%, rgba(8,10,10,0.4) 55%, rgba(8,10,10,0.05) 78%, rgba(8,10,10,0) 100%)",
    "linear-gradient(to left, rgba(8,10,10,0.85) 0%, rgba(8,10,10,0.55) 25%, rgba(8,10,10,0.18) 60%, rgba(8,10,10,0.05) 80%, rgba(8,10,10,0) 100%)",
  ].join(", "),
};

export default function Home() {
  return (
    <>
      <section className="bg-[#080a0a] text-white">
        <div className="grid min-h-[calc(150vh-4rem)] grid-rows-[minmax(50vh,0.35fr)_minmax(100vh,0.65fr)] pt-16">
          <div className="flex min-h-[50vh] items-end px-6 pb-12 pt-24 text-center sm:pt-28 sm:pb-16 lg:px-20">
            <div className="mx-auto w-full max-w-4xl">
              <h1 className="hero-heading text-[37px] leading-[48px] text-[#f7f8f8] sm:text-[48px] sm:leading-[55px] lg:text-[60px] lg:leading-[63px]">
                Premium modular spaces,<br />built in weeks, not years.
              </h1>
              <p className="mx-auto mt-5 w-full font-sans text-lg text-white/70 sm:max-w-[90%]">
                We deliver architecturally crafted modular buildings, combining global offsite manufacturing with
                rigorous engineering certification to ensure faster delivery and genuine certainty.
              </p>
              <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/partner-with-us"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "sm" }),
                    "px-5 text-sm font-semibold bg-white text-forest hover:bg-warm-white",
                  )}
                >
                  Partner With Us
                </Link>
                <Link
                  href="/our-work"
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
                >
                  View Our Work
                  <span aria-hidden className="text-base">&gt;</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative min-h-[100vh]">
            <Image
              src="/hero-background.png"
              alt="Modern modular building exterior"
              fill
              priority
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,rgba(10,10,10,0.6)_12%,transparent_35%,transparent_65%,rgba(10,10,10,0.6)_88%,#0a0a0a_100%)]"
              aria-hidden
            />
          </div>
        </div>
      </section>

      <section className="min-h-[65vh] bg-[#080a0a] flex flex-col items-center justify-center">
        <div className="section-container text-center flex-1 flex flex-col items-center justify-center">
          <h2 className="hero-heading text-[21px] text-white">
            Partnering with leading architectural, engineering, and procurement teams.
          </h2>
          <p className="hero-heading -mt-1 text-[21px] text-[#8e939c]">
            Delivering fully compliant and thoughtfully designed projects.
          </p>
          <div className="mt-12 flex items-center justify-center gap-8 md:gap-12">
            <div className="flex h-16 w-32 items-center justify-center text-white/50">Dec</div>
            <div className="flex h-16 w-32 items-center justify-center text-white/50">Arc</div>
            <div className="flex h-16 w-32 items-center justify-center text-white/50">CP</div>
          </div>
        </div>
        <div className="w-[80%] border-b border-white/5"></div>
      </section>

      <section className="min-h-[150vh] bg-[#080a0a] text-white flex flex-col pt-24">
        <div className="section-container flex-1">
          <div className="text-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">What we do</p>
              <h2 className="text-[30px] leading-[33px] text-white lg:text-[40px] lg:leading-[40px]">
                Design-informed, precisely manufactured modular<br />buildings built to Australian standards.
              </h2>
            </div>
            <p className="mx-auto mt-5 w-full text-lg text-white/70 sm:max-w-[65%]">
              Our system adapts to different sites, budgets and requirements, giving clients more certainty in how their projects are delivered.
            </p>
            <div className="mt-5">
              <Link
                href="/partner-with-us"
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "px-5 text-sm font-semibold bg-white text-forest hover:bg-warm-white",
                )}
              >
                Partner With Us
              </Link>
            </div>
          </div>

          <div className="mt-48 text-center mx-auto max-w-5xl">
            <h2 className="hero-heading text-[21px] text-white">
              We work across a wide range of project types, from commercial and multi-residential
            </h2>
            <p className="hero-heading -mt-1 text-[21px] text-[#8e939c]">
              developments, aged care, education, community facilities, hotels and accommodation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-0 max-w-4xl mx-auto">
            <div className="rounded-[16px] border border-white/[0.08] p-6 transition hover:bg-[#181a1b] flex flex-col justify-between min-h-[200px]" style={{ backgroundColor: '#101112' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px]" style={{ backgroundColor: '#1b1c1d' }}>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl leading-snug text-white">
                  Commercial
                </h3>
                <p className="mt-2 text-sm text-white/60">Office buildings, retail spaces and mixed-use developments</p>
              </div>
            </div>

            <div className="rounded-[16px] border border-white/[0.08] p-6 transition hover:bg-[#181a1b] flex flex-col justify-between min-h-[200px]" style={{ backgroundColor: '#101112' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px]" style={{ backgroundColor: '#1b1c1d' }}>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl leading-snug text-white">
                  Multi-residential
                </h3>
                <p className="mt-2 text-sm text-white/60">Apartments, townhouses and residential developments</p>
              </div>
            </div>

            <div className="rounded-[16px] border border-white/[0.08] p-6 transition hover:bg-[#181a1b] flex flex-col justify-between min-h-[200px]" style={{ backgroundColor: '#101112' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px]" style={{ backgroundColor: '#1b1c1d' }}>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl leading-snug text-white">
                  Health & Aged Care
                </h3>
                <p className="mt-2 text-sm text-white/60">Medical facilities and aged care residences</p>
              </div>
            </div>

            <div className="rounded-[16px] border border-white/[0.08] p-6 transition hover:bg-[#181a1b] flex flex-col justify-between min-h-[200px]" style={{ backgroundColor: '#101112' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px]" style={{ backgroundColor: '#1b1c1d' }}>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl leading-snug text-white">
                  Education & Community
                </h3>
                <p className="mt-2 text-sm text-white/60">Schools, libraries and community centres</p>
              </div>
            </div>

            <div className="rounded-[16px] border border-white/[0.08] p-6 transition hover:bg-[#181a1b] flex flex-col justify-between min-h-[200px]" style={{ backgroundColor: '#101112' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px]" style={{ backgroundColor: '#1b1c1d' }}>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl leading-snug text-white">
                  Infrastructure
                </h3>
                <p className="mt-2 text-sm text-white/60">Transit facilities and public infrastructure</p>
              </div>
            </div>

            <div className="rounded-[16px] border border-white/[0.08] p-6 transition hover:bg-[#181a1b] flex flex-col justify-between min-h-[200px]" style={{ backgroundColor: '#101112' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px]" style={{ backgroundColor: '#1b1c1d' }}>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl leading-snug text-white">
                  Hotels & Accommodation
                </h3>
                <p className="mt-2 text-sm text-white/60">Hotels, resorts and short-term accommodation</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] mx-auto border-b border-white/5"></div>
      </section>

      <section className="bg-[#080a0a] text-white min-h-[130vh] flex flex-col justify-center pt-20 pb-0">
        <div className="section-container">
          <div className="space-y-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">Modular advantage</p>
            <h2 className="text-[30px] leading-[33px] text-white lg:text-[40px] lg:leading-[40px]">
              Our system blends leading architecture and offsite manufacturing delivering projects that meet Australian standards with speed and precision.
            </h2>
          </div>
        </div>

        <div className="mt-16 w-full overflow-x-auto">
          <div className="flex gap-2 pl-6 pr-6 pb-8">
            {advantageCards.map((card) => (
              <AdvantageCard key={card.label} {...card} />
            ))}
            <div className="min-w-[24px]"></div>
          </div>
        </div>
        <div className="w-[80%] mx-auto mt-20 border-b border-white/5"></div>
      </section>

      <section className="min-h-[140vh] bg-[#080a0a] flex items-center">
        <div className="section-container">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">Quality, Compliance & Assurance</p>
            <h2 className="mt-6 text-[30px] leading-[33px] text-white lg:text-[37px] lg:leading-[40px]">
              Factory-controlled production and verified engineering ensure full compliance with Australian standards.
            </h2>
            <p className="mt-6 text-lg text-white/70">
              This process gives clients confidence in the accuracy, reliability and compliance of every module before it reaches site.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 border-t border-b border-white/10">
            <div className="border-r border-white/10 pt-12 pb-12 px-6">
              <h3 className="text-xl font-semibold text-white">Engineering & Compliance</h3>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                Each module is certified by qualified engineers and designed to meet all required Australian standards.
              </p>
              <div className="mt-8 rounded-[24px] bg-[#0d0e0f] overflow-hidden min-h-[440px] relative">
                <Image
                  src="/pillar1.png"
                  alt="Engineering & Compliance"
                  fill
                  className="object-cover brightness-[0.65]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={pillarCardOverlay}
                  aria-hidden="true"
                ></div>
              </div>
            </div>
            <div className="border-r border-white/10 pt-12 pb-12 px-6">
              <h3 className="text-xl font-semibold text-white">Factory-Controlled Production</h3>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                Modules are built in a stable, repeatable environment that supports consistent quality and precise manufacturing.
              </p>
              <div className="mt-8 rounded-[24px] bg-[#0d0e0f] overflow-hidden min-h-[440px] relative">
                <Image
                  src="/pillar2.png"
                  alt="Factory-Controlled Production"
                  fill
                  className="object-cover brightness-[0.65]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={pillarCardOverlay}
                  aria-hidden="true"
                ></div>
              </div>
            </div>
            <div className="pt-12 pb-12 px-6">
              <h3 className="text-xl font-semibold text-white">Independent Quality Checks</h3>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                Inspections at key stages verify accuracy, workmanship and readiness before modules leave the factory.
              </p>
              <div className="mt-8 rounded-[24px] bg-[#0d0e0f] overflow-hidden min-h-[440px] relative">
                <Image
                  src="/pillar3.png"
                  alt="Independent Quality Checks"
                  fill
                  className="object-cover brightness-[0.65]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={pillarCardOverlay}
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CapabilitiesSection />

      <section className="min-h-screen bg-warm-white py-24 md:py-32">
        <div className="section-container">
          <SectionHeading
            label="Why Cloud Modular"
            title="Precision, speed, and sustainability in every project"
            align="center"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {valuePropositions.map((item) => (
              <div key={item.title} className="space-y-4">
                <h3 className="text-2xl text-forest">{item.title}</h3>
                <p className="text-base text-mid-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white py-24 md:py-32">
        <div className="section-container grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-label">Credibility & Scale</p>
            <h2 className="mt-6 text-4xl leading-tight text-charcoal md:text-5xl">
              Precision-engineered in a factory, built with high-quality materials, designed for scale.
            </h2>
            <p className="mt-6 text-lg text-mid-gray">
              Cloud Modular is backed by China Construction&rsquo;s 450,000+ square meters of dedicated facilities, with
              successful project delivery spanning Shenzhen, Hong Kong, Melbourne, Saipan, and Auckland.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {credibilityStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-serif text-forest">{stat.value}</p>
                  <p className="text-sm uppercase tracking-[0.2em] text-mid-gray">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[520px] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80"
              alt="High-tech modular factory"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white">
        {featureHighlights.map((feature) => {
          if (feature.alignment === "overlay" || feature.alignment === "overlay-left") {
            return (
              <div key={feature.title} className="relative min-h-[500px]">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div
                  className={cn(
                    "relative z-10 flex h-full items-center",
                    feature.alignment === "overlay-left" ? "justify-start" : "justify-center",
                  )}
                >
                  <div className="section-container text-white lg:max-w-2xl">
                    <h3 className="text-3xl leading-tight md:text-4xl">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-lg text-white/90">{feature.body}</p>
                  </div>
                </div>
              </div>
            );
          }

          const isImageLeft = feature.alignment === "left";
          return (
            <div
              key={feature.title}
              className="grid gap-0 lg:grid-cols-2"
            >
              <div className={cn("relative min-h-[420px]", !isImageLeft && "order-last") }>
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="section-container flex items-center bg-white py-16">
                <div className="space-y-4">
                  <h3 className="text-3xl text-charcoal">{feature.title}</h3>
                  <p className="text-lg text-mid-gray">{feature.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="min-h-screen bg-white py-24 md:py-32">
        <div className="section-container text-center">
          <SectionHeading
            label="Process"
            title="A streamlined process from concept to completion"
            align="center"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {processOverview.map((step) => (
              <div key={step.step} className="space-y-4">
                <p className="text-6xl font-serif text-forest/30">{step.step}</p>
                <h3 className="text-2xl text-charcoal">{step.title}</h3>
                <p className="text-base text-mid-gray">{step.description}</p>
              </div>
            ))}
          </div>
          <Link
            href="/partner-with-us#process"
            className={cn(
              buttonVariants({ variant: "secondary", size: "md" }),
              "mt-12 inline-flex",
            )}
          >
            See Our Process in Detail
          </Link>
        </div>
      </section>

      <section className="min-h-screen bg-warm-white py-24 md:py-32">
        <div className="section-container-wide">
          <SectionHeading
            label="Projects"
            title="Delivering excellence across the Asia-Pacific"
            align="center"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {homeProjects.map((project) => (
              <ProjectCard key={project.location} {...project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/our-work"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white py-24 md:py-32">
        <div className="section-container">
          <SectionHeading
            label="Who we work with"
            title="Built for builders and developers"
            description="Whether you&rsquo;re planning residential estates, commercial developments, or mixed-use projects, Cloud Modular delivers the speed, quality, and scale you need to succeed."
            align="center"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {audienceSegments.map((segment) => (
              <div key={segment.title} className="rounded-sm border border-light-gray p-8">
                <h3 className="text-2xl text-forest">{segment.title}</h3>
                <ul className="mt-6 space-y-3 text-mid-gray">
                  {segment.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span className="text-forest">—</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-warm-white py-24 md:py-32">
        <div className="section-container">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>

      <section className="bg-forest py-24 text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl leading-tight md:text-5xl">
            Ready to transform your next development?
          </h2>
          <p className="mt-6 text-xl text-white/80">
            Let&rsquo;s discuss how Cloud Modular can deliver your project faster, more cost-effectively, and sustainably.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/partner-with-us"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "bg-white text-forest hover:bg-warm-white",
              )}
            >
              Partner With Us
            </Link>
            <Link
              href="/our-work"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "border-white text-white hover:bg-white/10",
              )}
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
