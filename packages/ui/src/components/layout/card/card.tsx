import { isValidElement, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { Button, type ButtonProps } from "../../actions/button";
import { classNames } from "../../../shared/utils";

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  media?: ReactNode;
  meta?: ReactNode;
  actions?: Array<ReactNode | ButtonProps>;
  footer?: ReactNode;
  variant?: "surface" | "outlined" | "ghost";
  density?: "compact" | "md" | "spacious";
  interactive?: boolean;
  selected?: boolean;
  fullWidth?: boolean;
  actionPlacement?: "footer" | "header";
}

function renderAction(action: ReactNode | ButtonProps, index: number): ReactNode {
  return typeof action === "object" && action !== null && !isValidElement(action) && "label" in action
    ? <Button key={index} {...action} />
    : action as ReactNode;
}

export function Card({
  title,
  eyebrow,
  description,
  media,
  meta,
  children,
  actions = [],
  footer,
  variant = "surface",
  density = "md",
  interactive = false,
  selected = false,
  fullWidth = false,
  actionPlacement = "footer",
  className,
  ...props
}: CardProps) {
  const handleInteractiveKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    props.onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  const content = (
    <>
      {media ? <div className="ds-Card-media">{media}</div> : null}
      {title || description || eyebrow || meta || (actions.length > 0 && actionPlacement === "header") ? (
        <div className="ds-Card-header">
          <div className="ds-Card-heading">
            {eyebrow ? <span className="ds-Card-eyebrow">{eyebrow}</span> : null}
            {title ? <h3 className="ds-Card-title">{title}</h3> : null}
            {description ? <p className="ds-Card-description">{description}</p> : null}
          </div>
          {meta ? <div className="ds-Card-meta">{meta}</div> : null}
          {actions.length > 0 && actionPlacement === "header" ? <div className="ds-Card-actions">{actions.map(renderAction)}</div> : null}
        </div>
      ) : null}
      {children ? <div className="ds-Card-body">{children}</div> : null}
      {actions.length > 0 && actionPlacement === "footer" ? <div className="ds-Card-actions">{actions.map(renderAction)}</div> : null}
      {footer ? <div className="ds-Card-footer">{footer}</div> : null}
    </>
  );

  return (
    <article
      className={classNames("ds-Card", className)}
      data-variant={variant}
      data-density={density}
      data-interactive={interactive ? "true" : undefined}
      data-selected={selected ? "true" : undefined}
      data-full-width={fullWidth ? "true" : undefined}
      {...props}
      role={interactive ? "button" : props.role}
      tabIndex={interactive ? (props.tabIndex ?? 0) : props.tabIndex}
      onKeyDown={interactive ? handleInteractiveKeyDown : props.onKeyDown}
    >
      {content}
    </article>
  );
}
