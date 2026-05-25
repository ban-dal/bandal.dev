"use client";

import * as Tabs from "@radix-ui/react-tabs";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { clsx } from "clsx";
import dedent from "dedent";
import React, { useEffect, useState } from "react";
import { codeToHtml, type BundledLanguage, type BundledTheme } from "shiki";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type CodeTheme = "light" | "dark";

const SHIKI_THEME = {
  light: "github-light",
  dark: "dark-plus",
} satisfies Record<CodeTheme, BundledTheme>;

function getResolvedCodeTheme(): CodeTheme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function useResolvedCodeTheme() {
  const [theme, setTheme] = useState<CodeTheme>(getResolvedCodeTheme);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => setTheme(getResolvedCodeTheme());
    const observer = new MutationObserver(syncTheme);

    syncTheme();
    observer.observe(root, {
      attributeFilter: ["class", "data-theme"],
      attributes: true,
    });
    mediaQuery.addEventListener("change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return theme;
}

export function js(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "js", code: dedent(strings, ...args) };
}
export function ts(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "ts", code: dedent(strings, ...args) };
}
export function jsx(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "jsx", code: dedent(strings, ...args) };
}
export function html(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "html", code: dedent(strings, ...args) };
}
export function svelte(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "svelte", code: dedent(strings, ...args) };
}
export function css(strings: TemplateStringsArray, ...args: any[]) {
  return { lang: "css", code: dedent(strings, ...args) };
}

export function CodeExampleGroup({
  examples,
  filenames,
  className = "",
}: {
  examples: { lang: string; code: string }[];
  filenames: string[];
  className?: string;
}) {
  return (
    <Tabs.Root defaultValue={filenames[0]} className="not-prose">
      <div className="rounded-xl">
        <div className={clsx("rounded-xl p-1 text-sm ", className)}>
          <Tabs.List className="flex gap-1 px-2 pt-2">
            {filenames.map((filename, i) => (
              <Tabs.Trigger
                key={filename}
                value={filename}
                className="rounded-t-lg px-3 py-1.5 font-mono text-xs text-muted transition-colors data-[state=active]:bg-surface-muted data-[state=active]:text-foreground dark:data-[state=active]:bg-[#181a18] dark:data-[state=active]:text-white"
              >
                <CodeExampleFilename
                  filename={filename}
                  lang={examples[i].lang}
                />
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {examples.map((example, i) => (
            <Tabs.Content key={filenames[i]} value={filenames[i]} asChild>
              <CodeExampleWrapper>
                <CodeExampleHeader
                  filename={filenames[i]}
                  lang={example.lang}
                  code={example.code}
                />
                <RawHighlightedCode example={example} />
              </CodeExampleWrapper>
            </Tabs.Content>
          ))}
        </div>
      </div>
    </Tabs.Root>
  );
}

export function CodeExample({
  example,
  filename,
  className = "",
}: {
  example: { lang: string; code: string };
  filename?: string;
  className?: string;
}) {
  return (
    <CodeExampleWrapper className={className}>
      <CodeExampleHeader
        filename={filename}
        lang={example.lang}
        code={example.code}
      />
      <RawHighlightedCode example={example} />
    </CodeExampleWrapper>
  );
}

export function CodeExampleWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-border bg-surface p-2 text-sm text-foreground shadow-app dark:bg-code-background dark:text-code-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CodeExampleHeader({
  filename,
  lang,
  code,
}: {
  filename?: string;
  lang?: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="flex items-center justify-between gap-2 mb-2">
      <div className="flex min-w-0 items-center gap-2">
        {filename && (
          <span className="max-w-[160px] truncate font-mono text-xs text-muted dark:text-white/70">
            {filename}
          </span>
        )}
        {lang && (
          <Badge color="gray" size="sm" radius="md" className="ml-1">
            {lang}
          </Badge>
        )}
      </div>
      <Button
        size="sm"
        variant="light"
        color="foreground"
        radius="md"
        className="h-auto min-w-[48px] px-2 py-1 text-xs"
        onClick={handleCopy}
        type="button"
        isIconOnly={false}
      >
        {copied ? "복사됨!" : "복사"}
      </Button>
    </div>
  );
}

export function RawHighlightedCode({
  example,
}: {
  example: { lang: string; code: string };
  className?: string;
}) {
  const codeTheme = useResolvedCodeTheme();
  const [html, setHtml] = useState("");

  useEffect(() => {
    let isCurrent = true;

    (async () => {
      try {
        const html = await codeToHtml(example.code, {
          lang: example.lang as BundledLanguage,
          theme: SHIKI_THEME[codeTheme],
          transformers: [
            transformerNotationHighlight(),
            transformerNotationDiff(),
            transformerNotationWordHighlight(),
          ],
        });

        if (isCurrent) {
          setHtml(html);
        }
      } catch {
        const html = await codeToHtml(example.code, {
          lang: "text",
          theme: SHIKI_THEME[codeTheme],
        });

        if (isCurrent) {
          setHtml(html);
        }
      }
    })();

    return () => {
      isCurrent = false;
    };
  }, [codeTheme, example.code, example.lang]);

  return (
    <div
      className={cn(
        "overflow-auto rounded-lg border border-border bg-background font-mono text-sm leading-7",
        "[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:whitespace-pre [&_code]:whitespace-pre",
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function CodeExampleFilename({
  filename,
  lang,
}: {
  filename: string;
  lang: string;
}) {
  // 탭에만 쓰이는 파일명+언어 뱃지 (복사 버튼 없음)
  return (
    <div className="flex min-w-0 items-center gap-1">
      <span className="max-w-[120px] truncate font-mono text-xs text-muted dark:text-white/50">
        {filename}
      </span>
      {lang && (
        <Badge color="gray" size="sm" radius="md">
          {lang}
        </Badge>
      )}
    </div>
  );
}
