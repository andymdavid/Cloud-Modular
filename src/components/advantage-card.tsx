"use client";

import { useState } from "react";
import Image from "next/image";

interface AdvantageCardProps {
  image: string;
  label: string;
  title: string;
  content: string[];
}

export function AdvantageCard({ image, label, title, content }: AdvantageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="group relative min-w-[420px] max-w-[420px] h-[580px] rounded-[24px] border border-white/5 overflow-hidden cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        backgroundColor: isExpanded ? "#0f1111" : "rgba(255, 255, 255, 0.05)",
      }}
    >
      {!isExpanded && (
        <>
          <Image
            src={image}
            alt={label}
            fill
            className="object-cover brightness-50 transition-all duration-300 group-hover:brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </>
      )}

      {isExpanded && (
        <div className="p-6 pt-8">
          <div className="space-y-2">
            {content.map((line, index) => (
              <p
                key={index}
                className={`hero-heading text-[21px] ${
                  index === 0 ? "text-white" : "text-[#8e939c]"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/60">
            {label}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white whitespace-nowrap">
            {title}
          </h3>
        </div>
        <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white transition-all duration-300 group-hover:bg-white/30 group-hover:border-white/40">
          <span className="text-lg">&gt;</span>
        </button>
      </div>
    </div>
  );
}
