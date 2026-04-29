import { useCallback, useId, useRef, type HTMLAttributes, type ReactNode } from "react";
import { Button } from "../../actions/button";
import { classNames } from "../../../shared/utils";
import { useControllableState } from "../../../shared/use-controllable-state";
import { useFocusReturn } from "../../../shared/use-focus-return";
import { useOverlayDismiss } from "../../../shared/use-overlay-dismiss";

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
  const { triggerRef, rememberFocus, restoreFocus } = useFocusReturn<HTMLButtonElement>();
  const closePopover = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) restoreFocus();
  }, [restoreFocus, setOpen]);

  useOverlayDismiss({
    open: currentOpen,
    rootRef,
    onEscape: closePopover,
    onPointerDownOutside: () => closePopover(false)
  });

  return (
    <div className={classNames("ds-Popover", className)} data-state={currentOpen ? "open" : "closed"} ref={rootRef} {...props}>
      <Button
        ref={triggerRef}
        variant="outline"
        tone="neutral"
        aria-expanded={currentOpen}
        aria-controls={panelId}
        onClick={() => setOpen((previousOpen) => {
          if (!previousOpen) rememberFocus();
          return !previousOpen;
        })}
      >
        {triggerLabel}
      </Button>
      <div className="ds-Popover-panel" id={panelId} data-placement={placement} data-state={currentOpen ? "open" : "closed"} hidden={!currentOpen}>
        {title ? <strong className="ds-Popover-title">{title}</strong> : null}
        <div className="ds-Popover-content">{children ?? "Popover content"}</div>
      </div>
    </div>
  );
}
