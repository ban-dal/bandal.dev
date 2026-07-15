import { ViewTransition } from "react";

import { MotionShell } from "@/components/MotionShell";
import { getAllPosts } from "@/lib/content-utils";

import { BlogPostList } from "../components/BlogPostList";

export async function BlogListContainer() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto max-w-[46rem] py-12 max-md:py-8">
      <MotionShell className="mb-10">
        <ViewTransition name="home-title">
          <h1 className="text-[clamp(2rem,4vw,2.25rem)] leading-[1.15] font-bold">
            글 목록
          </h1>
        </ViewTransition>
      </MotionShell>
      <BlogPostList posts={posts} />
    </main>
  );
}
