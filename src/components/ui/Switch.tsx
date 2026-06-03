"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

type SwitchItem<Value extends string> = {
  href?: string;
  icon?: React.ReactNode;
  label: string;
  value: Value;
};

type SwitchProps<Value extends string> = {
  ariaLabel: string;
  className?: string;
  indicatorClassName?: string;
  itemClassName?: string;
  items: readonly SwitchItem<Value>[];
  onValueChange?: (value: Value) => void;
  value: Value;
};

type SwitchStyle = React.CSSProperties & {
  "--switch-count": number;
  "--switch-index": number;
};

type SwitchItemControlProps<Value extends string> = {
  className: string;
  isActive: boolean;
  item: SwitchItem<Value>;
  onSelect?: (value: Value) => void;
};

function getSwitchItemClassName({
  hasIcon,
  itemClassName,
}: {
  hasIcon: boolean;
  itemClassName?: string;
}) {
  return cn(
    "relative z-10 inline-grid min-h-8 place-items-center rounded-full px-3 text-sm font-[760] text-muted transition duration-300 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[active=true]:text-background",
    hasIcon && "grid-flow-col gap-1.5 px-2",
    itemClassName,
  );
}

function SwitchLinkItem<Value extends string>({
  className,
  isActive,
  item,
  onSelect,
}: SwitchItemControlProps<Value>) {
  if (!item.href) {
    return null;
  }

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={className}
      data-active={isActive}
      href={item.href}
      onClick={() => onSelect?.(item.value)}
    >
      {item.icon}
      {item.label}
    </Link>
  );
}

function SwitchButtonItem<Value extends string>({
  className,
  isActive,
  item,
  onSelect,
}: SwitchItemControlProps<Value>) {
  return (
    <button
      aria-label={item.label}
      aria-pressed={isActive}
      className={className}
      data-active={isActive}
      onClick={() => onSelect?.(item.value)}
      type="button"
    >
      {item.icon}
      <span className={cn(item.icon && "sr-only")}>{item.label}</span>
    </button>
  );
}

function SwitchItemControl<Value extends string>({
  className,
  isActive,
  item,
  onSelect,
}: SwitchItemControlProps<Value>) {
  if (item.href) {
    return (
      <SwitchLinkItem
        className={className}
        isActive={isActive}
        item={item}
        onSelect={onSelect}
      />
    );
  }

  return (
    <SwitchButtonItem
      className={className}
      isActive={isActive}
      item={item}
      onSelect={onSelect}
    />
  );
}

export function Switch<Value extends string>({
  ariaLabel,
  className,
  indicatorClassName,
  itemClassName,
  items,
  onValueChange,
  value,
}: SwitchProps<Value>) {
  const activeIndex = Math.max(
    items.findIndex((item) => item.value === value),
    0,
  );
  const switchStyle: SwitchStyle = {
    "--switch-count": items.length,
    "--switch-index": activeIndex,
  };

  return (
    <div
      aria-label={ariaLabel}
      className={cn(
        "border-border bg-surface/90 relative grid rounded-full border p-1 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]",
        className,
      )}
      role="group"
      style={{
        ...switchStyle,
        gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
      }}
    >
      <span
        className={cn(
          "bg-foreground pointer-events-none absolute top-1 bottom-1 left-1 w-[calc((100%_-_0.5rem)/var(--switch-count))] rounded-full shadow-[0_8px_24px_rgb(0_0_0/0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          indicatorClassName,
        )}
        style={{
          transform: "translateX(calc(var(--switch-index) * 100%))",
        }}
      />
      {items.map((item) => {
        const isActive = item.value === value;
        const switchItemClassName = getSwitchItemClassName({
          hasIcon: Boolean(item.icon),
          itemClassName,
        });

        return (
          <SwitchItemControl
            key={item.value}
            className={switchItemClassName}
            isActive={isActive}
            item={item}
            onSelect={onValueChange}
          />
        );
      })}
    </div>
  );
}
