import Link from "next/link";
import { ViewTransition } from "react";

import { MotionShell } from "@/components/MotionShell";
import type { ContentMeta } from "@/lib/content-utils";

type BlogPostDetailHeaderProps = {
  post: ContentMeta;
};

export function BlogPostDetailHeader({ post }: BlogPostDetailHeaderProps) {
  return (
    <MotionShell className="mb-8">
      <Link
        href="/blog"
        className="text-muted hover:text-foreground focus-visible:outline-focus inline-flex min-h-11 items-center text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        글 목록
      </Link>
      <time dateTime={post.date} className="text-muted mt-5 mb-2 block text-sm">
        {post.date}
      </time>
      <ViewTransition name={`post-title-${post.slug}`}>
        <h1 className="mb-3 text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.4] font-semibold tracking-[-0.02em] [overflow-wrap:anywhere] break-keep">
          {post.title}
        </h1>
      </ViewTransition>
      <p className="text-text-secondary max-w-[60ch] text-base leading-relaxed">
        {post.description}
      </p>
    </MotionShell>
  );
}
