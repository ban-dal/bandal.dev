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
      className="hover:text-primary focus-visible:outline-focus font-[inherit] [overflow-wrap:normal] text-[inherit] no-underline decoration-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
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
          "text-foreground mt-16 mb-5 scroll-mt-20 text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.28] font-bold tracking-[-0.02em]",
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
          "text-foreground mt-12 mb-4 scroll-mt-20 text-[clamp(1.25rem,2.5vw,1.4375rem)] leading-[1.35] font-semibold tracking-[-0.015em]",
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
        "text-foreground mt-10 mb-3 scroll-mt-20 text-xl leading-[1.4] font-semibold tracking-[-0.01em]",
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

const proseTextColor = "text-[var(--text-secondary)]";
const proseHeadingColor = "text-foreground";
const proseMutedColor = "text-muted";

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
          "mx-auto w-full max-w-[68ch] font-sans text-base leading-[1.78] font-normal tracking-[-0.006em] md:text-[1.0625rem]",
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
          "text-foreground mb-8 text-[clamp(2.25rem,4vw,3rem)] leading-[1.12] font-bold tracking-[-0.025em]",
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
      <p {...props} className={cn("my-[1.15em]", proseTextColor, className)}>
        {children}
      </p>
    ),
    ul: ({ children, className, ...props }) => (
      <ul
        {...props}
        className={cn(
          "marker:text-muted my-[1.35em] list-disc space-y-[0.45em] pl-[1.4em] [li_&]:my-[0.55em]",
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
          "marker:text-muted my-[1.35em] list-decimal space-y-[0.45em] pl-[1.55em] marker:font-medium [li_&]:my-[0.55em]",
          className,
        )}
      >
        {children}
      </ol>
    ),
    li: ({ children, className, ...props }) => (
      <li
        {...props}
        className={cn(
          "pl-[0.2em] leading-[1.72] [&>p]:my-[0.5em] [&>p:first-child]:mt-0 [&>p:last-child]:mb-0",
          className,
        )}
      >
        {children}
      </li>
    ),
    strong: ({ children, className, ...props }) => (
      <strong
        {...props}
        className={cn("text-foreground font-semibold", className)}
      >
        {children}
      </strong>
    ),
    em: ({ children, className, ...props }) => (
      <em
        {...props}
        className={cn("text-foreground font-[inherit] italic", className)}
      >
        {children}
      </em>
    ),
    blockquote: ({ children, className, ...props }) => (
      <blockquote
        {...props}
        className={cn(
          "border-primary my-9 border-l-2 py-0.5 pr-1 pl-5 text-[0.98em] leading-[1.75] text-[var(--text-secondary)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
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
              "text-primary hover:text-accent-hover focus-visible:outline-focus font-medium [overflow-wrap:anywhere] underline decoration-[color-mix(in_srgb,var(--primary)_45%,transparent)] decoration-1 underline-offset-[0.2em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
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
            "text-primary hover:text-accent-hover focus-visible:outline-focus font-medium [overflow-wrap:anywhere] underline decoration-[color-mix(in_srgb,var(--primary)_45%,transparent)] decoration-1 underline-offset-[0.2em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
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
            className={cn("not-prose my-9", className)}
          />
        );
      }

      return (
        <pre
          {...props}
          className={cn(
            "border-border bg-code-background text-code-foreground my-9 overflow-auto rounded-sm border px-4 py-4 font-mono text-sm leading-[1.65] [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[1em] [&_code]:text-inherit",
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
          "rounded-[0.22rem] bg-[var(--inline-code-background)] px-[0.32em] py-[0.12em] font-mono text-[0.88em] leading-[inherit] font-medium text-[var(--inline-code-foreground)]",
          className,
        )}
      >
        {children}
      </code>
    ),
    hr: ({ className, ...props }) => (
      <hr
        {...props}
        className={cn("border-border my-12 w-full border-t", className)}
      />
    ),
    table: ({ children, className, ...props }) => (
      <div className="my-9 overflow-x-auto">
        <table
          {...props}
          className={cn(
            "w-full min-w-[36rem] border-collapse text-left text-[0.9em] leading-[1.6]",
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
          "border-border border-b px-3 py-2.5 align-top font-semibold",
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
          "border-border border-b px-3 py-2.5 align-top",
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
