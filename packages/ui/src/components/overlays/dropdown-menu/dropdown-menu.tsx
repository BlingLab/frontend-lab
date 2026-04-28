import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from "react";
import { Button } from "../../actions/button";
import { classNames } from "../../../shared/utils";
import { useControllableState } from "../../../shared/use-controllable-state";

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
  const menuId = useId();

  useEffect(() => {
    if (!currentOpen) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [currentOpen, setOpen]);

  return (
    <div className={classNames("ds-DropdownMenu", className)} data-state={currentOpen ? "open" : "closed"} ref={rootRef} {...props}>
      <Button variant="outline" tone="neutral" aria-haspopup="menu" aria-expanded={currentOpen} aria-controls={menuId} onClick={() => setOpen((previousOpen) => !previousOpen)}>
        {triggerLabel}
      </Button>
      <div className="ds-DropdownMenu-content" id={menuId} role="menu" data-placement={placement} data-state={currentOpen ? "open" : "closed"} hidden={!currentOpen}>
        {items.map((item, index) => (
          <button
            className="ds-DropdownMenu-item"
            disabled={item.disabled}
            key={index}
            role="menuitem"
            type="button"
            onClick={() => {
              item.onSelect?.();
              setOpen(false);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
