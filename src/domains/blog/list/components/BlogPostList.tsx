import Link from "next/link";

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
    <ul className="divide-border/60 divide-y">
      {posts.length === 0 && (
        <li className="text-text-secondary py-8">아직 작성된 글이 없습니다.</li>
      )}
      {posts.map((post) => (
        <li key={post.meta.slug}>
          <Link
            href={`/blog/${post.meta.slug}`}
            className="group focus-visible:outline-focus grid gap-1.5 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-6"
          >
            <h2 className="group-hover:text-primary min-w-0 text-[17px] leading-relaxed font-medium [overflow-wrap:anywhere] break-keep transition-colors duration-180 motion-reduce:transition-none">
              {post.meta.title}
            </h2>
            <time
              dateTime={post.meta.date}
              className="text-muted block text-xs leading-relaxed whitespace-nowrap tabular-nums"
            >
              {formatDate(post.meta.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
