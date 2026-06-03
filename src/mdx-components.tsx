import Link from "next/link";
import { Children, isValidElement } from "react";

import { CodeExample } from "@/components/CodeExample";
import { slugifyHeading } from "@/lib/content-utils";
import { cn } from "@/lib/utils";

import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

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
      className="hover:text-primary font-[inherit] [overflow-wrap:normal] text-[inherit] no-underline decoration-transparent transition-colors"
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
          "border-border text-foreground mt-16 mb-5 scroll-mt-24 border-t pt-7 text-[clamp(1.625rem,4vw,2.25rem)] leading-tight font-[780]",
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
          "text-foreground mt-11 mb-4 scroll-mt-24 text-[clamp(1.3rem,3vw,1.625rem)] leading-snug font-[760]",
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
        "text-foreground mt-9 mb-3 scroll-mt-24 text-xl leading-snug font-[760]",
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

function getCodeBlockExample(children: ReactNode) {
  const [child] = Children.toArray(children).filter(
    (child) => typeof child !== "string" || child.trim().length > 0,
  );

  if (!isValidElement(child)) {
    return null;
  }

  const codeElement = child as ReactElement<ComponentPropsWithoutRef<"code">>;
  const className = codeElement.props.className ?? "";
  const languageMatch = /language-(\S+)/.exec(className);

  return {
    lang: languageMatch?.[1] ?? "text",
    code: getTextContent(codeElement.props.children).replace(/\n$/, ""),
  };
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
    wrapper: ({ children, className, ...props }: MDXWrapperProps) => (
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
          "text-foreground mb-7 text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-[820]",
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
      <p
        {...props}
        className={cn("my-5 [li_&]:my-0", proseTextColor, className)}
      >
        {children}
      </p>
    ),
    ul: ({ children, className, ...props }) => (
      <ul
        {...props}
        className={cn(
          "my-6 list-disc space-y-2 pl-6 marker:text-[color-mix(in_srgb,var(--foreground)_34%,transparent)] [li_&]:mt-2 [li_&]:mb-6",
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
          "my-6 list-decimal space-y-2 pl-6 marker:font-medium marker:text-[color-mix(in_srgb,var(--foreground)_46%,transparent)] [li_&]:mt-2 [li_&]:mb-6",
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
        className={cn("text-foreground font-[680]", className)}
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
          "border-blockquote-border bg-surface/70 text-blockquote my-8 -ml-3 border-l-4 px-5 py-4 leading-[1.68] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
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
              "text-foreground hover:text-primary font-[560] [overflow-wrap:anywhere] no-underline decoration-transparent [box-shadow:inset_0_-1px_color-mix(in_srgb,var(--foreground)_28%,transparent)] transition-[color,box-shadow] hover:[box-shadow:inset_0_-1px_var(--primary)]",
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
            "text-foreground hover:text-primary font-[560] [overflow-wrap:anywhere] no-underline decoration-transparent [box-shadow:inset_0_-1px_color-mix(in_srgb,var(--foreground)_28%,transparent)] transition-[color,box-shadow] hover:[box-shadow:inset_0_-1px_var(--primary)]",
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
    pre: ({ children, className, ...props }) => {
      const example = getCodeBlockExample(children);

      if (example) {
        return (
          <CodeExample
            example={example}
            className={cn("not-prose my-8", className)}
          />
        );
      }

      return (
        <pre
          {...props}
          className={cn(
            "border-border bg-code-background text-code-foreground shadow-app my-8 overflow-auto rounded-md border px-5 py-4 font-mono text-sm leading-7 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[1em] [&_code]:text-inherit",
            className,
          )}
        >
          {children}
        </pre>
      );
    },
    code: ({ children, className, ...props }) => (
      <code
        {...props}
        className={cn(
          "rounded border border-[var(--inline-code-border)] bg-[var(--inline-code-background)] px-1.5 py-0.5 font-mono text-sm leading-7 font-medium text-[var(--inline-code-foreground)]",
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
          "border-border border-b px-3 py-2 font-[680]",
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
          "border-border border-b px-3 py-2",
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
