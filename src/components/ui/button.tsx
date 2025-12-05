import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "text";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-white hover:bg-forest-dark focus-visible:outline-forest",
  secondary:
    "border-2 border-forest text-forest hover:bg-forest hover:text-white focus-visible:outline-forest",
  text: "text-forest underline decoration-2 underline-offset-4 hover:text-forest-dark",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm py-2 px-4",
  md: "text-base py-3 px-6",
  lg: "text-lg py-4 px-10",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-sm font-medium transition duration-300 ease-standard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export function buttonVariants({
  variant = "primary",
  size = "md",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return cn(
    "inline-flex items-center justify-center rounded-sm font-medium transition duration-300 ease-standard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variantStyles[variant],
    sizeStyles[size],
  );
}
