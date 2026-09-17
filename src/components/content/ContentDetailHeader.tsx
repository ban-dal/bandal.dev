import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ContentDetailHeaderProps = {
  title: string;
  description: string;
  date: string;
  backLink: {
    href: string;
    label: string;
  };
};

export default function ContentDetailHeader({
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
      <h1
        className={cn(
          "mb-4 text-3xl font-bold md:text-4xl",
          "text-heading font-serif",
        )}
      >
        {title}
      </h1>
      <p className="text-blockquote mb-4 text-base">{description}</p>
      <time className="text-blockquote text-base">{date}</time>
    </div>
  );
}
