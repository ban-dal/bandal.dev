import fs from "fs";
import path from "path";

import { cache } from "react";

export type ContentType = "blog" | "note";

export type ContentMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published?: boolean;
  type: ContentType;
};

export type ContentHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type ContentItem = {
  Component: React.ComponentType;
  headings: ContentHeading[];
  meta: ContentMeta;
};

const CONTENT_ROOT_BY_TYPE = {
  blog: path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "src/content/posts",
  ),
  note: path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "src/content/notes",
  ),
} satisfies Record<ContentType, string>;

const CONTENT_IMPORT_BY_TYPE = {
  blog: "posts",
  note: "notes",
} satisfies Record<ContentType, string>;

export function slugifyHeading(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getContentPath(type: ContentType, slug: string) {
  return path.join(CONTENT_ROOT_BY_TYPE[type], slug, "index.mdx");
}

function getSlugs(type: ContentType) {
  const directory = CONTENT_ROOT_BY_TYPE[type];

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function parseContentHeadings(source: string): ContentHeading[] {
  return source
    .split(/\r?\n/)
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const text = match[2].replace(/<[^>]+>/g, "").trim();

      return {
        id: slugifyHeading(text),
        text,
        depth: match[1].length as 2 | 3,
      };
    })
    .filter((heading) => heading.id.length > 0);
}

function readHeadings(type: ContentType, slug: string): ContentHeading[] {
  const sourcePath = getContentPath(type, slug);

  if (!fs.existsSync(sourcePath)) {
    return [];
  }

  return parseContentHeadings(fs.readFileSync(sourcePath, "utf8"));
}

async function importContent(type: ContentType, slug: string) {
  const contentDirectory = CONTENT_IMPORT_BY_TYPE[type];
  return import(`@/content/${contentDirectory}/${slug}/index.mdx`);
}

export const getContentBySlug = cache(
  async (type: ContentType, slug: string): Promise<ContentItem | null> => {
    try {
      const contentModule = await importContent(type, slug);

      if (!contentModule.default) {
        return null;
      }

      return {
        Component: contentModule.default,
        headings: readHeadings(type, slug),
        meta: {
          slug,
          type,
          ...contentModule.meta,
        },
      };
    } catch {
      return null;
    }
  },
);

export async function getAllContent(type: ContentType) {
  const content = await Promise.all(
    getSlugs(type).map((slug) => getContentBySlug(type, slug)),
  );

  return content
    .filter(
      (item): item is ContentItem =>
        item !== null && item.meta.published !== false,
    )
    .sort(
      (first, second) =>
        new Date(second.meta.date).getTime() -
        new Date(first.meta.date).getTime(),
    );
}

export function groupContentByYear<T extends { meta: { date: string } }>(
  items: T[],
) {
  return [...items]
    .sort(
      (first, second) =>
        new Date(second.meta.date).getTime() -
        new Date(first.meta.date).getTime(),
    )
    .reduce<Record<string, T[]>>((groupedItems, item) => {
      const year = new Date(item.meta.date).getFullYear().toString();

      return {
        ...groupedItems,
        [year]: [...(groupedItems[year] ?? []), item],
      };
    }, {});
}

export const getPostBySlug = (slug: string) => getContentBySlug("blog", slug);
export const getAllPosts = () => getAllContent("blog");
export const getPostsByYear = async () =>
  groupContentByYear(await getAllPosts());

export const getNoteBySlug = (slug: string) => getContentBySlug("note", slug);
export const getAllNotes = () => getAllContent("note");
export const getNotesByYear = async () =>
  groupContentByYear(await getAllNotes());
