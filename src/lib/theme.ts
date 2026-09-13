export type Theme = "system" | "light" | "dark";

const THEME_STORAGE_EVENT = "theme-storage-change";
let sessionTheme: Theme | undefined;

export function readTheme(): Theme {
  if (sessionTheme) return sessionTheme;
  try {
    const theme = localStorage.getItem("theme");
    return theme === "light" || theme === "dark" ? theme : "system";
  } catch {
    return "system";
  }
}

export function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle(
    "dark",
    theme === "dark" || (theme === "system" && prefersDark),
  );
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
    sessionTheme = undefined;
  } catch {
    sessionTheme = theme;
  }
  applyTheme(theme);
  window.dispatchEvent(new Event(THEME_STORAGE_EVENT));
}

export function subscribeThemeChange(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_STORAGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_STORAGE_EVENT, onStoreChange);
  };
}

export function getServerThemeSnapshot(): Theme {
  return "system";
}
