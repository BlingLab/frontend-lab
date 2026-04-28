import { isValidElement, type HTMLAttributes, type ReactNode } from "react";
import { Button, type ButtonProps } from "../../actions/button";
import type { Tone } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: Array<ReactNode | ButtonProps>;
  tone?: Tone;
}

function renderAction(action: ReactNode | ButtonProps, index: number): ReactNode {
  return typeof action === "object" && action !== null && !isValidElement(action) && "label" in action
    ? <Button key={index} {...action} />
    : action as ReactNode;
}

export function EmptyState({ title = "비어 있습니다 / Empty state", description, icon = "-", actions = [], tone = "neutral", className, ...props }: EmptyStateProps) {
  return (
    <section className={classNames("ds-EmptyState", className)} data-tone={tone} {...props}>
      {icon ? <div className="ds-EmptyState-icon" aria-hidden="true">{icon}</div> : null}
      <h3 className="ds-EmptyState-title">{title}</h3>
      {description ? <p className="ds-EmptyState-description">{description}</p> : null}
      {actions.length > 0 ? <div className="ds-EmptyState-actions">{actions.map(renderAction)}</div> : null}
    </section>
  );
}
