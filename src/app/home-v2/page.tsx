"use client";
import Link from "next/link";
import Image from "next/image";
import { FAQ } from "@/components/faq";
import { cn } from "@/lib/utils";
import { faqItems, heroMetrics, partnerWithUsMailto } from "@/content/site";
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
    image: "/Card1.webp",
    label: "Compliance",
    title: "Certified to Australian standards",
    content: [
      "Every module meets Australian Building Codes and state regulations before leaving the factory.",
      "Pre-certified structural engineering reduces approvals risk and speeds consent timelines.",
      "Third-party inspections during production ensure quality control at every stage."
    ],
  },
  {
    image: "/Card2.webp",
    label: "Speed",
    title: "Offsite manufacturing is faster",
    content: [
      "Concurrent site prep and factory production cut total project time by months.",
      "Weather-independent assembly keeps schedules predictable year-round.",
      "Rapid on-site installation minimises disruption and accelerates handover."
    ],
  },
  {
    image: "/Card3.webp",
    label: "Quality",
    title: "Precision and consistency",
    content: [
      "Controlled factory environments eliminate variability and reduce defects.",
      "Standardised processes ensure consistent quality across every module.",
      "Built-in quality checkpoints catch issues before they reach site."
    ],
  },
  {
    image: "/Card4.webp",
    label: "Flexibility",
    title: "Tailored to specifications",
    content: [
      "Modular design adapts to unique site constraints and spatial requirements.",
      "Configurable layouts suit residential, commercial, and mixed-use needs.",
      "Scalable solutions grow with your project demands and budget."
    ],
  },
  {
    image: "/Card5.webp",
    label: "Cost Effectiveness",
    title: "Significant cost savings",
    content: [
      "Factory efficiency reduces labour costs and material waste by up to 20%.",
      "Shorter timelines mean lower financing costs and faster revenue generation.",
      "Predictable pricing with fewer on-site surprises protects your margins."
    ],
  },
  {
    image: "/Card6.webp",
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
    src: "/Prism_Logo.png",
    alt: "Prism Design Studio logo",
    width: 200,
    height: 80,
    className: "max-h-[26px] w-auto",
  },
  {
    src: "/DM_Logo.png",
    alt: "DM logo",
    width: 200,
    height: 80,
    className: "max-h-[23px] w-auto",
  },
  {
    src: "/Decobu-Logo.png",
    alt: "Decobu logo",
    width: 200,
    height: 80,
    className: "max-h-[14px] w-auto",
  },
];

const partnerLogosMarquee = [...partnerLogos, ...partnerLogos, ...partnerLogos];

const whatWeDoCards = [
  {
    image: "/Sec_Card_1.webp",
    label: "25 On Rowland and Forrest",
    title: "25 On Rowland And Forrest",
    content: [],
  },
  {
    image: "/Sec_Card_2.webp",
    label: "Capel Drive",
    title: "Capel Drive",
    content: [],
  },
  {
    image: "",
    label: "21 Central Terrace, Gosnells",
    title: "21 Central Terrace, Gosnells",
    content: [],
    topBadge: "[COMING SOON]",
  },
];

const pillarCardOverlay = {
  backgroundImage: [
    "linear-gradient(to top, rgba(1,1,1,1) 0%, rgba(1,1,1,0.92) 16%, rgba(1,1,1,0.32) 42%, rgba(1,1,1,0.04) 64%, rgba(1,1,1,0) 82%)",
    "linear-gradient(to left, rgba(1,1,1,0.72) 0%, rgba(1,1,1,0.42) 18%, rgba(1,1,1,0.12) 42%, rgba(1,1,1,0.03) 62%, rgba(1,1,1,0) 78%)",
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
  const bg = isLight ? "bg-[#f7f8f8]" : "bg-[#010101]";
  const bgAlt = isLight ? "bg-[#ffffff]" : "bg-[#101112]";
  const bgCard = isLight ? "bg-[#f0f1f1]" : "bg-[#1b1c1d]";
  const text = isLight ? "text-[#080a0a]" : "text-white";
  const textMuted = isLight ? "text-[#080a0a]/70" : "text-white/70";
  const textSubtle = isLight ? "text-[#080a0a]/60" : "text-white/60";
  const textLabel = isLight ? "text-[#080a0a]/40" : "text-white/40";
  const border = isLight ? "border-[#080a0a]/10" : "border-white/10";
  const borderSubtle = isLight ? "border-[#080a0a]/[0.08]" : "border-white/[0.08]";
  const borderDivider = isLight ? "border-[#080a0a]/5" : "border-white/5";
  const btnPrimary = isLight ? "bg-[#080a0a] text-white hover:bg-[#1a1c1d]" : "bg-white text-forest hover:bg-[#0d1212] hover:text-white";
  const btnSecondary = isLight ? "text-[#080a0a]/80 hover:text-[#080a0a]" : "text-white/80 hover:text-white";
  const pageButtonClass = "inline-flex h-[30px] min-w-[138px] items-center justify-center rounded-[2px] px-[16px] py-[6px] text-[11px] font-semibold transition";

  return (
    <>
      {/* Navigation */}
      <NavigationV2 isLight={isLight} />

      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/Header2.png"
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
              : "bg-[linear-gradient(180deg,rgba(8,10,10,0.814)_0%,rgba(8,10,10,0.511)_30%,rgba(8,10,10,0.289)_50%,rgba(8,10,10,0.511)_70%,rgba(8,10,10,0.814)_100%)]"
          )}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(1,1,1,0)_0%,#010101_100%)]"
          aria-hidden
        />
        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 pt-12 lg:px-20">
          <div className="mx-auto w-full max-w-4xl -translate-y-14 text-center sm:-translate-y-12 lg:-translate-y-6">
            {/* Cloud Icon */}
            <div className="flex justify-center mb-6">
              <Image
                src="/Cloud_Icon.png"
                alt=""
                width={32}
                height={32}
                className={cn(isLight && "invert")}
              />
            </div>
            {/* H1: Host Grotesk Bold 700 */}
            <h1 className={cn("font-host-grotesk font-bold tracking-[-0.03em] text-[32px] leading-[34px] sm:text-[48px] sm:leading-[50px] lg:text-[60px] lg:leading-[62px]", text)}>
              Premium modular spaces,{` `}
              <br className="hidden sm:block" />
              built in weeks, not years.
            </h1>
            <p className="mx-auto mt-3 w-full max-w-[420px] font-sans text-[14px] leading-[20px] text-white sm:text-[14px] sm:leading-[20px]">
              We deliver architecturally designed modular buildings, built offsite and certified to Australian
              Standards for faster delivery and greater certainty.
            </p>
            <div className="mt-5 flex justify-center">
              <Link
                href={partnerWithUsMailto}
                className={cn(
                  "group gap-2 bg-white text-forest hover:bg-[#0d1212] hover:text-white",
                  pageButtonClass,
                )}
              >
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <svg
                    className="absolute h-3 w-3 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-0"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M1.5 10H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    <path d="M8 6L12 10L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                  <svg
                    className="absolute h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M1.5 10H13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    <path d="M9 4.5L14.5 10L9 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                </span>
                <span>Partner With Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen flex-col bg-[#010101] px-6 pt-20">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center text-center">
          <div
            className="font-cal-sans mb-8 inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]"
          >
            <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
              <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
            </svg>
            <span>Introducing Cloud Modular</span>
          </div>
          <h2 className="max-w-[48rem] font-host-grotesk text-[22px] font-medium leading-[24px] tracking-[-0.03em] text-white sm:text-[27px] sm:leading-[29px] lg:text-[32px] lg:leading-[34px]">
            Cloud Modular offers clarity and certainty to a changing construction landscape.
          </h2>
          <p className="mx-auto mt-3 w-full max-w-[520px] font-sans text-[14px] leading-[20px] text-white sm:text-[12px] sm:leading-[18px]">
            Construction is harder to deliver predictably as labour shortages, rising costs and tighter compliance
            strain traditional methods. Cloud Modular offers a more controlled approach, with clear design, offsite
            manufacturing and assured compliance from the start.
          </p>
          <Link
            href="/about-us"
            className={cn("group mt-5 bg-white text-forest hover:bg-[#0d1212] hover:text-white", pageButtonClass)}
          >
            <span>Who We Are</span>
          </Link>
        </div>
        <div className={cn("relative left-1/2 mt-16 w-screen -translate-x-1/2 border-t", borderDivider)} />
        <div className="mx-auto w-full max-w-[66.666vw] bg-[#010101] text-white">
          <div className="flex min-h-[54px] w-full flex-col md:flex-row">
            <div className={cn("flex shrink-0 items-center justify-center px-4 py-3 text-center text-[11px] font-medium text-white md:w-[260px] md:justify-start md:text-left md:border-r", borderDivider, "border-b md:border-b-0")}>
              Partnering with leading architectural, engineering, and procurement teams.
            </div>
            <div className="relative flex flex-1 items-center justify-center overflow-hidden">
              <div className="marquee-track flex w-max items-center py-3">
                {[0, 1].map((groupIndex) => (
                  <div key={groupIndex} className="marquee-group flex shrink-0 items-center gap-12 px-4 md:gap-16">
                    {partnerLogosMarquee.map((logo, index) => (
                      <div key={`${logo.src}-${groupIndex}-${index}`} className="flex h-6 min-w-[132px] items-center justify-center">
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
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={cn("relative left-1/2 w-screen -translate-x-1/2 border-b", borderDivider)} />
      </section>

      <section className={cn("min-h-[112svh] flex flex-col justify-between overflow-hidden sm:h-[100svh] sm:min-h-0", bg, text)}>
        <div className="section-container flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center pt-12 sm:pt-16">
            <div className="text-center">
              <div className="space-y-6">
                <div className="font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]">
                  <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                    <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                    <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                    <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                  </svg>
                  <span>What We Do</span>
                </div>
                <h2 className={cn("mx-auto max-w-[48rem] font-host-grotesk text-[22px] font-medium leading-[24px] tracking-[-0.03em] sm:text-[27px] sm:leading-[29px] lg:text-[32px] lg:leading-[34px]", text)}>
                  Design-informed, precisely manufactured modular<br className="hidden md:block" /> buildings built to Australian standards.
                </h2>
              </div>
              <p className="mx-auto mt-3 w-full max-w-[520px] font-sans text-[14px] leading-[20px] text-white sm:text-[12px] sm:leading-[18px]">
                Our system adapts to different sites, budgets and requirements, giving clients more certainty in how their projects are delivered.
              </p>
              <div className="mt-4">
                <Link
                  href={partnerWithUsMailto}
                  className={cn(
                    pageButtonClass,
                    btnPrimary,
                  )}
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>

          <div id="current-projects" className="relative left-1/2 w-screen -translate-x-1/2 px-8 pb-4 scroll-mt-24">
            <div className="font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]">
              <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              </svg>
              <span>Current Projects</span>
            </div>
          </div>

          <div className={cn("relative left-1/2 w-screen -translate-x-1/2 border-t", borderDivider)}></div>

          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-auto px-8 pt-6 sm:pt-8">
            <div className="flex items-start gap-3 px-0 pb-6 sm:pb-8">
              {whatWeDoCards.map((card) => (
                <AdvantageCard
                  key={card.title}
                  {...card}
                  isLight={isLight}
                  compact
                  cornerRadius="rounded-[3px]"
                  imageClassName="brightness-[0.72]"
                  overlayClassName="from-black/60 via-black/18"
                  disableHover
                  footerClassName="px-6 pb-5 pt-5"
                  hideAction
                  titleOutside
                />
              ))}
              <div className="min-w-[4px]"></div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="quality-compliance-assurance"
        className={cn("min-h-[112svh] flex flex-col overflow-hidden sm:h-screen sm:min-h-0 scroll-mt-24", bg)}
      >
        <div className="section-container flex flex-1 flex-col">
          <div className="mx-auto mt-auto max-w-2xl translate-y-8 text-center">
            <div className="font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]">
              <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              </svg>
              <span>Quality, Compliance &amp; Assurance</span>
            </div>
            <h2 className={cn("mt-6 max-w-[48rem] font-host-grotesk text-[22px] font-medium leading-[24px] tracking-[-0.03em] sm:text-[27px] sm:leading-[29px] lg:text-[32px] lg:leading-[34px]", text)}>
              Factory-controlled production and verified engineering ensure full compliance with Australian standards.
            </h2>
            <p className="mx-auto mt-4 max-w-[440px] font-sans text-[14px] leading-[19px] text-white sm:text-[12px] sm:leading-[17px] md:text-[13px] md:leading-[18px]">
              This process gives clients confidence in the accuracy, reliability and compliance of every module before it reaches site.
            </p>
            <div className="mt-4 flex justify-center">
              <Link
                href={partnerWithUsMailto}
                className={cn(
                  pageButtonClass,
                  btnPrimary,
                )}
              >
                Partner With Us
              </Link>
            </div>
          </div>

          <div className={cn("relative left-1/2 mt-auto hidden w-screen -translate-x-1/2 border-t border-b md:block", borderDivider)}>
            <div className="section-container grid grid-cols-3">
              <div className={cn("border-r pt-8 pb-8 px-6", borderDivider)}>
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>Engineering & Compliance</h3>
                <p className={cn("mt-3 text-sm leading-relaxed", textSubtle)}>
                  Each module is certified by qualified engineers and designed to meet all required Australian standards.
                </p>
                <div className={cn("mt-6 h-[250px] rounded-[3px] overflow-hidden relative", isLight ? "bg-[#e5e6e6]" : "bg-[#0d0e0f]")}>
                  <Image
                    src="/pillar1.webp"
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
              <div className={cn("border-r pt-8 pb-8 px-6", borderDivider)}>
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>Factory-Controlled Production</h3>
                <p className={cn("mt-3 text-sm leading-relaxed", textSubtle)}>
                  Modules are built in a stable, repeatable environment that supports consistent quality and precise manufacturing.
                </p>
                <div className={cn("mt-6 h-[250px] rounded-[3px] overflow-hidden relative", isLight ? "bg-[#e5e6e6]" : "bg-[#0d0e0f]")}>
                  <Image
                    src="/pillar2.webp"
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
              <div className="pt-8 pb-8 px-6">
                <h3 className={cn("font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]", text)}>Independent Quality Checks</h3>
                <p className={cn("mt-3 text-sm leading-relaxed", textSubtle)}>
                  Inspections at key stages verify accuracy, workmanship and readiness before modules leave the factory.
                </p>
                <div className={cn("mt-6 h-[250px] rounded-[3px] overflow-hidden relative", isLight ? "bg-[#e5e6e6]" : "bg-[#0d0e0f]")}>
                  <Image
                    src="/pillar3.webp"
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
                    src="/pillar1.webp"
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
                    src="/pillar2.webp"
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
                    src="/pillar3.webp"
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
      </section>

      <section className={cn("flex flex-col overflow-hidden pt-20 pb-24 sm:pt-24 sm:pb-28", bg, text)}>
        <div className="section-container flex flex-1 flex-col">
          <div className="space-y-4 text-center">
            <div className="font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]">
              <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
              </svg>
              <span>Why Modular Construction</span>
            </div>
            <h2 className={cn("mx-auto max-w-[48rem] font-host-grotesk text-[22px] font-medium leading-[24px] tracking-[-0.03em] sm:text-[27px] sm:leading-[29px] lg:text-[32px] lg:leading-[34px]", text)}>
              Our system blends leading architecture and offsite manufacturing delivering projects that meet Australian standards with speed and precision.
            </h2>
            <p className="mx-auto max-w-[520px] font-sans text-[14px] leading-[20px] text-white sm:text-[12px] sm:leading-[18px]">
              The benefits show up across every stage of project delivery.
            </p>
            <div className="flex justify-center">
              <Link
                href={partnerWithUsMailto}
                className={cn(
                  pageButtonClass,
                  btnPrimary,
                )}
              >
                Partner With Us
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-10 mb-10 w-full max-w-[1240px] px-6 sm:px-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {advantageCards.map((card) => (
                <article
                  key={card.label}
                  className={cn(
                    "h-full rounded-[3px] border border-white/[0.05] bg-white/[0.02] px-6 py-8 text-left sm:px-7"
                  )}
                >
                  <h3 className={cn("font-host-grotesk text-[20px] font-medium leading-[22px] tracking-[-0.03em]", text)}>
                    {card.title}
                  </h3>
                  <div className="mt-5 space-y-3">
                    {card.content.map((line) => (
                      <p key={line} className={cn("text-sm leading-relaxed", textSubtle)}>
                        {line}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className={cn("relative left-1/2 w-screen -translate-x-1/2 border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[118svh] flex flex-col overflow-hidden sm:h-screen sm:min-h-0", bg, text)}>
        <div className="section-container flex flex-1 flex-col">
          <div className="my-auto w-full pt-12 sm:pt-0">
            <div className="space-y-6 text-center">
              <div className="font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]">
                <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                  <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                  <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                  <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                </svg>
                <span>FAQ</span>
              </div>
              <h2 className={cn("mx-auto max-w-[48rem] font-host-grotesk text-[22px] font-medium leading-[24px] tracking-[-0.03em] sm:text-[27px] sm:leading-[29px] lg:text-[32px] lg:leading-[34px]", text)}>
                Frequently Asked Questions
              </h2>
            </div>
            <div className="mx-auto mt-8 max-w-3xl">
              <FAQ items={faqItems} isLight={isLight} />
            </div>
          </div>
        </div>
        <div className={cn("relative left-1/2 w-screen -translate-x-1/2 border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[60vh] flex flex-col justify-center pt-20 pb-20", bg, text)}>
        <div className="section-container">
          <div className="text-center">
            <div className="space-y-6">
              <div className="font-cal-sans inline-flex items-center gap-2 text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]">
                <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
                  <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                  <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                  <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
                </svg>
                <span>Get Started</span>
              </div>
              <h2 className={cn("mx-auto max-w-[48rem] font-host-grotesk text-[22px] font-medium leading-[24px] tracking-[-0.03em] sm:text-[27px] sm:leading-[29px] lg:text-[32px] lg:leading-[34px]", text)}>
                Ready to transform your next development?
              </h2>
            </div>
            <p className="mx-auto mt-3 w-full max-w-[440px] font-sans text-[14px] leading-[20px] text-white sm:text-[12px] sm:leading-[18px]">
              Let&rsquo;s discuss how Cloud Modular can deliver your project faster, more cost-effectively, and sustainably.
            </p>
            <div className="mt-4 flex justify-center">
              <Link
                href={partnerWithUsMailto}
                className={cn(
                  pageButtonClass,
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
