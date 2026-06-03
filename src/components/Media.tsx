"use client";

import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useState } from "react";

import type { ComponentProps } from "react";

type ImageProps = ComponentProps<typeof NextImage>;

function getImageSource(src: ImageProps["src"]) {
  if (typeof src === "string") {
    return src;
  }

  const staticSource = src as { src?: string; default?: { src?: string } };

  return staticSource.src ?? staticSource.default?.src ?? "";
}

export function Image({ alt = "", className, src, ...props }: ImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const imageSource = getImageSource(src);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <motion.button
        type="button"
        className={`rounded-app border-border bg-surface my-8 block w-full cursor-zoom-in overflow-hidden border p-0 ${className ?? ""}`}
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
      >
        {typeof src === "string" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="block h-auto w-full" />
        ) : (
          <NextImage
            src={src}
            alt={alt}
            className="block h-auto w-full"
            sizes="(max-width: 820px) 94vw, 760px"
            {...props}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-80 grid place-items-center bg-black/88 p-7"
            role="dialog"
            aria-modal="true"
            aria-label={alt || "image preview"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.button
              type="button"
              className="fixed top-5 right-5 z-1 inline-flex min-h-10 items-center rounded-full border border-white bg-white px-4 font-[760] text-black"
              aria-label="닫기"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              닫기
            </motion.button>
            <motion.img
              src={imageSource}
              alt={alt}
              className="max-h-[88vh] max-w-[min(100%,1400px)] object-contain"
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 8 }}
              transition={{ type: "spring", bounce: 0, duration: 0.45 }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
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
