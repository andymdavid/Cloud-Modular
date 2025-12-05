"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { capabilitiesOverview, capabilityCards } from "@/content/site";
import { cn } from "@/lib/utils";

export function CapabilitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index ?? 0);
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: "-10% 0px -40% 0px",
      },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-[220vh] bg-white text-slate-900">
      <div className="section-container">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
          <div className="py-24 font-sans lg:sticky lg:top-24 lg:w-[38%]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              {capabilitiesOverview.label}
            </p>
            <h2 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              {capabilitiesOverview.title}
            </h2>
            <p className="mt-6 text-lg text-slate-600">{capabilitiesOverview.description}</p>
            <div className="mt-12 border-y border-slate-100 font-mono text-xs">
              {capabilitiesOverview.focusAreas.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={item}
                    className={cn(
                      "flex items-center gap-4 border-b border-slate-100 py-5 uppercase tracking-[0.35em] transition-colors last:border-b-0",
                      isActive ? "text-slate-900" : "text-slate-400",
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-md bg-forest transition-all",
                        isActive ? "scale-100 opacity-100" : "-translate-x-2 scale-0 opacity-0",
                      )}
                    />
                    <span className={cn("transition-transform", isActive ? "scale-105" : "scale-100")}>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative flex-1">
            <div className="space-y-12 py-24">
              {capabilityCards.map((card, index) => (
                <article
                  key={card.title}
                  ref={(el) => (cardRefs.current[index] = el)}
                  data-index={index}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-shadow hover:shadow-2xl"
                  style={{ marginTop: `${index * 1.5}rem` }}
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    <div className="relative aspect-[4/3]">
                      <Image src={card.image} alt={card.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-3 font-sans text-slate-600">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest/70" />
                      {card.badge}
                    </span>
                    <h3 className="text-2xl font-semibold text-slate-900">{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
