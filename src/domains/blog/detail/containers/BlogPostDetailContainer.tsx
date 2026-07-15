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
    <main className="mx-auto max-w-[68ch] py-12 max-md:py-8">
      <BlogPostDetailHeader post={post.meta} />

      <div>
        <BlogPostTableOfContents headings={post.headings} />
        <ViewTransition>
          <post.Component />
        </ViewTransition>
      </div>
    </main>
  );
}
