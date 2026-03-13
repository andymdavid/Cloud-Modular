"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
  isLight?: boolean;
};

export function FAQ({ items, isLight = false }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const dividerColor = isLight ? "divide-black/10" : "divide-white/10";
  const textPrimary = isLight ? "text-[#080a0a]" : "text-white";
  const textMuted = isLight ? "text-[#080a0a]/70" : "text-white/70";

  return (
    <div className={cn("divide-y", dividerColor)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              className="flex w-full items-center justify-between py-6 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className={cn("text-lg font-medium", textPrimary)}>
                {item.question}
              </span>
              <span
                className={cn(
                  "transition-transform",
                  textPrimary,
                  isOpen && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300",
                textMuted,
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden text-base leading-relaxed min-h-0">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
