import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import { applyTheme, readTheme, setTheme, subscribeThemeChange } from "./theme";

describe("theme", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));
    setTheme("system");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("uses the system preference but allows an explicit light theme", () => {
    applyTheme("system");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    setTheme("light");
    expect(readTheme()).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("notifies controls for local changes and other tabs, and cleans up", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeThemeChange(listener);
    setTheme("dark");
    window.dispatchEvent(new Event("storage"));
    expect(listener).toHaveBeenCalledTimes(2);
    unsubscribe();
    setTheme("system");
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("keeps the selected theme usable when storage writes fail", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage blocked");
    });
    setTheme("dark");
    expect(readTheme()).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
