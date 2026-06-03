import { ViewTransition } from "react";

import { MotionShell } from "@/components/MotionShell";
import { getAllPosts } from "@/lib/content-utils";

import { BlogPostList } from "../components/BlogPostList";

export async function BlogListContainer() {
  const posts = await getAllPosts();

  return (
    <main className="py-12 max-md:py-8">
      <MotionShell className="border-border mb-9 grid gap-7 border-b pb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <p className="text-primary mb-4 text-xs font-[850] tracking-[0.16em] uppercase">
            Blog
          </p>
          <ViewTransition name="home-title">
            <h1 className="max-w-[760px] text-[clamp(2.4rem,8vw,5.75rem)] leading-[0.95] font-[860]">
              글 목록
            </h1>
          </ViewTransition>
        </div>
        <div className="border-border bg-surface shadow-app flex h-14 min-w-36 items-center justify-between gap-5 rounded-full border px-5">
          <span className="text-muted text-sm font-[760]">Posts</span>
          <strong className="text-2xl font-[850] tabular-nums">
            {posts.length}
          </strong>
        </div>
      </MotionShell>
      <BlogPostList posts={posts} />
    </main>
  );
}
