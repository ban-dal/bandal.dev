import Link from "next/link";

import { SiteSectionSwitch } from "@/components/SiteSectionSwitch";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export function SiteNav() {
  return (
    <div className="max-w-blog container flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
      <Link
        href="/blog"
        aria-label="bandal.dev 홈"
        className="text-text-secondary hover:text-foreground flex min-h-11 min-w-0 items-center text-[13px] font-medium transition-colors"
      >
        <span className="truncate">bandal.dev</span>
      </Link>
      <div className="flex items-center gap-2 sm:gap-5">
        <SiteSectionSwitch />
        <ThemeSwitch />
      </div>
    </div>
  );
}
