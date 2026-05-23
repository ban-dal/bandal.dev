import { getAllPosts } from "@/lib/content-utils";

import type { MetadataRoute } from "next";

const BASE_URL = "https://bandal.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getAllPosts();

  return [
    {
      url: BASE_URL,
      lastModified: now,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
    },
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.meta.slug}`,
      lastModified: new Date(post.meta.date),
    })),
  ];
}
