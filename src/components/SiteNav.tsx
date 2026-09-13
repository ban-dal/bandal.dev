import Image from "next/image";
import Link from "next/link";

import { SiteSectionSwitch } from "@/components/SiteSectionSwitch";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export function SiteNav() {
  return (
    <div className="container flex min-h-14 flex-wrap items-center justify-between gap-4 py-1">
      <Link
        href="/blog"
        aria-label="bandal.dev 홈"
        className="flex min-h-11 min-w-0 items-center gap-2.5"
      >
        <span
          aria-hidden="true"
          className="border-border bg-surface inline-grid size-7 shrink-0 place-items-center overflow-hidden rounded-sm border"
        >
          <Image
            src="/avatar.png"
            alt=""
            width={28}
            height={28}
            priority
            className="size-full object-cover"
          />
        </span>
        <span className="truncate text-sm font-semibold">bandal.dev</span>
      </Link>
      <div className="flex items-center gap-1 sm:gap-4">
        <SiteSectionSwitch />
        <ThemeSwitch />
      </div>
    </div>
  );
}
