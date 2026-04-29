import { isValidElement, useEffect, useId, useRef, type HTMLAttributes, type ReactNode, type RefObject } from "react";
import { Button, type ButtonProps } from "../../actions/button";
import { Icon } from "../../actions/icon";
import { IconButton } from "../../actions/icon-button";
import { classNames } from "../../../shared/utils";
import { useControllableState } from "../../../shared/use-controllable-state";

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  triggerLabel?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: Array<ReactNode | ButtonProps>;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "sm" | "md" | "lg";
  modal?: boolean;
  initialFocus?: RefObject<HTMLElement | null>;
  closeLabel?: string;
  closeOnBackdropClick?: boolean;
}

function renderAction(action: ReactNode | ButtonProps, index: number): ReactNode {
  return typeof action === "object" && action !== null && !isValidElement(action) && "label" in action
    ? <Button key={index} {...action} />
    : action as ReactNode;
}

export function Dialog({
  triggerLabel = "열기 / Open",
  title,
  description,
  children,
  actions = [],
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  size = "md",
  modal = true,
  initialFocus,
  closeLabel = "닫기 / Close",
  closeOnBackdropClick = true,
  className,
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [currentOpen, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const close = () => setOpen(false);
  const openDialog = () => {
    lastActiveRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  };

  useEffect(() => {
    // native dialog의 open 상태를 React controlled prop과 동기화합니다. / Synchronize the native dialog open state with the React controlled prop.
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (currentOpen && !dialog.open) {
      lastActiveRef.current ??= document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (modal) dialog.showModal();
      else dialog.show();
      initialFocus?.current?.focus();
    }

    if (!currentOpen && dialog.open) {
      dialog.close();
    }
  }, [currentOpen, initialFocus, modal]);

  useEffect(() => {
    if (currentOpen || !lastActiveRef.current) return;
    const lastActive = lastActiveRef.current;
    lastActiveRef.current = null;
    window.setTimeout(() => lastActive.focus(), 0);
  }, [currentOpen]);

  return (
    <div className={classNames("ds-DialogRoot", className)} data-state={currentOpen ? "open" : "closed"} {...props}>
      <Button aria-haspopup="dialog" aria-expanded={currentOpen} onClick={openDialog}>{triggerLabel}</Button>
      <dialog
        className="ds-Dialog"
        data-size={size}
        data-state={currentOpen ? "open" : "closed"}
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (closeOnBackdropClick && event.target === dialogRef.current) close();
        }}
      >
        <div className="ds-Dialog-header">
          <h3 className="ds-Dialog-title" id={titleId}>{title ?? "Dialog"}</h3>
          <IconButton label={closeLabel} icon={<Icon name="x" />} onClick={close} />
        </div>
        {description ? <p className="ds-Dialog-description" id={descriptionId}>{description}</p> : null}
        <div className="ds-Dialog-body">{children ?? "Dialog content"}</div>
        <div className="ds-Dialog-actions">
          {actions.map(renderAction)}
          <Button variant="outline" tone="neutral" onClick={close}>{closeLabel}</Button>
        </div>
      </dialog>
    </div>
  );
}
