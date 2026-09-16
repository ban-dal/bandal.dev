import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { useMDXComponents } from "./mdx-components";

import type { ComponentType, HTMLAttributes, TableHTMLAttributes } from "react";

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

describe("MDX table", () => {
  it("줄바꿈이 포함된 MDX 표는 hydration을 방해하는 공백 없이 셀 내용을 렌더링한다", () => {
    const Table = useMDXComponents({}).table as ComponentType<
      TableHTMLAttributes<HTMLTableElement>
    >;
    const markup = renderToStaticMarkup(
      <Table>
        {"\n"}
        <tbody>
          <tr>
            <td>비교 내용</td>
          </tr>
        </tbody>
        {"\n"}
      </Table>,
    );
    const container = document.createElement("div");
    container.innerHTML = markup;
    const table = container.querySelector("table")!;
    expect(
      Array.from(table.childNodes).every(
        (node) => node.nodeType === Node.ELEMENT_NODE,
      ),
    ).toBe(true);
    expect(table.querySelector("td")).toHaveTextContent("비교 내용");
  });
});
