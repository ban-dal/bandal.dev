import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { ContentHeading } from "@/lib/content-utils";

import { BlogPostTableOfContents } from "./BlogPostTableOfContents";

const headings: ContentHeading[] = [
  { id: "first", text: "첫 구간", depth: 2 },
  { id: "second", text: "다음 구간", depth: 2 },
];

beforeEach(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("아래로 스크롤한 뒤 위로 돌아오면 현재 구간에 맞게 활성 목차를 변경한다", async () => {
  let secondTop = 1000;
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      return {
        top: this.id === "second" ? secondTop : 0,
        height: 56,
      } as DOMRect;
    },
  );
  render(
    <>
      <BlogPostTableOfContents headings={headings} />
      <h2 id="first">First</h2>
      <h2 id="second">Second</h2>
    </>,
  );
  const first = screen.getAllByRole("link", { name: "첫 구간" })[0];
  const second = screen.getAllByRole("link", { name: "다음 구간" })[0];
  expect(first).toHaveAttribute("aria-current", "location");
  secondTop = 80;
  fireEvent.scroll(window);
  await waitFor(() =>
    expect(second).toHaveAttribute("aria-current", "location"),
  );
  secondTop = 1000;
  fireEvent.scroll(window);
  await waitFor(() =>
    expect(first).toHaveAttribute("aria-current", "location"),
  );
});

describe("mobile disclosure", () => {
  it("모바일 목차는 Escape 입력 시 닫히고 버튼에 포커스를 반환하며 링크 선택 시 닫힌다", () => {
    render(<BlogPostTableOfContents headings={headings} />);
    const toggle = screen.getByRole("button", { name: "목차 열기" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById("mobile-post-toc")!;
    fireEvent.keyDown(panel, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    fireEvent.click(toggle);
    fireEvent.click(panel.querySelector("a")!);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
