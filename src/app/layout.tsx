import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ThemeProvider } from "@/components/ThemeProvider";

import type { Metadata } from "next";

import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    default: "bandal.dev",
    template: "%s | bandal.dev",
  },
  description: "프론트엔드 개발자 김도현의 기술 블로그와 이력서입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a
            href="#main-content"
            className="bg-surface text-foreground fixed top-2 left-4 z-50 -translate-y-24 rounded-sm px-4 py-3 focus:translate-y-0 print:hidden"
          >
            본문으로 바로가기
          </a>
          <header className="bg-background sticky top-0 z-40 w-full pt-4 sm:pt-8 print:hidden">
            <SiteNav />
          </header>
          <div className="container print:!mx-0 print:!w-full">{children}</div>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
