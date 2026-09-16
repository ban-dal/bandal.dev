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
    <nav aria-label="Primary navigation" className="flex items-center gap-1">
      <Link
        aria-current={activeSection === "blog" ? "page" : undefined}
        className={cn(
          "text-muted hover:text-foreground focus-visible:outline-focus inline-flex min-h-11 min-w-11 items-center justify-center px-1 text-[13px] underline-offset-4 transition-colors duration-180 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
          activeSection === "blog" && "text-foreground underline",
        )}
        href="/blog"
      >
        Blog
      </Link>
      <Link
        aria-current={activeSection === "about" ? "page" : undefined}
        className={cn(
          "text-muted hover:text-foreground focus-visible:outline-focus inline-flex min-h-11 min-w-11 items-center justify-center px-1 text-[13px] underline-offset-4 transition-colors duration-180 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
          activeSection === "about" && "text-foreground underline",
        )}
        href="/about"
      >
        About
      </Link>
    </nav>
  );
}
