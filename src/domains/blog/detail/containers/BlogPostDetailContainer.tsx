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
      key={slug}
      id="main-content"
      tabIndex={-1}
      className="max-w-blog mx-auto py-10 max-md:py-7 lg:grid lg:max-w-none lg:grid-cols-[minmax(10rem,1fr)_minmax(0,var(--blog-max-width))_minmax(0,1fr)] lg:gap-x-6"
    >
      <div className="min-w-0 lg:col-start-2 lg:row-start-1">
        <BlogPostDetailHeader post={post.meta} />
      </div>

      <BlogPostTableOfContents headings={post.headings} />
      <div className="min-w-0 lg:col-start-2 lg:row-start-2">
        <post.Component />
      </div>
    </main>
  );
}
