"use client";

import {
  animate,
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "framer-motion";
import NextImage from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

type ImageProps = ComponentProps<typeof NextImage>;

type Rect = Pick<DOMRect, "height" | "left" | "top" | "width">;

type Preview = {
  originRect: Rect;
  originalWidth: number;
  // 원본이 로드되기 전까지 보여줄, 이미 받아둔 썸네일 이미지
  placeholderSrc: string;
  rect: Rect;
  src: string;
};

type PreviewTransform = {
  opacity: number;
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
};

const PREVIEW_TRANSITION = {
  duration: 0.36,
  ease: [0.23, 1, 0.32, 1],
} as const;

const FADE_PROPS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: PREVIEW_TRANSITION,
};

const PREVIEW_IMAGE_VARIANTS = {
  closed: (transform: PreviewTransform) => transform,
  open: { opacity: 1, scaleX: 1, scaleY: 1, x: 0, y: 0 },
};

const REDUCED_MOTION_TRANSFORM: PreviewTransform = {
  opacity: 0,
  scaleX: 1,
  scaleY: 1,
  x: 0,
  y: 0,
};

function getOriginalImage(src: ImageProps["src"], image: HTMLImageElement) {
  if (typeof src === "string") {
    return { src, width: image.naturalWidth };
  }

  const staticImage = "default" in src ? src.default : src;

  return { src: staticImage.src, width: staticImage.width };
}

// 원본 해상도를 넘지 않는 선에서 뷰포트에 가득 차도록 중앙에 맞춘다.
function getPreviewRect(image: HTMLImageElement, originalWidth: number): Rect {
  const { width, height } = image.getBoundingClientRect();
  const padding = window.innerWidth < 640 ? 16 : 32;
  const scale = Math.min(
    Math.max(originalWidth, width) / width,
    (window.innerWidth - padding * 2) / width,
    (window.innerHeight - padding * 2) / height,
  );
  const previewWidth = width * scale;
  const previewHeight = height * scale;

  return {
    height: previewHeight,
    left: (window.innerWidth - previewWidth) / 2,
    top: (window.innerHeight - previewHeight) / 2,
    width: previewWidth,
  };
}

// 미리보기 위치에서 썸네일 위치로 되돌리는 transform
function getOriginTransform(origin: Rect, target: Rect): PreviewTransform {
  return {
    opacity: 1,
    scaleX: origin.width / target.width,
    scaleY: origin.height / target.height,
    x: origin.left + origin.width / 2 - (target.left + target.width / 2),
    y: origin.top + origin.height / 2 - (target.top + target.height / 2),
  };
}

export function Image({ alt = "", className, src, ...props }: ImageProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const previewTransform =
    shouldReduceMotion || !preview
      ? REDUCED_MOTION_TRANSFORM
      : getOriginTransform(preview.originRect, preview.rect);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleResize = () => {
      const image = imageRef.current;

      if (image) {
        setPreview(
          (current) =>
            current && {
              ...current,
              rect: getPreviewRect(image, current.originalWidth),
            },
        );
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleOpen = () => {
    const image = imageRef.current;

    if (!image) {
      return;
    }

    const original = getOriginalImage(src, image);

    setPreview({
      originRect: image.getBoundingClientRect(),
      originalWidth: original.width,
      placeholderSrc: image.currentSrc || image.src,
      rect: getPreviewRect(image, original.width),
      src: original.src,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    // 열려 있는 동안 레이아웃이 바뀌었을 수 있으므로 닫는 시점의 썸네일 위치로 돌아간다.
    const originRect = imageRef.current?.getBoundingClientRect();

    if (originRect) {
      setPreview((current) => current && { ...current, originRect });
    }

    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        className={cn(
          "rounded-app border-border bg-surface my-8 block w-full cursor-zoom-in overflow-hidden border p-0",
          className,
        )}
        onClick={handleOpen}
      >
        {typeof src === "string" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            className={cn("block h-auto w-full", preview && "invisible")}
          />
        ) : (
          <NextImage
            ref={imageRef}
            src={src}
            alt={alt}
            className={cn("block h-auto w-full", preview && "invisible")}
            sizes="(max-width: 820px) 94vw, 760px"
            {...props}
          />
        )}
      </button>

      <AnimatePresence
        custom={previewTransform}
        onExitComplete={() => {
          setPreview(null);
          triggerRef.current?.focus({ preventScroll: true });
        }}
      >
        {isOpen && preview ? (
          <ImagePreviewDialog
            alt={alt}
            preview={preview}
            previewTransform={previewTransform}
            onClose={handleClose}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

type ImagePreviewDialogProps = {
  alt: string;
  onClose: () => void;
  preview: Preview;
  previewTransform: PreviewTransform;
};

function ImagePreviewDialog({
  alt,
  onClose,
  preview,
  previewTransform,
}: ImagePreviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOriginalLoaded, setIsOriginalLoaded] = useState(false);
  const isPresent = useIsPresent();

  // top layer는 z-index와 무관하게 header 위에 그려지므로,
  // 닫히는 동안에는 일반 레이어로 내려 썸네일처럼 header 아래로 돌아가게 한다.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;

    if (isPresent || !dialog?.matches(":modal")) {
      return;
    }

    dialog.close();
    dialog.show();

    // backdrop 위로 올라온 header가 튀지 않도록 backdrop과 같은 타이밍으로 드러낸다.
    const header = document.querySelector<HTMLElement>(".site-header");

    if (header) {
      animate(header, { opacity: [0, 1] }, PREVIEW_TRANSITION);
    }
  }, [isPresent]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    dialog?.showModal();

    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-label={alt || "이미지 미리보기"}
      className="text-foreground fixed inset-0 z-30 m-0 h-full max-h-none w-full max-w-none cursor-zoom-out overflow-hidden border-0 bg-transparent p-0 backdrop:bg-transparent"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={onClose}
    >
      <motion.div
        aria-hidden="true"
        className="bg-background/95 absolute inset-0"
        {...FADE_PROPS}
      />
      <motion.div
        className="absolute"
        style={preview.rect}
        custom={previewTransform}
        variants={PREVIEW_IMAGE_VARIANTS}
        initial="closed"
        animate="open"
        exit="closed"
        transition={PREVIEW_TRANSITION}
      >
        {isOriginalLoaded ? null : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview.placeholderSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full max-w-none"
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview.src}
          alt={alt}
          className="absolute inset-0 size-full max-w-none"
          onLoad={() => setIsOriginalLoaded(true)}
        />
      </motion.div>
      <motion.button
        type="button"
        autoFocus
        className="border-border bg-background text-foreground hover:bg-surface absolute top-4 right-4 inline-flex min-h-8 cursor-pointer items-center justify-center rounded-sm border px-3 text-sm font-medium transition-colors"
        {...FADE_PROPS}
      >
        닫기
      </motion.button>
    </dialog>,
    document.body,
  );
}

export function Video(props: React.VideoHTMLAttributes<HTMLVideoElement>) {
  if (!props.src) {
    return null;
  }

  return (
    <div className="rounded-app border-border bg-surface my-8 overflow-hidden border">
      <video
        className="block h-auto w-full"
        autoPlay
        loop
        muted
        playsInline
        {...props}
      />
    </div>
  );
}

export function Iframe(props: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  if (!props.src) {
    return null;
  }

  return (
    <div className="rounded-app border-border bg-surface my-8 overflow-hidden border">
      <iframe className="aspect-video w-full border-0" {...props} />
    </div>
  );
}

export function YouTubeVideo({ id }: { id?: string }) {
  if (!id) {
    return null;
  }

  return (
    <Iframe
      src={`https://www.youtube.com/embed/${id}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
