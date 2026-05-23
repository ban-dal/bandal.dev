import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { getPostBySlug } from "@/lib/content-utils";

import { BlogPostDetailHeader } from "../components/BlogPostDetailHeader";
import { BlogPostTableOfContents } from "../components/BlogPostTableOfContents";

type BlogPostDetailContainerProps = {
  slug: string;
};

export async function BlogPostDetailContainer({
  slug,
}: BlogPostDetailContainerProps) {
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="py-14 max-md:py-9">
      <BlogPostDetailHeader post={post.meta} />

      <div className="grid grid-cols-[minmax(0,760px)_220px] items-start gap-14 max-lg:grid-cols-1">
        <BlogPostTableOfContents headings={post.headings} />
        <ViewTransition>
          <post.Component />
        </ViewTransition>
      </div>
    </main>
  );
}
