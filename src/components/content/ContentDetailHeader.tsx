import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import { ViewTransition } from "@/components/ViewTransition";
import { cn } from "@/lib/utils";

type ContentDetailHeaderProps = {
  slug: string;
  title: string;
  description: string;
  date: string;
  backLink: {
    href: string;
    label: string;
  };
};

export default function ContentDetailHeader({
  slug,
  title,
  description,
  date,
  backLink,
}: ContentDetailHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href={backLink.href}
        className={buttonVariants({
          variant: "link",
          color: "primary",
          className: "mb-4 hover:translate-x-[-4px]",
        })}
      >
        ← {backLink.label}
      </Link>
      <ViewTransition name={`title-${slug}`}>
        <h1
          className={cn(
            "mb-4 text-3xl font-bold md:text-4xl",
            "text-heading font-serif",
          )}
        >
          {title}
        </h1>
      </ViewTransition>
      <ViewTransition name={`description-${slug}`}>
        <p className="text-blockquote mb-4 text-base">{description}</p>
      </ViewTransition>
      <ViewTransition name={`date-${slug}`}>
        <time className="text-blockquote text-base">{date}</time>
      </ViewTransition>
    </div>
  );
}
