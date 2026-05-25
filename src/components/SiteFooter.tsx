import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";

const EMAIL_ADDRESS = "bandal2dev@gmail.com";

export function SiteFooter() {
  return (
    <footer className="container py-8 md:py-12">
      <nav
        aria-label="Contact links"
        className="relative mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-border/80 bg-surface/58 p-1 text-sm text-muted shadow-[0_14px_34px_rgb(36_31_20/0.06),inset_0_1px_0_rgb(255_255_255/0.22)] backdrop-blur dark:bg-surface/42 dark:shadow-[0_18px_38px_rgb(0_0_0/0.18),inset_0_1px_0_rgb(255_255_255/0.06)]"
      >
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}`}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({
            variant: "light",
            size: "sm",
            radius: "full",
          })}
        >
          {EMAIL_ADDRESS}
        </a>
        <a
          href="https://github.com/ban-dal"
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({
            variant: "light",
            size: "sm",
            radius: "full",
          })}
        >
          GitHub
        </a>
        <Link
          href="/about"
          className={buttonVariants({
            variant: "light",
            size: "sm",
            radius: "full",
          })}
        >
          About
        </Link>
      </nav>
    </footer>
  );
}
