"use client";

import { useEffect } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

type Theme = "light" | "dark" | "system";

function getStoredTheme(): Theme {
  const storedTheme = localStorage.getItem("theme");

  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme;
  }

  return "system";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  root.dataset.theme = theme;
  root.classList.toggle(
    "dark",
    theme === "dark" || (theme === "system" && systemPrefersDark),
  );
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => applyTheme(getStoredTheme());
    const handleThemeStorageChange = () => applyTheme(getStoredTheme());

    applyTheme(getStoredTheme());
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    window.addEventListener("storage", handleThemeStorageChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      window.removeEventListener("storage", handleThemeStorageChange);
    };
  }, []);

  return <>{children}</>;
}
