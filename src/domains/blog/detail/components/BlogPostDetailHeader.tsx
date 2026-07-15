import Link from "next/link";
import { ViewTransition } from "react";

import { MotionShell } from "@/components/MotionShell";
import type { ContentMeta } from "@/lib/content-utils";

type BlogPostDetailHeaderProps = {
  post: ContentMeta;
};

export function BlogPostDetailHeader({ post }: BlogPostDetailHeaderProps) {
  return (
    <MotionShell className="mb-12 pt-2">
      <Link
        href="/blog"
        className="text-muted hover:text-foreground focus-visible:outline-focus inline-flex min-h-8 items-center text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        글 목록
      </Link>
      <time dateTime={post.date} className="text-muted mt-7 mb-3 block text-sm">
        {post.date}
      </time>
      <ViewTransition name={`post-title-${post.slug}`}>
        <h1 className="mb-5 text-[clamp(2rem,4vw,2.75rem)] leading-[1.12] font-bold [overflow-wrap:anywhere]">
          {post.title}
        </h1>
      </ViewTransition>
      <p className="text-secondary max-w-[60ch] text-base leading-relaxed">
        {post.description}
      </p>
    </MotionShell>
  );
}
