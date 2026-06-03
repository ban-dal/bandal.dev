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
          <header className="sticky top-1 z-30 container">
            <SiteNav />
          </header>
          <div className="container">{children}</div>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
