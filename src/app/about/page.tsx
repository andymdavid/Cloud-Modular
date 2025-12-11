import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  return (
    <>
      <section className="bg-[#080a0a] text-white">
        <div className="grid min-h-[calc(100vh-4rem)] grid-rows-[minmax(40vh,auto)_minmax(60vh,1fr)] pt-16">
          <div className="flex min-h-[40vh] items-end px-6 pb-12 pt-24 text-center sm:pt-28 sm:pb-16 lg:px-20">
            <div className="mx-auto w-full max-w-4xl">
              <h2 className="text-[30px] leading-[33px] text-white lg:text-[40px] lg:leading-[40px]">
                Building a better way to deliver certainty
              </h2>
              <div className="mt-8 flex justify-center">
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
          </div>
          <div className="relative min-h-[60vh]">
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

      <section className="min-h-[100vh] bg-[#080a0a] text-white flex flex-col justify-center">
        <div className="section-container py-20">
          <div className="space-y-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">Our Story</p>
            <h2 className="text-[30px] leading-[33px] text-white lg:text-[40px] lg:leading-[40px]">
              Bringing design, manufacturing and compliance together to deliver modular buildings with greater control.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto lg:items-start">
            <div className="space-y-5">
              <p className="text-base text-white/70 leading-relaxed">
                Construction today asks more of every project team. Programs are tighter, expectations are higher and the pressure to deliver consistent quality has never been greater. Modular has become a practical way to meet these demands because it moves much of the work offsite, where production can be planned, measured and repeated with far greater certainty.
              </p>
              <p className="text-base text-white/70 leading-relaxed">
                For modular to deliver on its potential, the process has to be aligned from the start. The design needs to suit manufacture. The factory needs to build with consistency. The engineering and compliance work needs to be resolved before anything leaves the floor. When these elements come together, modular gives builders and developers a cleaner program.
              </p>
            </div>
            <div className="space-y-5">
              <p className="text-base text-white/70 leading-relaxed">
                dependable path from brief to completion.
              </p>
              <p className="text-base text-white/70 leading-relaxed">
                Cloud Modular was created to bring that alignment into a single, coordinated process. We combine architectural thinking, offsite manufacturing capability and rigorous engineering certification to give clients a clear understanding of what will be built, how it will be delivered and the performance they can expect.
              </p>
              <p className="text-base text-white/70 leading-relaxed">
                Working with our architectural, engineering and procurement partners, we support each stage of delivery so projects run with fewer variables and greater control. Our focus is simple: modular that is designed well, manufactured precisely and delivered with confidence.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[80%] mx-auto mt-20 border-b border-white/5"></div>
      </section>

      <section className="bg-[#080a0a] text-white min-h-[50vh] flex items-center py-16">
        <div className="section-container grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          <div className="space-y-6 max-w-xl">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Partners</p>
              <h2 className="text-[30px] leading-[33px] text-white lg:text-[40px] lg:leading-[40px]">
                Specialist partners support each stage of delivery
              </h2>
            </div>
            <p className="text-base text-white/70 leading-relaxed">
              We work with architectural, engineering and procurement partners who help ensure each project is resolved properly before it's built.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div className="space-y-4">
              <div className="rounded-lg bg-white px-10 py-12 text-center text-[#0a0a0a]">
                <span className="text-2xl font-semibold">Accel</span>
              </div>
              <div>
                <p className="text-base font-semibold text-white">Prism Design Studio</p>
                <p className="text-sm text-white/60">Architectural Partner</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-white px-10 py-12 text-center text-[#0a0a0a]">
                <span className="text-2xl font-semibold tracking-[0.2em]">SEQUOIA</span>
              </div>
              <div>
                <p className="text-base font-semibold text-white">Decobu</p>
                <p className="text-sm text-white/60">Engineering Partner</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-white px-10 py-12 text-center text-[#0a0a0a]">
                <span className="text-2xl font-semibold whitespace-nowrap">Founders Fund</span>
              </div>
              <div>
                <p className="text-base font-semibold text-white">Cloud Procurement</p>
                <p className="text-sm text-white/60">Procurement Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
