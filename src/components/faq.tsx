"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-white/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              className="flex w-full items-center justify-between py-6 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-lg font-medium text-white">
                {item.question}
              </span>
              <span
                className={cn(
                  "text-white transition-transform",
                  isOpen && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden text-white/70 transition-all duration-300",
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
