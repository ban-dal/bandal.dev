"use client";

import { useEffect, useState } from "react";

import { DesktopIcon, MoonIcon, SunIcon } from "@/components/ThemeIcons";
import { Switch } from "@/components/ui/Switch";

type Theme = "system" | "light" | "dark";

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
  icon: React.ReactNode;
  label: string;
  value: Theme;
}[];

function readTheme(): Theme {
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

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const storedTheme = readTheme();

    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  return (
    <Switch
      ariaLabel="테마 변경"
      itemClassName="size-8 min-h-8 px-0"
      items={THEME_OPTIONS}
      onValueChange={(nextTheme) => {
        setTheme(nextTheme);
        applyTheme(nextTheme);
      }}
      value={theme}
    />
  );
}
