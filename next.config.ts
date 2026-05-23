import createMDX from "@next/mdx";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "tsx", "ts"],
  allowedDevOrigins: ["192.168.219.*"],
  redirects: async () => [
    {
      source: "/resume",
      destination: "/about",
      permanent: true,
    },
    {
      source: "/React/react-hook-form-with-nextjs-server-actions",
      destination: "/blog/react-hook-form-with-server-action",
      permanent: true,
    },
    {
      source: "/%ED%9A%8C%EA%B3%A0/2024_review",
      destination: "/blog/2024-review",
      permanent: true,
    },
    {
      source: "/%ED%9A%8C%EA%B3%A0/design-system-review",
      destination: "/blog/design-system-review",
      permanent: true,
    },
    {
      source:
        "/%ED%9A%8C%EA%B3%A0/%EC%A3%BC%EB%8B%88%EC%96%B4_%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C_%EA%B0%9C%EB%B0%9C%EC%9E%90_%EC%9D%B4%EC%A7%81_%EB%A9%B4%EC%A0%91_%ED%9A%8C%EA%B3%A0",
      destination: "/blog/junior-frontend-developer-interview-review",
      permanent: true,
    },
    {
      source: "/%ED%9A%8C%EA%B3%A0/2023_review",
      destination: "/blog/2023-review",
      permanent: true,
    },
    {
      source: "/React/react-hook-form-with-nextjs-server-actions",
      destination: "/blog/react-hook-form-with-server-action",
      permanent: true,
    },
    {
      source: "/React/state-management",
      destination: "/blog/react-state-management",
      permanent: true,
    },
    {
      source: "/React/storybook-test-with-nextjs-rsc",
      destination: "/blog/storybook-test-with-nextjs-rsc",
      permanent: true,
    },
    {
      source: "/React/eslint-install",
      destination: "/blog/eslint-install",
      permanent: true,
    },
    {
      source: "/React/concurrent",
      destination: "/blog/react-query",
      permanent: true,
    },
    {
      source: "/React/react-query-vs-swr",
      destination: "/blog/react-query-vs-swr",
      permanent: true,
    },
    {
      source: "/javascript/js-optimization",
      destination: "/blog/js-optimization",
      permanent: true,
    },
    {
      source: "/javascript/async",
      destination: "/blog/js-async",
      permanent: true,
    },
    {
      source: "/web/seo",
      destination: "/blog/seo",
      permanent: true,
    },
  ],
  experimental: {
    mdxRs: {
      mdxType: "gfm",
    },
    viewTransition: true,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
