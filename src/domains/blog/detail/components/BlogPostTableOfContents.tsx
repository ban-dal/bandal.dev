"use client";

import { useState } from "react";

import { Drawer } from "@/components/ui/Drawer";
import type { ContentHeading } from "@/lib/content-utils";

type BlogPostTableOfContentsProps = {
  headings: ContentHeading[];
};

type BlogPostTocLinksProps = BlogPostTableOfContentsProps & {
  onNavigate?: () => void;
};

function handleTocLinkClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  headingId: string,
  onNavigate?: () => void,
) {
  const headingElement = document.getElementById(headingId);

  if (!headingElement) {
    onNavigate?.();
    return;
  }

  event.preventDefault();
  headingElement.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  window.history.pushState(null, "", `#${headingId}`);
  onNavigate?.();
}

function BlogPostTocLinks({ headings, onNavigate }: BlogPostTocLinksProps) {
  return (
    <div className="grid gap-2.5">
      {headings.map((heading) => (
        <a
          key={`${heading.id}-${heading.text}`}
          href={`#${heading.id}`}
          className={`text-muted hover:text-foreground text-sm leading-snug transition ${
            heading.depth === 3 ? "pl-3.5" : ""
          }`}
          onClick={(event) => handleTocLinkClick(event, heading.id, onNavigate)}
        >
          {heading.text}
        </a>
      ))}
    </div>
  );
}

export function BlogPostTableOfContents({
  headings,
}: BlogPostTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      <aside
        className="border-border sticky top-24 col-start-2 row-start-1 max-h-[calc(100vh-8rem)] overflow-auto border-l pl-4 max-lg:hidden"
        aria-label="Table of contents"
      >
        <span className="text-primary mb-3.5 block text-xs font-[850] uppercase">
          On this page
        </span>
        <BlogPostTocLinks headings={headings} />
      </aside>

      <div className="sticky top-[4.625rem] z-20 -mt-2 mb-4 hidden justify-end max-lg:flex">
        <button
          type="button"
          className="border-foreground bg-foreground text-background focus-visible:outline-primary inline-flex min-h-9 items-center justify-center rounded-full border px-4 font-[760] shadow-[0_12px_28px_rgb(0_0_0/0.22),0_2px_8px_rgb(0_0_0/0.14)] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 dark:shadow-[0_14px_30px_rgb(0_0_0/0.42)]"
          onClick={() => setIsOpen(true)}
        >
          목차
        </button>
      </div>

      <Drawer
        direction="bottom"
        onOpenChange={setIsOpen}
        open={isOpen}
        title="목차"
      >
        <BlogPostTocLinks
          headings={headings}
          onNavigate={() => setIsOpen(false)}
        />
      </Drawer>
    </>
  );
}
