import { isValidElement, useEffect, useState, type ReactNode } from "react";
import { Button, type ButtonProps } from "../../actions/button";
import { Icon } from "../../actions/icon";
import { IconButton } from "../../actions/icon-button";
import { classNames } from "../../../shared/utils";
import type { AlertProps } from "../alert";

export interface ToastProps extends Omit<AlertProps, "actionsPlacement" | "icon" | "variant"> {
  duration?: number;
  dismissible?: boolean;
  dismissLabel?: string;
  onDismiss?: () => void;
}

function renderAction(action: NonNullable<ToastProps["actions"]>[number], index: number): ReactNode {
  return typeof action === "object" && action !== null && !isValidElement(action) && "label" in action
    ? <Button key={index} {...action} />
    : action as ReactNode;
}

export function Toast({
  tone = "info",
  title,
  description,
  duration,
  dismissible = true,
  dismissLabel = "닫기 / Dismiss",
  actions = [],
  onDismiss,
  className,
  ...props
}: ToastProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!duration || dismissed) return undefined;
    const timeoutId = window.setTimeout(() => {
      setDismissed(true);
      onDismiss?.();
    }, duration);

    return () => window.clearTimeout(timeoutId);
  }, [dismissed, duration, onDismiss]);

  if (dismissed) return null;

  return (
    <section className={classNames("ds-Toast", className)} data-tone={tone} role="status" {...props}>
      <div className="ds-Toast-content">
        {title ? <strong className="ds-Toast-title">{title}</strong> : null}
        {description ? <p className="ds-Toast-description">{description}</p> : null}
      </div>
      {actions.length > 0 || dismissible ? (
        <div className="ds-Toast-actions">
          {actions.map(renderAction)}
          {dismissible ? (
            <IconButton
              label={dismissLabel}
              icon={<Icon name="x" />}
              size="sm"
              onClick={() => {
                setDismissed(true);
                onDismiss?.();
              }}
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
