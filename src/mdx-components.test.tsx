import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useMDXComponents } from "./mdx-components";

import type { ComponentType, HTMLAttributes } from "react";

vi.mock("@/components/CodeExample", () => ({ CodeExample: () => null }));

describe("MDX wrapper", () => {
  it("omits Next.js page props while preserving article attributes and content", () => {
    const Wrapper = useMDXComponents({}).wrapper as ComponentType<
      HTMLAttributes<HTMLElement> & { params: unknown; searchParams: unknown }
    >;
    const { container } = render(
      <Wrapper
        params={Promise.resolve({})}
        searchParams={Promise.resolve({ preview: "true" })}
        id="about-content"
        aria-label="소개"
        className="custom-prose"
      >
        <h1>소개</h1>
      </Wrapper>,
    );
    const article = container.querySelector("article");
    expect(article).not.toHaveAttribute("params");
    expect(article).not.toHaveAttribute("searchParams");
    expect(article).toHaveAttribute("id", "about-content");
    expect(article).toHaveAttribute("aria-label", "소개");
    expect(article).toHaveClass("custom-prose");
    expect(screen.getByRole("heading", { name: "소개" })).toBeInTheDocument();
  });
});
