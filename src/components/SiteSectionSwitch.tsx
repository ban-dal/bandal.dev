"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type Section = "about" | "blog";

function getActiveSection(pathname: string): Section {
  if (pathname.startsWith("/about")) {
    return "about";
  }

  return "blog";
}

export function SiteSectionSwitch() {
  const pathname = usePathname();
  const activeSection = getActiveSection(pathname);

  return (
    <nav aria-label="Primary navigation" className="flex items-center gap-3">
      <Link
        aria-current={activeSection === "blog" ? "page" : undefined}
        className={cn(
          "text-muted hover:text-foreground focus-visible:outline-focus text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
          activeSection === "blog" && "text-foreground font-semibold",
        )}
        href="/blog"
      >
        Blog
      </Link>
      <Link
        aria-current={activeSection === "about" ? "page" : undefined}
        className={cn(
          "text-muted hover:text-foreground focus-visible:outline-focus text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
          activeSection === "about" && "text-foreground font-semibold",
        )}
        href="/about"
      >
        About
      </Link>
    </nav>
  );
}
