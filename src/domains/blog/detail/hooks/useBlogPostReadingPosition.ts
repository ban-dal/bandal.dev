"use client";

import { useEffect, useState } from "react";

import type { ContentHeading } from "@/lib/content-utils";

export function useBlogPostReadingPosition(headings: ContentHeading[]) {
  const [activeId, setActiveId] = useState<string | undefined>(headings[0]?.id);
  const [headerHeight, setHeaderHeight] = useState(56);

  useEffect(() => {
    const header = document.querySelector("body > header, body header");
    const elements = headings.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    let frame = 0;

    const update = () => {
      frame = 0;
      const height = header?.getBoundingClientRect().height ?? 56;
      setHeaderHeight(height);
      const anchorOffset =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
      const headingOffset = elements[0]
        ? parseFloat(getComputedStyle(elements[0]).scrollMarginTop) || 0
        : 0;
      const readingLine = Math.max(
        height + 64,
        anchorOffset + headingOffset + 2,
      );
      let currentId: string | undefined = elements[0]?.id;
      for (const element of elements) {
        if (element.getBoundingClientRect().top > readingLine) break;
        currentId = element.id;
      }
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
      ) {
        currentId = elements.at(-1)?.id;
      }
      setActiveId(currentId);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    if (header) observer.observe(header);
    const article = document.querySelector("[data-mdx-prose]");
    if (article) observer.observe(article);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [headings]);

  return { activeId, headerHeight };
}
