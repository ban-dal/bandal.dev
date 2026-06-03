import Image from "next/image";

import { SiteSectionSwitch } from "@/components/SiteSectionSwitch";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export function SiteNav() {
  return (
    <nav
      aria-label="Site navigation"
      className="flex h-18 items-center justify-center"
    >
      <div className="border-foreground/12 bg-background/88 flex w-fit max-w-[calc(100vw-1rem)] items-center gap-1 rounded-[2rem] border p-1 shadow-[0_18px_55px_rgb(0_0_0/0.16),inset_0_1px_0_rgb(255_255_255/0.16)] backdrop-blur-2xl md:gap-1.5 md:p-1.5 dark:border-white/12 dark:bg-[#090a08]/88 dark:shadow-[0_22px_58px_rgb(0_0_0/0.42),inset_0_1px_0_rgb(255_255_255/0.10)]">
        <span
          aria-hidden="true"
          className="ring-foreground/10 inline-grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-[0_10px_24px_rgb(0_0_0/0.18),inset_0_1px_0_rgb(255_255_255/0.18)] ring-1 max-md:size-10"
        >
          <Image
            src="/avatar.png"
            alt=""
            width={44}
            height={44}
            priority
            className="size-full object-cover"
          />
        </span>
        <span
          aria-hidden="true"
          className="bg-border/80 h-8 w-px shrink-0 max-md:hidden dark:bg-white/12"
        />
        <SiteSectionSwitch />
        <span
          aria-hidden="true"
          className="bg-border/80 h-8 w-px shrink-0 max-md:hidden dark:bg-white/12"
        />
        <ThemeSwitch />
      </div>
    </nav>
  );
}
