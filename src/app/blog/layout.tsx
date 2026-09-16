import { ViewTransition, type ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransition name="blog-page" default="blog-page">
      <div>{children}</div>
    </ViewTransition>
  );
}
