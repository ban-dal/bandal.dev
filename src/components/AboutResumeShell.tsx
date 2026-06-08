"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import type { ReactNode } from "react";

type AboutResumeShellProps = {
  children: ReactNode;
};

export function AboutResumeShell({ children }: AboutResumeShellProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ["start 0.72", "end 0.82"],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={shellRef}
      className="relative"
      data-about-resume="true"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div
        className="bg-primary/70 pointer-events-none absolute top-8 bottom-8 left-[max(0.75rem,calc((100%_-_65ch)/2_-_3rem))] hidden w-px origin-top md:block print:hidden"
        style={{ scaleY: shouldReduceMotion ? 1 : progressScale }}
        aria-hidden="true"
      />
      <motion.div
        className="rounded-app border-border bg-surface shadow-app relative isolate overflow-hidden border p-[clamp(1.5rem,5vw,4rem)] print:overflow-visible print:rounded-none print:border-0 print:bg-transparent print:p-0 print:shadow-none"
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 18,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">{children}</div>
      </motion.div>
    </motion.div>
  );
}
