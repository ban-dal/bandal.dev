"use client";

import { useState, type CSSProperties } from "react";

import type { ContentHeading } from "@/lib/content-utils";
import { cn } from "@/lib/utils";

import { useBlogPostReadingPosition } from "../hooks/useBlogPostReadingPosition";

type BlogPostTableOfContentsProps = {
  headings: ContentHeading[];
};

function BlogPostTocLinks({
  headings,
  activeId,
  onNavigate,
}: BlogPostTableOfContentsProps & {
  activeId?: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="grid gap-2.5">
      {headings.map((heading) => (
        <a
          key={`${heading.id}-${heading.text}`}
          href={`#${heading.id}`}
          aria-current={activeId === heading.id ? "location" : undefined}
          onClick={onNavigate}
          className={cn(
            "text-muted hover:text-foreground flex min-h-11 items-center border-l-2 border-transparent py-1 pl-3 text-sm leading-relaxed [overflow-wrap:anywhere] break-keep transition-colors sm:min-h-6",
            heading.depth === 3 && "pl-6",
            activeId === heading.id &&
              "border-primary bg-surface-muted text-primary font-semibold",
          )}
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
  const { activeId, headerHeight } = useBlogPostReadingPosition(headings);
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Table of contents"
      style={{ "--site-header-height": `${headerHeight}px` } as CSSProperties}
      className="border-border bg-background sticky top-[var(--site-header-height)] z-30 mb-10 border-y lg:top-[calc(var(--site-header-height)+1.5rem)] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mb-0 lg:max-h-[calc(100dvh-6rem)] lg:min-w-0 lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:border-y-0 lg:border-r lg:pr-4 print:hidden"
    >
      <nav aria-label="목차" className="hidden lg:block">
        <h2 className="text-foreground mb-4 text-sm font-semibold">목차</h2>
        <BlogPostTocLinks headings={headings} activeId={activeId} />
      </nav>
      <div className="relative lg:hidden">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-post-toc"
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground flex min-h-12 w-full items-center justify-between gap-3 text-sm font-medium"
        >
          <span>목차 {isOpen ? "닫기" : "열기"}</span>
          <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
        </button>
        <nav
          id="mobile-post-toc"
          aria-label="목차"
          hidden={!isOpen}
          className="border-border bg-background absolute inset-x-0 top-full max-h-[calc(100dvh-var(--site-header-height)-5rem)] overflow-y-auto overscroll-contain rounded-b-sm border px-3 py-4 shadow-sm"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsOpen(false);
              (
                event.currentTarget
                  .previousElementSibling as HTMLButtonElement | null
              )?.focus();
            }
          }}
        >
          <BlogPostTocLinks
            headings={headings}
            activeId={activeId}
            onNavigate={() => setIsOpen(false)}
          />
        </nav>
      </div>
    </aside>
  );
}
