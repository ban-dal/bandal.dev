import { BlogListContainer } from "@/domains/blog/list/containers/BlogListContainer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "bandal.dev blog",
};

export default function BlogPage() {
  return <BlogListContainer />;
}
