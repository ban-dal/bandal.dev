import type { ReactNode } from "react";

type AboutResumeShellProps = {
  children: ReactNode;
};

export function AboutResumeShell({ children }: AboutResumeShellProps) {
  return <div data-about-resume="true">{children}</div>;
}
