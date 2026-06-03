import Link from "next/link";

import { ViewTransition } from "@/components/ViewTransition";
import type { ContentItem } from "@/lib/content-utils";

type ContentByYear = Record<number, ContentItem[]>;

type ContentListProps = {
  contentByYear: ContentByYear;
  contentPath: string;
  emptyMessage: string;
};

export default function ContentList({
  contentByYear,
  contentPath,
  emptyMessage,
}: ContentListProps) {
  // 연도 목록 (컨텐츠가 있는 연도만)
  const filteredYears = Object.keys(contentByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      {filteredYears.length > 0 ? (
        filteredYears.map((year) => (
          <div key={year} className="mb-16">
            <h2 className="text-heading pointer-events-none mb-8 -ml-4 font-serif text-6xl font-bold opacity-20">
              {year}
            </h2>
            <div className="-mt-16 space-y-8">
              {contentByYear[year].map(({ meta }) => (
                <article key={meta.slug} className="group">
                  <Link
                    href={`${contentPath}/${meta.slug}`}
                    className="block transition-opacity group-hover:opacity-80"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                      <ViewTransition name={`title-${meta.slug}`}>
                        <h3 className="text-heading flex-grow text-xl font-bold">
                          {meta.title}
                        </h3>
                      </ViewTransition>
                      <div className="flex items-center gap-4">
                        <ViewTransition name={`date-${meta.slug}`}>
                          <time className="text-blockquote text-sm whitespace-nowrap">
                            {meta.date}
                          </time>
                        </ViewTransition>
                      </div>
                    </div>
                    <p className="text-blockquote mt-2 line-clamp-2 text-base">
                      {meta.description}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="py-10 text-center">
          <p className="text-blockquote">{emptyMessage}</p>
        </div>
      )}
    </>
  );
}
