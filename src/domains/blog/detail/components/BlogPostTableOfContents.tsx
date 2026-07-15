"use client";

import type { ContentHeading } from "@/lib/content-utils";

type BlogPostTableOfContentsProps = {
  headings: ContentHeading[];
};

function handleTocLinkClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  headingId: string,
) {
  const headingElement = document.getElementById(headingId);

  if (!headingElement) {
    return;
  }

  event.preventDefault();
  headingElement.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  window.history.pushState(null, "", `#${headingId}`);
}

function BlogPostTocLinks({ headings }: BlogPostTableOfContentsProps) {
  return (
    <div className="grid gap-2.5">
      {headings.map((heading) => (
        <a
          key={`${heading.id}-${heading.text}`}
          href={`#${heading.id}`}
          className={`text-muted hover:text-foreground block text-sm leading-snug transition-colors ${
            heading.depth === 3 ? "pl-3.5" : ""
          }`}
          onClick={(event) => handleTocLinkClick(event, heading.id)}
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
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Table of contents"
      className="border-border mb-10 border-y"
    >
      <details className="py-3">
        <summary className="text-muted hover:text-foreground focus-visible:outline-focus cursor-pointer text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2">
          목차
        </summary>
        <div className="pt-4 pb-1">
          <BlogPostTocLinks headings={headings} />
        </div>
      </details>
    </aside>
  );
}
