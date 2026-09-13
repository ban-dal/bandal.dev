"use client";

import { useSyncExternalStore, type ReactNode } from "react";

import { DesktopIcon, MoonIcon, SunIcon } from "@/components/ThemeIcons";
import {
  readTheme,
  setTheme,
  subscribeThemeChange,
  getServerThemeSnapshot,
  type Theme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  {
    value: "system",
    label: "시스템 테마",
    icon: <DesktopIcon className="size-4" />,
  },
  {
    value: "light",
    label: "라이트 테마",
    icon: <SunIcon className="size-4" />,
  },
  {
    value: "dark",
    label: "다크 테마",
    icon: <MoonIcon className="size-4" />,
  },
] satisfies {
  icon: ReactNode;
  label: string;
  value: Theme;
}[];

export function ThemeSwitch() {
  const theme = useSyncExternalStore(
    subscribeThemeChange,
    readTheme,
    getServerThemeSnapshot,
  );

  return (
    <div
      aria-label="테마 변경"
      className="flex items-center gap-1"
      role="group"
    >
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          aria-label={option.label}
          aria-pressed={theme === option.value}
          className={cn(
            "text-muted hover:text-foreground focus-visible:outline-focus inline-grid size-11 place-items-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:size-8",
            theme === option.value &&
              "bg-surface-muted text-primary ring-border ring-1",
          )}
          onClick={() => {
            setTheme(option.value);
          }}
          type="button"
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
