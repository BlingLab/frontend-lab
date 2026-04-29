import { useCallback, useEffect, useId, useRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { Button } from "../../actions/button";
import { classNames } from "../../../shared/utils";
import { useControllableState } from "../../../shared/use-controllable-state";
import { useFocusReturn } from "../../../shared/use-focus-return";
import { useOverlayDismiss } from "../../../shared/use-overlay-dismiss";

export interface DropdownMenuItem {
  label: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  triggerLabel?: ReactNode;
  items?: DropdownMenuItem[];
  open?: boolean;
  defaultOpen?: boolean;
  placement?: string;
  onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({ triggerLabel = "메뉴 / Menu", items = [], open, defaultOpen = false, placement = "bottom-start", onOpenChange, className, ...props }: DropdownMenuProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const { triggerRef, rememberFocus, restoreFocus } = useFocusReturn<HTMLButtonElement>();
  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) restoreFocus();
  }, [restoreFocus, setOpen]);
  const getEnabledItems = () => Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>(".ds-DropdownMenu-item:not(:disabled)") ?? []);
  const focusMenuItem = (offset: number, mode: "relative" | "absolute" = "relative") => {
    const enabledItems = getEnabledItems();
    if (enabledItems.length === 0) return;
    const activeIndex = enabledItems.findIndex((item) => item === document.activeElement);
    const nextIndex = mode === "absolute" ? offset : (activeIndex + offset + enabledItems.length) % enabledItems.length;
    enabledItems[Math.min(Math.max(nextIndex, 0), enabledItems.length - 1)]?.focus();
  };

  useOverlayDismiss({
    open: currentOpen,
    rootRef,
    onEscape: closeMenu,
    onPointerDownOutside: () => closeMenu(false)
  });

  useEffect(() => {
    if (!currentOpen) return undefined;
    const animationFrame = window.requestAnimationFrame(() => focusMenuItem(0, "absolute"));
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [currentOpen]);

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusMenuItem(1);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusMenuItem(-1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusMenuItem(0, "absolute");
    }
    if (event.key === "End") {
      event.preventDefault();
      focusMenuItem(getEnabledItems().length - 1, "absolute");
    }
  };

  return (
    <div className={classNames("ds-DropdownMenu", className)} data-state={currentOpen ? "open" : "closed"} ref={rootRef} {...props}>
      <Button
        ref={triggerRef}
        variant="outline"
        tone="neutral"
        aria-haspopup="menu"
        aria-expanded={currentOpen}
        aria-controls={menuId}
        onClick={() => setOpen((previousOpen) => {
          if (!previousOpen) rememberFocus();
          return !previousOpen;
        })}
      >
        {triggerLabel}
      </Button>
      <div className="ds-DropdownMenu-content" id={menuId} role="menu" data-placement={placement} data-state={currentOpen ? "open" : "closed"} hidden={!currentOpen} ref={menuRef} onKeyDown={onMenuKeyDown}>
        {items.map((item, index) => (
          <button
            className="ds-DropdownMenu-item"
            disabled={item.disabled}
            key={index}
            role="menuitem"
            type="button"
            onClick={() => {
              item.onSelect?.();
              closeMenu();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
