import React from "react";

import type { RippleProps } from "@/hooks/useRipple";

interface RippleEffectProps {
  ripples: RippleProps[];
}

export function RippleEffect({ ripples }: RippleEffectProps) {
  return (
    <>
      {ripples.map((ripple, idx) => (
        <span
          key={idx}
          className="animate-ripple pointer-events-none absolute rounded-full bg-white/30"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </>
  );
}
