"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";

import type { ContentHeading } from "@/lib/content-utils";
import { cn } from "@/lib/utils";

import { useBlogPostReadingPosition } from "../hooks/useBlogPostReadingPosition";

const TOC_EASE_OUT = [0.23, 1, 0.32, 1] as const;

type BlogPostTableOfContentsProps = {
  headings: ContentHeading[];
};

function BlogPostTocLinks({
  headings,
  activeId,
  onNavigate,
}: BlogPostTableOfContentsProps & {
  activeId?: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-1">
      {headings.map((heading, index) => (
        <motion.a
          key={`${heading.id}-${heading.text}`}
          href={`#${heading.id}`}
          aria-current={activeId === heading.id ? "location" : undefined}
          onClick={onNavigate}
          variants={
            onNavigate
              ? {
                  closed: {
                    opacity: 0,
                    transform: reduceMotion
                      ? "translateY(0px)"
                      : "translateY(6px)",
                  },
                  open: {
                    opacity: 1,
                    transform: "translateY(0px)",
                    transition: {
                      duration: reduceMotion ? 0.2 : 0.24,
                      ease: TOC_EASE_OUT,
                      delay: reduceMotion
                        ? 0
                        : 0.16 + Math.min(index, 7) * 0.035,
                    },
                  },
                  exit: {
                    opacity: 1,
                    transform: "translateY(0px)",
                    transition: { duration: 0 },
                  },
                }
              : undefined
          }
          className={cn(
            "text-muted hover:text-foreground focus-visible:outline-focus flex min-h-11 items-center border-l border-transparent py-1 pl-3 text-sm leading-relaxed [overflow-wrap:anywhere] break-keep transition-colors duration-180 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none lg:min-h-6 lg:text-[0.8125rem]",
            heading.depth === 3 && "pl-6",
            activeId === heading.id &&
              "border-foreground text-foreground font-medium",
          )}
        >
          {heading.text}
        </motion.a>
      ))}
    </div>
  );
}

export function BlogPostTableOfContents({
  headings,
}: BlogPostTableOfContentsProps) {
  const { activeId, headerHeight } = useBlogPostReadingPosition(headings);
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Table of contents"
      style={{ "--site-header-height": `${headerHeight}px` } as CSSProperties}
      className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-40 lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-h-[calc(100dvh-6rem)] lg:min-w-0 lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:pr-2 print:hidden"
    >
      <nav aria-label="목차" className="hidden lg:block">
        <h2 className="text-muted mb-3 text-xs font-medium">목차</h2>
        <BlogPostTocLinks headings={headings} activeId={activeId} />
      </nav>
      <div className="relative lg:hidden">
        <button
          ref={toggleRef}
          type="button"
          aria-label={isOpen ? "목차 닫기" : "목차 열기"}
          aria-expanded={isOpen}
          aria-controls="mobile-post-toc"
          onClick={() => setIsOpen(!isOpen)}
          className="border-border bg-background text-foreground flex size-12 items-center justify-center rounded-full border shadow-lg"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <path d="m6 6 12 12M6 18 18 6" />
            ) : (
              <path d="M9 6h12M9 12h12M9 18h12M3 6h.01M3 12h.01M3 18h.01" />
            )}
          </svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              id="mobile-post-toc"
              aria-label="목차"
              initial="closed"
              animate="open"
              exit="exit"
              variants={{
                closed: {
                  opacity: 0,
                  transform: reduceMotion
                    ? "translateY(0px) scale(1)"
                    : "translateY(12px) scale(0.94)",
                },
                open: {
                  opacity: 1,
                  transform: "translateY(0px) scale(1)",
                  pointerEvents: "auto",
                  transition: {
                    // 빠른 열림을 피하려는 요청에 맞춰 기본 팝오버보다 여유 있게 연다.
                    duration: reduceMotion ? 0.2 : 0.36,
                    ease: TOC_EASE_OUT,
                  },
                },
                exit: {
                  opacity: 0,
                  transform: reduceMotion
                    ? "translateY(0px) scale(1)"
                    : "translateY(12px) scale(0.94)",
                  pointerEvents: "none",
                  transition: {
                    duration: reduceMotion ? 0.2 : 0.24,
                    ease: TOC_EASE_OUT,
                  },
                },
              }}
              style={{ transformOrigin: "bottom right" }}
              className="border-border bg-background absolute right-0 bottom-full mb-3 max-h-[min(60dvh,28rem)] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto overscroll-contain rounded-xl border p-4 shadow-lg"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setIsOpen(false);
                  toggleRef.current?.focus({ preventScroll: true });
                }
              }}
            >
              <BlogPostTocLinks
                headings={headings}
                activeId={activeId}
                onNavigate={(event) => {
                  if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey ||
                    event.button !== 0
                  )
                    return;
                  const target = document.getElementById(
                    decodeURIComponent(event.currentTarget.hash.slice(1)),
                  );
                  setIsOpen(false);
                  toggleRef.current?.focus({ preventScroll: true });
                  if (!target) return;
                  event.preventDefault();
                  window.history.pushState(null, "", event.currentTarget.hash);
                  target.scrollIntoView({
                    behavior: reduceMotion ? "instant" : "smooth",
                    block: "start",
                  });
                }}
              />
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
