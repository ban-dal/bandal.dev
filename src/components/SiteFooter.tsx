import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";

const EMAIL_ADDRESS = "bandal2dev@gmail.com";

export function SiteFooter() {
  return (
    <footer className="border-border mx-auto w-[min(100%-2rem,56rem)] border-t py-8 md:py-12 print:hidden">
      <nav
        aria-label="Contact links"
        className="text-muted flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
      >
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}`}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({
            variant: "light",
            size: "sm",
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
          })}
        >
          GitHub
        </a>
        <Link
          href="/about"
          className={buttonVariants({
            variant: "light",
            size: "sm",
          })}
        >
          About
        </Link>
      </nav>
    </footer>
  );
}
