import { useEffect, type RefObject } from "react";

export interface UseOverlayDismissOptions {
  open: boolean;
  rootRef: RefObject<HTMLElement | null>;
  onEscape?: () => void;
  onPointerDownOutside?: () => void;
}

export function useOverlayDismiss({
  open,
  rootRef,
  onEscape,
  onPointerDownOutside
}: UseOverlayDismissOptions) {
  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onPointerDownOutside?.();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape?.();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onEscape, onPointerDownOutside, open, rootRef]);
}
