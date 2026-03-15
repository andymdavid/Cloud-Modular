import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const siteUrl = "https://cloudmodular.com.au";

export const metadata: Metadata = {
  title: "About Us | Modular Construction Experts Perth WA",
  description:
    "Cloud Modular brings design, manufacturing, and compliance together to deliver modular buildings with greater control. Partnering with leading architectural and engineering teams in Western Australia.",
  alternates: {
    canonical: `${siteUrl}/about/`,
  },
  openGraph: {
    title: "About Cloud Modular | Modular Construction Experts Perth",
    description:
      "Building a better way to deliver certainty. Cloud Modular combines architectural thinking, offsite manufacturing, and rigorous engineering certification.",
    url: `${siteUrl}/about/`,
  },
};

export default function AboutPage() {
  const bg = "bg-[#010101]";
  const text = "text-white";
  const textSubtle = "text-white";
  const textMuted = "text-white/60";
  const borderDivider = "border-white/5";
  const pageButtonClass = "inline-flex h-[30px] min-w-[138px] items-center justify-center rounded-[2px] px-[16px] py-[6px] text-[11px] font-semibold transition";
  const btnPrimary = "bg-white text-forest hover:bg-[#d9d4ce]";
  const sectionLabelClass = "font-cal-sans text-[11px] uppercase leading-none tracking-[0.01em] text-[#f3f0ec]";
  const sectionHeadingClass = "font-host-grotesk text-[22px] font-medium leading-[24px] tracking-[-0.03em] sm:text-[27px] sm:leading-[29px] lg:text-[32px] lg:leading-[34px]";
  const sectionSubcopyClass = "font-sans text-[14px] leading-[20px] text-white sm:text-[12px] sm:leading-[18px]";
  const sectionH3Class = "font-host-grotesk text-[18px] font-medium leading-[20px] tracking-[-0.03em]";
  const sectionLabelIcon = (
    <svg className="h-2.5 w-3.5 sm:h-3 sm:w-4" viewBox="0 0 24 20" fill="none" aria-hidden>
      <path d="M6 4.5L14 2L18 8L10 10.5L6 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
      <path d="M10 10.5L18 8L18 15.5L10 18L10 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
      <path d="M6 4.5V12L10 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
    </svg>
  );

  return (
    <>
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <Image
          src="/aboutpage.webp"
          alt="Modern modular building exterior"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,10,0.8)_0%,rgba(8,10,10,0.5)_30%,rgba(8,10,10,0.28)_50%,rgba(8,10,10,0.5)_70%,rgba(8,10,10,0.8)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(1,1,1,0)_0%,#010101_100%)]"
          aria-hidden
        />
        <div className="relative z-10 flex h-full items-center justify-center px-6 pt-12 lg:px-20">
          <div className="mx-auto w-full max-w-4xl -translate-y-6 text-center sm:-translate-y-4 lg:translate-y-0">
            <h1 className={cn("font-host-grotesk font-bold tracking-[-0.03em] text-[32px] leading-[34px] sm:text-[48px] sm:leading-[50px] lg:text-[60px] lg:leading-[62px]", text)}>
                Building a better way to deliver certainty
              </h1>
            <div className="mt-8 flex justify-center">
              <Link
                href="/partner-with-us"
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

      <section className={cn("min-h-[100vh] grid grid-rows-[1fr_auto]", bg, text)}>
        <div className="flex items-center">
          <div className="section-container py-20 w-full">
          <div className="space-y-6 text-left md:text-center md:max-w-[925px] md:mx-auto">
            <div className={cn("inline-flex items-center gap-2", sectionLabelClass)}>
              {sectionLabelIcon}
              <span>Our Story</span>
            </div>
            <h2 className={cn(sectionHeadingClass, text)}>
              Bringing design, manufacturing and compliance together to deliver modular buildings with greater control.
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div className="space-y-5">
              <p className={cn(sectionSubcopyClass, textSubtle)}>
                Construction today asks more of every project team. Programs are tighter, expectations are higher and the pressure to deliver consistent quality has never been greater. Modular has become a practical way to meet these demands because it moves much of the work offsite, where production can be planned, measured and repeated with far greater certainty.
              </p>
              <p className={cn(sectionSubcopyClass, textSubtle)}>
                For modular to deliver on its potential, the process has to be aligned from the start. The design needs to suit manufacture. The factory needs to build with consistency. The engineering and compliance work needs to be resolved before anything leaves the floor. When these elements come together, modular gives builders and developers a cleaner program.
              </p>
            </div>
            <div className="space-y-5">
              <p className={cn(sectionSubcopyClass, textSubtle)}>
                Cloud Modular was created to bring that alignment into a single, coordinated process. We combine architectural thinking, offsite manufacturing capability and rigorous engineering certification to give clients a clear understanding of what will be built, how it will be delivered and the performance they can expect.
              </p>
              <p className={cn(sectionSubcopyClass, textSubtle)}>
                Working with our architectural, engineering and procurement partners, we support each stage of delivery so projects run with fewer variables and greater control. Our focus is simple: modular that is designed well, manufactured precisely and delivered with confidence.
              </p>
            </div>
          </div>
          </div>
        </div>
        <div className={cn("relative left-1/2 w-screen -translate-x-1/2 border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[60vh] grid grid-rows-[1fr_auto]", bg, text)}>
        <div className="flex items-center py-12 md:py-0">
          <div className="section-container grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center w-full">
            <div className="space-y-6 max-w-xl">
              <div className="space-y-4">
                <div className={cn("inline-flex items-center gap-2", sectionLabelClass)}>
                  {sectionLabelIcon}
                  <span>Partners</span>
                </div>
                <h2 className={cn(sectionHeadingClass, text)}>
                  Specialist partners support each stage of delivery.
                </h2>
              </div>
              <p className={cn(sectionSubcopyClass, textSubtle)}>
                We work with architectural, engineering and procurement partners who help ensure each project is resolved properly before it's built.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-4">
                <div className="flex min-h-[160px] items-center justify-center rounded-lg bg-[#0f1111] px-10 py-12 text-center">
                  <Image
                    src="/Prism_Logo.png"
                    alt="Prism Design Studio logo"
                    width={200}
                    height={80}
                    className="max-h-[40px] w-auto"
                  />
                </div>
                <div>
                  <p className={cn(sectionH3Class, text)}>Prism Design Studio</p>
                  <p className={cn("mt-2 font-sans text-[12px] leading-[18px]", textMuted)}>Architectural Partner</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex min-h-[160px] items-center justify-center rounded-lg bg-[#0f1111] px-10 py-12 text-center">
                  <Image
                    src="/Decobu-Logo.png"
                    alt="Decobu logo"
                    width={200}
                    height={80}
                    className="max-h-[20px] w-auto"
                  />
                </div>
                <div>
                  <p className={cn(sectionH3Class, text)}>Decobu</p>
                  <p className={cn("mt-2 font-sans text-[12px] leading-[18px]", textMuted)}>Engineering Partner</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex min-h-[160px] items-center justify-center rounded-lg bg-[#0f1111] px-10 py-12 text-center">
                  <Image
                    src="/DM_Logo.png"
                    alt="DM logo"
                    width={200}
                    height={80}
                    className="max-h-[32px] w-auto"
                  />
                </div>
                <div>
                  <p className={cn(sectionH3Class, text)}>Doepel Marsh</p>
                  <p className={cn("mt-2 font-sans text-[12px] leading-[18px]", textMuted)}>Architectural Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("relative left-1/2 w-screen -translate-x-1/2 border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[100svh] lg:h-screen lg:min-h-0 grid grid-rows-[1fr_auto]", bg, text)}>
        <div className="flex items-center">
          <div className="section-container flex w-full flex-col justify-center pt-20 pb-8 lg:pt-16 lg:pb-4">
            <div className="space-y-4 text-center">
              <div className={cn("inline-flex items-center gap-2", sectionLabelClass)}>
                {sectionLabelIcon}
                <span>Our Team</span>
              </div>
              <h2 className={cn(sectionHeadingClass, text)}>
                A team with the experience to deliver modular buildings with confidence.
              </h2>
              <p className={cn("mx-auto max-w-[440px]", sectionSubcopyClass, textSubtle)}>
                Designers, engineers, product specialists and project leads who understand what it takes to resolve modular buildings with precision and confidence.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
              {
                src: "/Kannan_Rajendiran.webp",
                name: "Kannan Rajendiran",
                role: "Co-Founder",
                bio: "Kannan brings over 21 years of experience in electrical services design, project management, and coordination across commercial, industrial, and infrastructure projects in Australia and Singapore. He is also a member of Engineers Australia (MIEAust).",
                imageClassName: "object-center",
              },
              {
                src: "/Nigel_David.webp",
                name: "Nigel David",
                role: "Co-Founder",
                bio: "Nigel has over thirty years of procurement experience in the building and construction industry specialising in export market development, international procurement management, compliance and logistics, and trade development.",
                imageClassName: "object-center",
              },
              {
                src: "/Andy_David.webp",
                name: "Andy David",
                role: "Co-Founder",
                bio: "Andy has extensive experience in technology, particularly artificial intelligence, and across management consulting and capital raising projects, digital transformation, growth, and business performance improvement.",
                imageClassName: "object-[center_18%]",
              },
              {
                src: "/Mike_Liang.webp",
                name: "Mike Liang",
                role: "China Lead",
                bio: "Leading the company's China operations, Mike is an engineer with a strong technical background across architectural design, smart building systems, and environmental protection equipment, delivering practical and sustainable construction solutions.",
                imageClassName: "object-[center_24%]",
              },
              ].map((member) => (
                <div
                  key={member.name}
                  className="flex h-full flex-col rounded-[3px] border border-white/5 bg-[#0f1111] p-3"
                >
                  <div className="aspect-[1/1] overflow-hidden rounded-[3px] border border-white/5">
                    <Image
                      src={member.src}
                      alt={member.name}
                      width={1024}
                      height={1024}
                      className={cn("h-full w-full object-cover", member.imageClassName)}
                    />
                  </div>
                  <div className="mt-3 flex flex-1 flex-col">
                    <p className={cn(sectionH3Class, text)}>{member.name}</p>
                    <p className={cn("mt-2 font-sans text-[12px] leading-[18px]", textMuted)}>{member.role}</p>
                    <p className={cn("mt-3 font-sans text-[12px] leading-[18px]", textSubtle)}>
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={cn("relative left-1/2 w-screen -translate-x-1/2 border-b", borderDivider)}></div>
      </section>

      <section className={cn("min-h-[60vh] grid grid-rows-[1fr_auto]", bg, text)}>
        <div className="flex items-center">
          <div className="section-container w-full">
          <div className="text-center">
            <div className="space-y-6">
              <div className={cn("inline-flex items-center gap-2", sectionLabelClass)}>
                {sectionLabelIcon}
                <span>Get Started</span>
              </div>
              <h2 className={cn(sectionHeadingClass, text)}>
                Ready to transform your next development.
              </h2>
            </div>
            <p className={cn("mx-auto mt-5 w-full max-w-[440px]", sectionSubcopyClass, textSubtle)}>
              Let&rsquo;s discuss how Cloud Modular can deliver your project faster, more cost-effectively, and sustainably.
            </p>
            <div className="mt-5 flex justify-center">
              <Link
                href="/partner-with-us"
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
        </div>
        <div className={cn("relative left-1/2 w-screen -translate-x-1/2 border-b", borderDivider)}></div>
      </section>
    </>
  );
}
