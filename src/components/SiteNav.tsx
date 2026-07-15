import Image from "next/image";

import { SiteSectionSwitch } from "@/components/SiteSectionSwitch";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export function SiteNav() {
  return (
    <nav
      aria-label="Site navigation"
      className="mx-auto flex h-14 w-[min(100%-2rem,56rem)] items-center justify-between gap-4"
    >
      <div className="flex min-w-0 items-center gap-2.5">
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
      </div>
      <div className="flex items-center gap-4">
        <SiteSectionSwitch />
        <ThemeSwitch />
      </div>
    </nav>
  );
}
