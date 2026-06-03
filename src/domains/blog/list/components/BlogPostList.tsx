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
            className="group rounded-app border-border bg-surface/88 hover:border-primary hover:shadow-app focus-visible:outline-primary relative grid min-h-28 grid-cols-[3.25rem_minmax(0,1fr)_8rem] items-center gap-5 overflow-hidden border p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 max-sm:grid-cols-1 max-sm:gap-3"
          >
            <span className="bg-primary absolute inset-y-4 left-0 w-0.5 origin-top scale-y-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
            <span className="text-primary text-sm font-[850] tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="grid gap-2">
              <ViewTransition name={`post-title-${post.meta.slug}`}>
                <strong className="block text-[clamp(1.125rem,2.2vw,1.5rem)] leading-snug font-[780]">
                  {post.meta.title}
                </strong>
              </ViewTransition>
              <span className="text-muted line-clamp-2 leading-relaxed">
                {post.meta.description}
              </span>
            </span>
            <time
              dateTime={post.meta.date}
              className="text-muted text-right text-sm font-[680] max-sm:text-left"
            >
              {formatDate(post.meta.date)}
            </time>
          </Link>
        </MotionItem>
      ))}
    </MotionList>
  );
}
