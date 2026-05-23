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
        className="pointer-events-none absolute top-8 bottom-8 left-[max(0.75rem,calc((100%_-_65ch)/2_-_3rem))] hidden w-px origin-top bg-primary/70 md:block"
        style={{ scaleY: shouldReduceMotion ? 1 : progressScale }}
        aria-hidden="true"
      />
      <motion.div
        className="relative isolate overflow-hidden rounded-app border border-border bg-surface p-[clamp(1.5rem,5vw,4rem)] shadow-app"
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
