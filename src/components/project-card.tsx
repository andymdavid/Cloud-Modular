import Image from "next/image";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  location: string;
  image: string;
  description?: string;
  type?: string;
  year?: string;
  scale?: string;
  variant?: "overlay" | "stacked";
  className?: string;
};

export function ProjectCard({
  title,
  location,
  image,
  description,
  type,
  year,
  scale,
  variant = "overlay",
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-none bg-white",
        variant === "stacked" && "flex flex-col",
        className,
      )}
    >
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={image}
          alt={`${title} in ${location}`}
          fill
          className="object-cover transition duration-500 ease-standard hover:scale-110"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={false}
        />
        {variant === "overlay" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        )}
      </div>
      <div
        className={cn(
          "p-6",
          variant === "overlay" &&
            "absolute inset-0 flex flex-col justify-end text-white",
        )}
      >
        <p className="text-sm uppercase tracking-[0.3em] opacity-80">
          {location}
        </p>
        <h3 className="mt-2 text-2xl leading-snug">
          {title}
          {type ? ` · ${type}` : ""}
        </h3>
        {description && (
          <p
            className={cn(
              "mt-3 text-base",
              variant === "overlay" ? "text-white/80" : "text-mid-gray",
            )}
          >
            {description}
          </p>
        )}
        {(year || scale) && (
          <p
            className={cn(
              "mt-2 text-sm",
              variant === "overlay" ? "text-white/70" : "text-mid-gray",
            )}
          >
            {[year, scale].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}
