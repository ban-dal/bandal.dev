import { AboutResumeShell } from "@/components/AboutResumeShell";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="py-16 max-md:py-9">
      <AboutResumeShell>{children}</AboutResumeShell>
    </main>
  );
}
