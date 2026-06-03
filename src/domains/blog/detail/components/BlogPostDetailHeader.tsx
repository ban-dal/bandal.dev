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
        className="border-foreground inline-flex min-h-10 items-center rounded-full border px-4 font-[760]"
      >
        글 목록
      </Link>
      <time
        dateTime={post.date}
        className="text-primary mt-7 mb-4 block text-sm font-[850]"
      >
        {post.date}
      </time>
      <ViewTransition name={`post-title-${post.slug}`}>
        <h1 className="mb-5 max-w-[760px] text-[clamp(2.125rem,7vw,4.5rem)] leading-tight font-[820]">
          {post.title}
        </h1>
      </ViewTransition>
      <p className="text-muted max-w-[680px] text-base leading-relaxed">
        {post.description}
      </p>
    </MotionShell>
  );
}
