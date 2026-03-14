"use client";
import Link from "next/link";
import Image from "next/image";
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

const partnerLogos = [
  {
    src: "/Prism-Logo.png",
    alt: "Prism Design Studio logo",
    width: 200,
    height: 80,
    className: "max-h-[13.5px] w-auto",
  },
  {
    src: "/Decobu-Logo.png",
    alt: "Decobu logo",
    width: 200,
    height: 80,
    className: "max-h-[12px] w-auto",
  },
];

const detailTiles = [
  {
    title: "Commercial",
    description: "Office buildings, retail spaces and mixed-use developments",
    background: "bg-[linear-gradient(180deg,#bfc7d4_0%,#dde2ea_100%)]",
    overlay: "bg-[radial-gradient(circle_at_bottom_left,rgba(91,111,125,0.32),transparent_42%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.28)_100%)]",
  },
  {
    title: "Multi-residential",
    description: "Apartments, townhouses and residential developments",
    background: "bg-[linear-gradient(180deg,#c2cacb_0%,#e3e7e3_100%)]",
    overlay: "bg-[radial-gradient(circle_at_bottom_right,rgba(88,108,102,0.28),transparent_44%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.28)_100%)]",
  },
  {
    title: "Health & Aged Care",
    description: "Medical facilities and aged care residences",
    background: "bg-[linear-gradient(180deg,#c8ccbf_0%,#e8e6dd_100%)]",
    overlay: "bg-[radial-gradient(circle_at_center,rgba(130,136,100,0.24),transparent_40%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.28)_100%)]",
  },
  {
    title: "Education & Community",
    description: "Schools, libraries and community centres",
    background: "bg-[linear-gradient(180deg,#c2c9d1_0%,#e2e6ea_100%)]",
    overlay: "bg-[radial-gradient(circle_at_top_right,rgba(103,121,140,0.24),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.28)_100%)]",
  },
  {
    title: "Infrastructure",
    description: "Transit facilities and public infrastructure",
    background: "bg-[linear-gradient(180deg,#c8c8c7_0%,#e8e4de_100%)]",
    overlay: "bg-[radial-gradient(circle_at_bottom,rgba(122,120,112,0.24),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.28)_100%)]",
  },
  {
    title: "Hotels & Accommodation",
    description: "Hotels, resorts and short-term accommodation",
    background: "bg-[linear-gradient(180deg,#c0c9d3_0%,#e4e8ee_100%)]",
    overlay: "bg-[radial-gradient(circle_at_bottom_left,rgba(92,109,130,0.28),transparent_40%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.28)_100%)]",
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
              : "bg-[linear-gradient(180deg,rgba(8,10,10,0.8)_0%,rgba(8,10,10,0.5)_30%,rgba(8,10,10,0.28)_50%,rgba(8,10,10,0.5)_70%,rgba(8,10,10,0.8)_100%)]"
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

      <section className="flex min-h-screen flex-col bg-[#f3f0ec] px-6 pt-20">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center text-center">
          <div
            className="font-cal-sans mb-8 inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em] text-[#2b2d30]"
          >
            <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
              <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
            </svg>
            <span>Introducing Cloud Modular</span>
          </div>
          <h2 className="font-host-grotesk text-[25px] font-medium leading-[27px] tracking-[-0.03em] text-[#1f2124] sm:text-[38px] sm:leading-[40px] lg:text-[48px] lg:leading-[50px]">
            Cloud Modular offers clarity and certainty to a changing construction landscape.
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[12px] leading-[18px] text-[#1f2124] sm:text-[13px] sm:leading-[20px]">
            Construction is harder to deliver predictably as labour shortages, rising costs and tighter compliance
            strain traditional methods. Cloud Modular offers a more controlled approach, with clear design, offsite
            manufacturing and assured compliance from the start.
          </p>
          <Link
            href="/about-us"
            className="group mt-8 inline-flex items-center gap-2 rounded-[2px] bg-[#04090d] px-[16px] py-[6px] text-[11px] font-semibold text-white transition hover:bg-[#0b1318]"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M1.5 10H13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              <path d="M9 4.5L14.5 10L9 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
            <span>Who We Are</span>
          </Link>
        </div>
        <div className="mx-auto mt-16 w-[calc(100%-32px)] max-w-[1400px] border-t border-[#1f2124]/10" />
        <div className="mx-auto w-full max-w-[66.666vw] bg-[#f3f0ec] text-[#1f2124]">
          <div className="flex min-h-[44px] w-full flex-col md:flex-row">
            <div className="flex shrink-0 items-center border-b border-[#1f2124]/10 px-4 py-2 text-[11px] font-medium text-[#1f2124] md:w-[260px] md:border-b-0 md:border-r md:border-[#1f2124]/10">
              Partnering with leading architectural, engineering, and procurement teams.
            </div>
            <div className="relative flex flex-1 items-center justify-center overflow-hidden">
              <div className="marquee-track flex w-max items-center gap-12 px-4 py-2 md:gap-16">
                {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, index) => (
                  <div key={`${logo.src}-${index}`} className="flex h-5 min-w-[120px] items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className={logo.className}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-[calc(100%-32px)] max-w-[1400px] border-b border-[#1f2124]/10" />
      </section>

      <section className="flex min-h-screen bg-[#f3f0ec] px-6 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between">
          <div className="max-w-3xl text-left">
            <div className="font-cal-sans mb-8 inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em] text-[#2b2d30]">
              <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              </svg>
              <span>What We Do</span>
            </div>
            <h3 className="font-host-grotesk text-[20px] font-medium leading-[22px] tracking-[-0.03em] text-[#1f2124] sm:text-[27px] sm:leading-[29px] lg:text-[32px] lg:leading-[34px]">
              Design-informed, precisely manufactured modular buildings built to Australian standards.
            </h3>
            <p className="mt-5 max-w-[620px] text-[12px] leading-[18px] text-[#1f2124] sm:text-[13px] sm:leading-[20px]">
              Our system adapts to different sites, budgets and requirements, giving clients more certainty in how
              their projects are delivered.
            </p>
            <Link
              href="/partner-with-us"
              className="group mt-8 inline-flex items-center gap-2 rounded-[2px] bg-[#04090d] px-[16px] py-[6px] text-[11px] font-semibold text-white transition hover:bg-[#0b1318]"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M1.5 10H13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                <path d="M9 4.5L14.5 10L9 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
              <span>Partner With Us</span>
            </Link>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {detailTiles.map((tile) => (
              <div
                key={tile.title}
                className={cn(
                  "group relative min-h-[260px] overflow-hidden rounded-[4px] border border-black/10 cursor-pointer bg-black/5",
                  tile.background,
                )}
              >
                <div className={cn("absolute inset-0 transition-all duration-300 brightness-90 group-hover:brightness-100", tile.overlay)} />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-4 p-4">
                  <div>
                    <h3 className="text-[10px] leading-snug uppercase tracking-[0.04em] text-[#080a0a]">
                      {tile.title}
                    </h3>
                  </div>
                  <button className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/20 bg-black/10 text-[#080a0a] backdrop-blur-sm transition-all duration-300 group-hover:bg-black/30 group-hover:border-black/40">
                    <span className="text-sm leading-none">&gt;</span>
                  </button>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full bg-black px-4 py-3 text-white transition duration-300 group-hover:translate-y-0">
                  <p className="text-[11px] leading-[15px]">{tile.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={cn("min-h-[150vh] flex flex-col pt-24", bg, text)}>
        <div className="section-container flex-1">
          <div className="text-center">
            <div className="space-y-6">
              <div className={cn("font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em]", textLabel)}>
                <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                  <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                  <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                  <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                </svg>
                <span>What We Do</span>
              </div>
              <h2 className={cn("font-host-grotesk text-[25px] font-medium leading-[27px] tracking-[-0.03em] sm:text-[38px] sm:leading-[40px] lg:text-[48px] lg:leading-[50px]", text)}>
                Design-informed, precisely manufactured modular<br className="hidden md:block" /> buildings built to Australian standards.
              </h2>
            </div>
            <p className={cn("mx-auto mt-5 w-full text-[12px] leading-[18px] sm:max-w-[620px] sm:text-[13px] sm:leading-[20px]", textMuted)}>
              Our system adapts to different sites, budgets and requirements, giving clients more certainty in how their projects are delivered.
            </p>
            <div className="mt-5">
              <Link
                href="/partner-with-us"
                className={cn(
                  "inline-flex items-center gap-2 rounded-[2px] px-[16px] py-[6px] text-[11px] font-semibold transition",
                  btnPrimary,
                )}
              >
                Partner With Us
              </Link>
            </div>
          </div>

          <div className="mt-48 text-center mx-auto max-w-5xl">
            <h2 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em] sm:text-[22px] sm:leading-[24px] lg:text-[25px] lg:leading-[27px]", text)}>
              We work across a wide range of project types, from commercial and multi-residential<span className="md:hidden"> developments, aged care, education, community facilities, hotels and accommodation.</span>
            </h2>
            <p className={cn("font-host-grotesk -mt-1 hidden text-[18px] font-medium leading-[20px] tracking-[-0.03em] sm:text-[22px] sm:leading-[24px] lg:block lg:text-[25px] lg:leading-[27px]", textSubtle)}>
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
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>
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
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>
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
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>
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
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>
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
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>
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
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>
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
            <div className={cn("font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em]", textLabel)}>
              <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              </svg>
              <span>Modular Advantage</span>
            </div>
            <h2 className={cn("font-host-grotesk text-[25px] font-medium leading-[27px] tracking-[-0.03em] sm:text-[38px] sm:leading-[40px] lg:text-[48px] lg:leading-[50px]", text)}>
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
            <div className={cn("font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em]", textLabel)}>
              <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              </svg>
              <span>Quality, Compliance &amp; Assurance</span>
            </div>
            <h2 className={cn("mt-6 font-host-grotesk text-[25px] font-medium leading-[27px] tracking-[-0.03em] sm:text-[38px] sm:leading-[40px] lg:text-[48px] lg:leading-[50px]", text)}>
              Factory-controlled production and verified engineering ensure full compliance with Australian standards.
            </h2>
            <p className={cn("mt-6 max-w-[620px] text-[12px] leading-[18px] sm:text-[13px] sm:leading-[20px]", textMuted)}>
              This process gives clients confidence in the accuracy, reliability and compliance of every module before it reaches site.
            </p>
          </div>

          <div className={cn("mt-12 hidden md:grid grid-cols-3 border-t border-b", border)}>
            <div className={cn("border-r pt-12 pb-12 px-6", border)}>
              <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>Engineering & Compliance</h3>
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
              <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>Factory-Controlled Production</h3>
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
              <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>Independent Quality Checks</h3>
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
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>Engineering & Compliance</h3>
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
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>Factory-Controlled Production</h3>
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
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>Independent Quality Checks</h3>
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
                <div className={cn("font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em]", textLabel)}>
                  <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                    <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                    <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                    <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                  </svg>
                  <span>About Us</span>
                </div>
                <h2 className={cn("font-host-grotesk text-[25px] font-medium leading-[27px] tracking-[-0.03em] sm:text-[38px] sm:leading-[40px] lg:text-[48px] lg:leading-[50px]", text)}>
                  Cloud Modular offers clarity and certainty to a changing construction landscape.
                </h2>
              </div>
              <div className="mt-5">
                <Link
                  href="/about"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[2px] px-[16px] py-[6px] text-[11px] font-semibold transition",
                    btnPrimary,
                  )}
                >
                  About Us
                </Link>
              </div>
            </div>

            <div>
              <p className={cn("mt-2 text-[12px] leading-[18px] lg:mt-[42px] sm:text-[13px] sm:leading-[20px]", textMuted)}>
                Construction is becoming harder to deliver predictably - labour shortages, rising costs and tighter compliance all add pressure to traditional methods.
              </p>
              <p className={cn("mt-6 text-[12px] leading-[18px] sm:text-[13px] sm:leading-[20px]", textMuted)}>
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
            <div className={cn("font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em]", textLabel)}>
              <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              </svg>
              <span>FAQ</span>
            </div>
            <h2 className={cn("font-host-grotesk text-[25px] font-medium leading-[27px] tracking-[-0.03em] sm:text-[38px] sm:leading-[40px] lg:text-[48px] lg:leading-[50px]", text)}>
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
              <div className={cn("font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em]", textLabel)}>
                <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                  <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                  <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                  <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                </svg>
                <span>Get Started</span>
              </div>
              <h2 className={cn("font-host-grotesk text-[25px] font-medium leading-[27px] tracking-[-0.03em] sm:text-[38px] sm:leading-[40px] lg:text-[48px] lg:leading-[50px]", text)}>
                Ready to transform your next development?
              </h2>
            </div>
            <p className={cn("mx-auto mt-5 w-full max-w-[620px] text-[12px] leading-[18px] sm:text-[13px] sm:leading-[20px]", textMuted)}>
              Let&rsquo;s discuss how Cloud Modular can deliver your project faster, more cost-effectively, and sustainably.
            </p>
            <div className="mt-5 flex justify-center">
              <Link
                href="/partner-with-us"
                className={cn(
                  "inline-flex items-center gap-2 rounded-[2px] px-[16px] py-[6px] text-[11px] font-semibold transition",
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
