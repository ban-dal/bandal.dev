"use client";

import { ViewTransition as ReactViewTransition, useCallback } from "react";

import type { ViewTransitionInstance } from "react";

export type TransitionType =
  | "slideIn"
  | "slideOut"
  | "slideUp"
  | "slideDown"
  | "fade"
  | "none";
export type TransitionEvent = "enter" | "update" | "exit";

interface AnimationConfig {
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
}

interface TransitionConfig {
  old: AnimationConfig;
  new: AnimationConfig;
}

export type TransitionMap = {
  [key in TransitionEvent]?: TransitionType;
};

interface ViewTransitionProps extends Omit<
  React.ComponentProps<typeof ReactViewTransition>,
  "onEnter" | "onUpdate" | "onExit" | "exit"
> {
  children: React.ReactNode;
  transitions?: TransitionMap;
  duration?: number;
}

export function ViewTransition({
  children,
  transitions,
  duration = 350,
  ...props
}: ViewTransitionProps) {
  // 기본 애니메이션 옵션
  const getCommonOptions = useCallback(
    (): KeyframeAnimationOptions => ({
      duration,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      fill: "forwards",
    }),
    [duration],
  );

  // 트랜지션 효과 정의
  const getTransitionConfig = useCallback(
    (type: TransitionType): TransitionConfig => {
      const commonOptions = getCommonOptions();
      const oldOptions: KeyframeAnimationOptions = {
        ...commonOptions,
        duration: duration - 50,
      };

      switch (type) {
        case "slideIn":
          return {
            old: {
              keyframes: [],
              options: { ...oldOptions, direction: "reverse" },
            },
            new: {
              keyframes: [
                { transform: "translateX(100%)" },
                { transform: "translateX(0)" },
              ],
              options: commonOptions,
            },
          };

        case "slideOut":
          return {
            old: {
              keyframes: [
                { transform: "translateX(0)" },
                { transform: "translateX(-100%)" },
              ],
              options: oldOptions,
            },
            new: {
              keyframes: [],
              options: commonOptions,
            },
          };

        case "slideUp":
          return {
            old: {
              keyframes: [],
              options: { ...oldOptions, direction: "reverse" },
            },
            new: {
              keyframes: [
                { transform: "translateY(100%)" },
                { transform: "translateY(0)" },
              ],
              options: commonOptions,
            },
          };

        case "slideDown":
          return {
            old: {
              keyframes: [
                { transform: "translateY(0)" },
                { transform: "translateY(100%)" },
              ],
              options: oldOptions,
            },
            new: {
              keyframes: [],
              options: commonOptions,
            },
          };

        case "fade":
          return {
            old: {
              keyframes: [{ opacity: 1 }, { opacity: 0 }],
              options: oldOptions,
            },
            new: {
              keyframes: [{ opacity: 0 }, { opacity: 1 }],
              options: commonOptions,
            },
          };

        case "none":
        default:
          return {
            old: {
              keyframes: [],
              options: { duration: 0, fill: "forwards" },
            },
            new: {
              keyframes: [],
              options: { duration: 0, fill: "forwards" },
            },
          };
      }
    },
    [duration, getCommonOptions],
  );

  // 이벤트별 애니메이션 적용 함수
  const applyTransition = useCallback(
    (instance: ViewTransitionInstance, eventType: TransitionEvent) => {
      const transitionType = transitions?.[eventType];
      if (!transitionType) return;

      const config = getTransitionConfig(transitionType);

      instance.old.animate(config.old.keyframes, config.old.options);
      instance.new.animate(config.new.keyframes, config.new.options);
    },
    [transitions, getTransitionConfig],
  );

  // 이벤트 핸들러
  const handleEnter = useCallback(
    (instance: ViewTransitionInstance) => {
      if (transitions?.enter) {
        applyTransition(instance, "enter");
      }
    },
    [applyTransition, transitions],
  );

  const handleUpdate = useCallback(
    (instance: ViewTransitionInstance) => {
      if (transitions?.update) {
        applyTransition(instance, "update");
      }
    },
    [applyTransition, transitions],
  );

  const handleExit = useCallback(
    (instance: ViewTransitionInstance) => {
      if (transitions?.exit) {
        applyTransition(instance, "exit");
      }
    },
    [applyTransition, transitions],
  );

  const hasExitTransition = Boolean(transitions?.exit);
  const hasUpdateTransition = Boolean(transitions?.update);
  const hasEnterTransition = Boolean(transitions?.enter);

  return (
    <ReactViewTransition
      {...props}
      onEnter={handleEnter}
      onUpdate={handleUpdate}
      onExit={handleExit}
      exit={hasExitTransition ? undefined : "none"}
      update={hasUpdateTransition ? undefined : "none"}
      enter={hasEnterTransition ? undefined : "none"}
    >
      {children}
    </ReactViewTransition>
  );
}
