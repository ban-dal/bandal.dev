"use client";

import { motion } from "framer-motion";

import type { ReactNode } from "react";

type MotionContainerProps = {
  children: ReactNode;
  className?: string;
};

const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

const MOTION_LIST_VARIANTS = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.08 },
  },
};

const MOTION_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export function MotionShell({ children, className }: MotionContainerProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}

export function MotionList({ children, className }: MotionContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={MOTION_LIST_VARIANTS}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className }: MotionContainerProps) {
  return (
    <motion.div
      className={className}
      variants={MOTION_ITEM_VARIANTS}
      transition={{ duration: 0.45, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}
