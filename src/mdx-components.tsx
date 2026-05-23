import Link from "next/link";
import { Children } from "react";

import { slugifyHeading } from "@/lib/content-utils";
import { cn } from "@/lib/utils";

import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    const props = node.props as { children?: ReactNode };
    return getTextContent(props.children);
  }

  return "";
}

function HeadingAnchor({ children, id }: { children: ReactNode; id: string }) {
  return (
    <a
      className="font-[inherit] text-[inherit] no-underline decoration-transparent [overflow-wrap:normal] transition-colors hover:text-primary"
      href={`#${id}`}
    >
      {children}
    </a>
  );
}

function Heading({
  children,
  className,
  level,
  ...props
}: ComponentPropsWithoutRef<"h2"> & { level: 2 | 3 | 4 }) {
  const id = slugifyHeading(getTextContent(children));

  if (level === 2) {
    return (
      <h2
        {...props}
        className={cn(
          "mt-16 mb-5 scroll-mt-24 border-t border-border pt-7 text-[clamp(1.625rem,4vw,2.25rem)] font-[780] leading-tight text-foreground",
          className,
        )}
        id={id}
      >
        <HeadingAnchor id={id}>{children}</HeadingAnchor>
      </h2>
    );
  }

  if (level === 3) {
    return (
      <h3
        {...props}
        className={cn(
          "mt-11 mb-4 scroll-mt-24 text-[clamp(1.3rem,3vw,1.625rem)] font-[760] leading-snug text-foreground",
          className,
        )}
        id={id}
      >
        <HeadingAnchor id={id}>{children}</HeadingAnchor>
      </h3>
    );
  }

  return (
    <h4
      {...props}
      className={cn(
        "mt-9 mb-3 scroll-mt-24 text-xl font-[760] leading-snug text-foreground",
        className,
      )}
      id={id}
    >
      <HeadingAnchor id={id}>{children}</HeadingAnchor>
    </h4>
  );
}

function removeWhitespaceTextNodes(children: ReactNode) {
  return Children.toArray(children).filter(
    (child) => typeof child !== "string" || child.trim().length > 0,
  );
}

function TableSection({
  children,
  ...props
}: ComponentPropsWithoutRef<"tbody">) {
  return <tbody {...props}>{removeWhitespaceTextNodes(children)}</tbody>;
}

function TableHead({ children, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead {...props}>{removeWhitespaceTextNodes(children)}</thead>;
}

function TableRow({ children, ...props }: ComponentPropsWithoutRef<"tr">) {
  return <tr {...props}>{removeWhitespaceTextNodes(children)}</tr>;
}

const proseTextColor =
  "text-[color-mix(in_srgb,var(--foreground)_76%,transparent)]";
const proseHeadingColor = "text-foreground";
const proseMutedColor =
  "text-[color-mix(in_srgb,var(--foreground)_58%,transparent)]";

type MDXWrapperProps = ComponentPropsWithoutRef<"article"> & {
  params?: unknown;
  searchParams?: unknown;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({
      children,
      className,
      params: _params,
      searchParams: _searchParams,
      ...props
    }: MDXWrapperProps) => (
      <article
        {...props}
        className={cn(
          "container max-w-[65ch] text-[1.03rem] leading-[1.82] font-normal tracking-normal md:text-[1.075rem]",
          proseTextColor,
          className,
        )}
        data-mdx-prose="true"
      >
        {children}
      </article>
    ),
    h1: ({ children, className, ...props }) => (
      <h1
        {...props}
        className={cn(
          "mb-7 text-[clamp(2.5rem,7vw,4.5rem)] font-[820] leading-[1.05] text-foreground",
          className,
        )}
      >
        {children}
      </h1>
    ),
    h2: (props) => <Heading {...props} level={2} />,
    h3: (props) => <Heading {...props} level={3} />,
    h4: (props) => <Heading {...props} level={4} />,
    p: ({ children, className, ...props }) => (
      <p {...props} className={cn("my-5", proseTextColor, className)}>
        {children}
      </p>
    ),
    ul: ({ children, className, ...props }) => (
      <ul
        {...props}
        className={cn(
          "my-6 list-disc space-y-2 pl-6 marker:text-[color-mix(in_srgb,var(--foreground)_34%,transparent)]",
          className,
        )}
      >
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }) => (
      <ol
        {...props}
        className={cn(
          "my-6 list-decimal space-y-2 pl-6 marker:text-[color-mix(in_srgb,var(--foreground)_46%,transparent)] marker:font-medium",
          className,
        )}
      >
        {children}
      </ol>
    ),
    li: ({ children, className, ...props }) => (
      <li {...props} className={cn("pl-1 leading-[1.75]", className)}>
        {children}
      </li>
    ),
    strong: ({ children, className, ...props }) => (
      <strong
        {...props}
        className={cn("font-[680] text-foreground", className)}
      >
        {children}
      </strong>
    ),
    em: ({ children, className, ...props }) => (
      <em
        {...props}
        className={cn(
          "font-serif text-[1.04em] text-[color-mix(in_srgb,var(--foreground)_86%,transparent)]",
          className,
        )}
      >
        {children}
      </em>
    ),
    blockquote: ({ children, className, ...props }) => (
      <blockquote
        {...props}
        className={cn(
          "my-8 -ml-3 border-l-4 border-blockquote-border bg-surface/70 px-5 py-4 leading-[1.68] text-blockquote [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          className,
        )}
      >
        {children}
      </blockquote>
    ),
    a: ({ href = "", children, className, ...props }) => {
      if (href.startsWith("/")) {
        return (
          <Link
            {...props}
            className={cn(
              "font-[560] text-foreground no-underline decoration-transparent [overflow-wrap:anywhere] [box-shadow:inset_0_-1px_color-mix(in_srgb,var(--foreground)_28%,transparent)] transition-[color,box-shadow] hover:text-primary hover:[box-shadow:inset_0_-1px_var(--primary)]",
              className,
            )}
            href={href}
          >
            {children}
          </Link>
        );
      }

      return (
        <a
          {...props}
          className={cn(
            "font-[560] text-foreground no-underline decoration-transparent [overflow-wrap:anywhere] [box-shadow:inset_0_-1px_color-mix(in_srgb,var(--foreground)_28%,transparent)] transition-[color,box-shadow] hover:text-primary hover:[box-shadow:inset_0_-1px_var(--primary)]",
            className,
          )}
          href={href}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
    pre: ({ children, className, ...props }) => (
      <pre
        {...props}
        className={cn(
          "my-8 overflow-auto rounded-md border border-border bg-code-background px-5 py-4 font-mono text-[0.88em] leading-[1.7] text-code-foreground shadow-app [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[1em] [&_code]:text-inherit",
          className,
        )}
      >
        {children}
      </pre>
    ),
    code: ({ children, className, ...props }) => (
      <code
        {...props}
        className={cn(
          "rounded border border-[var(--inline-code-border)] bg-[var(--inline-code-background)] px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-[var(--inline-code-foreground)]",
          className,
        )}
      >
        {children}
      </code>
    ),
    hr: ({ className, ...props }) => (
      <hr
        {...props}
        className={cn(
          "mx-auto my-12 w-14 border-t border-[color-mix(in_srgb,var(--foreground)_28%,transparent)]",
          className,
        )}
      />
    ),
    table: ({ children, className, ...props }) => (
      <div className="my-8 overflow-x-auto">
        <table
          {...props}
          className={cn(
            "w-full min-w-[36rem] border-collapse text-left text-[0.9em] leading-[1.65]",
            className,
          )}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, className, ...props }) => (
      <th
        {...props}
        className={cn(
          "border-b border-border px-3 py-2 font-[680]",
          proseHeadingColor,
          className,
        )}
      >
        {children}
      </th>
    ),
    td: ({ children, className, ...props }) => (
      <td
        {...props}
        className={cn(
          "border-b border-border px-3 py-2",
          proseMutedColor,
          className,
        )}
      >
        {children}
      </td>
    ),
    thead: TableHead,
    tbody: TableSection,
    tr: TableRow,
    ...components,
  };
}
