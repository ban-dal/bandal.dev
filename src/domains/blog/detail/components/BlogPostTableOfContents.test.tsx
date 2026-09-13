import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BlogPostTableOfContents } from "./BlogPostTableOfContents";

const headings = [
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

it("tracks the section while scrolling down and back up", async () => {
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
  it("closes after navigation and returns focus on Escape", () => {
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
