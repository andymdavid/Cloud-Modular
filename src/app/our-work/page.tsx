import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work - Cloud Modular",
  description: "Cloud Modular projects coming soon.",
};

export default function OurWorkPage() {
  return (
    <div className="bg-[#080a0a] min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-serif mb-4">Projects</h1>
        <p className="text-white/70">Coming soon</p>
      </div>
    </div>
  );
}
