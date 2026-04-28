import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from "react";
import { Button } from "../../actions/button";
import { classNames } from "../../../shared/utils";
import { useControllableState } from "../../../shared/use-controllable-state";

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  triggerLabel?: ReactNode;
  title?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  placement?: string;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({ triggerLabel = "열기 / Open", title, children, open, defaultOpen = false, placement = "bottom-start", onOpenChange, className, ...props }: PopoverProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!currentOpen) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [currentOpen, setOpen]);

  return (
    <div className={classNames("ds-Popover", className)} data-state={currentOpen ? "open" : "closed"} ref={rootRef} {...props}>
      <Button variant="outline" tone="neutral" aria-expanded={currentOpen} aria-controls={panelId} onClick={() => setOpen((previousOpen) => !previousOpen)}>
        {triggerLabel}
      </Button>
      <div className="ds-Popover-panel" id={panelId} data-placement={placement} data-state={currentOpen ? "open" : "closed"} hidden={!currentOpen}>
        {title ? <strong className="ds-Popover-title">{title}</strong> : null}
        <div className="ds-Popover-content">{children ?? "Popover content"}</div>
      </div>
    </div>
  );
}
