import { useCallback, useRef, type RefObject } from "react";

export function useFocusReturn<T extends HTMLElement = HTMLElement>() {
  const triggerRef = useRef<T | null>(null);
  const fallbackRef = useRef<HTMLElement | null>(null);

  const rememberFocus = useCallback(() => {
    fallbackRef.current = triggerRef.current ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
  }, []);

  const restoreFocus = useCallback(() => {
    const target = triggerRef.current ?? fallbackRef.current;
    fallbackRef.current = null;
    window.setTimeout(() => target?.focus(), 0);
  }, []);

  return { triggerRef, rememberFocus, restoreFocus } as {
    triggerRef: RefObject<T | null>;
    rememberFocus: () => void;
    restoreFocus: () => void;
  };
}
