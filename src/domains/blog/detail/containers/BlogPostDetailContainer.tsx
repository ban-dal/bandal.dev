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
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-[68ch] py-12 max-md:py-8 lg:grid lg:max-w-none lg:grid-cols-[12rem_minmax(0,1fr)_12rem] lg:gap-x-6 xl:grid-cols-[14rem_minmax(0,1fr)_14rem] xl:gap-x-8"
    >
      <div className="min-w-0 lg:col-start-2 lg:row-start-1">
        <BlogPostDetailHeader post={post.meta} />
      </div>

      <BlogPostTableOfContents headings={post.headings} />
      <div className="min-w-0 lg:col-start-2 lg:row-start-2">
        <ViewTransition>
          <post.Component />
        </ViewTransition>
      </div>
    </main>
  );
}
