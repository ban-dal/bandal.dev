import Link from "next/link";
import { ViewTransition } from "react";

import { MotionItem, MotionList } from "@/components/MotionShell";
import type { ContentItem } from "@/lib/content-utils";

type BlogPostListProps = {
  posts: ContentItem[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <MotionList className="grid gap-3">
      {posts.map((post, index) => (
        <MotionItem key={post.meta.slug}>
          <Link
            href={`/blog/${post.meta.slug}`}
            className="group relative grid min-h-28 grid-cols-[3.25rem_minmax(0,1fr)_8rem] items-center gap-5 overflow-hidden rounded-app border border-border bg-surface/88 p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-app focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary max-sm:grid-cols-1 max-sm:gap-3"
          >
            <span className="absolute inset-y-4 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
            <span className="text-sm font-[850] tabular-nums text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="grid gap-2">
              <ViewTransition name={`post-title-${post.meta.slug}`}>
                <strong className="block text-[clamp(1.125rem,2.2vw,1.5rem)] font-[780] leading-snug">
                  {post.meta.title}
                </strong>
              </ViewTransition>
              <span className="line-clamp-2 leading-relaxed text-muted">
                {post.meta.description}
              </span>
            </span>
            <time
              dateTime={post.meta.date}
              className="text-right text-sm font-[680] text-muted max-sm:text-left"
            >
              {formatDate(post.meta.date)}
            </time>
          </Link>
        </MotionItem>
      ))}
    </MotionList>
  );
}
