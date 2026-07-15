"use client";

import { Drawer as VaulDrawer } from "vaul";

import { cn } from "@/lib/utils";

type DrawerDirection = "bottom" | "left" | "right" | "top";

type DrawerProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  direction?: DrawerDirection;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
};

const DRAWER_CONTENT_CLASS_NAME: Record<DrawerDirection, string> = {
  bottom: "inset-x-0 bottom-0 max-h-[78vh] rounded-t-md",
  left: "inset-y-0 left-0 h-full w-[min(24rem,calc(100vw-2rem))] rounded-r-md",
  right:
    "inset-y-0 right-0 h-full w-[min(24rem,calc(100vw-2rem))] rounded-l-md",
  top: "inset-x-0 top-0 max-h-[78vh] rounded-b-md",
};

const DRAWER_HANDLE_CLASS_NAME: Record<DrawerDirection, string> = {
  bottom: "mx-auto mt-3 h-1.5 w-10",
  left: "my-auto ml-3 h-10 w-1.5",
  right: "my-auto mr-3 h-10 w-1.5 self-end",
  top: "mx-auto mb-3 order-last h-1.5 w-10",
};

function DrawerHandle({ direction }: { direction: DrawerDirection }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-border shrink-0 rounded-full",
        DRAWER_HANDLE_CLASS_NAME[direction],
      )}
    />
  );
}

function DrawerHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 pt-4 pb-3">
      <VaulDrawer.Title asChild>
        <strong className="text-base font-semibold">{title}</strong>
      </VaulDrawer.Title>
      <VaulDrawer.Close asChild>
        <button
          className="border-border bg-background text-foreground hover:bg-surface focus-visible:outline-focus inline-flex min-h-8 items-center justify-center rounded-sm border px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          type="button"
        >
          닫기
        </button>
      </VaulDrawer.Close>
    </div>
  );
}

export function Drawer({
  children,
  className,
  contentClassName,
  direction = "bottom",
  onOpenChange,
  open,
  title,
}: DrawerProps) {
  return (
    <VaulDrawer.Root
      direction={direction}
      onOpenChange={onOpenChange}
      open={open}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="bg-foreground/30 fixed inset-0 z-80" />
        <VaulDrawer.Content
          className={cn(
            "border-border bg-surface shadow-app fixed z-80 flex flex-col border outline-none",
            DRAWER_CONTENT_CLASS_NAME[direction],
            contentClassName,
          )}
        >
          <DrawerHandle direction={direction} />
          <DrawerHeader title={title} />
          <div className={cn("overflow-auto px-5 pb-6", className)}>
            {children}
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
