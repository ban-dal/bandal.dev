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
    icon: <DesktopIcon className="size-3.5" />,
  },
  {
    value: "light",
    label: "라이트 테마",
    icon: <SunIcon className="size-3.5" />,
  },
  {
    value: "dark",
    label: "다크 테마",
    icon: <MoonIcon className="size-3.5" />,
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
    <div aria-label="테마 변경" className="flex items-center" role="group">
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          aria-label={option.label}
          aria-pressed={theme === option.value}
          title={option.label}
          className={cn(
            "text-muted hover:text-foreground focus-visible:outline-focus relative inline-grid h-11 w-8 place-items-center rounded-sm transition-colors duration-180 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
            theme === option.value &&
              "text-foreground after:absolute after:bottom-1 after:size-0.5 after:rounded-full after:bg-current",
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
