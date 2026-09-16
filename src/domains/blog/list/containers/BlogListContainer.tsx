import { MotionShell } from "@/components/MotionShell";
import { getAllPosts } from "@/lib/content-utils";

import { BlogPostList } from "../components/BlogPostList";

export async function BlogListContainer() {
  const posts = await getAllPosts();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="max-w-blog mx-auto py-12 max-md:py-8"
    >
      <MotionShell className="mb-5">
        <h1 className="text-[22px] leading-snug font-semibold">글 목록</h1>
      </MotionShell>
      <BlogPostList posts={posts} />
    </main>
  );
}
