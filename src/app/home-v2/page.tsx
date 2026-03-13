"use client";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { FAQ } from "@/components/faq";
import { cn } from "@/lib/utils";
import { faqItems, heroMetrics } from "@/content/site";
import { AdvantageCard } from "@/components/advantage-card";
import { NavigationV2 } from "@/components/layout/navigation-v2";

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

const aboutImageOverlay = {
  backgroundImage: [
    "linear-gradient(to bottom, rgba(8,10,10,1) 0%, rgba(8,10,10,0.95) 22%, rgba(8,10,10,0.4) 55%, rgba(8,10,10,0.05) 78%, rgba(8,10,10,0) 100%)",
    "linear-gradient(to left, rgba(8,10,10,0.85) 0%, rgba(8,10,10,0.55) 25%, rgba(8,10,10,0.18) 60%, rgba(8,10,10,0.05) 80%, rgba(8,10,10,0) 100%)",
    "linear-gradient(to top, rgba(8,10,10,0.7) 0%, rgba(8,10,10,0.4) 15%, rgba(8,10,10,0.15) 30%, rgba(8,10,10,0) 50%)",
    "linear-gradient(to right, rgba(8,10,10,0.5) 0%, rgba(8,10,10,0.25) 15%, rgba(8,10,10,0.1) 30%, rgba(8,10,10,0) 50%)",
  ].join(", "),
};

export default function HomeV2() {
  const isLight = false;

  // Theme classes
  const bg = isLight ? "bg-[#f7f8f8]" : "bg-[#080a0a]";
  const bgAlt = isLight ? "bg-[#ffffff]" : "bg-[#101112]";
  const bgCard = isLight ? "bg-[#f0f1f1]" : "bg-[#1b1c1d]";
  const text = isLight ? "text-[#080a0a]" : "text-white";
  const textMuted = isLight ? "text-[#080a0a]/70" : "text-white/70";
  const textSubtle = isLight ? "text-[#080a0a]/60" : "text-white/60";
  const textLabel = isLight ? "text-[#080a0a]/40" : "text-white/40";
  const border = isLight ? "border-[#080a0a]/10" : "border-white/10";
  const borderSubtle = isLight ? "border-[#080a0a]/[0.08]" : "border-white/[0.08]";
  const borderDivider = isLight ? "border-[#080a0a]/5" : "border-white/5";
  const btnPrimary = isLight ? "bg-[#080a0a] text-white hover:bg-[#1a1c1d]" : "bg-white text-forest hover:bg-warm-white";
  const btnSecondary = isLight ? "text-[#080a0a]/80 hover:text-[#080a0a]" : "text-white/80 hover:text-white";
  const logoBox = isLight ? "bg-[#080a0a]" : "bg-white";
  const logoText = isLight ? "text-white" : "text-[#0a0a0a]";

  return (
    <>
      {/* Navigation */}
      <NavigationV2 isLight={isLight} />

      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero-background.png"
          alt="Modern modular building exterior"
          fill
          priority
          className="scale-[1.08] object-cover object-center"
        />
        {/* Overlay */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            isLight
              ? "bg-[linear-gradient(180deg,rgba(247,248,248,0.95)_0%,rgba(247,248,248,0.7)_30%,rgba(247,248,248,0.5)_50%,rgba(247,248,248,0.7)_70%,rgba(247,248,248,0.95)_100%)]"
              : "bg-[linear-gradient(180deg,rgba(8,10,10,0.72)_0%,rgba(8,10,10,0.42)_30%,rgba(8,10,10,0.22)_50%,rgba(8,10,10,0.42)_70%,rgba(8,10,10,0.72)_100%)]"
          )}
          aria-hidden
        />
        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 pt-16 lg:px-20">
          <div className="mx-auto w-full max-w-4xl text-center">
            {/* Cloud Icon */}
            <div className="flex justify-center mb-6">
              <Image
                src="/cloud_icon.png"
                alt=""
                width={32}
                height={32}
                className={cn(isLight && "invert")}
              />
            </div>
            {/* H1: Host Grotesk Bold 700 */}
            <h1 className={cn("font-host-grotesk font-bold tracking-[-0.03em] text-[32px] leading-[34px] sm:text-[48px] sm:leading-[50px] lg:text-[60px] lg:leading-[62px]", text)}>
              Premium modular spaces,<br />
              built in weeks, not years.
            </h1>
            <p className="mx-auto mt-5 w-full max-w-[420px] font-sans text-[12px] leading-[18px] text-white">
              We deliver architecturally designed modular buildings, built offsite and certified to Australian
              Standards for faster delivery and greater certainty.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/partner-with-us"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-[2px] bg-white px-[16px] py-[6px] text-[11px] font-semibold text-forest transition hover:bg-warm-white",
                )}
              >
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <svg
                    className="absolute h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-0"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M1.5 10H13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    <path d="M9 4.5L14.5 10L9 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                  <svg
                    className="absolute h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M1.5 10H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    <path d="M8 6L12 10L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                </span>
                <span>Partner With Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={cn("min-h-[100vh] md:min-h-[65vh] flex flex-col items-center justify-center", bg)}>
        <div className="section-container text-center flex-1 flex flex-col items-center justify-center">
          <h2 className={cn("hero-heading text-[21px]", text)}>
            Partnering with leading architectural, engineering, and procurement teams.
          </h2>
          <p className={cn("hero-heading -mt-1 text-[21px]", textSubtle)}>
            Delivering fully compliant and thoughtfully designed projects.
          </p>
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className={cn("rounded-lg px-6 py-6 md:px-10 md:py-8 text-center flex h-[100px] w-[200px] md:h-[120px] md:w-[160px] items-center justify-center", logoBox, logoText, isLight && "invert")}>
              <Image
                src="/Prism-Logo.png"
                alt="Prism Design Studio logo"
                width={200}
                height={80}
                className="max-h-10 md:max-h-12 w-auto"
              />
            </div>
            <div className={cn("rounded-lg px-6 py-6 md:px-10 md:py-8 text-center flex h-[100px] w-[200px] md:h-[120px] md:w-[160px] items-center justify-center", logoBox, logoText, isLight && "invert")}>
              <Image
                src="/Decobu-Logo.png"
                alt="Decobu logo"
                width={200}
                height={80}
                className="max-h-10 md:max-h-12 w-auto"
              />
            </div>
            <div className={cn("rounded-lg px-6 py-6 md:px-10 md:py-8 text-center flex h-[100px] w-[200px] md:h-[120px] md:w-[160px] items-center justify-center", logoBox, logoText, isLight && "invert")}>
              <Image
                src="/Cloud1.png"
                alt="Cloud Procurement logo"
                width={600}
                height={220}
                className="max-h-10 md:max-h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
        <div className={cn("w-[80%] border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[150vh] flex flex-col pt-24", bg, text)}>
        <div className="section-container flex-1">
          <div className="text-center">
            <div className="space-y-6">
              <p className={cn("text-xs font-semibold uppercase tracking-[0.4em]", textLabel)}>What we do</p>
              <h2 className={cn("text-[30px] leading-[33px] lg:text-[40px] lg:leading-[40px]", text)}>
                Design-informed, precisely manufactured modular<br className="hidden md:block" /> buildings built to Australian standards.
              </h2>
            </div>
            <p className={cn("mx-auto mt-5 w-full text-lg sm:max-w-[65%]", textMuted)}>
              Our system adapts to different sites, budgets and requirements, giving clients more certainty in how their projects are delivered.
            </p>
            <div className="mt-5">
              <Link
                href="/partner-with-us"
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "px-5 text-sm font-semibold",
                  btnPrimary,
                )}
              >
                Partner With Us
              </Link>
            </div>
          </div>

          <div className="mt-48 text-center mx-auto max-w-5xl">
            <h2 className={cn("hero-heading text-[21px]", text)}>
              We work across a wide range of project types, from commercial and multi-residential<span className="md:hidden"> developments, aged care, education, community facilities, hotels and accommodation.</span>
            </h2>
            <p className={cn("hero-heading -mt-1 text-[21px] hidden md:block", textSubtle)}>
              developments, aged care, education, community facilities, hotels and accommodation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-0 max-w-4xl mx-auto">
            <div className={cn("rounded-[16px] border p-6 transition flex flex-col justify-between min-h-[200px]", borderSubtle, bgAlt, isLight ? "hover:bg-[#e8e9e9]" : "hover:bg-[#181a1b]")}>
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-[12px]", bgCard)}>
                <svg className={cn("h-6 w-6", text)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className={cn("text-xl leading-snug", text)}>
                  Commercial
                </h3>
                <p className={cn("mt-2 text-sm", textSubtle)}>Office buildings, retail spaces and mixed-use developments</p>
              </div>
            </div>

            <div className={cn("rounded-[16px] border p-6 transition flex flex-col justify-between min-h-[200px]", borderSubtle, bgAlt, isLight ? "hover:bg-[#e8e9e9]" : "hover:bg-[#181a1b]")}>
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-[12px]", bgCard)}>
                <svg className={cn("h-6 w-6", text)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className={cn("text-xl leading-snug", text)}>
                  Multi-residential
                </h3>
                <p className={cn("mt-2 text-sm", textSubtle)}>Apartments, townhouses and residential developments</p>
              </div>
            </div>

            <div className={cn("rounded-[16px] border p-6 transition flex flex-col justify-between min-h-[200px]", borderSubtle, bgAlt, isLight ? "hover:bg-[#e8e9e9]" : "hover:bg-[#181a1b]")}>
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-[12px]", bgCard)}>
                <svg className={cn("h-6 w-6", text)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className={cn("text-xl leading-snug", text)}>
                  Health & Aged Care
                </h3>
                <p className={cn("mt-2 text-sm", textSubtle)}>Medical facilities and aged care residences</p>
              </div>
            </div>

            <div className={cn("rounded-[16px] border p-6 transition flex flex-col justify-between min-h-[200px]", borderSubtle, bgAlt, isLight ? "hover:bg-[#e8e9e9]" : "hover:bg-[#181a1b]")}>
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-[12px]", bgCard)}>
                <svg className={cn("h-6 w-6", text)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className={cn("text-xl leading-snug", text)}>
                  Education & Community
                </h3>
                <p className={cn("mt-2 text-sm", textSubtle)}>Schools, libraries and community centres</p>
              </div>
            </div>

            <div className={cn("rounded-[16px] border p-6 transition flex flex-col justify-between min-h-[200px]", borderSubtle, bgAlt, isLight ? "hover:bg-[#e8e9e9]" : "hover:bg-[#181a1b]")}>
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-[12px]", bgCard)}>
                <svg className={cn("h-6 w-6", text)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className={cn("text-xl leading-snug", text)}>
                  Infrastructure
                </h3>
                <p className={cn("mt-2 text-sm", textSubtle)}>Transit facilities and public infrastructure</p>
              </div>
            </div>

            <div className={cn("rounded-[16px] border p-6 transition flex flex-col justify-between min-h-[200px]", borderSubtle, bgAlt, isLight ? "hover:bg-[#e8e9e9]" : "hover:bg-[#181a1b]")}>
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-[12px]", bgCard)}>
                <svg className={cn("h-6 w-6", text)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className={cn("text-xl leading-snug", text)}>
                  Hotels & Accommodation
                </h3>
                <p className={cn("mt-2 text-sm", textSubtle)}>Hotels, resorts and short-term accommodation</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("w-[80%] mx-auto border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[130vh] flex flex-col justify-center pt-20 pb-0", bg, text)}>
        <div className="section-container">
          <div className="space-y-6 text-center">
            <p className={cn("text-xs font-semibold uppercase tracking-[0.4em]", textLabel)}>Modular advantage</p>
            <h2 className={cn("text-[27px] leading-[31px] md:text-[30px] md:leading-[33px] lg:text-[40px] lg:leading-[40px]", text)}>
              Our system blends leading architecture and offsite manufacturing delivering projects that meet Australian standards with speed and precision.
            </h2>
          </div>
        </div>

        <div className="mt-16 w-full overflow-x-auto">
          <div className="flex gap-2 pl-6 pr-6 pb-8">
            {advantageCards.map((card) => (
              <AdvantageCard key={card.label} {...card} isLight={isLight} />
            ))}
            <div className="min-w-[24px]"></div>
          </div>
        </div>
        <div className={cn("w-[80%] mx-auto mt-20 border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[140vh] flex flex-col justify-center pt-20 pb-0", bg)}>
        <div className="section-container">
          <div className="max-w-2xl">
            <p className={cn("text-xs font-semibold uppercase tracking-[0.4em]", textLabel)}>Quality, Compliance & Assurance</p>
            <h2 className={cn("mt-6 text-[30px] leading-[33px] lg:text-[37px] lg:leading-[40px]", text)}>
              Factory-controlled production and verified engineering ensure full compliance with Australian standards.
            </h2>
            <p className={cn("mt-6 text-lg", textMuted)}>
              This process gives clients confidence in the accuracy, reliability and compliance of every module before it reaches site.
            </p>
          </div>

          <div className={cn("mt-12 hidden md:grid grid-cols-3 border-t border-b", border)}>
            <div className={cn("border-r pt-12 pb-12 px-6", border)}>
              <h3 className={cn("text-xl font-semibold", text)}>Engineering & Compliance</h3>
              <p className={cn("mt-3 text-sm leading-relaxed", textSubtle)}>
                Each module is certified by qualified engineers and designed to meet all required Australian standards.
              </p>
              <div className={cn("mt-8 rounded-[24px] overflow-hidden min-h-[440px] relative", isLight ? "bg-[#e5e6e6]" : "bg-[#0d0e0f]")}>
                <Image
                  src="/pillar1.png"
                  alt="Engineering & Compliance"
                  fill
                  className={cn("object-cover", isLight ? "brightness-100" : "brightness-[0.65]")}
                />
                {!isLight && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={pillarCardOverlay}
                    aria-hidden="true"
                  ></div>
                )}
              </div>
            </div>
            <div className={cn("border-r pt-12 pb-12 px-6", border)}>
              <h3 className={cn("text-xl font-semibold", text)}>Factory-Controlled Production</h3>
              <p className={cn("mt-3 text-sm leading-relaxed", textSubtle)}>
                Modules are built in a stable, repeatable environment that supports consistent quality and precise manufacturing.
              </p>
              <div className={cn("mt-8 rounded-[24px] overflow-hidden min-h-[440px] relative", isLight ? "bg-[#e5e6e6]" : "bg-[#0d0e0f]")}>
                <Image
                  src="/pillar2.png"
                  alt="Factory-Controlled Production"
                  fill
                  className={cn("object-cover", isLight ? "brightness-100" : "brightness-[0.65]")}
                />
                {!isLight && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={pillarCardOverlay}
                    aria-hidden="true"
                  ></div>
                )}
              </div>
            </div>
            <div className="pt-12 pb-12 px-6">
              <h3 className={cn("text-xl font-semibold", text)}>Independent Quality Checks</h3>
              <p className={cn("mt-3 text-sm leading-relaxed", textSubtle)}>
                Inspections at key stages verify accuracy, workmanship and readiness before modules leave the factory.
              </p>
              <div className={cn("mt-8 rounded-[24px] overflow-hidden min-h-[440px] relative", isLight ? "bg-[#e5e6e6]" : "bg-[#0d0e0f]")}>
                <Image
                  src="/pillar3.png"
                  alt="Independent Quality Checks"
                  fill
                  className={cn("object-cover", isLight ? "brightness-100" : "brightness-[0.65]")}
                />
                {!isLight && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={pillarCardOverlay}
                    aria-hidden="true"
                  ></div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 w-full overflow-x-auto md:hidden">
            <div className="flex gap-6 pl-6 pr-6 pb-8">
              <div className={cn("min-w-[85vw] border rounded-[16px] pt-12 pb-12 px-6", border)}>
                <h3 className={cn("text-xl font-semibold", text)}>Engineering & Compliance</h3>
                <p className={cn("mt-3 text-sm leading-relaxed", textSubtle)}>
                  Each module is certified by qualified engineers and designed to meet all required Australian standards.
                </p>
                <div className={cn("mt-8 rounded-[24px] overflow-hidden min-h-[440px] relative", isLight ? "bg-[#e5e6e6]" : "bg-[#0d0e0f]")}>
                  <Image
                    src="/pillar1.png"
                    alt="Engineering & Compliance"
                    fill
                    className={cn("object-cover", isLight ? "brightness-100" : "brightness-[0.65]")}
                  />
                  {!isLight && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={pillarCardOverlay}
                      aria-hidden="true"
                    ></div>
                  )}
                </div>
              </div>
              <div className={cn("min-w-[85vw] border rounded-[16px] pt-12 pb-12 px-6", border)}>
                <h3 className={cn("text-xl font-semibold", text)}>Factory-Controlled Production</h3>
                <p className={cn("mt-3 text-sm leading-relaxed", textSubtle)}>
                  Modules are built in a stable, repeatable environment that supports consistent quality and precise manufacturing.
                </p>
                <div className={cn("mt-8 rounded-[24px] overflow-hidden min-h-[440px] relative", isLight ? "bg-[#e5e6e6]" : "bg-[#0d0e0f]")}>
                  <Image
                    src="/pillar2.png"
                    alt="Factory-Controlled Production"
                    fill
                    className={cn("object-cover", isLight ? "brightness-100" : "brightness-[0.65]")}
                  />
                  {!isLight && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={pillarCardOverlay}
                      aria-hidden="true"
                    ></div>
                  )}
                </div>
              </div>
              <div className={cn("min-w-[85vw] border rounded-[16px] pt-12 pb-12 px-6", border)}>
                <h3 className={cn("text-xl font-semibold", text)}>Independent Quality Checks</h3>
                <p className={cn("mt-3 text-sm leading-relaxed", textSubtle)}>
                  Inspections at key stages verify accuracy, workmanship and readiness before modules leave the factory.
                </p>
                <div className={cn("mt-8 rounded-[24px] overflow-hidden min-h-[440px] relative", isLight ? "bg-[#e5e6e6]" : "bg-[#0d0e0f]")}>
                  <Image
                    src="/pillar3.png"
                    alt="Independent Quality Checks"
                    fill
                    className={cn("object-cover", isLight ? "brightness-100" : "brightness-[0.65]")}
                  />
                  {!isLight && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={pillarCardOverlay}
                      aria-hidden="true"
                    ></div>
                  )}
                </div>
              </div>
              <div className="min-w-[24px]"></div>
            </div>
          </div>
        </div>
        <div className={cn("w-[80%] mx-auto mt-20 border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[130vh] flex flex-col pt-12 pb-0", bg, text)}>
        <div className="section-container flex-1">
          <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden">
            <Image
              src="/about.png"
              alt="About Cloud Modular"
              fill
              className="object-cover"
            />
            {!isLight && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={aboutImageOverlay}
                aria-hidden="true"
              ></div>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <p className={cn("text-xs font-semibold uppercase tracking-[0.4em]", textLabel)}>About Us</p>
                <h2 className={cn("text-[27px] leading-[31px] md:text-[35px] md:leading-[38px]", text)}>
                  Cloud Modular offers clarity and certainty to a changing construction landscape.
                </h2>
              </div>
              <div className="mt-5">
                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "sm" }),
                    "px-5 text-sm font-semibold",
                    btnPrimary,
                  )}
                >
                  About Us
                </Link>
              </div>
            </div>

            <div>
              <p className={cn("text-lg leading-relaxed mt-2 lg:mt-[42px]", textMuted)}>
                Construction is becoming harder to deliver predictably - labour shortages, rising costs and tighter compliance all add pressure to traditional methods.
              </p>
              <p className={cn("text-lg leading-relaxed mt-6", textMuted)}>
                Cloud Modular was created to offer a more controlled way to build, bringing together design clarity, precise offsite manufacturing and assured compliance to give clients greater certainty from the outset.
              </p>
            </div>
          </div>
        </div>
        <div className={cn("w-[80%] mx-auto mt-20 border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[100vh] flex flex-col justify-center pt-20 pb-0", bg, text)}>
        <div className="section-container">
          <div className="space-y-6 text-center">
            <p className={cn("text-xs font-semibold uppercase tracking-[0.4em]", textLabel)}>FAQ</p>
            <h2 className={cn("text-[30px] leading-[33px] lg:text-[40px] lg:leading-[40px]", text)}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <FAQ items={faqItems} isLight={isLight} />
          </div>
        </div>
        <div className={cn("w-[80%] mx-auto mt-20 border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[60vh] flex flex-col justify-center pt-20 pb-20", bg, text)}>
        <div className="section-container">
          <div className="text-center">
            <div className="space-y-6">
              <p className={cn("text-xs font-semibold uppercase tracking-[0.4em]", textLabel)}>Get Started</p>
              <h2 className={cn("text-[30px] leading-[33px] lg:text-[40px] lg:leading-[40px]", text)}>
                Ready to transform your next development?
              </h2>
            </div>
            <p className={cn("mx-auto mt-5 w-full text-lg sm:max-w-[65%]", textMuted)}>
              Let&rsquo;s discuss how Cloud Modular can deliver your project faster, more cost-effectively, and sustainably.
            </p>
            <div className="mt-5 flex justify-center">
              <Link
                href="/partner-with-us"
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "px-5 text-sm font-semibold",
                  btnPrimary,
                )}
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
