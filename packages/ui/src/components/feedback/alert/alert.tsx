import { isValidElement, type HTMLAttributes, type ReactNode } from "react";
import { Button, type ButtonProps } from "../../actions/button";
import type { Tone } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

type FeedbackTone = Extract<Tone, "info" | "success" | "warning" | "danger">;

export interface AlertProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  tone?: FeedbackTone;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: Array<ReactNode | ButtonProps>;
  variant?: "soft" | "outline";
  actionsPlacement?: "end" | "bottom";
  dismissible?: boolean;
  dismissLabel?: string;
  onDismiss?: () => void;
}

function renderAction(action: ReactNode | ButtonProps, index: number): ReactNode {
  return typeof action === "object" && action !== null && !isValidElement(action) && "label" in action
    ? <Button key={index} {...action} />
    : action as ReactNode;
}

export function Alert({
  tone = "info",
  title,
  description,
  icon = "i",
  actions = [],
  variant = "soft",
  actionsPlacement = "end",
  dismissible = false,
  dismissLabel = "닫기 / Dismiss",
  onDismiss,
  className,
  ...props
}: AlertProps) {
  return (
    <section className={classNames("ds-Alert", className)} data-tone={tone} data-variant={variant} data-actions-placement={actionsPlacement} role={tone === "danger" || tone === "warning" ? "alert" : "status"} {...props}>
      {icon ? <span className="ds-Icon" aria-hidden="true">{icon}</span> : null}
      <div className="ds-Alert-content">
        {title ? <strong className="ds-Alert-title">{title}</strong> : null}
        {description ? <p className="ds-Alert-description">{description}</p> : null}
      </div>
      {actions.length > 0 || dismissible ? (
        <div className="ds-Alert-actions">
          {actions.map(renderAction)}
          {dismissible ? <button className="ds-Alert-dismiss" type="button" aria-label={dismissLabel} onClick={onDismiss}>x</button> : null}
        </div>
      ) : null}
    </section>
  );
}
