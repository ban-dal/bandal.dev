"use client";

import { useEffect } from "react";

import { applyTheme, readTheme, subscribeThemeChange } from "@/lib/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => applyTheme(readTheme());
    const handleThemeStorageChange = () => applyTheme(readTheme());

    applyTheme(readTheme());
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    const unsubscribe = subscribeThemeChange(handleThemeStorageChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      unsubscribe();
    };
  }, []);

  return <>{children}</>;
}
