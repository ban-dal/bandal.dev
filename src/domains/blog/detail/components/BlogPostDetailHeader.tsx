import Link from "next/link";
import { ViewTransition } from "react";

import { MotionShell } from "@/components/MotionShell";
import type { ContentMeta } from "@/lib/content-utils";

type BlogPostDetailHeaderProps = {
  post: ContentMeta;
};

export function BlogPostDetailHeader({ post }: BlogPostDetailHeaderProps) {
  return (
    <MotionShell className="mb-8 pt-4">
      <Link
        href="/blog"
        className="inline-flex min-h-10 items-center rounded-full border border-foreground px-4 font-[760]"
      >
        글 목록
      </Link>
      <time
        dateTime={post.date}
        className="mt-7 mb-4 block text-sm font-[850] text-primary"
      >
        {post.date}
      </time>
      <ViewTransition name={`post-title-${post.slug}`}>
        <h1 className="mb-5 max-w-[760px] text-[clamp(2.125rem,7vw,4.5rem)] font-[820] leading-tight">
          {post.title}
        </h1>
      </ViewTransition>
      <p className="max-w-[680px] text-base leading-relaxed text-muted">
        {post.description}
      </p>
    </MotionShell>
  );
}
