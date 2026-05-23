import { describe, it, expect, vi } from "vitest";

import { groupContentByYear, parseContentHeadings } from "./content-utils";

import type { ContentType } from "./content-utils";

// Mock fs module
vi.mock("fs", () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
  },
}));

describe("content-utils", () => {
  // Define a test content type
  interface TestContent {
    meta: { date: string; title: string };
  }

  describe("ContentType type", () => {
    it("'blog'와 'note'를 유효한 콘텐츠 타입으로 가져야 한다", () => {
      const blog: ContentType = "blog";
      const note: ContentType = "note";
      expect(blog).toBe("blog");
      expect(note).toBe("note");
    });
  });

  describe("parseContentHeadings", () => {
    it("CRLF 줄바꿈을 사용하는 MDX에서도 h2, h3 heading을 추출해야 한다", () => {
      const source = [
        "# Title",
        "",
        "## First Heading",
        "",
        "### Second Heading",
        "",
        "#### Ignored Heading",
      ].join("\r\n");

      expect(parseContentHeadings(source)).toEqual([
        {
          id: "first-heading",
          text: "First Heading",
          depth: 2,
        },
        {
          id: "second-heading",
          text: "Second Heading",
          depth: 3,
        },
      ]);
    });
  });

  describe("groupContentByYear", () => {
    it("콘텐츠를 연도별로 올바르게 그룹화해야 한다", () => {
      const content = [
        {
          meta: { date: "2023-01-15", title: "Post 1" },
        },
        {
          meta: { date: "2023-06-20", title: "Post 2" },
        },
        {
          meta: { date: "2022-12-01", title: "Post 3" },
        },
        {
          meta: { date: "2024-03-10", title: "Post 4" },
        },
      ] as { meta: { date: string; title: string } }[];

      const result = groupContentByYear(content);

      expect(Object.keys(result)).toHaveLength(3);
      expect(result[2024]).toHaveLength(1);
      expect(result[2024][0].meta.title).toBe("Post 4");
      expect(result[2023]).toHaveLength(2);
      expect(result[2022]).toHaveLength(1);
    });

    it("연도를 내림차순으로 정렬해야 한다", () => {
      const content: TestContent[] = [
        { meta: { date: "2022-01-01", title: "Post 1" } },
        { meta: { date: "2024-01-01", title: "Post 2" } },
        { meta: { date: "2023-01-01", title: "Post 3" } },
      ];

      const result = groupContentByYear(content);

      // Check that all expected years exist
      expect(result).toHaveProperty("2024");
      expect(result).toHaveProperty("2023");
      expect(result).toHaveProperty("2022");

      // Check that number of items per year is correct
      expect(result[2024]).toHaveLength(1);
      expect(result[2023]).toHaveLength(1);
      expect(result[2022]).toHaveLength(1);

      // Check that posts are correctly grouped
      expect(result[2024][0].meta.title).toBe("Post 2");
      expect(result[2023][0].meta.title).toBe("Post 3");
      expect(result[2022][0].meta.title).toBe("Post 1");
    });

    it("각 연도 내의 콘텐츠를 날짜순(내림차순)으로 정렬해야 한다", () => {
      const content: TestContent[] = [
        { meta: { date: "2023-01-01", title: "Jan" } },
        { meta: { date: "2023-03-01", title: "Mar" } },
        { meta: { date: "2023-02-01", title: "Feb" } },
      ];

      const result = groupContentByYear(content);

      expect(result[2023][0].meta.title).toBe("Mar");
      expect(result[2023][1].meta.title).toBe("Feb");
      expect(result[2023][2].meta.title).toBe("Jan");
    });

    it("빈 배열을 처리해야 한다", () => {
      const result = groupContentByYear([]);
      expect(Object.keys(result)).toHaveLength(0);
    });

    it("같은 연도와 같은 날짜의 콘텐츠를 처리해야 한다", () => {
      const content: TestContent[] = [
        { meta: { date: "2023-06-15", title: "Post A" } },
        { meta: { date: "2023-06-15", title: "Post B" } },
      ];

      const result = groupContentByYear(content);
      expect(result[2023]).toHaveLength(2);
    });
  });
});
