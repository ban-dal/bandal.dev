import Link from "next/link";
import { ViewTransition } from "react";

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
    <ul className="divide-border divide-y">
      {posts.length === 0 && (
        <li className="text-text-secondary py-8">아직 작성된 글이 없습니다.</li>
      )}
      {posts.map((post) => (
        <li key={post.meta.slug}>
          <Link
            href={`/blog/${post.meta.slug}`}
            className="group focus-visible:outline-focus block py-7 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ViewTransition name={`post-title-${post.meta.slug}`}>
              <h2 className="group-hover:text-primary block text-[clamp(1.375rem,3vw,1.5rem)] leading-[1.35] font-semibold [overflow-wrap:anywhere] break-keep transition-colors">
                {post.meta.title}
              </h2>
            </ViewTransition>
            <time
              dateTime={post.meta.date}
              className="text-muted mt-2 block text-sm leading-relaxed tabular-nums"
            >
              {formatDate(post.meta.date)}
            </time>
            <p className="text-text-secondary mt-3 line-clamp-2 text-base leading-relaxed">
              {post.meta.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
