import type { ReactNode } from "react";

type MotionContainerProps = {
  children: ReactNode;
  className?: string;
};

export function MotionShell({ children, className }: MotionContainerProps) {
  return <div className={className}>{children}</div>;
}

export function MotionList({ children, className }: MotionContainerProps) {
  return <div className={className}>{children}</div>;
}

export function MotionItem({ children, className }: MotionContainerProps) {
  return <div className={className}>{children}</div>;
}
