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
    <MotionList className="grid gap-9">
      {posts.map((post) => (
        <MotionItem key={post.meta.slug}>
          <Link
            href={`/blog/${post.meta.slug}`}
            className="group focus-visible:outline-focus block focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ViewTransition name={`post-title-${post.meta.slug}`}>
              <strong className="group-hover:text-primary block text-[clamp(1.375rem,3vw,1.5rem)] leading-[1.35] font-semibold transition-colors">
                {post.meta.title}
              </strong>
            </ViewTransition>
            <time
              dateTime={post.meta.date}
              className="text-muted mt-2 block text-sm leading-relaxed"
            >
              {formatDate(post.meta.date)}
            </time>
            <p className="text-secondary mt-3 line-clamp-2 text-base leading-relaxed">
              {post.meta.description}
            </p>
          </Link>
        </MotionItem>
      ))}
    </MotionList>
  );
}
