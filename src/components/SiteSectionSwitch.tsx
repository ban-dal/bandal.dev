"use client";

import { usePathname } from "next/navigation";

import { Switch } from "@/components/ui/Switch";

const SECTION_ITEMS = [
  { href: "/blog", label: "Blog", value: "blog" },
  { href: "/about", label: "About", value: "about" },
] as const;

type Section = (typeof SECTION_ITEMS)[number]["value"];

function getActiveSection(pathname: string): Section {
  if (pathname.startsWith("/about")) {
    return "about";
  }

  return "blog";
}

export function SiteSectionSwitch() {
  const pathname = usePathname();

  return (
    <Switch
      ariaLabel="Primary navigation"
      className="min-w-36 bg-surface/84 max-md:min-w-26"
      itemClassName="px-4 max-md:px-2"
      items={SECTION_ITEMS}
      value={getActiveSection(pathname)}
    />
  );
}
