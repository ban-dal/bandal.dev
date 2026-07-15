"use client";

import { useSyncExternalStore, type ReactNode } from "react";

import { DesktopIcon, MoonIcon, SunIcon } from "@/components/ThemeIcons";
import { cn } from "@/lib/utils";

type Theme = "system" | "light" | "dark";

const THEME_STORAGE_EVENT = "theme-storage-change";

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

function readTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = localStorage.getItem("theme");

  if (
    storedTheme === "system" ||
    storedTheme === "light" ||
    storedTheme === "dark"
  ) {
    return storedTheme;
  }

  return "system";
}

function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  localStorage.setItem("theme", theme);
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle(
    "dark",
    theme === "dark" || (theme === "system" && prefersDark),
  );
}

function subscribeThemeChange(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_STORAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_STORAGE_EVENT, onStoreChange);
  };
}

function emitThemeChange() {
  window.dispatchEvent(new Event(THEME_STORAGE_EVENT));
}

function getServerThemeSnapshot(): Theme {
  return "system";
}

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
            "text-muted hover:text-foreground focus-visible:outline-focus inline-grid size-7 place-items-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
            theme === option.value && "text-primary",
          )}
          onClick={() => {
            applyTheme(option.value);
            emitThemeChange();
          }}
          type="button"
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
