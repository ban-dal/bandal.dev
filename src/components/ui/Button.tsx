import { tv } from "tailwind-variants";

import { RippleEffect } from "@/components/ui/RippleEffect";
import { useRipple } from "@/hooks/useRipple";
import { variants } from "@/lib/variant";

import type { VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "relative inline-flex items-center justify-center whitespace-nowrap transition overflow-hidden cursor-pointer",
  variants: {
    variant: {
      solid: "",
      outline: "border bg-transparent",
      link: "underline underline-offset-4 hover:text-primary whitespace-pre-wrap break-all",
      light: "",
    },
    color: {
      primary: "",
      foreground: "",
    },
    size: {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-3 font-medium",
      lg: "text-lg px-8 py-4 font-bold",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    disabled: {
      true: "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    isIconOnly: {
      true: "px-0 gap-0",
      false: "[&>svg]:ml-2",
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
    radius: "md",
    isIconOnly: false,
    disabled: false,
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "primary",
      className: variants.solid.primary,
    },
    {
      variant: "solid",
      color: "foreground",
      className: variants.solid.foreground,
    },
    {
      variant: "outline",
      color: "primary",
      className: variants.outline.primary,
    },
    {
      variant: "outline",
      color: "foreground",
      className: variants.outline.foreground,
    },
    {
      variant: "link",
      color: "primary",
      className: variants.link.primary,
    },
    {
      variant: "link",
      color: "foreground",
      className: variants.link.foreground,
    },
    {
      variant: "light",
      color: "primary",
      className: [variants.light.primary, "hover:bg-primary/10"],
    },
    {
      variant: "light",
      color: "foreground",
      className: [variants.light.foreground, "hover:bg-foreground/10"],
    },
    // link
    {
      variant: "link",
      className: "p-0 [&>svg]:ml-0.5",
    },
    // Icon Only
    {
      isIconOnly: true,
      size: "sm",
      class: "min-w-8 size-8",
    },
    {
      isIconOnly: true,
      size: "md",
      class: "min-w-10 size-10",
    },
    {
      isIconOnly: true,
      size: "lg",
      class: "min-w-12 size-12",
    },
    // hover
    {
      variant: ["solid", "outline"],
      class: "hover:opacity-80",
    },
  ],
});

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  color,
  size,
  radius,
  isIconOnly,
  disabled,
  variant = "solid",
  ...rest
}: ButtonProps) {
  const { ripples, addRipple, containerRef } = useRipple();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === "solid") {
      addRipple(e);
    }

    rest.onClick?.(e);
  };

  return (
    <button
      ref={containerRef as React.RefObject<HTMLButtonElement>}
      className={buttonVariants({
        color,
        size,
        variant,
        radius,
        isIconOnly,
        disabled,
        className,
      })}
      onClick={handleClick}
      disabled
      {...rest}
    >
      {rest.children}
      {variant === "solid" && <RippleEffect ripples={ripples} />}
    </button>
  );
}

export { Button, buttonVariants };
