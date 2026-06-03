import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: "inline-flex items-center font-mono font-medium px-2 py-0.5 text-xs rounded border",
  variants: {
    color: {
      gray: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700",
      blue: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-800 dark:text-blue-200 dark:border-blue-700",
      green:
        "bg-green-100 text-green-700 border-green-200 dark:bg-green-800 dark:text-green-200 dark:border-green-700",
      yellow:
        "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-800 dark:text-yellow-200 dark:border-yellow-700",
      red: "bg-red-100 text-red-700 border-red-200 dark:bg-red-800 dark:text-red-200 dark:border-red-700",
    },
    size: {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-3 py-1",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    color: "gray",
    size: "sm",
    radius: "md",
  },
});

export interface BadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color" | "size" | "radius">,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  color,
  size,
  radius,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={badgeVariants({ color, size, radius, className })}
      {...props}
    />
  );
}
