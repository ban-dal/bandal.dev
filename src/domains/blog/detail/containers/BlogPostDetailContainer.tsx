import { notFound } from "next/navigation";

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
      className="max-w-blog mx-auto py-10 max-md:py-7 xl:grid xl:max-w-none xl:grid-cols-[minmax(0,1fr)_minmax(0,var(--blog-max-width))_minmax(0,1fr)] xl:gap-x-8"
    >
      <div className="min-w-0 xl:col-start-2 xl:row-start-1">
        <BlogPostDetailHeader post={post.meta} />
      </div>

      <BlogPostTableOfContents headings={post.headings} />
      <div className="min-w-0 xl:col-start-2 xl:row-start-2">
        <post.Component />
      </div>
    </main>
  );
}
