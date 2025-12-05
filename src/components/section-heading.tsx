import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "text-center mx-auto max-w-prose",
        className,
      )}
    >
      {label && <p className="section-label">{label}</p>}
      <h2 className="text-4xl leading-tight text-charcoal md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-mid-gray md:text-xl">{description}</p>
      )}
    </div>
  );
}
